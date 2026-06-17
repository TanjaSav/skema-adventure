"use client";

import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();

  // Simulate QR scanning before adding real camera support.
  function scanLocation(step: number) {
    const currentStep = Number(localStorage.getItem("team_current_step") ?? "1");

    if (step === currentStep) {
      router.push(`/task/location-${step}`);
      return;
    }

    if (step < currentStep) {
      alert("Þessi staðsetning er þegar búin");
      router.push("/map");
      return;
    }

    alert("Farið fyrst á fyrri staðsetningu");
    router.push("/map");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fff8e8] p-6">
      <h1 className="text-center text-3xl font-bold text-green-900">
        Prófunarskanni
      </h1>

      <p className="mt-4 text-center">
        Núna notum við hnappa í stað myndavélar.
      </p>

      <button
        onClick={() => scanLocation(1)}
        className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
      >
        Skanna staðsetningu 1
      </button>

      <button
        onClick={() => scanLocation(2)}
        className="mt-4 rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
      >
        Skanna staðsetningu 2
      </button>
    </main>
  );
}