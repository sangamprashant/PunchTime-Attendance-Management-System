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

interface Slide {
  key: string;
  title: string;
  text: string;
  image: number;
}

const slides: Slide[] = [
  {
    key: "s1",
    title: "Mark Attendance in Seconds",
    text:
      "PunchTime empowers employees to clock in effortlessly using a QR scan. Attendance marking becomes smooth, secure, and instantaneous—no manual inputs or delays.",
    image: require("@/assets/images/landing/onboarding1.png"),
  },
  {
    key: "s2",
    title: "Monitor Attendance with Insight",
    text:
      "Managers and employees can view visual reports of attendance over time. Track performance, identify patterns, and ensure transparency with PunchTime’s integrated insights.",
    image: require("@/assets/images/landing/onboarding2.png"),
  },
  {
    key: "s3",
    title: "Never Miss a Punch Again",
    text: `PunchTime sends timely alerts for check-ins, shift starts, and important updates. Whether you're an employee or a manager, you’ll always be notified—on time, every time.`,
    image: require("@/assets/images/landing/onboarding3.png"),
  },
];

export { baseShiftData, daysOfWeek, getDateOfWeekday, getRotatedDays ,slides};

