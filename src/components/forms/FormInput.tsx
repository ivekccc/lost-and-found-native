import { useState, useRef, useEffect } from "react";
import { TextInput, Text, View, TextInputProps, Animated } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useWatch,
} from "react-hook-form";

const LABEL_POSITION = { unfocused: 16, focused: 6 };
const LABEL_FONT_SIZE = { unfocused: 14, focused: 11 };

interface FormInputProps<T extends FieldValues> extends Omit<
  TextInputProps,
  "value" | "onChangeText"
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  placeholder,
  ...rest
}: FormInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const value = useWatch({ control, name });
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedValue]);

  const labelTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_POSITION.unfocused, LABEL_POSITION.focused],
  });

  const labelFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_FONT_SIZE.unfocused, LABEL_FONT_SIZE.focused],
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="mb-4">
          <View className="relative">
            <Animated.Text
              className={isFocused ? "text-primary" : "text-text-muted"}
              style={{
                position: "absolute",
                left: 16,
                top: labelTop,
                fontSize: labelFontSize,
                zIndex: 1,
              }}
            >
              {placeholder}
            </Animated.Text>
            <TextInput
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onFocus={() => setIsFocused(true)}
              value={value}
              className={`
                border-2 rounded-lg px-4 pt-6 pb-2 text-text bg-input
                ${error ? "border-error" : isFocused ? "border-primary" : "border-border"}
              `}
              {...rest}
            />
          </View>
          {error && (
            <Text className="text-error text-xs mt-1">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
