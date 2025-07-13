const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getRotatedDays = (): string[] => {
  const todayIndex = new Date().getDay();
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  return [
    ...daysOfWeek.slice(adjustedIndex),
    ...daysOfWeek.slice(0, adjustedIndex),
  ];
};

const getDateOfWeekday = (selectedDay: string, baseDay: string): Date => {
  const days = daysOfWeek;
  const fromIndex = days.indexOf(baseDay);
  const toIndex = days.indexOf(selectedDay);

  let diff = toIndex - fromIndex;
  if (diff < 0) diff += 7;

  const resultDate = new Date();
  resultDate.setDate(resultDate.getDate() + diff);
  return resultDate;
};

const baseShiftData = [
  {
    id: "1",
    title: "Morning Shift",
    time: "08:00 AM - 04:00 PM",
  },
  {
    id: "2",
    title: "Evening Shift",
    time: "04:00 PM - 12:00 AM",
  },
  {
    id: "3",
    title: "Night Shift",
    time: "12:00 AM - 08:00 AM",
  },
];

export { daysOfWeek, getDateOfWeekday, getRotatedDays, baseShiftData };
