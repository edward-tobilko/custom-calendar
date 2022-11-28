import { createDate } from "./createDate";

// Метод для отримання інформації 12-ти місяців
export const getMonthesNames = (locale: string = "default") => {
  const monthesNames: {
    longMonth: ReturnType<typeof createDate>["longMonth"];
    shortMonth: ReturnType<typeof createDate>["shortMonth"];
    monthIndex: ReturnType<typeof createDate>["monthIndex"];
    date: ReturnType<typeof createDate>["date"];
  }[] = Array.from({ length: 12 });

  monthesNames.forEach((_, index) => {
    const { longMonth, monthIndex, shortMonth, date } = createDate({
      locale,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + index,
        1,
      ),
    });

    monthesNames[monthIndex] = { longMonth, monthIndex, shortMonth, date };
  });

  return monthesNames;
};
