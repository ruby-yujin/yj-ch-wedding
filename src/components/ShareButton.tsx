type KakaoShareButtonProps = {
  onClick: () => void;
  label?: string;
};

export function KakaoShareButton({
  onClick,
  label = "카카오톡 공유하기"
}: KakaoShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 transition"
    >
      <img src="/kakao-icon.png" alt="카카오 공유" className="w-5 h-5" />
      {label}
    </button>
  );
}
