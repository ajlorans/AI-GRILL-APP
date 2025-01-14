import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import { LineChart } from "react-native-chart-kit";
import * as Notifications from "expo-notifications";
import { requestNotificationPermissions } from "./NotificationsConfig"; // Ensure this is set up correctly

export default function App() {
  const [temperature, setTemperature] = useState(null);
  const [targetTemp, setTargetTemp] = useState(250); // Default target temperature
  const [tempData, setTempData] = useState([]); // Store temperature readings
  const [timeData, setTimeData] = useState([]); // Store time readings
  const [notified, setNotified] = useState(false); // Track if notification is sent

  useEffect(() => {
    // Request notification permissions
    requestNotificationPermissions();

    let count = 0;

    const interval = setInterval(() => {
      fetch("http://192.168.1.3:5000/temperature") // Replace with your IP address
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.temperature);

          // Update temperature and time data
          setTempData((prevData) => [...prevData, data.temperature]);
          setTimeData((prevTime) => [...prevTime, count]);
          count += 5;

          // Send notification if target temperature is reached
          if (data.temperature >= targetTemp && !notified) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Grill Alert",
                body: `Target temperature of ${targetTemp}°F reached!`,
              },
              trigger: null, // Send immediately
            });
            setNotified(true); // Prevent duplicate notifications
          } else if (data.temperature < targetTemp) {
            setNotified(false); // Reset notification state if temperature drops
          }
        })
        .catch((error) => console.error("Error fetching temperature:", error));
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, [targetTemp, notified]);

  const handleFanControl = (action) => {
    fetch(`http://192.168.1.3:5000/fan/${action}`, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status); // Log the fan action
        setTemperature(data.new_temperature); // Update the temperature in the app
      })
      .catch((error) => console.error("Error with fan control:", error));
  };

  const progress = temperature ? temperature / targetTemp : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Grill Temperature: {temperature ? `${temperature}°F` : "Loading..."}
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Set Target Temperature"
        onChangeText={(text) => setTargetTemp(Number(text))}
      />

      <Progress.Bar progress={progress} width={200} />
      {temperature >= targetTemp && (
        <Text style={styles.readyText}>Ready to Grill!</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Increase Fan Speed"
          onPress={() => handleFanControl("increase")}
        />
        <Button
          title="Decrease Fan Speed"
          onPress={() => handleFanControl("decrease")}
        />
      </View>

      {tempData.length > 1 && (
        <LineChart
          data={{
            labels: timeData.map((t) => `${t}s`),
            datasets: [{ data: tempData }],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisSuffix="°F"
          chartConfig={{
            backgroundColor: "#1e2923",
            backgroundGradientFrom: "#08130d",
            backgroundGradientTo: "#1e2923",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chart}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 200,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "80%",
  },
  readyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
  chart: { marginVertical: 20, borderRadius: 16 },
});
