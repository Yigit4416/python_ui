/* eslint-disable */

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

type Prediction = {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type RoboflowResponse = {
  predictions: Prediction[];
};

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [result, setResult] = useState<RoboflowResponse | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        interval = setInterval(() => {
          void (async () => {
            const video = videoRef.current;
            if (!video) return;

            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(video, 0, 0);

            canvas.toBlob(async (blob) => {
              if (!blob) return;

              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = async () => {
                const base64data = reader.result as string;

                try {
                  const response = await fetch("/api/roboflow", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64data }),
                  });
                  const json = (await response.json()) as RoboflowResponse;
                  setResult(json);
                } catch (err) {
                  console.error("Roboflow isteği başarısız:", err);
                }
              };
            }, "image/jpeg");
          })();
        }, 2000);
      })
      .catch((err) => console.error("Kamera hatası:", err));

    return () => {
      clearInterval(interval);
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleStop = () => {
    stream?.getTracks().forEach((track) => track.stop());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold">Trafik İşareti Algılama</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleStop}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600"
          >
            Durdur & Ana Sayfa
          </button>
          <UserButton />
        </div>
      </header>

      <main className="flex flex-col items-center gap-8 p-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md rounded-xl border border-gray-300 shadow-md"
        />

        <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Tahmin Sonuçları
          </h2>
          <pre className="max-h-64 overflow-auto text-sm text-gray-600">
            {result ? JSON.stringify(result, null, 2) : "Görüntü alınıyor..."}
          </pre>
        </div>
      </main>
    </div>
  );
}
