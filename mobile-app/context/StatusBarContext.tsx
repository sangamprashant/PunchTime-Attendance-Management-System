// context/StatusBarContext.tsx
import { StatusBar } from "expo-status-bar";
import React, { createContext, ReactNode, useContext, useState } from "react";

type StatusBarStyle = "light" | "dark" | "auto";

interface StatusBarContextType {
    style: StatusBarStyle;
    backgroundColor: string;
    setStyle: (style: StatusBarStyle) => void;
    setBackgroundColor: (color: string) => void;
}

const StatusBarContext = createContext<StatusBarContextType | null>(null);

export const StatusBarProvider = ({ children }: { children: ReactNode }) => {
    const [style, setStyle] = useState<StatusBarStyle>("dark");
    const [backgroundColor, setBackgroundColor] = useState<string>("#fff");

    return (
        <StatusBarContext.Provider
            value={{ style, backgroundColor, setStyle, setBackgroundColor }}
        >
            {/* Render actual status bar here */}
            <StatusBar style={style} translucent />
            {children}
        </StatusBarContext.Provider>
    );
};

export const useStatusBar = () => {
    const context = useContext(StatusBarContext);
    if (!context) {
        throw new Error("useStatusBar must be used inside StatusBarProvider");
    }
    return context;
};
