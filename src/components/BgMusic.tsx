import { useEffect, useRef } from "react";
import { useSound } from "../store/sound";

export function BgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isMusicOn, toggleMusic } = useSound();

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
        window.removeEventListener("keydown", unlockAndPlay);
      };

      window.addEventListener("click", unlockAndPlay);
      window.addEventListener("touchstart", unlockAndPlay, { passive: true });
      window.addEventListener("keydown", unlockAndPlay);

      return () => {
        window.removeEventListener("click", unlockAndPlay);
        window.removeEventListener("touchstart", unlockAndPlay);
        window.removeEventListener("keydown", unlockAndPlay);
      };
    } else {
      audio.pause();
    }
  }, [isMusicOn]);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-tertiary text-primary-foreground shadow-md"
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
  );
}
