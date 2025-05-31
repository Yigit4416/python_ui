/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Kamera hatası:", err));

    const interval = setInterval(() => {
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
              const response = await fetch(
                "https://serverless.roboflow.com/infer/workflows/traffic-sign-project-qkdyy/custom-workflow-2",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    api_key: "YOUR_API_KEY",
                    inputs: {
                      image: {
                        type: "base64",
                        value: base64data,
                      },
                    },
                  }),
                },
              );

              const json = (await response.json()) as RoboflowResponse;
              setResult(json);
              console.log(json);
            } catch (err) {
              console.error("Roboflow isteği başarısız:", err);
            }
          };
        }, "image/jpeg");
      })();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">Roboflow Workflow Testi</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md rounded-lg border border-gray-400 shadow"
      />
      <div className="w-full max-w-xl overflow-x-auto rounded bg-white p-4 text-sm shadow">
        <pre>
          {result ? JSON.stringify(result, null, 2) : "Görüntü alınıyor..."}
        </pre>
      </div>
    </main>
  );
}
