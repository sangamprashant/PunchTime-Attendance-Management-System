import ProtectedRoute from '@/components/ProtectedRoutes'
import theme from '@/theme'
import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: theme.colors.primary, }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold', }, headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="mark"
          options={{
            title: 'Mark Attendance',
            headerShown: true,
          }}
        />
        {/* scan */}
        <Stack.Screen
          name="scan"
          options={{
            title: 'Scan QR Code',
            headerShown: true,
          }}
        />
        <Stack.Screen name='profile'
          options={{
            title: 'My Profile',
            headerShown: true,
          }} />

        <Stack.Screen name="announcements" options={{ title: "Company Announcements", headerShown: true }} />
        <Stack.Screen name="leave" options={{ title: "Apply for Leave", headerShown: true }} />
        <Stack.Screen name="shift" options={{ title: "Shift Timings", headerShown: true }} />
        <Stack.Screen name="reports" options={{ title: "My Attendance Reports", headerShown: true }} />
        <Stack.Screen name="notifications" options={{ title: "Notifications", headerShown: true }} />
      </Stack>
    </ProtectedRoute>
  )
}
