// /* 1 option */

import React from "react";

// const TypeScriptLessons: React.FC = () => {
//   /* Union - тип данних де викор. 2 типа */
//   let score: number | string;

//   /* Alias - псевдоним типа (імена з великої літери) */
//   type Score = number | string;
//   const myScore1: Score = 29;
//   //   const myScor2: Score = false; // error

//   /* Анотація */
//   let num: number = JSON.parse("5");
//   //   let str: string = JSON.parse("sriiiiiiiing");

//   let calculations: boolean;
//   if (num % 2 === 0) {
//     calculations = false;
//   } else {
//     calculations = true;
//   }

//   let myScore2: number | string = 10;

//   /* Списки */
//   //   const arr: string[] = ["q", "w", "y", "s"]; // тільки строки
//   const arr: Array<string> = ["q", "w", "y", "s"]; // тільки строки
//   arr.push("2");
//   //   arr.push(2); // error

//   const arr_2: string[][] = []; // вложеність(коли массив в массиві);
//   arr_2.push(["q", "w", "y", "s"]);
//   //   console.log(arr_2);

//   /* Interface */
//   interface IPerson {
//     name: string;
//   }
//   interface IPerson {
//     age: number;
//   }
//   interface IAccount {
//     email: string;
//     password: number;
//     active: boolean;
//   }

//   // Обєднання інтерфейсів вище
//   // для interface
//   interface IDeveloper extends IPerson, IAccount {
//     skills: string[];
//     level?: string; // ? - цей ключ може або присутній або ні;
//   }

//   // для type
//   //   type IDeveloper = IPerson & IAccount;
//   const edward: IDeveloper = {
//     name: "Edward",
//     age: 29,
//     email: "",
//     password: 1111,
//     active: false,
//     skills: ["javascript", "html", "css"],
//     level: "junior",
//   };

//   return <div>TypeScriptLessons</div>;
// };

// export default TypeScriptLessons;

// /* 2 option */

// import React, { useState } from "react";

// interface IProps {
//   children?: React.ReactNode;
// }

// interface IState {
//   name: any;
//   temperature: string;
//   setTemperature: (temperature: string) => void;
//   props?: React.HTMLProps<HTMLInputElement>;
// }

// const BoilingVerdict = ({ children }: IProps) => {
//   return <div> {children} </div>;
// };

// const TemparatureInput = ({
//   props,
//   name,
//   temperature,
//   setTemperature,
// }: IState) => {
//   return (
//     <fieldset>
//       <legend>Введите температуру в градусах {name}:</legend>
//       <input
//         value={temperature}
//         onChange={(event) => setTemperature(event.target.value)}
//         {...props}
//       />
//     </fieldset>
//   );
// };

// const TypeScriptLessons = () => {
//   const [temperature, setTemperature] = useState<string>("");
//   const [name, setName] = useState<string>("Цельсия");

//   function toCelsius(fahrenheit: number) {
//     return ((fahrenheit - 32) * 5) / 9;
//   }

//   function toFahrenheit(celsius: number) {
//     return (celsius * 9) / 5 + 32;
//   }

//   const convertTemp = (temperature: string, convert: any) => {
//     const input = parseFloat(temperature);
//     if (Number.isNaN(input)) {
//       return "";
//     }
//     const output = convert(input);
//     const rounded = Math.round(output * 1000) / 1000;
//     return rounded.toString();
//   };
//   console.log(convertTemp("100", toCelsius)); // 37.7
//   console.log(convertTemp("100", toFahrenheit)); // 212

//   const celsius =
//     name === "Фаренгейта" ? convertTemp(temperature, toCelsius) : temperature;
//   const fahrenheit =
//     name === "Цельсия" ? convertTemp(temperature, toFahrenheit) : temperature;

//   return (
//     <>
//       <TemparatureInput
//         name="Цельсия"
//         temperature={celsius}
//         setTemperature={setTemperature}
//       />
//       <TemparatureInput
//         name="Фаренгейта"
//         temperature={fahrenheit}
//         setTemperature={setTemperature}
//       />
//       <BoilingVerdict>
//         {parseFloat(temperature) >= 100 ? (
//           <p>Вода закипит.</p>
//         ) : (
//           <p>Вода не закипит.</p>
//         )}
//       </BoilingVerdict>
//     </>
//   );
// };

// export default TypeScriptLessons;
