import { kakaoShareImgSrc } from "../data/ImgSrc";

type KakaoShareButtonProps = {
  onClick: () => void;
  label?: string;
};

export function KakaoShareButton({
  onClick,
  label = "카카오톡 공유하기"
}: KakaoShareButtonProps) {
  return (
    <section className="w-full max-w-md mx-auto  pt-6">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-primary text-black transition"
      >
        <img
          src={kakaoShareImgSrc[0].src}
          alt="카카오 공유"
          className="w-5 h-5"
        />
        {label}
      </button>
    </section>
  );
}
