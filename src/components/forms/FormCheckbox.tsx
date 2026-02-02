import { ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  children: ReactNode;
  accessibilityLabel?: string;
}

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  rules,
  children,
  accessibilityLabel,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mb-4">
          <Pressable
            onPress={() => onChange(!value)}
            className="flex-row items-start gap-3"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!value }}
            accessibilityLabel={accessibilityLabel}
          >
            <View
              className={`
                w-6 h-6 rounded border-2 items-center justify-center mt-0.5
                ${value ? "bg-primary border-primary" : "bg-white border-border"}
                ${error ? "border-error" : ""}
              `}
            >
              {value && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <View className="flex-1">{children}</View>
          </Pressable>
          {error && (
            <Text className="text-error text-xs mt-2 ml-9">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
