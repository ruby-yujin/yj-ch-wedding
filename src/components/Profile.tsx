import { profileImgSrc } from "../data/ImgSrc";

const GROOM_TAGS = [
  "#다정한배려",
  "#절대 화내지않음",
  "#ENFJ",
  "#든든한 버팀목",
  "#댕댕미 뿜뿜"
];
const BRIDE_TAGS = [
  "#인간비타민",
  "#감정기복 있는편",
  "#ENFP",
  "#풍부한 감수성",
  "#인간 꾹꾹이"
];

function ProfileTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-secondary/60 px-2 py-0.5 text-xs text-tertiary"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function Profile() {
  return (
    <section className="w-full max-w-md mx-auto px-8 pb-16">
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
            <ProfileTags tags={GROOM_TAGS} />
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
            <ProfileTags tags={BRIDE_TAGS} />
          </div>
        </div>
      </div>
    </section>
  );
}
