import { useStore } from "@components/Store";
import { parseISO } from "date-fns";
import dynamic from "next/dynamic";

const Calend = dynamic(() => import("@atlaskit/calendar"), {
  ssr: false,
});

export default function Calendar({ dataNum }) {
  const changeDate = useStore((state) => state.changeDate);
  const dateFilter = (date) => {
    const dayOfWeek = parseISO(date).getTime();
    return (
      parseISO(date).toDateString() !== new Date().toDateString() &&
      dayOfWeek < new Date().getTime()
    );
  };
  const dates = useStore((state) => state.dates);
  return (
    <Calend
      day={0}
      selected={[dates[dataNum].date?.iso || ""]}
      disabledDateFilter={dateFilter}
      minDate={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
        new Date().getDate() + 1
      }`}
      locale={"ru"}
      defaultMonth={new Date().getMonth() + 1}
      defaultYear={new Date().getFullYear()}
      testId={"calendar"}
      weekStartDay={1}
      onSelect={(event) => {
        changeDate(event, dataNum);
      }}
    />
  );
}
