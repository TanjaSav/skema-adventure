import Image from "next/image";

export function DecorativeClouds() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Image
        src="/img/cloud.svg"
        alt=""
        width={160}
        height={88}
        className="cloud-float cloud-float-a absolute left-0 top-[92px] h-auto w-[116px] opacity-50 md:top-[112px] md:w-[150px]"
      />

      <Image
        src="/img/cloud.svg"
        alt=""
        width={140}
        height={77}
        className="cloud-float cloud-float-b absolute left-0 top-[124px] h-auto w-[104px] opacity-40 md:top-[132px] md:w-[132px]"
      />

      <Image
        src="/img/cloud.svg"
        alt=""
        width={120}
        height={66}
        className="cloud-float cloud-float-d absolute left-0 top-[168px] hidden h-auto w-[112px] opacity-35 md:block"
      />

      <Image
        src="/img/tree.svg"
        alt=""
        width={52}
        height={78}
        className="absolute bottom-5 left-6 h-auto w-[32px] opacity-70 md:bottom-8 md:left-[7%] md:top-[87%] md:w-[48px]"
      />

      <Image
        src="/img/tree.svg"
        alt=""
        width={64}
        height={96}
        className="absolute bottom-14 left-[19%] hidden h-auto w-[52px] opacity-58 md:block lg:left-[23%] md:top-[87%] lg:w-[64px]"
      />

      <Image
        src="/img/tree.svg"
        alt=""
        width={58}
        height={87}
        className="absolute bottom-10 right-[29%] hidden h-auto w-[44px] opacity-55 md:block lg:right-[27%] lg:w-[58px] md:top-[89%]"
      />

      <Image
        src="/img/tree.svg"
        alt=""
        width={86}
        height={129}
        className="absolute bottom-3 left-[58%] hidden h-auto w-[74px] -translate-x-1/2 opacity-50 md:block  lg:left-[56%] lg:w-[86px]"
      />

      <Image
        src="/img/tree.svg"
        alt=""
        width={50}
        height={75}
        className="absolute bottom-1 right-10 h-auto w-[46px] opacity-65 md:bottom-7 md:right-[8%] md:w-[50px]"
      />
    </div>
  );
}
