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

const initialUserData: UserData = {
    name: 'Prashant Srivastav',
    email: '',
    profileImage: '',
    stats: [
        { label: 'Attendance', value: 83, unit: '%', },
        { label: 'Leave Taken', value: 4, max: 5, },
        { label: 'Ongoing Days', value: 23, max: 31, },
        { label: 'Days Left', value: 2, max: 31, },
    ],
    weekData: weekData,
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
