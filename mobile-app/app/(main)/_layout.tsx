import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import theme from "@/theme";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <SafeAreaWrapper>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.muted,
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
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="attendance"
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome5 name={focused ? "calendar-check" : "calendar"} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="leaves"
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name={focused ? "time-to-leave" : "event-busy"} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="reports"
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaWrapper>
    );
}