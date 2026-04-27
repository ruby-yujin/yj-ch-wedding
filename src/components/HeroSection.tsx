import { heroImgSrc } from "../data/ImgSrc";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <h1 className="absolute top-28 left-0 right-0 z-99 text-center px-8 text-tertiary scale-125">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6, scale: 1.45 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, scale: 1.45 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <img
            src={heroImgSrc[0].src}
            alt={heroImgSrc[0].alt}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </h1>

      <div className="relative w-full mx-auto px-10 py-14">
        <img
          src={heroImgSrc[1].src}
          alt="Wedding couple"
          className="w-full h-auto object-contain"
        />
        <div className="">
          <p className="absolute bottom-20 left-0 right-0 text-center px-8 text-muted-foreground">
            2026. 10. 11. SUN 3:30 PM
          </p>
        </div>
      </div>
    </section>
  );
}
