import { View, Text, Modal, Pressable } from "react-native";

export interface MessageModalConfig {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

interface MessageModalProps {
  visible: boolean;
  config: MessageModalConfig | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MessageModal({ visible, config, onConfirm, onCancel }: MessageModalProps) {
  if (!config) return null;

  const { title, message, confirmText = "Confirm", cancelText = "Cancel", destructive = false } = config;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl mx-6 w-[85%] max-w-sm overflow-hidden shadow-xl">
          <View className="p-6">
            <Text className="text-xl font-bold text-gray-900 text-center">{title}</Text>
            {message && (
              <Text className="text-base text-gray-600 text-center mt-3">{message}</Text>
            )}
          </View>

          <View className="flex-row border-t border-gray-200">
            <Pressable
              onPress={onCancel}
              className="flex-1 py-4 border-r border-gray-200 active:bg-gray-100"
            >
              <Text className="text-base font-medium text-gray-600 text-center">{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className="flex-1 py-4 active:bg-gray-100"
            >
              <Text
                className={`text-base font-semibold text-center ${
                  destructive ? "text-error" : "text-primary"
                }`}
              >
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
