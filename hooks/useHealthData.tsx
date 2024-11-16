import { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
  HealthValue,
} from "react-native-health";
import { Platform } from "react-native";
import {
  initialize,
  requestPermission,
  readRecords,
  BloodPressureBodyPosition,
  getSdkStatus,
  SdkAvailabilityStatus,
} from "react-native-health-connect";

/* const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.EnergyConsumed,
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.EnergyConsumed,
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
  },
}; */

const useHealthData = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [flights, setFlights] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  //   const [heartRate, setHeartRate] = useState<number[]>([]);   //argument of type 'number' is not assignable to parameter of type 'number[]'.

  const [energy, setEnergy] = useState(0);
  const [calories, setCalories] = useState(0);

  /*   useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
  }); */

  useEffect(() => {
    const fetchData = async () => {
      if (Platform.OS === "ios") {
        // iOS-specific logic

        AppleHealthKit.isAvailable((err, isAvailable) => {
          if (err) {
            console.log("Error checking availability");
            return;
          }
          if (!isAvailable) {
            console.log("Apple Health not available");
            return;
          }
        });
        const permissions: HealthKitPermissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
              AppleHealthKit.Constants.Permissions.FlightsClimbed,
              AppleHealthKit.Constants.Permissions.EnergyConsumed,
              AppleHealthKit.Constants.Permissions.HeartRate,
            ],
            write: [
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
              AppleHealthKit.Constants.Permissions.FlightsClimbed,
              AppleHealthKit.Constants.Permissions.EnergyConsumed,
              AppleHealthKit.Constants.Permissions.HeartRate,
            ],
          },
        };

        AppleHealthKit.initHealthKit(permissions, (err) => {
          if (err) {
            console.log("Error getting permissions");
            return;
          }
          setHasPermission(true);
        });

        const options = {
          startDate: new Date(2024, 9, 16).toISOString(),
          endDate: new Date(2024, 11, 9).toISOString(),
          unit: AppleHealthKit.Constants.Units.count,
          //unit: HealthUnit.bpm,
        };

        AppleHealthKit.getStepCount(options, (err, results) => {
          if (err) {
            console.log("Error getting step count: ", err);
            return;
          }
          setSteps(results.value);
        });

        AppleHealthKit.getFlightsClimbed(options, (err, results) => {
          if (err) {
            console.log("error getting Flights count: ", err);
            return;
          }
          console.log("Flights count: ", results.value);
          setFlights(results.value);
        });

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
          if (err) {
            console.log("error getting Distance count: ", err);
            return;
          }
          console.log("Distance count: ", results.value);
          setDistance(results.value);
        });

        // Fetch other iOS-specific data similarly
        // ...
      } else if (Platform.OS === "android") {
        // Android-specific logic
        await initialize();
        await requestPermission([
          { accessType: "read", recordType: "Steps" },
          { accessType: "write", recordType: "Steps" },
          { accessType: "read", recordType: "Distance" },
          { accessType: "read", recordType: "FloorsClimbed" },
          { accessType: "write", recordType: "FloorsClimbed" },
          { accessType: "read", recordType: "HeartRate" },
          { accessType: "read", recordType: "ActiveCaloriesBurned" },
          { accessType: "write", recordType: "ActiveCaloriesBurned" },
        ]);

        const stepsData = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-09-16T12:00:00.405Z",
            endTime: "2024-11-10T21:30:15.405Z",
          },
        });
        setSteps(
          stepsData.records.reduce((total, record) => total + record.count, 0)
        );

        const distanceData = await readRecords("Distance", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-11-09T10:00:00.405Z",
            endTime: "2024-11-09T21:30:15.405Z",
          },
        });
        setDistance(
          distanceData.records.reduce(
            (total, record) => total + record.distance.inKilometers,
            0
          )
        );

        //console.log(distanceData);

        const flightsData = await readRecords("FloorsClimbed", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-09-16T12:00:00.405Z",
            endTime: "2024-11-09T21:30:15.405Z",
          },
        });
        setFlights(
          flightsData.records.reduce(
            (total, record) => total + record.floors,
            0
          )
        );

        const heartRateData = await readRecords("HeartRate", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-09-16T12:00:00.405Z",
            endTime: "2024-11-09T21:30:15.405Z",
          },
        });
        setHeartRate(
          heartRateData.records.reduce(
            (total, record) =>
              total +
              record.samples.reduce(
                (sum, sample) => sum + sample.beatsPerMinute,
                0
              ) /
                record.samples.length,
            0
          )
        );
        console.log(
          "Retrieved heart: ",
          JSON.stringify({ heartRateData }, null, 2)
        );

        const energyData = await readRecords("ActiveCaloriesBurned", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-09-09T12:00:00.405Z",
            endTime: "2024-11-09T23:53:15.405Z",
          },
        });
        setEnergy(
          energyData.records.reduce(
            (total, record) => total + record.energy.inJoules,
            0
          )
        );
        console.log("Retrieved energy: ", JSON.stringify({ energy }, null, 2));

        //console.log(energyData);

        const caloriesData = await readRecords("ActiveCaloriesBurned", {
          timeRangeFilter: {
            operator: "between",
            startTime: "2024-09-09T12:00:00.405Z",
            endTime: "2024-11-09T23:53:15.405Z",
          },
        });
        console.log(
          "Retrieved calories: ",
          JSON.stringify({ caloriesData }, null, 2)
        );

        setCalories(
          caloriesData.records.reduce(
            (total, record) => total + record.energy.inCalories,
            0
          )
        );
      }
    };
    //console.log("Retrieved calories: ", JSON.stringify({ calories }, null, 2));

    fetchData();
  }, []);

  /* 

   useEffect(() => {
     if (Platform.OS !== "ios") {
       return;
     }
      const options: HealthInputOptions = {
        startDate: new Date(2024, 9, 16).toISOString(),
        endDate: new Date(2024, 11, 9).toISOString(),
        unit: HealthUnit.count,
      };
      AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log("Error getting step count: ", err);
          return;
        }
        setSteps(results.value);
      });
   }, []);

  return { steps, distance, flights, heartRate, energy, calories };

*/

  return { steps, distance, flights, heartRate, energy, calories };
};

export default useHealthData;
