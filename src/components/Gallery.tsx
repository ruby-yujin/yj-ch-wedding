import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import "swiper/css";
import { galleryImgSrc } from "../data/ImgSrc";

const THUMBNAIL_COLS = 4;
const VISIBLE_THUMBNAIL_ROWS = 2;
const VISIBLE_THUMBNAIL_COUNT = THUMBNAIL_COLS * VISIBLE_THUMBNAIL_ROWS;
const THUMBNAIL_GRID_WIDTH = "min(100vw - 4rem, 24rem)";
const THUMBNAIL_ITEM_SIZE = `calc((${THUMBNAIL_GRID_WIDTH} - 1.5rem) / 4)`;
const THUMBNAIL_COLLAPSED_HEIGHT = `calc(${THUMBNAIL_ITEM_SIZE} * ${VISIBLE_THUMBNAIL_ROWS} + 0.5rem)`;
const THUMBNAIL_EXPANDED_HEIGHT = `calc(${THUMBNAIL_ITEM_SIZE} * ${Math.ceil(galleryImgSrc.length / THUMBNAIL_COLS)} + 0.5rem * ${Math.ceil(galleryImgSrc.length / THUMBNAIL_COLS) - 1})`;

export function GallerySection() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isThumbnailsExpanded, setIsThumbnailsExpanded] = useState(false);
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  const wasExpandedRef = useRef(isThumbnailsExpanded);

  const hasMoreThumbnails = galleryImgSrc.length > VISIBLE_THUMBNAIL_COUNT;

  // 썸네일 "접기"(expanded: true -> false) 동작 시, 갤러리 섹션 상단으로 부드럽게 스크롤.
  useEffect(() => {
    if (wasExpandedRef.current && !isThumbnailsExpanded) {
      gallerySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    wasExpandedRef.current = isThumbnailsExpanded;
  }, [isThumbnailsExpanded]);

  const renderThumbnail = (
    img: (typeof galleryImgSrc)[number],
    index: number
  ) => (
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
        src={img.thumbSrc}
        alt={img.alt || `gallery-${index + 1}`}
        className="w-full h-full object-cover"
        loading={index < VISIBLE_THUMBNAIL_COUNT ? "eager" : "lazy"}
        width={160}
        height={160}
        decoding="async"
        sizes="(max-width: 448px) calc((100vw - 4rem - 1.5rem) / 4), 88px"
      />
    </button>
  );

  return (
    <section
      ref={gallerySectionRef}
      className="w-full max-w-md mx-auto px-8 py-16"
    >
      <div className="text-center mb-12">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="text-tertiary">Gallery</h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-tertiary transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          aria-label="이전 사진"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={false}
          onSwiper={setSwiper}
          onSlideChange={(currentSwiper) =>
            setActiveIndex(currentSwiper.activeIndex)
          }
          className="overflow-hidden gallery-swiper"
        >
          {galleryImgSrc.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-3/4 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt || `갤러리 이미지 ${index + 1}`}
                  className="h-full w-full scale-[1.1] object-contain"
                  width={900}
                  height={1200}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          disabled={activeIndex === galleryImgSrc.length - 1}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-tertiary transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          aria-label="다음 사진"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4">
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{
            maxHeight: isThumbnailsExpanded
              ? THUMBNAIL_EXPANDED_HEIGHT
              : THUMBNAIL_COLLAPSED_HEIGHT
          }}
        >
          <div className="grid grid-cols-4 gap-2">
            {galleryImgSrc.map((img, index) => renderThumbnail(img, index))}
          </div>
        </div>

        {hasMoreThumbnails && (
          <div className="flex justify-center mt-3">
            <button
              type="button"
              onClick={() => setIsThumbnailsExpanded((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary text-primary-foreground"
              aria-expanded={isThumbnailsExpanded}
              aria-label={
                isThumbnailsExpanded ? "썸네일 접기" : "썸네일 더보기"
              }
            >
              {isThumbnailsExpanded ? (
                <Minus className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
