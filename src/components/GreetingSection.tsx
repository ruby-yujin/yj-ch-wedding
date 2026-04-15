export function GreetingSection() {
  return (
    <section className="w-full max-w-md mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="mb-12 text-tertiary">초대합니다</h2>
        <p className="leading-relaxed text-foreground/80 mb-8">
          평생 서로의 곁을 지키며
          <br />
          사랑으로 하나되는 날 귀한 걸음 하시어 축복해 주시면 감사하겠습니다.
        </p>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="">
          <p className="mb-4 text-muted-foreground">신랑</p>
          <p className="mb-6">이창훈</p>
          <p className="leading-relaxed text-foreground/70 text-sm">
            "사랑하는 사람과 평생을 약속하는 소중한 순간에 함께해 주셔서
            진심으로 감사드립니다."
          </p>
        </div>

        <div className="">
          <p className="mb-4 text-muted-foreground">신부</p>
          <p className="mb-6">박유진</p>
          <p className="leading-relaxed text-foreground/70 text-sm">
            "사랑하는 사람과 평생을 약속하는 소중한 순간에 함께해 주셔서
            진심으로 감사드립니다."
          </p>
        </div>
      </div>
    </section>
  );
}
