import { View } from "react-native";
import { ReactNode } from "react";
import { ComponentSize } from "../../constants";

interface CurvedHeaderProps {
  children: ReactNode;
  size?: ComponentSize;
}

const SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: "pt-10 pb-8 rounded-b-[30px]",
  lg: "pt-16 pb-12 rounded-b-[40px]",
};

export function CurvedHeader({ children, size = "lg" }: CurvedHeaderProps) {
  return (
    <View
      className={`bg-primary items-center ${SIZE_CLASSES[size]}`}
      accessibilityRole="header"
    >
      {children}
    </View>
  );
}
