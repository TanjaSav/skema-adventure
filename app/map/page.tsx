"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

type Location = {
  id: string;
  stepNumber: number;
  title: string;
  xPercent: number;
  yPercent: number;
};

const locations: Location[] = [
  {
    id: "location-1",
    stepNumber: 1,
    title: "Staðsetning 1",
    xPercent: 30,
    yPercent: 55,
  },
  {
    id: "location-2",
    stepNumber: 2,
    title: "Staðsetning 2",
    xPercent: 65,
    yPercent: 40,
  },
];

export default function MapPage() {
  const router = useRouter();

  // Read team name once when the page opens in the browser.
  const [teamName] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("team_name") ?? "";
  });

  // Read current progress once when the page opens in the browser.
  const [currentStep] = useState(() => {
    if (typeof window === "undefined") return 1;
    return Number(localStorage.getItem("team_current_step") ?? "1");
  });

  // Redirect if team name is missing or the game is finished.
  useEffect(() => {
    if (!teamName) {
      router.push("/team");
      return;
    }

    if (currentStep > locations.length) {
      router.push("/finish");
    }
  }, [teamName, currentStep, router]);

  if (!teamName || currentStep > locations.length) {
    return (
      <main className="min-h-screen bg-[#fff8e8]">
        <Header stepLabel={`Stig ${currentStep}`} teamName={teamName} />

        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
          <p>Hleður...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8e8]">
      <Header stepLabel={`Stig ${currentStep}`} />

      <section className="p-6">
        <h1 className="text-2xl font-bold text-green-900">Kort</h1>

        <p className="mt-2 text-green-900">Lið: {teamName}</p>

        <div className="relative mt-8 h-[420px] w-full max-w-[600px] rounded-2xl border-4 border-green-700 bg-green-100">
          <div className="absolute left-4 top-4 font-bold text-green-900">
            Ævintýrakort
          </div>

          {locations.map((location) => {
            const isDone = location.stepNumber < currentStep;
            const isActive = location.stepNumber === currentStep;
            const isLocked = location.stepNumber > currentStep;

            if (isLocked) return null;

            return (
              <div
                key={location.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${location.xPercent}%`,
                  top: `${location.yPercent}%`,
                }}
              >
                <div
                  className={
                    isActive
                      ? "flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-xl font-bold text-white ring-4 ring-pink-200"
                      : "flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white"
                  }
                  title={location.title}
                >
                  {isDone ? "✓" : location.stepNumber}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => router.push("/scan")}
          className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
        >
          Skanna QR-kóða
        </button>
      </section>
    </main>
  );
}