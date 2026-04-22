import { useEffect } from "react";
import { SoundProvider } from "./store/sound";
import { KakaoShareButton } from "./components/ShareButton";
import { HeroSection } from "./components/HeroSection";
import { GreetingSection } from "./components/GreetingSection";
import { Profile } from "./components/Profile";
import { CalendarSection } from "./components/Calendar";
import { GallerySection } from "./components/Gallery";
import { BgMusic } from "./components/BgMusic";
import { MapSection } from "./components/MapSection";
import { AccountSection } from "./components/AccountSection";

type KakaoSdk = {
  isInitialized: () => boolean;
  init: (appKey: string) => void;
  Share: {
    sendDefault: (options: Record<string, unknown>) => void;
    sendCustom: (options: {
      templateId: number;
      templateArgs?: Record<string, string>;
    }) => void;
  };
};

function App() {
  const handleShare = () => {
    const kakao = (window as Window & { Kakao?: KakaoSdk }).Kakao;

    if (!kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }

    kakao.Share.sendCustom({
      templateId: 132282,
      templateArgs: {
        title: "이창훈 & 박유진 결혼합니다",
        description: "결혼식에 초대합니다",
        MAP_URL: "https://kko.to/U96dxg0Yl5"
      }
    });
  };

  useEffect(() => {
    // 1. 두 손가락 확대(Pinch Zoom) 방지
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 2. 더블 탭 확대 방지
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 이벤트 리스너 등록 (passive: false여야 preventDefault가 작동함)
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false
    });
    document.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      // 컴포넌트 언마운트 시 클린업
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <SoundProvider>
      <HeroSection />
      <GreetingSection />
      <Profile />
      <CalendarSection />
      <GallerySection />
      <MapSection />
      <div className="w-full max-w-md mx-auto px-8 pt-8">
        <KakaoShareButton onClick={handleShare} />
      </div>
      <AccountSection />
      <BgMusic />
    </SoundProvider>
  );
}

export default App;
