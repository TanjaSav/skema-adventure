"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import type { LocationId, MapLocationData, TaskData } from "@/types";

const tasks: Record<LocationId, TaskData> = {
  "location-1": {
    locationId: "location-1",
    step: 1,
    title: "Forritaðar leiðbeiningar",
    numberIcon: "/img/number1.svg",
    description: (
      <>
        Fylgdu leiðbeiningunum.
        <br />
        Hugsaðu eins og forritari.
      </>
    ),
    taskImage: "/img/code.svg",
    nextRoute: "/map/location-2",
  },

  "location-2": {
    locationId: "location-2",
    step: 2,
    title: "NÁTTÚRULEIT",
    numberIcon: "/img/number2.svg",
    titleIcon: "/img/search.svg",
    description: (
      <>
        Finndu grein, lauf, köngul
        <br />
        og stein og taktu mynd af
        <br />
        hverjum hlut
      </>
    ),
    taskImage: "/img/nature.jpg",
    nextRoute: "/map/location-3",
    hasUploadButton: true,
  },

  "location-3": {
    locationId: "location-3",
    step: 3,
    title: "Náttúra",
    numberIcon: "/img/number3.svg",
    description: (
      <>
        Myndið hring með hópnum og <br /> reynið að hafa eins mörg tré <br />{" "}
        eða náttúruleg kennileiti <br /> inni í hringnum og hægt er
      </>
    ),
    taskImage: "/img/nature4.png",
    nextRoute: "/map/location-4",
    hasUploadButton: true,
  },

  "location-4": {
    locationId: "location-4",
    step: 4,
    title: "NÁTTÚRULEIT",
    numberIcon: "/img/number4.svg",
    titleIcon: "/img/search.svg",
    description: <>Finndu tölur í náttúrunni</>,
    taskImage: "/img/one.png",
    nextRoute: "/map/location-5",
    hasUploadButton: true,
  },

  "location-5": {
    locationId: "location-5",
    step: 5,
    title: "Brúaráskorun",
    numberIcon: "/img/number5.svg",
    titleIcon: "/img/hammer.svg",
    description: (
      <>
        Byggið brú úr greinum sem
        <br />
        þolir Forest Explorer-fígúruna
      </>
    ),
    taskImage: "/img/bridge.jpg",
    nextRoute: "/map/location-6",
    hasUploadButton: true,
    uploadButtonText: (
      <>
        Takið mynd sem
        <br />
        sönnun á árangri
      </>
    ),
  },

  "location-6": {
    locationId: "location-6",
    step: 6,
    title: "Teikning",
    numberIcon: "/img/number6.svg",
    titleIcon: "/img/pencil.svg",
    description: (
      <>
        Teiknaðu landslagið sem þú
        <br />
        sérð í kringum þig
      </>
    ),
    taskImage: "/img/drawing.jpg",
    nextRoute: "/map/location-7",
    hasUploadButton: true,
  },

  "location-7": {
    locationId: "location-7",
    step: 7,
    title: "Flugleikur",
    numberIcon: "/img/number7.svg",
    titleIcon: "/img/plane.svg",
    description: (
      <>
        Gerið pappírsflugvélar og
        <br />
        látið þær fljúga í hring
      </>
    ),
    taskImage: "/img/groupe-plane.png",
    nextRoute: "/map/location-8",
    hasUploadButton: true,
  },

  "location-8": {
    locationId: "location-8",
    step: 8,
    title: "Prikþraut",
    numberIcon: "/img/number8.svg",
    description: (
      <>
        Finndu litla pinna í skóginum.
        <br />
        Raðaðu þeim þannig að dæmið
        <br />
        verði rétt
      </>
    ),
    taskImage: "/img/sticks.jpg",
    nextRoute: "/map/location-9",
    hasUploadButton: true,
  },

  "location-9": {
    locationId: "location-9",
    step: 9,
    title: "HÓPMYND",
    numberIcon: "/img/number9.svg",
    titleIcon: "/img/camera.svg",
    description: (
      <>
        Standið saman og takið mynd
        <br />í A-laga stellingu
      </>
    ),
    taskImage: "/img/group-photo.jpg",
    nextRoute: "/finish",
    hasUploadButton: true,
  },
};

