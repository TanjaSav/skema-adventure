"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  setLocalStorageValue,
  useLocalStorageValue,
} from "@/lib/use-local-storage-value";

type HeaderProps = {
  stepLabel?: string;
  teamName?: string;
  showStep?: boolean;
  showTeam?: boolean;
  showAge?: boolean;
  showMap?: boolean;
  onTeamNameChange?: (name: string) => void;
};

const ageOptions = [
  {
    id: "9-10",
    label: "9-10 ára",
    className: "bg-[#D7F5D6]",
  },
  {
    id: "11-12",
    label: "11-12 ára",
    className: "bg-[#D9EAFB]",
  },
  {
    id: "13-15",
    label: "13-15 ára",
    className: "bg-[#E8D7FF]",
  },
];

export function Header({
  teamName = "Liðsnafn",
  showTeam = true,
  showAge = false,
  showMap = true,
  onTeamNameChange,
}: HeaderProps) {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const currentTeamName = useLocalStorageValue("team_name", teamName);
  const selectedAgeId = useLocalStorageValue("age_category_id", "9-10");

  const selectedAge =
    ageOptions.find((age) => age.id === selectedAgeId) ?? ageOptions[0];

  function openTeamModal() {
    setInputValue(currentTeamName === "Liðsnafn" ? "" : currentTeamName);
    setIsTeamModalOpen(true);
  }

  function closeTeamModal() {
    setInputValue("");
    setIsTeamModalOpen(false);
  }

  // Save the team name to localStorage and update the UI.
  function saveTeamName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = inputValue.trim();

    if (!trimmedName) return;

    setLocalStorageValue("team_name", trimmedName);

    onTeamNameChange?.(trimmedName);
    setIsTeamModalOpen(false);
  }

  return (
    <>
      <header className="min-h-14 w-full rounded-b-lg bg-[#7CC879] text-[#123F35]">
        <div className="mx-auto flex min-h-14 w-full max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8 lg:px-10 xl:px-16 2xl:px-24">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/img/skema-logo.svg"
              alt="SKEMA"
              width={118}
              height={36}
              priority
              className="h-7 w-auto md:h-9"
              style={{ width: "auto" }}
            />
          </Link>

          <nav className="flex items-center gap-3 text-[18px] font-medium md:gap-7 lg:gap-9">
            {showAge && (
              <Link
                href="/team"
                className={`rounded-md border border-[#123F35] px-3 py-1.5 text-[12px] font-medium leading-tight text-[#123F35] ${selectedAge.className}`}
              >
                {selectedAge.label}
              </Link>
            )}

            {showMap && (
              <Link
                href="/map"
                className="flex cursor-pointer items-center gap-1.5 md:gap-2"
              >
                <Image
                  src="/img/map.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-5 w-5 md:h-7 md:w-7"
                />

                <span>Kort</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsRulesModalOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 md:gap-2"
            >
              <Image
                src="/img/rules.svg"
                alt=""
                width={22}
                height={22}
                className="h-5 w-5 md:h-6 md:w-6"
              />

              <span>Reglur</span>
            </button>

            {showTeam && (
              <button
                type="button"
                onClick={openTeamModal}
                className="flex cursor-pointer items-center gap-1.5 md:gap-2"
              >
                <Image
                  src="/img/group-avatar.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-5 w-5 md:h-7 md:w-7"
                />

                <span className="hidden max-w-[160px] truncate sm:inline">
                  {currentTeamName}
                </span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="origin-center scale-[0.82] min-[420px]:scale-100">
            <div
              className="relative flex h-[336px] w-[378px] flex-col items-center bg-center bg-no-repeat px-[18px] pb-[18px] pt-[19px] text-[#111111]"
              style={{
                backgroundImage: "url('/img/rules-card.svg')",
                backgroundSize: "378px 336px",
              }}
            >
              <h2 className="text-center text-[28px] font-medium leading-[34px]">
                Reglur:
              </h2>

              <div className="mt-[18px] w-full space-y-[8px] text-left text-[16px] leading-[20px]">
                <p>✣ Verið aðeins á stígum Öskjuhlíðar.</p>

                <p>✣ FARIÐ EKKI til Hörpu eða af hæðinni.</p>

                <p>✣ Allir skammtar eru faldir meðfram skógarleiðum.</p>

                <p>✣ Spyrðu fullorðinn um hjálp ef þú þarft.</p>
              </div>

              <button
                type="button"
                onClick={() => setIsRulesModalOpen(false)}
                className="mt-[12px] h-[42px] w-[143px] cursor-pointer rounded-lg border-2 border-[#123F35] bg-[#81CA7D] text-[18px] font-semibold text-[#123F35]"
              >
                Ég skil
              </button>
            </div>
          </div>
        </div>
      )}

      {isTeamModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeTeamModal}
        >
          <div
            className="w-full max-w-[360px] rounded-2xl border border-[#123F35] bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD] p-5 text-[#123F35] shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/img/group-avatar.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />

                <h2
                  id="team-modal-title"
                  className="text-center text-[18px] font-bold leading-none text-[#123F35]"
                >
                  NAFN LIÐS
                </h2>
              </div>

              <button
                type="button"
                onClick={closeTeamModal}
                aria-label="Loka"
                className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#123F35] bg-[#FEFAEE] text-[18px] font-bold leading-none text-[#123F35]"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveTeamName} className="mt-6">
              <label
                htmlFor="teamNameInput"
                className="block text-center text-[14px] font-medium leading-tight text-black md:text-[15px]"
              >
                Sláðu inn nafn liðsins
              </label>

              <input
                id="teamNameInput"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="T.d. Refir"
                className="mt-4 h-[36px] w-full rounded-md border border-[#123F35] bg-[#E8F3EC] pl-2 pr-3 text-left text-[14px] font-medium text-[#123F35] outline-none placeholder:text-[#123F35]/60"
                autoFocus
              />

              <div className="mt-6 flex items-center justify-center">
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-[#123F35] bg-[#81CA7D] px-5 py-2 text-[12px] font-bold text-[#123F35] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  VISTA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
