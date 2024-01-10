import { FC } from "react";

import style from "./calendar.module.css";

import { useCalendar } from "../hooks/useCalendar";

interface ICalendar {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

//? A function that checks whether the date is today or not.
const checkFullDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
const checkIsToday = (date: Date) => {
  return checkFullDate(new Date(), date);
};

const Calendar: FC<ICalendar> = ({
  locale = "default",
  selectedDate: date,
  setSelectedDate,
}) => {
  const { states, actions } = useCalendar({ locale, selectedDate: date });

  return (
    <div className={style.calendar}>
      <div className={style.calendar__header}>
        <div
          aria-hidden
          className={style.calendar__header__arrow}
          onClick={() => actions.onClickArrow("left")}
        >
          <i className="ri-arrow-left-s-line"></i>
        </div>

        {states.modes === "days" && (
          <div aria-hidden onClick={() => actions.setModes("monthes")}>
            {
              states.fetchMonthesNames[states.selectedMonth.monthIndex]
                .longMonth
            }{" "}
            {states.selectedYear}
          </div>
        )}

        {states.modes === "monthes" && (
          <div aria-hidden onClick={() => actions.setModes("years")}>
            {states.selectedYear}
          </div>
        )}

        {states.modes === "years" && (
          <div>
            {states.selectedYearsInterval[0]} -{" "}
            {
              states.selectedYearsInterval[
                states.selectedYearsInterval.length - 1
              ]
            }
          </div>
        )}

        <div
          aria-hidden
          className={style.calendar__header__arrow}
          onClick={() => actions.onClickArrow("right")}
        >
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>

      <div className={style.calendar__body}>
        {states.modes === "days" && (
          <>
            <div className={style.calendar__week__names}>
              {states.fetchWeekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.shortDay}>{weekDaysName.shortDay}</div>
              ))}
            </div>
            <div className={style.calendar__days}>
              {states.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkFullDate(
                  day.date,
                  states.selectedDay.date,
                );
                const isExtraDay =
                  day.monthIndex !== states.selectedMonth.monthIndex;

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      actions.setSelectedDay(day);
                      setSelectedDate(day.date);
                    }}
                    className={[
                      style.calendar__item,
                      isToday ? style.calendar__today__item : "",
                      isSelectedDay ? style.calendar__selected__item : "",
                      isExtraDay ? style.calendar__extra__day : "",
                    ].join(" ")}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {states.modes === "monthes" && (
          <div className={style.calendar__list}>
            {states.fetchMonthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                states.selectedYear === new Date().getFullYear();
              const isSelectedMonth =
                monthesName.monthIndex === states.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.longMonth}
                  aria-hidden
                  onClick={() => {
                    actions.setSelectedMonthByIndex(monthesName.monthIndex);
                    actions.setModes("days");
                  }}
                  className={[
                    style.calendar__item,
                    isSelectedMonth ? style.calendar__selected__item : "",
                    isCurrentMonth ? style.calendar__today__item : "",
                  ].join(" ")}
                >
                  {monthesName.shortMonth}
                </div>
              );
            })}
          </div>
        )}

        {states.modes === "years" && (
          <div className={style.calendar__list}>
            <div className={style.calendar__item}>
              {states.selectedYearsInterval[0] - 1}
            </div>
            {states.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === states.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    actions.setSelectedYear(year);
                    actions.setModes("monthes");
                  }}
                  className={[
                    style.calendar__item,
                    isSelectedYear ? style.calendar__selected__item : "",
                    isCurrentYear ? style.calendar__today__item : "",
                  ].join(" ")}
                >
                  {year}
                </div>
              );
            })}
            <div className={style.calendar__unchoosable__item}>
              {states.selectedYearsInterval[
                states.selectedYearsInterval.length - 1
              ] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
