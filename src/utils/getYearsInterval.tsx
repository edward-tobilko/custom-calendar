//? Interval between years (2020 - 2029) (UA: Отримуємо інформацію про інтервал між роками (2020 - 2029))
export const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;

  return [...Array(10)].map((_, index) => startYear + index);
};
