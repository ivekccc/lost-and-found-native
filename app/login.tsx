import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/store/AuthContext";
import { AuthRequestDTO } from "@lost-and-found/api";
import { AuthHeader } from "../src/components/auth";

import { FormInput } from "../src/components/forms";
import { Button } from "../src/components/ui";
import { AUTH_STRINGS, VALIDATION_RULES, A11Y_STRINGS } from "../src/constants";

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<AuthRequestDTO>();

  const onSubmit = async (data: AuthRequestDTO) => {
    setLoading(true);
    try {
      await login(data);
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
          className="flex-1"
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader subtitle={AUTH_STRINGS.LOGIN_HEADER_SUBTITLE} />
          <View className="px-6 pt-12">
            <FormInput
              control={control}
              name="email"
              placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER}
              rules={VALIDATION_RULES.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              accessibilityLabel={A11Y_STRINGS.EMAIL_INPUT}
              icon="envelope"
            />

            <FormInput
              control={control}
              name="password"
              placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER}
              rules={VALIDATION_RULES.password}
              secureTextEntry
              autoComplete="password"
              accessibilityLabel={A11Y_STRINGS.PASSWORD_INPUT}
              icon="lock"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
