import React, { useEffect } from "react";
import { useStore } from "./Store";
import { numberWithCommas } from "./utils/NumberWithCommas";
import { parseISO } from "date-fns";

function getDateTimeInGMTplus3() {
  const now = new Date();
  const utcOffsetInMinutes = now.getTimezoneOffset();
  const utcOffsetInHours = utcOffsetInMinutes / 60;
  const localTimeInHours = now.getHours();
  const gmtPlus3TimeInHours = localTimeInHours + utcOffsetInHours + 3; // add 3 hours for GMT+3

  const gmtPlus3DateTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    gmtPlus3TimeInHours,
    now.getMinutes()
  );

  const year = gmtPlus3DateTime.getFullYear();
  const month = (gmtPlus3DateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = gmtPlus3DateTime.getDate().toString().padStart(2, "0");
  const hour = gmtPlus3DateTime.getHours().toString().padStart(2, "0");
  const minutes = gmtPlus3DateTime.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = {
    iso: `${year}-${month}-${day}`,
    hour: parseInt(hour),
    minutes: parseInt(minutes),
  };

  return formattedDateTime;
}
const holidays = [
  { day: 31, month: 12 },
  { day: 1, month: 1 },
  { day: 2, month: 1 },
  { day: 3, month: 1 },
  { day: 4, month: 1 },
  { day: 5, month: 1 },
  { day: 6, month: 1 },
  { day: 7, month: 1 },
  { day: 8, month: 1 },
  { day: 22, month: 2 },
  { day: 23, month: 2 },
  { day: 24, month: 2 },
  { day: 25, month: 2 },
  { day: 26, month: 2 },
  { day: 8, month: 3 },
  { day: 29, month: 4 },
  { day: 30, month: 4 },
  { day: 1, month: 5 },
  { day: 6, month: 5 },
  { day: 7, month: 5 },
  { day: 8, month: 5 },
  { day: 9, month: 5 },
  { day: 10, month: 6 },
  { day: 11, month: 6 },
  { day: 12, month: 6 },
  { day: 4, month: 11 },
  { day: 5, month: 11 },
  { day: 6, month: 11 },
];

