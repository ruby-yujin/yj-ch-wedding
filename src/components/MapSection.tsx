import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState } from "react";
import { copyAddressImgSrc } from "../data/ImgSrc";

const VENUE_POSITION = {
  lat: 37.5457261,
  lng: 127.0423333
};
// 지도의 중심만 오른쪽으로 이동 (값은 화면 보면서 조정)
const MAP_CENTER = {
  lat: VENUE_POSITION.lat,
  lng: VENUE_POSITION.lng + 0.0018
};

export function MapSection() {
  const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY ?? "";
  const [isLoading, error] = useKakaoLoader({
    appkey: appKey
  });
  const [copied, setCopied] = useState(false);

  if (!appKey) {
    return (
      <section className="w-full max-w-md mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
          <h2 className="text-tertiary">Location</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          지도를 보려면 `.env`에 `VITE_KAKAO_MAP_APP_KEY`를 설정해주세요.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full max-w-md mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
          <h2 className="text-tertiary">Location</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          지도를 불러오는 중입니다...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-md mx-auto px-8 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
          <h2 className="text-tertiary">Location</h2>
        </div>
        <p className="text-sm text-destructive">
          지도 로드에 실패했습니다. 앱키와 도메인 설정을 확인해주세요.
        </p>
      </section>
    );
  }

  const addressText =
    "서울특별시 성동구 성수동1가 서울숲2길 32-14 보테가마지오";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = addressText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full  mx-auto pt-16">
      <div className="max-w-md text-center mb-8 mx-auto">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="text-tertiary">Location</h2>
      </div>

      <div className="overflow-hidden border border-border">
        <Map
          center={MAP_CENTER}
          style={{ width: "100%", height: "340px" }}
          level={4}
        >
          <MapMarker position={VENUE_POSITION} />
        </Map>
      </div>
      <div className="max-w-md  mx-auto  flex flex-col gap-2 mt-5 px-8 text-start">
        <h3>주소</h3>
        <p className="mb-2">
          {addressText} 갤러리아포레 B2층
          <button
            type="button"
            onClick={handleCopyAddress}
            className="ml-2 align-middle"
            aria-label="주소 복사"
          >
            <img
              src={copyAddressImgSrc[0].src}
              alt="주소 복사"
              className="w-4 h-4"
            />
          </button>
          {copied && (
            <span className="ml-2 text-xs text-muted-foreground">복사됨</span>
          )}
        </p>
        <h3>오시는길</h3>
        <p className="mb-2">
          분당선 서울숲역 4번출구 도보 2분 | 뚝섬역8번출구 도보 10분
        </p>
        <h3>주차</h3>
        <p>건물 내 B3~B7 | 2시간 무료주차</p>
      </div>
    </section>
  );
}
