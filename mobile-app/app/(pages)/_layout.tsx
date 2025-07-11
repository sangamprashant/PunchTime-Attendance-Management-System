import theme from '@/theme'
import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <>
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
      </Stack>
    </>
  )
}
