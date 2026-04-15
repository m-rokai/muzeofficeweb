import Image from "next/image";

const logos = [
  { name: "Tesla", src: "/images/logos/tesla.svg" },
  { name: "Pepsi", src: "/images/logos/pepsi.svg" },
  { name: "Altria", src: "/images/logos/altria.svg" },
  { name: "Pfizer", src: "/images/logos/pfizer.svg" },
  { name: "CCR", src: "/images/logos/ccr.svg" },
  { name: "Texas Rangers", src: "/images/logos/texas-rangers.svg" },
  { name: "Clearway Energy", src: "/images/logos/clearway-energy.png" },
  { name: "KPMG", src: "/images/logos/kpmg.svg" },
  { name: "Frito-Lay", src: "/images/logos/fritolay.svg" },
  { name: "Snack Riot", src: "/images/logos/snackriot.jpg" },
  { name: "Rate", src: "/images/logos/rate.svg" },
  { name: "KaiserAir", src: "/images/logos/kaiserair.png" },
  { name: "Tiff's Treats", src: "/images/logos/tiffstreats.png" },
];

const doubled = [...logos, ...logos];

export function LogoCarousel() {
  return (
    <section className="w-full border-y border-[#E6E4DF] bg-[#FAFAF7] py-10 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-[#74726D] uppercase">
          Teams from companies like these have worked at Muze Office
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[#FAFAF7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[#FAFAF7] to-transparent" />
        {/* Scrolling track */}
        <div className="animate-scroll-left flex w-max items-center gap-10 sm:gap-16 px-8">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="shrink-0 flex h-12 w-[140px] items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={48}
                className="max-h-12 max-w-[140px] w-auto h-auto object-contain"
                unoptimized={logo.src.endsWith(".svg")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
