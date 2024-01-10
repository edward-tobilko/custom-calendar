//? Number of days in a month (UA: Отримуємо кіль-сть днів в місяці)
export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear(),
) => new Date(yearNumber, monthIndex + 1, 0).getDate();
