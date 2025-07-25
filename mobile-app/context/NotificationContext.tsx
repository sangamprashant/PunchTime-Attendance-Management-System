// context/StatusBarContext.tsx
import { StatusBar } from "expo-status-bar";
import React, { createContext, ReactNode, useContext, } from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

type StatusBarStyle = "light" | "dark" | "auto";

interface NotificationContextType {
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    
      const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        // Send token to your server
        fetch('https://your-vercel-api.vercel.app/api/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, token }),
        });
      }
    });
  }, []);

    return (
        <NotificationContext.Provider
            value={{  }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used inside StatusBarProvider");
    }
    return context;
};

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token!');
      return null;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } else {
    alert('Must use physical device for Push Notifications');
    return null;
  }
}