interface IDateParams {
  locale?: string;
  date?: Date;
}

const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (date.getTime() - firstDayOfTheYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

export const createDate = (params?: IDateParams) => {
  const locale = params?.locale ?? "default";
  const date = params?.date ?? new Date();

  // Get dates
  const dayNumber = date.getDate();
  const dayNumberInWeek = date.getDay() + 1;
  const longDay = date.toLocaleDateString(locale, {
    weekday: "long",
  });
  const shortDay = date.toLocaleDateString(locale, {
    weekday: "short",
  });

  // Get months
  const longMonth = date.toLocaleDateString(locale, {
    month: "long",
  });
  const shortMonth = date.toLocaleDateString(locale, {
    month: "short",
  });
  const monthNumber = date.getMonth() + 1;
  const monthIndex = date.getMonth();

  // Get years
  const fullYear = date.getFullYear();
  const shortYear = date.toLocaleDateString(locale, {
    year: "2-digit",
  });

  // Get week and time
  const fullWeek = getWeekNumber(date);
  const fullTime = date.getTime();

  return {
    date,
    dayNumber,
    dayNumberInWeek,
    longDay,
    shortDay,
    longMonth,
    shortMonth,
    monthNumber,
    monthIndex,
    fullYear,
    shortYear,
    fullTime,
    fullWeek,
  };
};
