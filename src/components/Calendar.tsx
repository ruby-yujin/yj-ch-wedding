import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay
} from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function CalendarSection() {
  const weddingDate = new Date(2026, 9, 11);
  const [currentMonth, setCurrentMonth] = useState(weddingDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat);
      days.push(
        <div
          key={day.toString()}
          className={clsx(
            "aspect-square flex items-center justify-center",
            !isSameMonth(day, monthStart) && "text-muted-foreground/30",
            isSameDay(day, weddingDate) &&
              "bg-primary text-primary-foreground rounded-full"
          )}
        >
          <span>{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-2">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <section className="w-full max-w-md mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="text-tertiary">Wedding Day</h2>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-tertiary" />
          </button>
          <h3 className="text-tertiary">
            {format(currentMonth, "yyyy년 M월", { locale: ko })}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-tertiary" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className="text-center text-sm text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">{rows}</div>

        <div className="mt-8 text-center">
          <p className="text-foreground/80 mb-2">
            2026년 10월 11일 일요일 오후 3시 30분
          </p>
          <p className="text-sm text-muted-foreground">
            창훈 ❤️ 유진의 결혼식이{" "}
            {Math.ceil(
              (weddingDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )}
            일 남았습니다
          </p>
        </div>
      </div>
    </section>
  );
}
