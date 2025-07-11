interface StatItem {
  label: string;
  value: number;
  max?: number;
  unit?: string;
}

interface UserData {
  name: string;
  email: string;
  profileImage?: string;
  stats?: StatItem[];
  weekData?: WeekDayStatus[];
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
