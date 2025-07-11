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

const initialUserData: UserData = {
    name: 'Prashant Srivastav',
    email: 'srivastavp891@gmail.com',
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
    }
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
            // SplashScreen.hideAsync();
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
