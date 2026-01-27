import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../src/api/auth.api";
import { RegisterRequestDTO } from "../src/types";
import { FormInput } from "../src/components/forms";
import { Button } from "../src/components/ui";
import { AUTH_STRINGS, COMMON_STRINGS, VALIDATION_RULES, A11Y_STRINGS } from "../src/constants";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<RegisterRequestDTO>();

  const onSubmit = async (data: RegisterRequestDTO) => {
    setLoading(true);
    try {
      const response = await authApi.register(data);
      if (response.data.token && response.data.refreshToken) {
        await AsyncStorage.setItem("authToken", response.data.token);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      }
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        COMMON_STRINGS.ERROR_TITLE,
        error.response?.data?.message || error.message || AUTH_STRINGS.REGISTER_ERROR
      );
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
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8 bg-background"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-3xl font-bold text-text-primary mb-8">
            {AUTH_STRINGS.REGISTER_TITLE}
          </Text>

          <FormInput
            control={control}
            name="firstName"
            placeholder={AUTH_STRINGS.FIRST_NAME_PLACEHOLDER}
            rules={VALIDATION_RULES.firstName}
            autoComplete="given-name"
            accessibilityLabel={A11Y_STRINGS.FIRST_NAME_INPUT}
          />

          <FormInput
            control={control}
            name="lastName"
            placeholder={AUTH_STRINGS.LAST_NAME_PLACEHOLDER}
            rules={VALIDATION_RULES.lastName}
            autoComplete="family-name"
            accessibilityLabel={A11Y_STRINGS.LAST_NAME_INPUT}
          />

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
            name="username"
            placeholder={AUTH_STRINGS.USERNAME_PLACEHOLDER}
            rules={VALIDATION_RULES.username}
            autoCapitalize="none"
            autoComplete="username"
            accessibilityLabel={A11Y_STRINGS.USERNAME_INPUT}
          />

          <FormInput
            control={control}
            name="password"
            placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER}
            rules={VALIDATION_RULES.password}
            secureTextEntry
            autoComplete="new-password"
            accessibilityLabel={A11Y_STRINGS.PASSWORD_INPUT}
          />

          <FormInput
            control={control}
            name="phoneNumber"
            placeholder={AUTH_STRINGS.PHONE_PLACEHOLDER}
            rules={VALIDATION_RULES.phoneNumber}
            keyboardType="phone-pad"
            autoComplete="tel"
            accessibilityLabel={A11Y_STRINGS.PHONE_INPUT}
          />

          <View className="gap-3 mt-4">
            <Button
              title={AUTH_STRINGS.REGISTER_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              accessibilityLabel={A11Y_STRINGS.REGISTER_BUTTON}
            />
            <Button
              title={AUTH_STRINGS.LOGIN_BUTTON}
              onPress={() => router.back()}
              variant="outline"
              accessibilityLabel={A11Y_STRINGS.GO_TO_LOGIN}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
