// components/ProtectedRoute.tsx
import { useUserData } from '@/context/UserDataContext';
import { Redirect } from 'expo-router';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { userData } = useUserData();

    if (!userData) {
        return <Redirect href="/(auth)/login" />;
    }

    return <>{children}</>;
}

export const IfUser = ({ children }: Props) => {
    const { userData } = useUserData();
    if (userData) {
        return <Redirect href="/(main)/home" />;
    }

    return <>{children}</>;
}