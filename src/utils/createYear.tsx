import { createDate } from "./createDate";
import { createMonth } from "./createMonth";

interface IYearParams {
  year?: number;
  locale?: string;
  monthNumber?: number;
}

export const createYear = (params?: IYearParams) => {
  const monthCount = 12;
  const today = createDate();

  const year = params?.year ?? today.fullYear;
  const locale = params?.locale ?? "default";
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({
    date: new Date(year, monthNumber - 1),
    locale,
  });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let index = 0; index <= monthCount - 1; index += 1) {
      monthes[index] = getMonthDays(index);
    }

    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year,
  };
};
