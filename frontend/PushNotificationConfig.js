import PushNotification from "react-native-push-notification";
import { Platform } from "react-native"; // Import Platform

// Configure Push Notifications
PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === "ios", // Use Platform to check the OS
});

// Create a notification channel (Android only)
PushNotification.createChannel(
  {
    channelId: "grill-alerts", // Unique channel ID
    channelName: "Grill Alerts",
    channelDescription: "A channel for grill temperature alerts",
  },
  (created) => console.log(`CreateChannel returned '${created}'`) // Log channel creation
);
