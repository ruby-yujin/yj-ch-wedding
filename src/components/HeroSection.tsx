import { heroImgSrc } from "../data/ImgSrc";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full mx-auto px-10 py-14">
        <img
          src={heroImgSrc[0].src}
          alt="Wedding couple"
          className="w-full h-auto object-contain"
        />
        <div className="absolute bottom-32 left-0 right-0 text-center px-8">
          <h1
            className="text-3xl mb-4 text-tertiary"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Wedding Day
          </h1>
          <p className="text-muted-foreground">2026. 10. 11. SUN 3:30 PM</p>
        </div>
      </div>
    </section>
  );
}
