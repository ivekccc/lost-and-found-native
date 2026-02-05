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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "../../hooks/useColorScheme";
import { primary, lightTheme, darkTheme } from "../../constants/theme";

const LABEL_POSITION = { unfocused: 16, focused: 4 };
const LABEL_FONT_SIZE = { unfocused: 14, focused: 11 };
const ICON_SIZE = 20;
const ICON_SPACING = 12;
const BASE_PADDING = 16;
const PADDING_WITH_ICON = BASE_PADDING + ICON_SIZE + ICON_SPACING;

interface FormInputProps<T extends FieldValues> extends Omit<
  TextInputProps,
  "value" | "onChangeText"
> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  icon,
  ...rest
}: FormInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
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
            {icon && (
              <FontAwesome
                name={icon}
                size={ICON_SIZE}
                color={isFocused ? primary[500] : theme.textMuted}
                style={{
                  position: "absolute",
                  left: BASE_PADDING,
                  top: "50%",
                  transform: [{ translateY: -ICON_SIZE / 2 }],
                  zIndex: 1,
                }}
              />
            )}
            <Animated.Text
              className={isFocused ? "text-primary " : "text-text-muted"}
              style={{
                position: "absolute",
                left: icon ? PADDING_WITH_ICON : BASE_PADDING,
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
                border-2 rounded-lg pt-6 pb-2 text-text bg-input
                ${error ? "border-error" : isFocused ? "border-primary" : "border-border"}
              `}
              style={{
                paddingLeft: icon ? PADDING_WITH_ICON : BASE_PADDING,
                paddingRight: BASE_PADDING,
              }}
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
