import CurveHeaderWrapper from "@/components/CurveHeaderWrapper";
import { useUserData } from "@/context/UserDataContext";
import { generateMarkedDates } from "@/utility/calender";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

// Constants
const todayDate = new Date().toISOString().split("T")[0];
const today = new Date(todayDate);

const CalendarScreen = () => {
  const { userData } = useUserData()
  const calenderData = userData?.calenderData || []
  const markedDates = generateMarkedDates(calenderData, todayDate);
  const [activeMonth, setActiveMonth] = useState(todayDate); // default to today

  const handleVisibleMonthChange = (months: { month: number; year: number }[]) => {
    if (months && months.length > 0) {
      const { month, year } = months[0];
      const formatted = `${year}-${String(month).padStart(2, "0")}`;
      setActiveMonth(formatted); // e.g., "2025-07"
      console.log("Active month:", formatted);
    }
  };
  return (
    <CurveHeaderWrapper>
      <View style={styles.header}>
        <Text style={styles.dateText}>{today.getDate()}</Text>
        <View>
          <Text style={styles.dayText}>{today.toLocaleDateString("en-US", { weekday: "long" })}</Text>
          <Text style={styles.monthText}>July 2025</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <LegendItem color="#5B21B6" label="Today" />
        <LegendItem color="#FCA5A5" label="Internal Test" />
        <LegendItem color="#FACC15" label="Holidays" />
      </View>

      <Calendar
        markingType={"multi-dot"}
        markedDates={markedDates}
        current={todayDate}
        style={styles.calendar}
        onVisibleMonthsChange={handleVisibleMonthChange}
        theme={{
          todayTextColor: "#5B21B6",
          textSectionTitleColor: "#6B7280",
          dayTextColor: "#111827",
          textDisabledColor: "#D1D5DB",
          arrowColor: "#5B21B6",
        }}
      />
      <View style={styles.highlightBox}>
        <Text style={styles.highlightTitle}>Highlights of this month</Text>
        <ScrollView contentContainerStyle={styles.highlightScrollContent} showsVerticalScrollIndicator={false}>
          {calenderData.map((event, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.eventDate}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                })}
              </Text>
              <Text style={styles.eventType}>
                {event.type === "test" ? "Internal Test" : "Holiday"}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </CurveHeaderWrapper>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 12,
  },
  dayText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  monthText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#ffffff",
    padding: 10, elevation: 2,
    borderRadius: 50
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 14,
    color: "#374151",
  },
  calendar: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  highlightBox: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    maxHeight: 190,
    zIndex: 10,
    position: "relative",
  },
  highlightTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  highlightScrollContent: {
    flexGrow: 0,
  },
  highlightItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventDate: {
    fontSize: 14,
    color: "#374151",
  },
  eventType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#5B21B6",
  },
});

export default CalendarScreen;
