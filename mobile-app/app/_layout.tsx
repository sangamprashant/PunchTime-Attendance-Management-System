import { StatusBarProvider } from "@/context/StatusBarContext";
import { UserDataProvider } from "@/context/UserDataContext";
import { Stack } from "expo-router";
import "./global.css";

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