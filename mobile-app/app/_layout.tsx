import { Stack } from "expo-router";
import "./global.css";
import { StatusBarProvider } from "@/context/StatusBarContext";
import { UserDataProvider } from "@/context/UserDataContext";

export default function RootLayout() {
  return (
    <>
      <UserDataProvider>
        <StatusBarProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </StatusBarProvider>
      </UserDataProvider>
    </>
  );
}