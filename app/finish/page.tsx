"use client";

import { useRouter } from "next/navigation";

export default function FinishPage() {
  const router = useRouter();

  // Read team name from localStorage for the final message.
  const teamName =
    typeof window !== "undefined"
      ? localStorage.getItem("team_name") ?? ""
      : "";

  // Clear temporary game data and start again.
  function restartGame() {
    localStorage.removeItem("team_name");
    localStorage.removeItem("team_current_step");
    localStorage.removeItem("age_category_id");
    localStorage.removeItem("answer_location-1");
    localStorage.removeItem("answer_location-2");

    router.push("/");
  }

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#fff8e8] p-6 text-center">
      <h1 className="text-4xl font-bold text-green-900">
        Leiðangri lokið!
      </h1>

      <p className="mt-4 text-lg">
        Frábær vinna{teamName ? `, ${teamName}` : ""}!
      </p>

      <button
        onClick={restartGame}
        className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
      >
        Spila aftur
      </button>
    </main>
  );
}
