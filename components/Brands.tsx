import { brands } from '@/lib/data';

export default function Brands() {
  return (
    <section className="overflow-hidden bg-mist py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
          Trusted Brands We Stock
        </span>
      </div>

      <div className="relative mt-10 flex">
        <div className="flex w-max animate-marquee gap-16">
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="whitespace-nowrap font-heading text-2xl font-semibold text-ink/40 grayscale transition duration-300 hover:text-gold hover:grayscale-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
