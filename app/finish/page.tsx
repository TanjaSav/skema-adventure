"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";

export default function FinishPage() {
  const router = useRouter();
  const teamName = useLocalStorageValue("team_name", "");

  // Clear temporary game data and start again.
  function restartGame() {
    localStorage.removeItem("team_name");
    localStorage.removeItem("team_name_age_category_id");
    localStorage.removeItem("team_current_step");
    localStorage.removeItem("age_category_id");

    localStorage.removeItem("answer_location-1");
    localStorage.removeItem("answer_location-2");
    localStorage.removeItem("answer_location-3");
    localStorage.removeItem("answer_location-4");
    localStorage.removeItem("answer_location-5");
    localStorage.removeItem("answer_location-6");
    localStorage.removeItem("answer_location-7");
    localStorage.removeItem("answer_location-8");
    localStorage.removeItem("answer_location-9");

    router.push("/");
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header
        showStep={false}
        showAge={true}
        showMap={false}
        showTeam={true}
      />

      <section className="flex min-h-[calc(100dvh-56px)] w-full flex-col items-center justify-center px-4 py-8 text-center">
        <h1 className="text-[20px] font-bold leading-none text-[#123F35] md:text-[22px]">
          FRÁBÆRT!
        </h1>

        {teamName && (
          <p className="mt-4 text-[14px] font-medium text-[#123F35] md:text-[15px]">
            Vel gert, {teamName}!
          </p>
        )}

        <div className="mt-8">
          <Image
            src="/img/result.jpg"
            alt="Leik lokið"
            width={260}
            height={260}
            priority
            className="h-auto w-[250px] object-contain md:w-[270px]"
            style={{ height: "auto" }}
          />
        </div>

        <button
          type="button"
          onClick={restartGame}
          className="mt-8 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-5 py-2 text-[12px] font-bold text-[#123F35] md:text-[13px]"
        >
          <span>SPILA AFTUR</span>

          <Image
            src="/img/arrow-right.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
        </button>
      </section>
    </main>
  );
}
