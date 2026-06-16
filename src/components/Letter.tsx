import { greetingImgSrc } from "../data/ImgSrc";

export function Letter() {
  return (
    <div className="flex flex-col gap-4 my-10 px-8">
      <div className="">
        <img
          src={greetingImgSrc[0].src}
          alt={greetingImgSrc[0].alt}
          className="w-full h-full object-cover"
        />

        <p className="mb-4 text-muted-foreground">- 창훈 -</p>
      </div>

      <div className="">
        <img
          src={greetingImgSrc[1].src}
          alt={greetingImgSrc[1].alt}
          className="w-full h-full object-cover"
        />
        <p className="mb-4 text-muted-foreground">- 유진 -</p>
      </div>
    </div>
  );
}
