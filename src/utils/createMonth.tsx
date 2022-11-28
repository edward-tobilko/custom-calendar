import { createDate } from "./createDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface IMonthParams {
  locale?: string;
  date?: Date;
}

export const createMonth = (params?: IMonthParams) => {
  const locale = params?.locale ?? "default";
  const date = params?.date ?? new Date();

  const newDate = createDate({ locale, date });
  const { longMonth: monthName, fullYear, monthNumber, monthIndex } = newDate;

  const getDay = (dayNumber: number) =>
    createDate({
      date: new Date(fullYear, monthIndex, dayNumber),
      locale,
    });

  const createMonthDays = () => {
    const monthDays: any = [];

    for (
      let index = 0;
      index <= getMonthNumberOfDays(monthIndex, fullYear) - 1;
      index += 1
    ) {
      monthDays[index] = getDay(index + 1);
    }

    return monthDays;
  };

  return {
    fullYear,
    monthName,
    monthNumber,
    monthIndex,
    getDay,
    createMonthDays,
  };
};
