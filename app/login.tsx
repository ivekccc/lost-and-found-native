import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/store/AuthContext";
import { AuthRequestDTO } from "../src/types";
import { FormInput } from "../src/components/forms";
import { Button } from "../src/components/ui";
import { AUTH_STRINGS, COMMON_STRINGS, VALIDATION_RULES, A11Y_STRINGS } from "../src/constants";

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<AuthRequestDTO>();

  const onSubmit = async (data: AuthRequestDTO) => {
    setLoading(true);
    try {
      await login(data);
    } catch (error: unknown) {
      const message = error instanceof Error
        ? error.message
        : AUTH_STRINGS.LOGIN_ERROR;

      Alert.alert(COMMON_STRINGS.ERROR_TITLE, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6 bg-background">
          <Text className="text-3xl font-bold text-text-primary mb-8">
            {AUTH_STRINGS.LOGIN_TITLE}
          </Text>

          <FormInput
            control={control}
            name="email"
            placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER}
            rules={VALIDATION_RULES.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessibilityLabel={A11Y_STRINGS.EMAIL_INPUT}
          />

          <FormInput
            control={control}
            name="password"
            placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER}
            rules={VALIDATION_RULES.password}
            secureTextEntry
            autoComplete="password"
            accessibilityLabel={A11Y_STRINGS.PASSWORD_INPUT}
          />

          <View className="gap-3 mt-4">
            <Button
              title={AUTH_STRINGS.LOGIN_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              accessibilityLabel={A11Y_STRINGS.LOGIN_BUTTON}
            />
            <Button
              title={AUTH_STRINGS.REGISTER_BUTTON}
              onPress={() => router.push("/register")}
              variant="outline"
              accessibilityLabel={A11Y_STRINGS.GO_TO_REGISTER}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