const mapLocations: Record<LocationId, MapLocationData> = {
  "location-1": {
    icon: "/img/location1.svg",
    className: "absolute left-[22%] top-[75%] h-[24px] w-[24px]",
  },
  "location-2": {
    icon: "/img/location2.svg",
    className: "absolute left-[48%] top-[80%] h-[24px] w-[24px]",
  },
  "location-3": {
    icon: "/img/location3.svg",
    className: "absolute left-[60%] top-[68%] h-[26px] w-[26px]",
  },
  "location-4": {
    icon: "/img/location4.svg",
    className: "absolute left-[84%] top-[37%] h-[26px] w-[26px]",
  },
  "location-5": {
    icon: "/img/location5.svg",
    className: "absolute left-[59%] top-[29%] h-[26px] w-[26px]",
  },
  "location-6": {
    icon: "/img/location6.svg",
    className: "absolute left-[44%] top-[52%] h-[26px] w-[26px]",
  },
  "location-7": {
    icon: "/img/location7.svg",
    className: "absolute left-[33%] top-[22%] h-[26px] w-[26px]",
  },
  "location-8": {
    icon: "/img/location8.svg",
    className: "absolute left-[18%] top-[33%] h-[26px] w-[26px]",
  },
  "location-9": {
    icon: "/img/location9.svg",
    className: "absolute left-[21%] top-[56%] h-[26px] w-[26px]",
  },
};

function getLocationId(value: string | undefined): LocationId {
  if (value === "location-9") return "location-9";
  if (value === "location-8") return "location-8";
  if (value === "location-7") return "location-7";
  if (value === "location-6") return "location-6";
  if (value === "location-5") return "location-5";
  if (value === "location-4") return "location-4";
  if (value === "location-3") return "location-3";
  if (value === "location-2") return "location-2";
  return "location-1";
}

