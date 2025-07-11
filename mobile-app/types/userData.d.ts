interface UserData {
  name: string;
  email: string;
  profileImage?: string;
  stats?: StatItem[];
  weekData?: WeekDayStatus[];
  attendanceData?: attendanceGraphData;
}

type WeekDayStatus = {
  label: string;
  isMarked: boolean;
  isToday: boolean;
};

interface UserDataContextProps {
  userData: UserData | null;
  isUserDataLoading: boolean;
  fetchUserData: () => Promise<void>;
}

interface StatItem {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}

type attendanceGraphData = {
  labels: string[];
  datasets: {
    data: number[];
  }[];
};

// calender
type CalendarEventType = "today" | "test" | "holiday";

interface CalendarEvent {
  date: string; 
  type: CalendarEventType;
}
