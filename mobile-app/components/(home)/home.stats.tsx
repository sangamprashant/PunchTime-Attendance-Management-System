import { StyleSheet, View } from "react-native";
import StatsUi from "./stats";
import theme from "@/theme";
import React from "react";
import { useUserData } from "@/context/UserDataContext";

const HomeStats: React.FC = () => {
  const { userData } = useUserData()

  const stats = userData?.stats?.slice(0, 3) || [];

  if (!stats.length) {
    return null;
  }

  return (
    <View style={styles.statsRow}>
      {stats.map((item, i) => {
        const percent = item.max ? (item.value / item.max) * 100 : item.value;

        return (
          <React.Fragment key={i}>
            <StatsUi item={item} percent={percent} i={i} />
            {i < stats.length - 1 && <View style={{ width: 1, backgroundColor: theme.colors.muted }} key={i} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default HomeStats;


const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
});