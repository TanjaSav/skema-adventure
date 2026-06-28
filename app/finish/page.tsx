"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DecorativeClouds } from "@/components/decorative-clouds";
import { Header } from "@/components/header";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";

type SavedTaskPhoto = {
  id: string;
  photoUrl: string;
  taskStep: number;
  taskTitle: string;
};

const MIN_RESULT_CARDS = 6;

export default function FinishPage() {
  const router = useRouter();

  const teamName = useLocalStorageValue("team_name", "");
  const ageCategoryId = useLocalStorageValue("age_category_id", "");

  const [photos, setPhotos] = useState<SavedTaskPhoto[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [isDeletingResults, setIsDeletingResults] = useState(false);
  const [photoError, setPhotoError] = useState("");

  const canLoadPhotos = Boolean(teamName && ageCategoryId);

  useEffect(() => {
    if (!canLoadPhotos) {
      return;
    }

    const controller = new AbortController();

    async function loadPhotos() {
      setIsLoadingPhotos(true);
      setPhotoError("");

      try {
        const params = new URLSearchParams({
          ageCategoryId,
          teamName,
        });

        const response = await fetch(`/api/task-results?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load photos.");
        }

        const data = (await response.json()) as { photos?: SavedTaskPhoto[] };

        setPhotos(data.photos ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(error);
        setPhotoError("Ekki tókst að sækja myndirnar.");
      } finally {
        setIsLoadingPhotos(false);
      }
    }

    void loadPhotos();

    return () => {
      controller.abort();
    };
  }, [ageCategoryId, canLoadPhotos, teamName]);

  // Clear temporary game data and return to the home page.
  async function deleteAllAndRestart() {
    setIsDeletingResults(true);
    setPhotoError("");

    try {
      if (teamName && ageCategoryId) {
        const params = new URLSearchParams({
          ageCategoryId,
          teamName,
        });
        const response = await fetch(`/api/task-results?${params.toString()}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete results.");
        }
      }
    } catch (error) {
      console.error(error);
      setPhotoError("Ekki tókst að eyða niðurstöðunum.");
      setIsDeletingResults(false);
      return;
    }

    localStorage.removeItem("team_name");
    localStorage.removeItem("team_name_age_category_id");
    localStorage.removeItem("team_current_step");
    localStorage.removeItem("age_category_id");
    localStorage.removeItem("selected_step_label");
    localStorage.removeItem("selected_step_value");

    localStorage.removeItem("answer_location-1");
    localStorage.removeItem("answer_location-2");
    localStorage.removeItem("answer_location-3");
    localStorage.removeItem("answer_location-4");
    localStorage.removeItem("answer_location-5");
    localStorage.removeItem("answer_location-6");
    localStorage.removeItem("answer_location-7");
    localStorage.removeItem("answer_location-8");
    localStorage.removeItem("answer_location-9");

    setPhotos([]);

    router.push("/");
  }

  const resultCards = Array.from(
    {
      length: Math.max(MIN_RESULT_CARDS, photos.length),
    },
    (_, index) => photos[index] ?? null
  );

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
      <Header
        showStep={false}
        showAge={true}
        showMap={false}
        showTeam={true}
      />

      <DecorativeClouds />

      <section className="relative z-10 mx-auto grid min-h-[calc(100dvh-56px)] w-full max-w-[1040px] grid-cols-1 items-start px-4 py-8 md:grid-cols-[1fr_1px_1fr] md:gap-10 md:px-6 md:pt-[72px] lg:gap-12">
        <div className="flex w-full justify-center">
          <div className="flex h-[460px] w-full max-w-[360px] flex-col items-center">
            <div className="w-[300px] text-center">
              <h1 className="text-[18px] font-bold leading-tight text-[#123F35]">
                FRÁBÆRT!
              </h1>

              <p className="mt-1 text-[16px] font-medium uppercase leading-tight text-[#123F35]">
                {teamName || "LIÐSNAFN"}
              </p>
            </div>

            <div className="mt-9">
              <Image
                src="/img/result.jpg"
                alt="Leik lokið"
                width={300}
                height={230}
                priority
                className="h-auto w-[300px] rounded-lg border border-[#123F35] object-contain"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="hidden h-[calc(76vh-43px)] w-px self-start bg-[#d6b98c] md:block" />

        <div className="flex w-full justify-center">
          <div className="flex min-h-[640px] w-full max-w-[360px] flex-col items-center">
            <h2 className="text-center text-[18px] font-bold leading-tight text-[#123F35]">
              ÚRSLIT
            </h2>

            {isLoadingPhotos && (
              <p className="mt-6 text-center text-[13px] font-medium text-[#123F35]">
                Sæki myndir...
              </p>
            )}

            {photoError && (
              <p className="mt-6 text-center text-[13px] font-medium text-red-700">
                {photoError}
              </p>
            )}

            {!isLoadingPhotos && !photoError && (
              <>
                <div className="mt-6 grid w-[360px] grid-cols-2 justify-between gap-y-5">
                  {resultCards.map((photo, index) => (
                    <div
                      key={photo?.id ?? `empty-result-${index}`}
                      className="relative h-[116px] w-[168px] overflow-hidden rounded-lg bg-white"
                    >
                      {photo && (
                        <>
                          <Image
                            src={photo.photoUrl}
                            alt={photo.taskTitle}
                            fill
                            sizes="168px"
                            className="object-cover"
                            unoptimized
                          />

                          <div className="absolute left-1 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#81CA7D] text-[10px] font-bold text-[#123F35]">
                            {photo.taskStep}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={deleteAllAndRestart}
                  disabled={isDeletingResults}
                  className="mt-6 flex cursor-pointer items-center justify-center rounded-md border border-[#123F35] bg-[#81CA7D] px-5 py-2 text-[12px] font-bold text-[#123F35] disabled:cursor-not-allowed disabled:opacity-60 md:text-[13px]"
                >
                  {isDeletingResults ? "EYÐI..." : "EYÐA ÖLLU OG SPILA AFTUR"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
