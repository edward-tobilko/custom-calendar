import { FC, useState } from "react";

import style from "./app.module.css";

import Calendar from "./components/Calendar";

import { createDate } from "./utils";

// console.log("currentDate", createDate({})); // current date
// console.log("currentMonth", createMonth({}).createMonthDays()); // current month
// console.log("currentYear", createYear({}).createYearMonthes()); // current year

const formatDate = (date: Date, format: string) => {
  const d = createDate({ date });

  return format
    .replace(/\bYYYY\b/, d.fullYear.toString())
    .replace(/\bMMM\b/, d.monthNumber.toString())
    .replace(/\bDDD\b/, d.dayNumber.toString());
};

const App: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <div className={style.app}>
        <div className={style.app__title}>
          {formatDate(selectedDate, "DDD. MMM. YYYY")}
        </div>
        <Calendar
          // locale="uk-UA"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
};

export default App;