export default function TaskPage() {
  const router = useRouter();
  const params = useParams<{ locationId: string }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const locationId = getLocationId(params.locationId);
  const task = tasks[locationId];

  // Continue to the next map screen.
  function goToNextStep() {
    localStorage.setItem("team_current_step", String(task.step + 1));
    router.push(task.nextRoute);
  }

  function openUpload() {
    fileInputRef.current?.click();
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header
        showStep={false}
        showAge={true}
        showMap={false}
        showTeam={true}
      />

      <section className="mx-auto grid min-h-[calc(100dvh-56px)] w-full max-w-[1040px] grid-cols-1 items-start px-4 py-8 md:min-h-[calc(100dvh-56px)] md:grid-cols-[1fr_1px_1fr] md:gap-10 md:px-6 md:pt-[72px] lg:gap-12">
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

              {task.step > 1 && (
                <Link
                  href="/task/location-1"
                  aria-label="Fara aftur í verkefni 1"
                  className="absolute left-[23%] top-[77%]"
                >
                  <Image
                    src="/img/star1.svg"
                    alt="Verkefni 1 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 2 && (
                <Link
                  href="/task/location-2"
                  aria-label="Fara aftur í verkefni 2"
                  className="absolute left-[48%] top-[80%]"
                >
                  <Image
                    src="/img/star2.svg"
                    alt="Verkefni 2 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 3 && (
                <Link
                  href="/task/location-3"
                  aria-label="Fara aftur í verkefni 3"
                  className="absolute left-[60%] top-[68%]"
                >
                  <Image
                    src="/img/star3.svg"
                    alt="Verkefni 3 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 4 && (
                <Link
                  href="/task/location-4"
                  aria-label="Fara aftur í verkefni 4"
                  className="absolute left-[84%] top-[38%]"
                >
                  <Image
                    src="/img/star4.svg"
                    alt="Verkefni 4 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 5 && (
                <Link
                  href="/task/location-5"
                  aria-label="Fara aftur í verkefni 5"
                  className="absolute left-[59%] top-[30%]"
                >
                  <Image
                    src="/img/star5.svg"
                    alt="Verkefni 5 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 6 && (
                <Link
                  href="/task/location-6"
                  aria-label="Fara aftur í verkefni 6"
                  className="absolute left-[44%] top-[52%]"
                >
                  <Image
                    src="/img/star6.svg"
                    alt="Verkefni 6 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 7 && (
                <Link
                  href="/task/location-7"
                  aria-label="Fara aftur í verkefni 7"
                  className="absolute left-[33%] top-[22%]"
                >
                  <Image
                    src="/img/star7.svg"
                    alt="Verkefni 7 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              {task.step > 8 && (
                <Link
                  href="/task/location-8"
                  aria-label="Fara aftur í verkefni 8"
                  className="absolute left-[18%] top-[33%]"
                >
                  <Image
                    src="/img/star8.svg"
                    alt="Verkefni 8 lokið"
                    width={28}
                    height={28}
                    priority
                    className="h-[26px] w-[26px]"
                  />
                </Link>
              )}

              <Image
                src={mapLocations[task.locationId].icon}
                alt={`Location ${task.step}`}
                width={28}
                height={28}
                priority
                className={mapLocations[task.locationId].className}
              />
            </div>
          </div>
        </div>

        <div className="hidden h-[calc(76vh-43px)] w-px self-center bg-[#d6b98c] md:block" />

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[360px] flex-col items-center">
            <div className="flex w-[300px] items-center justify-center gap-2 text-[#123F35]">
              <span className="flex h-6 w-6 items-center justify-center">
                <Image
                  src={task.numberIcon}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px]"
                />
              </span>

              <h1 className="text-center text-[18px] font-bold leading-none">
                {task.title}
              </h1>

              {task.titleIcon && (
                <Image
                  src={task.titleIcon}
                  alt=""
                  width={22}
                  height={22}
                  className="ml-1 h-[22px] w-[22px]"
                />
              )}
            </div>

            <p className="mt-8 w-[300px] text-center text-[14px] font-medium leading-tight text-black md:text-[15px]">
              {task.description}
            </p>

            {task.locationId === "location-1" && (
              <div className="mt-9 rounded-md border border-[#123F35] bg-white p-3">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={330}
                  height={240}
                  priority
                  className="h-auto w-[300px] object-contain md:w-[330px]"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-2" && (
              <div className="mt-7 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={300}
                  height={170}
                  priority
                  className="h-[170px] w-[300px] object-cover"
                />
              </div>
            )}

            {task.locationId === "location-3" && (
              <div className="mt-8 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={220}
                  height={170}
                  priority
                  className="h-auto w-[220px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-4" && (
              <div className="mt-9 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={120}
                  height={180}
                  priority
                  className="h-auto w-[120px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-5" && (
              <div className="mt-9 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={220}
                  height={180}
                  priority
                  className="h-auto w-[220px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-6" && (
              <div className="mt-9 overflow-hidden border border-[#123F35] bg-white">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={240}
                  height={180}
                  priority
                  className="h-auto w-[240px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-7" && (
              <div className="mt-9 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={220}
                  height={170}
                  priority
                  className="h-auto w-[220px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-8" && (
              <div className="mt-7 overflow-hidden">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={220}
                  height={130}
                  priority
                  className="h-auto w-[220px] object-contain"
                  style={{ height: "auto" }}
                />
              </div>
            )}

            {task.locationId === "location-9" && (
              <div className="mt-9 overflow-hidden border border-[#123F35] bg-white">
                <Image
                  src={task.taskImage}
                  alt={task.title}
                  width={190}
                  height={190}
                  priority
                  className="h-[190px] w-[190px] object-cover"
                />
              </div>
            )}

            {task.hasUploadButton && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setUploadedFileName(file?.name ?? "");
                  }}
                />

                <button
                  type="button"
                  onClick={openUpload}
                  className="mt-7 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#123F35] bg-[#FEFAEE] px-4 py-2 text-[12px] font-medium leading-tight text-[#123F35]"
                >
                  <Image
                    src="/img/camera.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />

                  <span className="text-center">
                    {task.uploadButtonText ?? (
                      <>
                        Takið mynd og
                        <br />
                        hlaðdu inn
                      </>
                    )}
                  </span>
                </button>

                {uploadedFileName && (
                  <p className="mt-2 text-[11px] font-medium text-[#123F35]">
                    Mynd valin
                  </p>
                )}
              </>
            )}

            <button
              type="button"
              onClick={goToNextStep}
              className="mt-8 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px]"
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
