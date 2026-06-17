"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function HomePage() {
  const router = useRouter();

  // Start the game flow with a temporary age category.
  function startGame() {
    localStorage.setItem("age_category_id", "test-age");
    router.push("/team");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header showStep={false} showTeam={false} />

      <section className="mx-auto grid min-h-[calc(100vh-56px)] w-full max-w-[1440px] grid-cols-1 items-center px-4 py-6 md:h-[calc(100vh-56px)] md:grid-cols-[1fr_1px_1fr] md:px-8 md:py-0 lg:px-10 xl:px-16 2xl:px-24">
        <div className="flex w-full items-center justify-center md:h-full">
          <Image
            src="/img/forest.png"
            alt="SKEMA ævintýri"
            width={580}
            height={430}
            priority
            unoptimized
            className="h-auto w-full max-w-[330px] object-contain md:max-h-[calc(100vh-130px)] md:max-w-[360px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[620px]"
          />
        </div>

        <div className="hidden h-[76%] w-px bg-[#d6b98c] md:block" />

        <div className="flex w-full items-center justify-center md:h-full">
          <div className="flex w-full max-w-[300px] flex-col items-start lg:max-w-[374px]">
            <div className="flex h-[230px] w-full flex-col items-start pt-4 lg:h-[258px] lg:pt-5">
              <h1 className="text-[22px] font-bold leading-tight text-[#123F35] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
                Velkomin í SKEMA
                <br />
                ÆVINTÝRI!
              </h1>

              <p className="mt-8 max-w-[300px] text-[14px] font-medium leading-tight text-black md:text-[15px] lg:mt-10 lg:text-[18px] xl:text-[19px]">
                Lærðu, kannaðu og leystu
                <br />
                skemmtileg verkefni úti í
                <br />
                náttúrunni
              </p>

              <button
                type="button"
                onClick={startGame}
                className="mt-8 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px] lg:mt-10"
              >
                <span>BYRJA</span>

                <Image
                  src="/img/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </button>
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