import { useMemo, useState } from "react";

import {
  createDate,
  createMonth,
  getMonthesNames,
  getWeekDaysNames,
  getYearsInterval,
} from "../utils";
import { getMonthNumberOfDays } from "../utils/getMonthNumberOfDays";

interface IUseCalendar {
  locale?: string;
  selectedDate: Date;
}

export const useCalendar = ({
  locale = "default",
  selectedDate: date,
}: IUseCalendar) => {
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDay.fullYear, selectedDay.monthIndex),
      locale,
    }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.fullYear);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(
    getYearsInterval(selectedDay.fullYear),
  );
  const [modes, setModes] = useState<"days" | "monthes" | "years">("days");

  const fetchMonthesNames = useMemo(() => getMonthesNames(locale), []);
  const fetchWeekDaysNames = useMemo(() => getWeekDaysNames(locale), []);

  //? We get all the days of the current month
  const fetchDays = useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear],
  );

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear,
    );

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = fetchDays[0];
    const lastDay = fetchDays[monthNumberOfDays - 1];

    const shiftIndex = 1 - 1;
    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? 7 - (1 - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      7 - lastDay.dayNumberInWeek + shiftIndex > 6
        ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
        : 7 - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays =
      fetchDays.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = fetchDays[i - numberOfPrevDays];
    }

    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.fullYear, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: "right" | "left") => {
    if (modes === "days") {
      const monthIndex =
        direction === "left"
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(selectedYear - 1, 11), locale }),
        );
      }
      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(
          createMonth({ date: new Date(year, 0), locale }),
        );
      }

      setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale }),
      );
    }

    if (modes === "monthes" && direction === "left") {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (modes === "monthes" && direction === "right") {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (modes === "years" && direction === "left") {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] - 10),
      );
    }

    if (modes === "years" && direction === "right") {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] + 10),
      );
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(
      createMonth({ date: new Date(selectedYear, monthIndex), locale }),
    );
  };

  return {
    states: {
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
      modes,
      fetchMonthesNames,
      fetchWeekDaysNames,
      fetchDays,
      calendarDays,
    },

    actions: {
      setSelectedDay,
      setSelectedMonth,
      setSelectedYear,
      setSelectedYearsInterval,
      setModes,
      onClickArrow,
      setSelectedMonthByIndex,
    },
  };
};
