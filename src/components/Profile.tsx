import { profileImgSrc } from "../data/ImgSrc";

export function Profile() {
  return (
    <section className="w-full max-w-md mx-auto px-8 py-16">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <img
            src={profileImgSrc[0].src}
            alt="Chang Hoon Lee"
            className="w-full aspect-[3/4] object-cover rounded-lg"
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">신랑</p>
            <p className="text-tertiary">이창훈</p>
          </div>
        </div>

        <div className="space-y-4">
          <img
            src={profileImgSrc[1].src}
            alt="Yujin Park"
            className="w-full aspect-[3/4] object-cover rounded-lg"
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">신부</p>
            <p className="text-tertiary">박유진</p>
          </div>
        </div>
      </div>
    </section>
  );
}