function HourSelector({ data, date, prices, carting }) {
  const totalForSections = useStore((state) => state.totalForSections);
  const dates = useStore((state) => state.dates);
  const changeTime = useStore((state) => state.changeTime);
  const changeTotal = useStore((state) => state.changeTotal);
  const workUntil = parseInt(prices.workUntil);
  const resetDateTime = useStore((state) => state.resetDateTime);

  const isWeekendCarting =
    dates[date].date?.iso &&
    parseISO(dates[date].date.iso).getUTCDay() > 4 &&
    carting;

  if (
    dates[date].time[1] &&
    dates[date].time[0] % 1 !== dates[date].time[1] % 1 &&
    parseFloat(prices.minTime) === 1
  ) {
    changeTime([dates[date].time[0], NaN], date);
  }

  if (
    isWeekendCarting &&
    (dates[date].time[0] || dates[date].time[1]) &&
    (dates[date].time[0] < 13 || dates[date].time[1] < 13)
  ) {
    resetDateTime(date, 13);
  }

  let hourOptions = [];
  for (let i = isWeekendCarting ? 13 : 12; i < workUntil; i++) {
    const hourString = i.toString().padStart(2, "0");
    hourOptions.push(
      <option key={hourString + ":00"} value={i}>
        {hourString + ":00"}
      </option>
    );
    if (i !== workUntil + 1 - parseFloat(prices.minTime)) {
      hourOptions.push(
        <option key={hourString + ":30"} value={i + 0.5}>
          {hourString + ":30"}
        </option>
      );
    }
  }
  const dateInMoscow = getDateTimeInGMTplus3();
  if (
    dates[date]?.date &&
    dates[date].date.iso === dateInMoscow.iso &&
    dateInMoscow.hour >= 12
  ) {
    hourOptions = hourOptions.slice(
      (dateInMoscow.hour + (dateInMoscow.minutes >= 30 ? 0.5 : 0)) * 2 - 24
    );
  }

  useEffect(() => {
    if (
      dates[date] &&
      dates[date].date &&
      dates[date].time[0] &&
      (dates[date].time[1] || isNaN(dates[date].time[1]))
    ) {
      let dayOfWeek =
        new Date(dates[date].date.iso).getDay() === 0
          ? 7
          : new Date(dates[date].date.iso).getDay();

      let price = 0;
      for (let i = dates[date].time[0]; i < dates[date].time[1]; i += 0.5) {
        if (
          (dayOfWeek === 5 && i >= 18) ||
          dayOfWeek > (carting ? 5 : 4) ||
          JSON.stringify(holidays).includes(
            JSON.stringify({
              day: dates[date].date.day,
              month: dates[date].date.month,
            })
          )
        ) {
          price += prices.fridayToSunday / (2 * parseFloat(prices.minTime));
        } else if (dayOfWeek < 5 && i >= 18) {
          price += prices.mondayToThursday / (2 * parseFloat(prices.minTime));
        } else if (dayOfWeek < 6 && i + 0.5 <= 18) {
          price += prices.mondayToFriday / (2 * parseFloat(prices.minTime));
        }
      }
      changeTotal(price, date);
    }
  }, [dates]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pt-8">
        <div>
          <label className="pr-[0.625rem] text-lg" htmlFor="hour-select">
            {data.smallTexts.timeFrom}
          </label>
          <select
            className="rounded-md border-[0.0625rem] border-primary-gray-medium text-sm px-[0.625rem] py-[0.375rem]"
            id="hour-select"
            value={dates[date].time[0] || ""}
            onChange={(event) => {
              changeTime(
                parseFloat(event.target.value) + parseFloat(prices.minTime) >=
                  parseFloat(dates[date].time[1])
                  ? [
                      parseFloat(event.target.value),
                      parseFloat(event.target.value) +
                        parseFloat(prices.minTime),
                    ]
                  : [
                      parseFloat(event.target.value),
                      parseFloat(dates[date].time[1]),
                    ],
                date
              );
            }}
          >
            {hourOptions.filter(
              (item) =>
                item.props.value <= workUntil - parseFloat(prices.minTime)
            )}
          </select>
        </div>
        <div>
          <label className="pr-[0.625rem] text-lg" htmlFor="hour-select2">
            {data.smallTexts.TimeUntil}
          </label>
          <select
            className="rounded-md border-[0.0625rem] border-primary-gray-medium text-sm px-[0.625rem] py-[0.375rem]"
            id="hour-select2"
            value={dates[date].time[1] || ""}
            onChange={(event) => {
              changeTime(
                parseFloat(dates[date].time[0]) + parseFloat(prices.minTime) >=
                  parseFloat(event.target.value)
                  ? [
                      parseFloat(dates[date].time[0]),
                      parseFloat(dates[date].time[0]) +
                        parseFloat(prices.minTime),
                    ]
                  : [
                      parseFloat(dates[date].time[0]),
                      parseFloat(event.target.value),
                    ],
                date
              );
            }}
          >
            <option value={parseFloat(dates[date].time[0])}>{"--:--"}</option>
            {parseFloat(prices.minTime) !== 1
              ? hourOptions.slice(
                  ((dates[date].time[0] || 12) + parseFloat(prices.minTime)) *
                    2 -
                    (isWeekendCarting ? 26 : 24)
                )
              : hourOptions
                  .slice(
                    ((dates[date].time[0] || 12) + parseFloat(prices.minTime)) *
                      2 -
                      (isWeekendCarting ? 26 : 24)
                  )
                  .filter(
                    (item) =>
                      item.props.value % 1 === (dates[date].time[0] || 12) % 1
                  )}
            {((parseFloat(prices.minTime) === 1 &&
              dates[date].time[0] % 1 === 0) ||
              parseFloat(prices.minTime) === 0.5) && (
              <option
                key={workUntil === 24 ? "00:00" : `${workUntil}:00`}
                value={workUntil}
              >
                {workUntil === 24 ? "00:00" : `${workUntil}:00`}
              </option>
            )}
          </select>
        </div>
      </div>
      <Price price={totalForSections[date]} data={data} />
    </div>
  );
}

function Price({ data, price }) {
  return (
    <>
      {price > 0 && (
        <div className="flex items-baseline justify-between pt-5 lg:pt-8">
          <p className="text-sm lg:text-lg">{data.smallTexts.amount}</p>
          <p className="text-lg font-semibold lg:text-xl">{`${numberWithCommas(
            price
          )} р.`}</p>
        </div>
      )}
    </>
  );
}

export default HourSelector;
