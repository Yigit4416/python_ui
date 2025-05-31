"use client";

import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import React from "react";

export default function HomePage() {
  const router = useRouter();
  const { user } = useUser();

  const handleStart = () => {
    router.push("/predict");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <SignedOut>
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Trafik İşareti Uygulaması
            </h1>
            <p className="text-base text-gray-600">
              Devam etmek için giriş yapın veya kayıt olun.
            </p>
            <div className="flex flex-col space-y-3">
              <SignInButton>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Giriş Yap
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Kayıt Ol
                </Button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Hoş geldiniz, {user?.firstName ?? "Kullanıcı"}!
            </h1>
            <p className="text-base text-gray-600">
              AI ile trafik işaretlerini tespit etmek için lütfen başlaya
              basınız.
            </p>
            <Button
              onClick={handleStart}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition duration-200 hover:bg-blue-700"
            >
              Başla
            </Button>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}
