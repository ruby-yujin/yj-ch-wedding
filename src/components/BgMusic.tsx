import { useEffect, useRef, useState } from "react";
import { useSound } from "../store/sound";

type BgMusicProps = {
  isLoading?: boolean;
};

export function BgMusic({ isLoading = false }: BgMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const { isMusicOn, toggleMusic } = useSound();
  const [showPlayToast, setShowPlayToast] = useState(true);
  const prevIsLoadingRef = useRef(isLoading);

  // Dim이 끝나는 순간(isLoading: true → false) 3초 타이머 시작
  useEffect(() => {
    if (prevIsLoadingRef.current && !isLoading) {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = window.setTimeout(() => {
        setShowPlayToast(false);
        toastTimeoutRef.current = null;
      }, 3000);
    }
    prevIsLoadingRef.current = isLoading;
  });

  const handleToggleMusic = () => {
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }

    if (!isMusicOn) {
      setShowPlayToast(true);
      toastTimeoutRef.current = window.setTimeout(() => {
        setShowPlayToast(false);
        toastTimeoutRef.current = null;
      }, 3000);
    } else {
      setShowPlayToast(false);
    }

    toggleMusic();
  };

  useEffect(() => {
    const audio = new Audio("/bg.mp3");
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.5;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      void audio.play().catch(() => {
        // Autoplay is blocked until user interaction.
      });
    };

    if (isMusicOn) {
      tryPlay();

      const unlockAndPlay = () => {
        tryPlay();
        window.removeEventListener("click", unlockAndPlay);
        window.removeEventListener("touchstart", unlockAndPlay);
        window.removeEventListener("touchmove", unlockAndPlay);
        window.removeEventListener("wheel", unlockAndPlay);
        window.removeEventListener("keydown", unlockAndPlay);
      };

      window.addEventListener("click", unlockAndPlay);
      window.addEventListener("touchstart", unlockAndPlay, { passive: true });
      window.addEventListener("touchmove", unlockAndPlay, { passive: true });
      window.addEventListener("wheel", unlockAndPlay, { passive: true });
      window.addEventListener("keydown", unlockAndPlay);

      return () => {
        window.removeEventListener("click", unlockAndPlay);
        window.removeEventListener("touchstart", unlockAndPlay);
        window.removeEventListener("touchmove", unlockAndPlay);
        window.removeEventListener("wheel", unlockAndPlay);
        window.removeEventListener("keydown", unlockAndPlay);
      };
    } else {
      audio.pause();
    }
  }, [isMusicOn]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {showPlayToast && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm">
          음악이 재생됩니다
        </div>
      )}
      <button
        type="button"
        onClick={handleToggleMusic}
        className="fixed top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-tertiary text-primary-foreground shadow-md"
        aria-label={isMusicOn ? "배경음악 정지" : "배경음악 재생"}
      >
        {isMusicOn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.78-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14z" />
          </svg>
        )}
      </button>
    </>
  );
}
