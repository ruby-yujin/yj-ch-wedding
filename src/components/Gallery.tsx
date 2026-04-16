import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { galleryImgSrc } from "../data/ImgSrc";

export function GallerySection() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full max-w-md mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="text-tertiary">Gallery</h2>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={false}
          onSwiper={setSwiper}
          onSlideChange={(currentSwiper) =>
            setActiveIndex(currentSwiper.activeIndex)
          }
          className="rounded-lg overflow-hidden gallery-swiper"
        >
          {galleryImgSrc.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-3/4 w-full flex items-center justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {galleryImgSrc.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => swiper?.slideTo(index)}
            className={`aspect-square overflow-hidden rounded-md border transition ${
              activeIndex === index
                ? "border-primary opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`${index + 1}번째 사진 보기`}
          >
            <img
              src={img.src}
              alt={img.alt || `gallery-${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
