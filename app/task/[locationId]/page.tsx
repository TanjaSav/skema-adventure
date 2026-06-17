"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function TaskPage() {
  const router = useRouter();

  // Continue to QR scanner or the next step.
  function goToNextStep() {
    localStorage.setItem("team_current_step", "2");
    router.push("/scan");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header
        showStep={false}
        showAge={true}
        showMap={false}
        showTeam={true}
      />

      <section className="mx-auto grid min-h-[calc(100vh-56px)] w-full max-w-[1040px] grid-cols-1 items-start px-4 py-8 md:h-[calc(100vh-56px)] md:grid-cols-[420px_1px_420px] md:gap-10 md:px-6 md:pt-[72px] lg:gap-12">
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[360px] flex-col items-center">
            <div className="mb-6 flex items-center gap-2 text-[#123F35]">
              <Image
                src="/img/map.svg"
                alt=""
                width={28}
                height={28}
                className="h-6 w-6"
              />

              <h1 className="text-[18px] font-bold leading-tight">
                ÆVINTÝRIKORT
              </h1>
            </div>

            <div className="relative h-[370px] w-[330px] overflow-visible">
              <Image
                src="/img/forest-map (1).svg"
                alt="Ævintýrikort"
                width={330}
                height={370}
                priority
                className="block h-[370px] w-[330px] object-contain"
              />

              <Image
                src="/img/location1.svg"
                alt="Location 1"
                width={28}
                height={28}
                priority
                className="absolute left-[22%] top-[75%] h-[24px] w-[24px]"
              />
            </div>
          </div>
        </div>

        <div className="hidden h-[520px] w-px bg-[#d6b98c] md:block" />

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[360px] flex-col items-start">
            <div className="flex items-center gap-2 text-[#123F35]">
              <Image
                src="/img/number1.svg"
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
              />

              <h1 className="text-[18px] font-bold leading-none">
                FORRITAÐAR LEIÐBEININGAR
              </h1>
            </div>

            <p className="mt-4 max-w-[310px] text-[14px] font-medium leading-tight text-black md:text-[15px]">
              Fylgdu leiðbeiningunum skref fyrir
              <br />
              skref eins og forriti
            </p>

            <div className="mt-4 rounded-md border border-[#123F35] bg-white p-3">
              <Image
                src="/img/code.svg"
                alt="Forritaðar leiðbeiningar"
                width={330}
                height={240}
                priority
                className="h-auto w-[300px] object-contain md:w-[330px]"
                style={{ height: "auto" }}
              />
            </div>

            <button
              type="button"
              onClick={goToNextStep}
              className="mt-5 flex cursor-pointer items-center justify-center gap-[6px] self-center rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px]"
            >
              <span>NÆSTA SKREF</span>

              <Image
                src="/img/arrow-right.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}