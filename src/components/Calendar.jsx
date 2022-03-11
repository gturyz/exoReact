import React, { useState, useEffect } from "react";
import RDV from "./RDV";

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

function getLeadingDays(date, startDay = 1) {
  const result = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = firstWeekday === 0 ? 5 : firstWeekday - startDay - 1;
  for (let i = days * -1; i <= 0; i++) {
    const tempDate = new Date(year, month, i);
    result.push({
      date: tempDate,
      day: tempDate.getDate(),
      backgroundColor: isToday(tempDate) ? "green" : "",
      color: "grey",
    });
  }
  return result;
}

function getMonthDays(date) {
  const result = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    const tempDate = new Date(year, month, i);
    result.push({
      date: tempDate,
      day: tempDate.getDate(),
      backgroundColor: isToday(tempDate) ? "black" : "",
      color: isToday(tempDate) ? "white" : "",
    });
  }
  return result;
}

function getTrailingDays(leadingDays, monthDays, date) {
  const result = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = 42 - (leadingDays.length + monthDays.length);
  for (let i = 1; i <= days; i++) {
    const tempDate = new Date(year, month + 1, i);
    result.push({
      date: tempDate,
      day: tempDate.getDate(),
      backgroundColor: isToday(tempDate) ? "green" : "",
      color: "grey",
    });
  }
  return result;
}

const getDays = (date) => {
  const leadingDays = getLeadingDays(date);
  const monthDays = getMonthDays(date);
  const trailingDays = getTrailingDays(leadingDays, monthDays, date);
  return [...leadingDays, ...monthDays, ...trailingDays];
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getDays(date));
  }, [date]);

  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <button
          style={{ width: "calc(100% / 3)", display: "inline-block" }}
          onClick={() =>
            setDate(new Date(date.setFullYear(date.getFullYear() - 1)))
          }
        >{`<<`}</button>
        <p style={{ width: "calc(100% / 3)", display: "inline-block" }}>
          {date.getFullYear()}
        </p>
        <button
          style={{ width: "calc(100% / 3)", display: "inline-block" }}
          onClick={() =>
            setDate(new Date(date.setFullYear(date.getFullYear() + 1)))
          }
        >{`>>`}</button>
      </section>
      <section style={{ textAlign: "center" }}>
        <button
          style={{ width: "calc(100% / 3)", display: "inline-block" }}
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        >{`<<`}</button>
        <p style={{ width: "calc(100% / 3)", display: "inline-block" }}>
          {date
            .toLocaleString("fr-FR", { month: "long" })
            .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
        <button
          style={{ width: "calc(100% / 3)", display: "inline-block" }}
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
        >{`>>`}</button>
      </section>

      <section style={{ textAlign: "center" }}>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Lu</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Ma</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Me</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Je</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Ve</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Sa</b>
        <b style={{ width: "calc(100% / 7)", display: "inline-block" }}>Di</b>
        {days.map((item, index) => {
          return (
            <button
              style={{
                width: "calc(100% / 7)",
                display: "inline-block",
                backgroundColor: item.backgroundColor,
                color: item.color,
              }}
              key={index}
            >
              {item.day}
            </button>
          );
        })}
      </section>
      <RDV />
    </main>
  );
};

export default Calendar;
