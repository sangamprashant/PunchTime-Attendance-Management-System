// import { SplashScreen } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import SplashScreen from './userLayout';

const weekData: WeekDayStatus[] = [
    { label: 'M', isMarked: false, isToday: false },
    { label: 'T', isMarked: true, isToday: false },
    { label: 'W', isMarked: false, isToday: true },
    { label: 'Th', isMarked: false, isToday: false },
    { label: 'Fr', isMarked: false, isToday: false },
];

// Generate last 10 dates
const getLast10Days = (): string[] => {
    const days = [];
    const today = new Date();
    for (let i = 9; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(date.getDate().toString());
    }
    return days;
};


const notificationData: NotificationItem[] = [
    {
        id: '1',
        title: 'Mark today’s attendance',
        time: 'Just now',
        type: 'action',
        buttonText: 'Submit'
    },
    {
        id: '2',
        title: 'Leave request approved by HR',
        time: '2 hrs ago',
        type: 'info',
        icon: 'check-circle-outline',
        iconColor: '#10B981'
    },
    {
        id: '3',
        title: '2 days left to submit timesheet',
        time: '1 day ago',
        type: 'reminder',
        badge: '2',
        badgeText: 'days left',
        badgeColor: '#8B5CF6'
    }
]

const announcements: Announcement[] = [
    {
        title: "Independence Day Holiday",
        description: "The office will remain closed on 15th August in observance of Independence Day.",
        date: "2025-08-15",
        type: "Holiday"
    },
];

// Dummy data
const taskData: Task[] = [
    {
        id: "1",
        title: "Prepare Sales Report",
        dueDate: "15 July",
        status: "Pending",
        assignedBy: "Manager",
    },
];

const calenderData: CalendarEvent[] = [
    { date: "2025-07-12", type: "test" },
    { date: "2025-07-03", type: "holiday" },
];

const employeeInfo = [
    { icon: 'id-card-outline', label: 'Employee ID: EMP1024' },
    { icon: 'briefcase-outline', label: 'Position: Software Developer' },
    { icon: 'business-outline', label: 'Department: IT' },
    { icon: 'call-outline', label: '+91 9876543210' },
    { icon: 'mail-outline', label: 'srivastavp891@gmail.com' },
    { icon: 'calendar-outline', label: 'Joining Date: Jan 10, 2021' },
    { icon: 'location-outline', label: 'Bangalore, India' },
    { icon: 'home-outline', label: 'Office Center: Tech Park Tower 3' },
];

const initialUserData: UserData = {
    name: 'Prashant Srivastav',
    email: 'srivastavp891@gmail.com',
    shift: "Night Shift",
    profileImage: '',
    stats: [
        { label: 'Attendance', value: 83, unit: '%', },
        { label: 'Leave Taken', value: 4, max: 5, },
        { label: 'Ongoing Days', value: 23, max: 31, },
        { label: 'Days Left', value: 2, max: 31, },
    ],
    weekData: weekData,
    attendanceData: {
        labels: getLast10Days(),
        datasets: [
            {
                data: [6.5, 10, 7.5, 8, 5.5, 6, 7.2, 6.8, 8, 7.6],
            },
        ],
    },
    notificationData,
    announcementsData: announcements,
    taskData,
    calenderData,
    employeeInfo
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);
// SplashScreen.preventAutoHideAsync();

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isUserDataLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUserData(initialUserData);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isUserDataLoading) {
        return <SplashScreen />;
    }

    return (
        <UserDataContext.Provider value={{ userData, isUserDataLoading, fetchUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};
