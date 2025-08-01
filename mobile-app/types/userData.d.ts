// import { MaterialIcons } from "@expo/vector-icons";

type role = "admin" | "manager" | "employee";

interface UserData {
  name: string;
  email: string;
  shift: shifts;
  officeBranch?: OfficeBranch;
  todayLogIn?: string;
  profileImage?: string;
  stats?: StatItem[];
  weekData?: WeekDayStatus[];
  attendanceData?: attendanceGraphData;
  notificationData?: NotificationItem[];
  announcementsData?: Announcement[];
  taskData?: Task[];
  calenderData?: CalendarEvent[];
  employeeInfo?: EmployeeInfo[];
}

type shifts = "Morning Shift" | "Evening Shift" | "Night Shift";

type WeekDayStatus = {
  label: string;
  isMarked: boolean;
  isToday: boolean;
};

interface UserDataContextProps {
  userData: UserData | null;
  isUserDataLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  clearStorage: () => void;
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

type NotificationType = "action" | "info" | "reminder";

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  type: NotificationType;
  buttonText?: string;
  icon?: string;
  iconColor?: string;
  badge?: string;
  badgeText?: string;
  badgeColor?: string;
};

type Announcement = {
  title: string;
  description: string;
  date: string;
  type:
    | "Holiday"
    | "Update"
    | "Policy"
    | "Event"
    | "Maintenance"
    | "Reminder"
    | "Training";
};

type TaskStatus = "Pending" | "Submitted" | "Overdue";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  assignedBy: string;
}

type CalendarEventType = "today" | "test" | "holiday";

interface CalendarEvent {
  date: string;
  type: CalendarEventType;
}

type EmployeeInfo = {
  icon: string;
  label: string;
};

type OfficeBranch = {
  _id: string;
  name: string;
  address: string;
  pincode: number;
  state: string;
  city: string;
};
