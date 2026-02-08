import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "../src/hooks";
import { authService, toastService } from "../src/services";
import { VERIFY_STRINGS, ROUTES, A11Y_STRINGS } from "../src/constants";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, VerifyHeader } from "../src/components";
import { CodeInput } from "../src/components/forms/CodeInput";

const RESEND_COOLDOWN = 60;

interface VerifyFormData {
  code: string;
}

export default function VerifyCodeScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm<VerifyFormData>();
  const { seconds, isFinished, reset } = useCountdown(RESEND_COOLDOWN);

  const code = watch("code", "");
  const isCodeComplete = code.length === 6;

  const onSubmit = async (data: VerifyFormData) => {
    setLoading(true);
    try {
      const response = await authService.verifyCode(data);

      if (response.token) {
        toastService.success(VERIFY_STRINGS.VERIFICATION_SUCCESS);
        router.replace(`/${ROUTES.TABS}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    // if (!isFinished) return;
    // try {
    //   // await authApi.resendCode(); // Ako postoji
    //   toastService.success("Code sent", "Check your email");
    //   reset();
    // } catch {
    //   // Error handled by interceptor
    // }
  };
  return (
    <View className="flex-1 bg-background">
      <VerifyHeader email={email || ""} />

      <View className="px-6 pt-12">
        <Text className="text-text-secondary text-center mb-6">
          {VERIFY_STRINGS.ENTER_CODE}
        </Text>

        <CodeInput control={control} name="code" length={6} />

        <View className="mt-8">
          <Button
            title={VERIFY_STRINGS.VERIFY_BUTTON}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={!isCodeComplete}
            accessibilityLabel={A11Y_STRINGS.VERIFY_BUTTON}
          />
        </View>

        <View className="items-center mt-8">
          <Text className="text-text-secondary">
            {VERIFY_STRINGS.DIDNT_RECEIVE}
          </Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={!isFinished}
            accessibilityLabel={A11Y_STRINGS.RESEND_CODE_BUTTON}
          >
            <Text
              className={`mt-1 font-medium ${
                isFinished ? "text-primary" : "text-text-muted"
              }`}
            >
              {isFinished
                ? VERIFY_STRINGS.RESEND_CODE
                : `${VERIFY_STRINGS.RESEND_CODE_IN} ${seconds}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
