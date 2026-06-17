"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskPage() {
  const router = useRouter();
  const params = useParams<{ locationId: string }>();

  const [answer, setAnswer] = useState("");

  // Complete current location and unlock the next one.
  function goToNextStep() {
    const currentStep = Number(localStorage.getItem("team_current_step") ?? "1");

    localStorage.setItem("team_current_step", String(currentStep + 1));
    localStorage.setItem(`answer_${params.locationId}`, answer);

    router.push("/map");
  }

  return (
    <main className="min-h-screen bg-[#fff8e8] p-6">
      <h1 className="text-3xl font-bold text-green-900">Verkefni</h1>

      <p className="mt-4 text-green-900">Staðsetning: {params.locationId}</p>

      <p className="mt-8 max-w-xl text-lg">
        Finnið hlut í náttúrunni og skrifið nafnið hans.
      </p>

      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        className="mt-6 w-full max-w-xl rounded-xl border border-green-700 p-4"
        placeholder="Svar liðsins"
      />

      <button
        onClick={goToNextStep}
        className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
      >
        Næsta skref
      </button>
    </main>
  );
}