import { KakaoShareButton } from "./components/ShareButton";
import { HeroSection } from "./components/HeroSection";
import { GreetingSection } from "./components/GreetingSection";
import { Profile } from "./components/Profile";
import { CalendarSection } from "./components/Calendar";
import { GallerySection } from "./components/Gallery";

type KakaoSdk = {
  Share: {
    sendDefault: (options: Record<string, unknown>) => void;
  };
};

function App() {
  const handleShare = () => {
    const kakao = (window as Window & { Kakao?: KakaoSdk }).Kakao;

    if (!kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }

    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "이창훈 💍 박유진, 결혼합니다.",
        description: "2026년 10월 11일 일요일 보테가마지오 오후 3시 30분",
        imageUrl: "https://yj-ch-wedding.vercel.app/hero/10.jpg",
        link: {
          mobileWebUrl: "https://yj-ch-wedding.vercel.app/",
          webUrl: "https://yj-ch-wedding.vercel.app/"
        }
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: {
            mobileWebUrl: "https://yj-ch-wedding.vercel.app/",
            webUrl: "https://yj-ch-wedding.vercel.app/"
          }
        }
      ]
    });
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto px-8 pt-8">
        <KakaoShareButton onClick={handleShare} />
      </div>
      <HeroSection />
      <GreetingSection />
      <Profile />
      <CalendarSection />
      <GallerySection />
    </>
  );
}

export default App;
