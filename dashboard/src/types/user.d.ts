interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  shift: Shifts;
  role: Role;
  todayLogIn?: string;
  profileImage?: string;
  officeBranch?: string | IOfficeBranch;
}

type Role = "admin" | "manager" | "employee";
type Shifts = "Morning Shift" | "Evening Shift" | "Night Shift";
type TaskStatus = "Pending" | "Submitted" | "Overdue";
type CalendarEventType = "today" | "test" | "holiday";
type NotificationType = "action" | "info" | "reminder";

interface IOfficeBranch {
  _id: string;
  name: string;
  address: string;
  pincode: number;
  state: string;
  city: string;
}
