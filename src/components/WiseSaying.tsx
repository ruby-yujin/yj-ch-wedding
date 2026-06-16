import { wiseSayingImgSrc } from "../data/ImgSrc";

export function WiseSaying() {
  return (
    <div className="overflow-hidden">
      <div className="relative">
        <img
          src={wiseSayingImgSrc[0].src}
          alt={wiseSayingImgSrc[0].alt}
          className="block w-full h-full object-cover"
        />
        <div className="h-[280px] absolute inset-x-0 top-[calc(100%-160px)] z-10 flex items-end justify-center">
          {/* 사진 -> 배경(tertiary)로 자연스럽게 이어지도록 패널 전체에 그라디언트 적용 */}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-tertiary/0 via-tertiary to-tertiary"
            aria-hidden
          />
          <p className="relative px-8 pb-12 text-center text-md text-white">
            "우리의 모든 계절을 함께하겠습니다."
          </p>
        </div>
      </div>
      <div className="h-[370px]" aria-hidden />
    </div>
  );
}
