import { useState, useEffect } from "react";
import { TextInput, Text, View, TextInputProps, Pressable } from "react-native";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useWatch,
} from "react-hook-form";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme, usePasswordToggle } from "../../hooks";
import { primary, lightTheme, darkTheme, ICON_SIZES } from "../../constants";

const LABEL_POSITION = { unfocused: 16, focused: 4 };
const LABEL_FONT_SIZE = { unfocused: 14, focused: 11 };
const ICON_SPACING = 12;
const BASE_PADDING = 16;
const PADDING_WITH_ICON = BASE_PADDING + ICON_SIZES.md + ICON_SPACING;
const ANIMATION_DURATION = 200;

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
  secureTextEntry,
  ...rest
}: FormInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const value = useWatch({ control, name });
  const passwordToggle = usePasswordToggle();

  const isActive = isFocused || !!value;
  const animatedValue = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withTiming(isActive ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [isActive, animatedValue]);

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    top:
      LABEL_POSITION.unfocused +
      (LABEL_POSITION.focused - LABEL_POSITION.unfocused) * animatedValue.value,
    fontSize:
      LABEL_FONT_SIZE.unfocused +
      (LABEL_FONT_SIZE.focused - LABEL_FONT_SIZE.unfocused) *
        animatedValue.value,
  }));

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
                size={ICON_SIZES.md}
                color={isFocused ? primary[500] : theme.textMuted}
                style={{
                  position: "absolute",
                  left: BASE_PADDING,
                  top: "50%",
                  transform: [{ translateY: -ICON_SIZES.md / 2 }],
                  zIndex: 1,
                }}
              />
            )}
            <Animated.Text
              className={isFocused ? "text-primary" : "text-text-muted"}
              style={[
                {
                  position: "absolute",
                  left: icon ? PADDING_WITH_ICON : BASE_PADDING,
                  zIndex: 1,
                },
                labelAnimatedStyle,
              ]}
            >
              {placeholder}
            </Animated.Text>
            <TextInput
              ref={secureTextEntry ? passwordToggle.inputRef : undefined}
              onChangeText={onChange}
              onBlur={() => {
                setIsFocused(false);
                passwordToggle.hide();
                onBlur();
              }}
              onFocus={() => setIsFocused(true)}
              value={value}
              className={`
                border-2 rounded-lg pt-6 pb-2 text-text bg-input
                ${error ? "border-error" : isFocused ? "border-primary" : "border-border"}
              `}
              secureTextEntry={
                secureTextEntry && passwordToggle.secureTextEntry
              }
              style={{
                paddingLeft: icon ? PADDING_WITH_ICON : BASE_PADDING,
                paddingRight: secureTextEntry
                  ? PADDING_WITH_ICON
                  : BASE_PADDING,
              }}
              {...rest}
            />
            {secureTextEntry && (
              <Pressable
                onPress={passwordToggle.toggle}
                accessibilityLabel={
                  passwordToggle.isVisible ? "Hide password" : "Show password"
                }
                style={{
                  position: "absolute",
                  right: BASE_PADDING,
                  top: "50%",
                  transform: [{ translateY: -ICON_SIZES.md / 2 }],
                }}
              >
                <FontAwesome
                  name={passwordToggle.isVisible ? "eye-slash" : "eye"}
                  size={ICON_SIZES.md}
                  color={theme.textMuted}
                />
              </Pressable>
            )}
          </View>
          {error && (
            <Text className="text-error text-xs mt-1">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
