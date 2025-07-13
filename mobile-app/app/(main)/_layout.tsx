import ProtectedRoute from "@/components/ProtectedRoutes";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import theme from "@/theme";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <ProtectedRoute>
            <SafeAreaWrapper>
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: theme.colors.primary,
                        tabBarInactiveTintColor: "#8e8e93",
                        tabBarStyle: {
                            backgroundColor: "#ffffff",
                            borderTopWidth: 0,
                        },
                        tabBarLabelStyle: {
                            fontSize: 0,
                        },
                        tabBarShowLabel: false,
                    }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="timetable"
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <FontAwesome5 name={focused ? "calendar-alt" : "calendar"} size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="attendance"
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <Ionicons name={focused ? "checkmark-circle" : "checkmark-circle-outline"} size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="calender"
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <MaterialIcons name="calendar-today" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="assignments"
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <MaterialIcons name={focused ? "assignment-turned-in" : "assignment"} size={size} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </SafeAreaWrapper>
        </ProtectedRoute>
    );
}
