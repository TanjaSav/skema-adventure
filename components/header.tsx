"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type HeaderProps = {
  stepLabel?: string;
  teamName?: string;
  showStep?: boolean;
  showTeam?: boolean;
  onTeamNameChange?: (name: string) => void;
};

const stepOptions = [
  {
    label: "Stig 1",
    value: 1,
    icon: "/img/level1.svg",
  },
  {
    label: "Stig 2",
    value: 2,
    icon: "/img/level2.svg",
  },
  {
    label: "Stig 3",
    value: 3,
    icon: "/img/level3.svg",
  },
];

// Read localStorage safely without hydration mismatch.
function useLocalStorageValue(key: string, fallbackValue: string) {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener(`local-storage:${key}`, callback);

      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(`local-storage:${key}`, callback);
      };
    },
    () => localStorage.getItem(key) || fallbackValue,
    () => fallbackValue
  );
}

// Save localStorage value and notify this browser tab.
function setLocalStorageValue(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(`local-storage:${key}`));
}

export function Header({
  stepLabel = "Stig",
  teamName = "Liðsnafn",
  showStep = true,
  showTeam = true,
  onTeamNameChange,
}: HeaderProps) {
  const [isStepMenuOpen, setIsStepMenuOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const stepMenuRef = useRef<HTMLDivElement>(null);

  const currentStepLabel = useLocalStorageValue(
    "selected_step_label",
    stepLabel
  );

  const currentTeamName = useLocalStorageValue("team_name", teamName);

  // Get icon for the currently selected step.
  function getCurrentStepIcon() {
    const selectedStep = stepOptions.find(
      (option) => option.label === currentStepLabel
    );

    return selectedStep?.icon ?? "/img/age-level.svg";
  }

  // Close the step dropdown when the user clicks outside of it.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        stepMenuRef.current &&
        !stepMenuRef.current.contains(event.target as Node)
      ) {
        setIsStepMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Save selected step label locally.
  function selectStep(label: string, value: number) {
    setLocalStorageValue("selected_step_label", label);
    setLocalStorageValue("selected_step_value", String(value));

    setIsStepMenuOpen(false);
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
        <div className="mx-auto flex min-h-14 w-full max-w-[1200px] items-center justify-between gap-3 px-4 md:px-10 lg:px-16">
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

          <nav className="flex items-center gap-3 text-sm font-medium md:gap-7 md:text-xl lg:gap-9">
            {showStep && (
              <div ref={stepMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsStepMenuOpen((isOpen) => !isOpen)}
                  className="flex cursor-pointer items-center gap-1.5 md:gap-2"
                >
                  <Image
                    src={getCurrentStepIcon()}
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5 md:h-6 md:w-6"
                  />

                  <span>{currentStepLabel}</span>
                </button>

                {isStepMenuOpen && (
                  <div className="absolute -left-3 top-[38px] z-40 w-[128px] cursor-pointer rounded-b-xl bg-[#D7F5D6] px-3 py-2 md:-left-4 md:top-[42px] md:w-[136px] md:px-4">
                    <div className="flex flex-col gap-3">
                      {stepOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            selectStep(option.label, option.value)
                          }
                          className="flex cursor-pointer items-center gap-2 text-left text-sm font-medium text-[#123F35] md:text-xl"
                        >
                          <Image
                            src={option.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="h-5 w-5 md:h-6 md:w-6"
                          />

                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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
                onClick={() => {
                  setInputValue(
                    currentTeamName === "Liðsnafn" ? "" : currentTeamName
                  );
                  setIsTeamModalOpen(true);
                }}
                className="flex cursor-pointer items-center gap-1.5 md:gap-2"
              >
                <Image
                  src="/img/group-avatar.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="h-5 w-5 md:h-7 md:w-7"
                />

                <span className="hidden sm:inline">{currentTeamName}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#fff8e8] p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-900">Nafn liðs</h2>

            <p className="mt-2 text-sm text-green-900">
              Sláðu inn nafn liðsins
            </p>

            <form onSubmit={saveTeamName} className="mt-6">
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Til dæmis: Refirnir"
                className="w-full rounded-xl border border-green-700 bg-white p-4 text-green-900 outline-none"
                autoFocus
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="cursor-pointer rounded-xl border border-green-700 px-5 py-3 font-bold text-green-900"
                >
                  Hætta við
                </button>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="cursor-pointer rounded-xl bg-green-500 px-5 py-3 font-bold text-white disabled:opacity-20"
                >
                  Vista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}