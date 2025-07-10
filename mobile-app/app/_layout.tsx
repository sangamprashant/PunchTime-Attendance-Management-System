import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./global.css";
import { StatusBarProvider } from "@/context/StatusBarContext";

export default function RootLayout() {
  return (
    <StatusBarProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </StatusBarProvider>
  );
}