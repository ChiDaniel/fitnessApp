import { View } from "react-native";
import { Svg, Circle, CircleProps } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
  marginBottom?: number;
  padding?: number;
};

const color = "#EE0F55";

const RingProgress = ({
  radius = 100,
  marginBottom = 20,
  strokeWidth = 25,
  //padding = 10,
  progress,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  const circleDefaultProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    strokeWidth: strokeWidth,
    stroke: color,
    strokeLinecap: "round",
    rotation: "-90",
    fill: "transparent",
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
        marginBottom: marginBottom,
      }}
    >
      <Svg>
        {/* Background */}
        <Circle {...circleDefaultProps} opacity={0.2} />

        {/* Foreground */}
        <AnimatedCircle
          animatedProps={animatedProps}
          {...circleDefaultProps}
          //fill={"#f0f0f0"}
        />

        {/* Progress */}
        {/* <Circle {...circleDefaultProps} opacity={0.2} /> */}
      </Svg>

      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1,
        }}
      />
    </View>
  );
};

export default RingProgress;
