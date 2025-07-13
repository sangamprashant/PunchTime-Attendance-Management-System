import { useStatusBar } from "@/context/StatusBarContext";
import { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function SafeAreaWrapper({ children, className = "" }: Props) {
    const { backgroundColor } = useStatusBar()
    return (
        <SafeAreaView className={`${className}`} style={{ flex: 1 }}>
            {Platform.OS === "android" && (
                <View style={{ height: StatusBar.currentHeight, backgroundColor: backgroundColor }} />
            )}
            {children}
        </SafeAreaView>
    );
}