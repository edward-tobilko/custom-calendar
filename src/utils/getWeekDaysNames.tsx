import { createDate } from "./createDate";

//? Information for 7 days a week. (UA: Метод для отримання інформації 7-ми днів тижня)
export const getWeekDaysNames = (locale: string = "default") => {
  const weekDaysNames: {
    longDay: ReturnType<typeof createDate>["longDay"];
    shortDay: ReturnType<typeof createDate>["shortDay"];
  }[] = Array.from({ length: 7 });

  weekDaysNames.forEach((_, index) => {
    const { longDay, dayNumberInWeek, shortDay } = createDate({
      locale,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + index,
      ),
    });

    weekDaysNames[dayNumberInWeek - 1] = { longDay, shortDay };
  });

  return weekDaysNames;
};
