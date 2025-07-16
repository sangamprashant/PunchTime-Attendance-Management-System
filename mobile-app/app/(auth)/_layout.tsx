import { IfUser } from "@/components/ProtectedRoutes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <IfUser>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    </IfUser>
  );
}