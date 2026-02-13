import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { authService } from "../src/services";
import { AuthRequestDTO } from "@lost-and-found/api";
import { AuthHeader } from "../src/components/auth";

import { FormInput, PasswordInput } from "../src/components/forms";
import { Button, Divider } from "../src/components/ui";
import {
  AUTH_STRINGS,
  VALIDATION_RULES,
  A11Y_STRINGS,
  COMMON_STRINGS,
} from "../src/constants";

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm<AuthRequestDTO>();

  const onSubmit = async (data: AuthRequestDTO) => {
    await authService.login(data);
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
              disabled={formState.isSubmitting}
            />

            <PasswordInput
              control={control}
              name="password"
              placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER}
              rules={VALIDATION_RULES.password}
              disabled={formState.isSubmitting}
            />

            <TouchableOpacity className="self-end my-4">
              <Text className="text-primary font-medium">
                {AUTH_STRINGS.FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>

            <View className="gap-3 mt-4">
              <Button
                title={AUTH_STRINGS.LOGIN_BUTTON}
                onPress={handleSubmit(onSubmit)}
                loading={formState.isSubmitting}
                accessibilityLabel={A11Y_STRINGS.LOGIN_BUTTON}
              />
              <Divider text={COMMON_STRINGS.OR} />
              <View className="flex-row justify-center">
                <Text className="text-text-secondary">
                  {AUTH_STRINGS.NO_ACCOUNT}
                </Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
                  <Text className="text-primary font-medium ml-1">
                    {A11Y_STRINGS.GO_TO_REGISTER}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
