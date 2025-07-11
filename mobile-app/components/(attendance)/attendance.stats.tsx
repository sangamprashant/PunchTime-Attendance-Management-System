import { useUserData } from "@/context/UserDataContext";
import theme from "@/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatsUi, { CircularProgress } from "../(home)/stats";

const AttendanceStats: React.FC = () => {
  const { userData } = useUserData();

  const stats = userData?.stats || [];
  if (!stats.length) return null;

  const mainStat = stats[0];
  const mainPercentage = mainStat.max ? (mainStat.value / mainStat.max) * 100 : mainStat.value;

  const subStats = stats.slice(1);

  return (
    <View style={styles.card}>
      {/* Main Circular Progress */}
      <View style={styles.mainStatContainer}>
        <CircularProgress percentage={mainPercentage} value={mainStat.value} unit={mainStat.unit} radius={60} />
        <Text style={styles.mainLabel}>{mainStat.label}</Text>
      </View>

      {/* Sub Stats Row */}
      <View style={styles.statsRow}>
        {subStats.map((item, index) => {
          const percent = item.max ? (item.value / item.max) * 100 : item.value;
          return (
            <React.Fragment key={index}>
              <StatsUi item={item} percent={percent} i={index} />
              {index < subStats.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default AttendanceStats;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 280
  },
  mainStatContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: theme.colors.muted,
    marginHorizontal: 10,
  },
});
