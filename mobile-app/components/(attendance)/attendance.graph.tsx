import { useUserData } from "@/context/UserDataContext";
import theme from "@/theme";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;



const AttendanceGraph = () => {
    const { userData } = useUserData()

    const attendanceData = userData?.attendanceData

    if (!attendanceData) return null

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Last 10 Days Attendance</Text>
            <LineChart
                data={attendanceData}
                width={screenWidth - 32}
                height={220}
                yAxisSuffix="h"
                yAxisInterval={1}
                chartConfig={{
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                    labelColor: () => theme.colors.muted,
                    propsForDots: {
                        r: "5",
                        strokeWidth: "1",
                        stroke: "#fff",
                    },
                }}
                bezier
                style={styles.chart}
            />
        </View>
    );
};

export default AttendanceGraph;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
        alignItems: "center",
        overflow: "hidden",
    },
    chart: {
        borderRadius: 16,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.primary,
    },
});
