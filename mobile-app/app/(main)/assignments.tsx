import { useStatusBar } from "@/context/StatusBarContext";
import { useUserData } from "@/context/UserDataContext";
import theme from "@/theme";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Reusable task card
const TaskCard = ({ task }: { task: Task }) => {
  const statusColor = {
    Pending: "#FBBF24", // Yellow
    Submitted: "#10B981", // Green
    Overdue: "#EF4444", // Red
  }[task.status];

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <Text style={styles.cardSubtitle}>Due: {task.dueDate}</Text>
        <Text style={styles.cardAssigned}>Assigned by: {task.assignedBy}</Text>
      </View>
      <TouchableOpacity style={[styles.button, { borderColor: statusColor }]}>
        <Text style={[styles.buttonText, { color: statusColor }]}>
          {task.status === "Pending" ? "Submit" : task.status}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Main screen
const AssignmentsScreen = () => {
  const { setStyle, setBackgroundColor } = useStatusBar()
  const { userData } = useUserData()
  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.colors.primary);
      setStyle(theme.statusBar.light.style);
    }, [])
  );

  const taskData = userData?.taskData || []

  const groupedTasks: { [key in TaskStatus]: Task[] } = {
    Overdue: taskData.filter((t) => t.status === "Overdue"),
    Pending: taskData.filter((t) => t.status === "Pending"),
    Submitted: taskData.filter((t) => t.status === "Submitted"),
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: theme.colors.primary, position: "absolute", top: 0, left: 0, right: 0, height: 70, zIndex: 1, padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
      <View style={{ height: 70, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>My Tasks & Assignments</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {Object.entries(groupedTasks).map(([section, tasks]) => {
            return (
              <React.Fragment key={section}>
                {tasks.length > 0 && <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{section}</Text>
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </View>}
              </React.Fragment>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AssignmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    zIndex: 3
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#374151",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  cardAssigned: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginRight: 6,
    fontWeight: "600",
    fontSize: 14,
  },
});
