import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/store/AuthContext";
import { RegisterRequestDTO } from "@lost-and-found/api";
import { FormInput, FormCheckbox } from "../src/components/forms";
import { Button } from "../src/components/ui";
import {
  AUTH_STRINGS,
  VALIDATION_RULES,
  A11Y_STRINGS,
  LEGAL_STRINGS,
} from "../src/constants";

interface RegisterFormData extends RegisterRequestDTO {
  termsAccepted: boolean;
}

export default function RegisterScreen() {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const { termsAccepted, ...registerData } = data;
      await registerUser(registerData);
    } catch {
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

          <FormCheckbox
            control={control}
            name="termsAccepted"
            rules={VALIDATION_RULES.termsAccepted}
            accessibilityLabel={A11Y_STRINGS.TERMS_CHECKBOX}
          >
            <Text className="text-sm text-text-secondary leading-5">
              {LEGAL_STRINGS.TERMS_CHECKBOX_PREFIX}
              <Text
                className="text-primary underline"
                onPress={() => router.push("/terms")}
                accessibilityRole="link"
                accessibilityLabel={A11Y_STRINGS.TERMS_LINK}
              >
                {LEGAL_STRINGS.TERMS_LINK}
              </Text>
              {LEGAL_STRINGS.AND}
              <Text
                className="text-primary underline"
                onPress={() => router.push("/privacy")}
                accessibilityRole="link"
                accessibilityLabel={A11Y_STRINGS.PRIVACY_LINK}
              >
                {LEGAL_STRINGS.PRIVACY_LINK}
              </Text>
            </Text>
          </FormCheckbox>

          <View className="gap-3 mt-2">
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
