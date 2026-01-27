import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: "bg-primary",
    text: "text-white",
  },
  secondary: {
    container: "bg-secondary",
    text: "text-white",
  },
  outline: {
    container: "bg-transparent border border-primary",
    text: "text-primary",
  },
};

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  accessibilityLabel,
}: ButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className={`
        rounded-lg py-4 items-center justify-center
        ${styles.container}
        ${isDisabled ? "opacity-50" : ""}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#007AFF" : "#FFFFFF"} />
      ) : (
        <Text className={`font-semibold text-base ${styles.text}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
