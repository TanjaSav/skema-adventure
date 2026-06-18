"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";

export default function TeamNamePage() {
  const router = useRouter();
  const selectedAgeId = useLocalStorageValue("age_category_id", "9-10");
  const savedTeamNameAge = useLocalStorageValue("team_name_age_category_id", "");
  const savedTeamName = useLocalStorageValue("team_name", "");
  const restoredTeamName =
    savedTeamNameAge === selectedAgeId ? savedTeamName : "";

  // Save team name and continue to the first task.
  function startGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const trimmedTeamName = String(formData.get("teamName") ?? "").trim();

    if (!trimmedTeamName) {
      return;
    }

    localStorage.setItem("team_name", trimmedTeamName);
    localStorage.setItem("team_name_age_category_id", selectedAgeId);
    localStorage.setItem("team_current_step", "1");

    if (selectedAgeId !== "9-10") {
      alert("Verkefni fyrir þennan aldurshóp eru ekki tilbúin enn.");
      return;
    }

    router.push("/task/location-1");
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header showStep={false} showTeam={false} showAge={true} showMap={false} />

      <section className="mx-auto grid min-h-[calc(100dvh-56px)] w-full max-w-[1440px] grid-cols-1 items-center px-4 py-6 md:min-h-[calc(100dvh-56px)] md:grid-cols-[1fr_1px_1fr] md:px-8 md:py-0 lg:px-10 xl:px-16 2xl:px-24">
        <div className="flex w-full items-center justify-center md:h-full">
          <Image
            src="/img/forest.png"
            alt="SKEMA ævintýri"
            width={580}
            height={430}
            priority
            unoptimized
            className="h-auto w-full max-w-[330px] object-contain md:max-h-[calc(100dvh-130px)] md:max-w-[360px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[620px]"
          />
        </div>

        <div className="hidden h-[76%] w-px bg-[#d6b98c] md:block" />

        <div className="flex w-full items-center justify-center md:h-full">
          <div className="flex w-full max-w-[300px] flex-col items-start lg:max-w-[374px]">
            <div className="flex h-[230px] w-full flex-col items-start pt-4 lg:h-[258px] lg:pt-5">
              <h1 className="text-[22px] font-bold leading-tight text-[#123F35] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
                SKEMA ÆVINTÝRI
              </h1>

              <form onSubmit={startGame} className="mt-10 w-full lg:mt-12">
                <label
                  htmlFor="teamName"
                  className="block text-[14px] font-medium leading-tight text-black md:text-[15px] lg:text-[18px] xl:text-[19px]"
                >
                  Sláðu inn nafn liðsins
                </label>

                <input
                  id="teamName"
                  name="teamName"
                  type="text"
                  key={restoredTeamName}
                  defaultValue={restoredTeamName}
                  placeholder="T.d. Refir"
                  className="mt-4 h-[38px] w-[220px] rounded-md border border-[#123F35]/60 bg-[#E8F3EC] px-4 text-[15px] font-medium text-[#123F35] outline-none placeholder:text-[#123F35]/60 md:w-[260px] lg:h-[42px] lg:text-[16px]"
                />

                <button
                  type="submit"
                  className="mt-10 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px] lg:mt-12"
                >
                  <span>BYRJA LEIK</span>

                  <Image
                    src="/img/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </button>
              </form>
            </div>

            <div className="mt-12 flex w-full justify-start lg:mt-16">
              <Image
                src="/img/cube.png"
                alt="SKEMA kubbar"
                width={260}
                height={200}
                priority
                className="h-auto w-[165px] md:w-[190px] lg:w-[220px] xl:w-[250px]"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
