"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import type { QrScanner } from "@/types/types";

export default function LocationEightMapPage() {
  const router = useRouter();

  const scannerRef = useRef<QrScanner | null>(null);
  const isNavigatingRef = useRef(false);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Start camera scanner when the modal opens.
  useEffect(() => {
    if (!isScannerOpen) return;

    let isMounted = true;

    async function startScanner() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");

        if (!isMounted) return;

        const scanner = new Html5Qrcode("qr-reader-location-8") as QrScanner;
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 240,
              height: 240,
            },
            aspectRatio: 1,
          },
          (decodedText) => {
            void handleQrCode(decodedText);
          },
          () => {
            // Ignore scan errors while searching for a QR code.
          }
        );
      } catch {
        if (!isMounted) return;

        setErrorMessage(
          "Ekki tókst að opna myndavélina. Leyfðu aðgang að myndavél og reyndu aftur."
        );
      }
    }

    async function handleQrCode(decodedText: string) {
      if (isNavigatingRef.current) return;

      isNavigatingRef.current = true;

      const scanner = scannerRef.current;

      try {
        if (scanner?.isScanning) {
          await scanner.stop();
        }

        scanner?.clear();
      } catch {
        // Continue navigation even if stopping camera fails.
      }

      openQrLink(decodedText);
    }

    function openQrLink(decodedText: string) {
      try {
        if (decodedText.startsWith("/")) {
          router.push(decodedText);
          return;
        }

        const url = new URL(decodedText);

        const isAllowedHost =
          url.hostname === window.location.hostname ||
          url.hostname === "skema-adventure.vercel.app";

        if (isAllowedHost && url.pathname.startsWith("/task/")) {
          router.push(url.pathname + url.search);
          return;
        }

        setErrorMessage("Þessi QR-kóði tilheyrir ekki leiknum.");
        isNavigatingRef.current = false;
      } catch {
        setErrorMessage("QR-kóðinn er ekki gildur.");
        isNavigatingRef.current = false;
      }
    }

    void startScanner();

    return () => {
      isMounted = false;

      const scanner = scannerRef.current;

      if (!scanner) return;

      if (scanner.isScanning) {
        void scanner
          .stop()
          .then(() => {
            scanner.clear();
          })
          .catch(() => undefined);
      } else {
        scanner.clear();
      }
    };
  }, [isScannerOpen, router]);

  async function closeScanner() {
    const scanner = scannerRef.current;

    try {
      if (scanner?.isScanning) {
        await scanner.stop();
      }

      scanner?.clear();
    } catch {
      // Ignore cleanup errors.
    }

    scannerRef.current = null;
    isNavigatingRef.current = false;
    setErrorMessage("");
    setIsScannerOpen(false);
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

              <h1 className="text-[18px] font-bold leading-none">
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

              <Image
                src="/img/location8.svg"
                alt="Location 8"
                width={32}
                height={32}
                priority
                className="absolute left-[17%] top-[31%] h-8 w-8"
              />
            </div>
          </div>
        </div>

        <div className="hidden h-[calc(76vh-43px)] w-px self-center bg-[#d6b98c] md:block" />

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[360px] flex-col items-start">
            <div className="flex items-center gap-2 text-[#123F35]">
              <h1 className="text-[18px] font-bold leading-none">
                STAÐSETNING 8
              </h1>
            </div>

            <p className="mt-12 max-w-[320px] font-medium">
              Farðu að staðsetningunni{" "}
              <Image
                src="/img/location8.svg"
                alt="Staðsetning 8"
                width={24}
                height={24}
                className="inline-block h-8 w-8 align-middle"
              />
                <br/>sem þú sérð á kortinu.
              
            </p>

            <p className="mt-5 font-medium">Þar finnur þú QR-kóða. Skannaðu hann, 
              <br/> þá opnast næsta verkefni
            </p>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem("team_current_step", "8");
                setErrorMessage("");
                setIsScannerOpen(true);
              }}
              className="mt-12 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px] lg:mt-12"
            >
              <span>SKANNA QR-KÓÐA</span>

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

      {isScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[380px] rounded-2xl bg-[#FEFAEE] p-5 text-center shadow-xl">
            <h2 className="text-[20px] font-bold text-[#123F35]">
              SKANNA QR-KÓÐA
            </h2>

            <p className="mt-3 text-[13px] font-medium leading-tight text-black">
              Beindu myndavélinni að QR-kóðanum á staðsetningunni.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border-2 border-[#123F35] bg-white p-2">
              <div id="qr-reader-location-8" className="h-[300px] w-full" />
            </div>

            {errorMessage && (
              <p className="mt-4 text-[13px] font-semibold text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void closeScanner()}
              className="mt-5 cursor-pointer rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35]"
            >
              LOKA
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
