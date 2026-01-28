import { View, Text } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface ToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const baseContainerStyle = "mx-4 p-4 rounded-xl shadow-lg flex-row items-start";
const titleStyle = "text-base font-semibold";
const textStyle = "text-sm mt-1";

function SuccessToast({ text1, text2 }: ToastProps) {
  return (
    <View className={`${baseContainerStyle} bg-success`}>
      <View className="flex-1">
        {text1 && <Text className={`${titleStyle} text-white`}>{text1}</Text>}
        {text2 && <Text className={`${textStyle} text-white/90`}>{text2}</Text>}
      </View>
    </View>
  );
}

function ErrorToast({ text1, text2 }: ToastProps) {
  return (
    <View className={`${baseContainerStyle} bg-error`}>
      <View className="flex-1">
        {text1 && <Text className={`${titleStyle} text-white`}>{text1}</Text>}
        {text2 && <Text className={`${textStyle} text-white/90`}>{text2}</Text>}
      </View>
    </View>
  );
}

function WarningToast({ text1, text2 }: ToastProps) {
  return (
    <View className={`${baseContainerStyle} bg-warning`}>
      <View className="flex-1">
        {text1 && <Text className={`${titleStyle} text-gray-900`}>{text1}</Text>}
        {text2 && <Text className={`${textStyle} text-gray-800`}>{text2}</Text>}
      </View>
    </View>
  );
}

function InfoToast({ text1, text2 }: ToastProps) {
  return (
    <View className={`${baseContainerStyle} bg-primary`}>
      <View className="flex-1">
        {text1 && <Text className={`${titleStyle} text-white`}>{text1}</Text>}
        {text2 && <Text className={`${textStyle} text-white/90`}>{text2}</Text>}
      </View>
    </View>
  );
}

export const toastConfig = {
  success: (props: ToastProps) => <SuccessToast {...props} />,
  error: (props: ToastProps) => <ErrorToast {...props} />,
  warning: (props: ToastProps) => <WarningToast {...props} />,
  info: (props: ToastProps) => <InfoToast {...props} />,
};
