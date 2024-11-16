import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
//import Buton from "../components/Button";
import RingProgress from "../components/RingProgress";
import Animated from "react-native-reanimated";
import Value from "../components/Value";
import { StatusBar } from "expo-status-bar";
import useHealthData from "../hooks/useHealthData";

import { NavigationProp } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { BloodPressureMeasurementLocation } from "react-native-health-connect";

interface CardioProps {
  navigation: NavigationProp<any>;
}

export default function Cardio({ navigation }: CardioProps) {
  const router = useRouter();
  const STEPS_GOAL = 10_000;

  const { steps, flights, distance, heartRate, energy, calories } =
    useHealthData();
  // useHealthData(new Date(2024, 11, 9));
  return (
    <View style={styles.container}>
      <RingProgress
        radius={100}
        strokeWidth={25}
        progress={steps / STEPS_GOAL}
      />
      {/*  <Text>home</Text> */}
      <Button title="homescreen go" onPress={() => router.push("/")} />

      {/* <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#c3c3c3",
          opacity: 0.2,
          transform: [
            {
              translateY: 100,
            },
          ],
        }}
      /> */}

      <Text style={{ fontSize: 32, marginBottom: 20 }}>Health Data</Text>

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        {/* this distance also working */}
        {/* <Value label="Distance" value={distance.toString()} /> */}
        <Value label="Distance" value={`${(distance / 10).toFixed(3)} km`} />

        {/*<Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} /> */}
        <Value label="Flights Climbed" value={flights.toString()} />
        <Value label="Hearth rate" value={heartRate.toString()} />
        <Value label="Energy" value={energy.toString()} />
        <Value label="Calories" value={calories.toString()} />
        {/* <Value
          label="Blood Presure"
          value={BloodPressureMeasurementLocation.toString()}
        /> */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    padding: 14,
  },
  values: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },

  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },

  value: {
    fontSize: 24,
    color: "#333",
  },

  valueContainer: {
    // flex: 1,
    // alignItems: "center",
    marginVertical: 10,
    minWidth: "40%",
  },
});
