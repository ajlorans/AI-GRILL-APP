import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permissions
export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      console.log("Notification permissions not granted!");
    }
  }
}

// Send a notification
export function sendNotification(title, body) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null, // Send immediately
  });
}
