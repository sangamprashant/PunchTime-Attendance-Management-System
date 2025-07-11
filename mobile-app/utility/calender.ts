const eventColors: Record<CalendarEventType, string> = {
  today: "#5B21B6", // Indigo
  test: "#FCA5A5", // Red/Pink
  holiday: "#FACC15", // Yellow
};

export const generateMarkedDates = (
  serverEvents: CalendarEvent[],
  todayDate: string = "2025-07-11"
): Record<string, any> => {
  const markedDates: Record<string, any> = {};

  // Add today's date
  markedDates[todayDate] = {
    selected: true,
    selectedColor: eventColors.today,
    // dots: [{ color: eventColors.today, key: "today" }],
  };

  // Add server-driven events
  serverEvents.forEach(({ date, type }) => {
    if (!markedDates[date]) {
      markedDates[date] = {
        selected: true,
        selectedColor: eventColors[type],
        // dots: [{ color: eventColors[type], key: type }],
      };
    } else {
      // Prevent duplicates
      const existingDots = markedDates[date].dots || [];
      const alreadyExists = existingDots.some((d: any) => d.key === type);
      if (!alreadyExists) {
        existingDots.push({ color: eventColors[type], key: type });
      }
    //   markedDates[date].dots = existingDots;
    }

    // Optional: Highlight background if it's a test
    if (type === "test") {
      markedDates[date].selected = true;
      markedDates[date].selectedColor = eventColors.test;
    }
  });

  return markedDates;
};
