// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Header } from "@/components/header";

// const ageOptions = [
//   {
//     id: "9-10",
//     label: "9-10 ára",
//     className: "bg-[#D7F5D6]",
//   },
//   {
//     id: "11-12",
//     label: "11-12 ára",
//     className: "bg-[#D9EAFB]",
//   },
//   {
//     id: "13-15",
//     label: "13-15 ára",
//     className: "bg-[#E8D7FF]",
//   },
// ];

// export default function TeamPage() {
//   const router = useRouter();
//   const [selectedAge, setSelectedAge] = useState("9-10");

//   // Save selected age category and continue to the map.
//   function continueGame() {
//     localStorage.setItem("age_category_id", selectedAge);
//     localStorage.setItem("team_current_step", "1");

//     if (!localStorage.getItem("team_name")) {
//       localStorage.setItem("team_name", "Liðsnafn");
//     }

//     router.push("/map");
//   }

//   return (
//     <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#FEFAEE] to-[#F8E5BD]">
//       <Header showStep={false} showTeam={false} />

//       <section className="mx-auto grid min-h-[calc(100vh-56px)] w-full max-w-[1440px] grid-cols-1 items-center px-4 py-6 md:h-[calc(100vh-56px)] md:grid-cols-[1fr_1px_1fr] md:px-8 md:py-0 lg:px-10 xl:px-16 2xl:px-24">
//         <div className="flex w-full items-center justify-center md:h-full">
//           <Image
//             src="/img/forest.png"
//             alt="SKEMA ævintýri"
//             width={580}
//             height={430}
//             priority
//             unoptimized
//             className="h-auto w-full max-w-[330px] object-contain md:max-h-[calc(100vh-130px)] md:max-w-[360px] lg:max-w-[500px] xl:max-w-[580px] 2xl:max-w-[620px]"
//           />
//         </div>

//         <div className="hidden h-[76%] w-px bg-[#d6b98c] md:block" />

//         <div className="flex w-full items-center justify-center md:h-full">
//           <div className="flex w-full max-w-[300px] flex-col items-start lg:max-w-[374px]">
//             <h1 className="text-[22px] font-bold leading-tight text-[#123F35] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
//               SKEMA ÆVINTÝRI
//             </h1>

//             <div className="mt-10">
//               <p className="text-[14px] font-medium leading-tight text-black md:text-[15px] lg:text-[18px] xl:text-[19px]">
//                 Veldu aldurshóp
//               </p>

//               <div className="mt-5 flex flex-wrap gap-3">
//                 {ageOptions.map((age) => {
//                   const isSelected = selectedAge === age.id;

//                   return (
//                     <button
//                       key={age.id}
//                       type="button"
//                       onClick={() => setSelectedAge(age.id)}
//                       className={`cursor-pointer rounded-md border px-3 py-1 text-[11px] font-medium text-[#123F35] transition ${
//                         age.className
//                       } ${
//                         isSelected
//                           ? "border-[#123F35] ring-2 ring-[#123F35]/20"
//                           : "border-[#123F35]/50"
//                       }`}
//                     >
//                       {age.label}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={continueGame}
//               className="mt-16 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:text-[13px]"
//             >
//               <span>HALDA ÁFRAM</span>

//               <Image
//                 src="/img/arrow-right.svg"
//                 alt=""
//                 width={16}
//                 height={16}
//                 className="h-4 w-4"
//               />
//             </button>

//             <Image
//               src="/img/cube.png"
//               alt="SKEMA kubbar"
//               width={210}
//               height={160}
//               priority
//               className="mt-10 h-auto w-[135px] self-center lg:w-[190px] xl:w-[210px]"
//               style={{ height: "auto" }}
//             />
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

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

export default function TeamPage() {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState("9-10");

  // Save selected age category and continue to the map.
  function continueGame() {
    localStorage.setItem("age_category_id", selectedAge);
    localStorage.setItem("team_current_step", "1");

    if (!localStorage.getItem("team_name")) {
      localStorage.setItem("team_name", "Liðsnafn");
    }

    router.push("/map");
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
          <div className="flex w-full max-w-[300px] flex-col items-start lg:max-w-[374px] ">
            <h1 className="min-h-[74px] text-[22px] font-bold leading-tight text-[#123F35] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
              SKEMA ÆVINTÝRI
            </h1>

            <div className="mt-5 min-h-[92px] lg:mt-7">
              <p className="text-[14px] font-medium leading-tight text-black md:text-[15px] lg:text-[18px] xl:text-[19px]">
                Veldu aldurshóp
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {ageOptions.map((age) => {
                  const isSelected = selectedAge === age.id;

                  return (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => setSelectedAge(age.id)}
                      className={`cursor-pointer rounded-md border px-3 py-1 text-[11px] font-medium text-[#123F35] transition ${
                        age.className
                      } ${
                        isSelected
                          ? "border-[#123F35] ring-2 ring-[#123F35]/20"
                          : "border-[#123F35]/50"
                      }`}
                    >
                      {age.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={continueGame}
              className="mt-7 flex cursor-pointer items-center justify-center gap-[6px] rounded-md border border-[#123F35] bg-[#81CA7D] px-4 py-1 text-[12px] font-bold text-[#123F35] md:mt-9 md:text-[13px]"
            >
              <span>HALDA ÁFRAM</span>

              <Image
                src="/img/arrow-right.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>

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