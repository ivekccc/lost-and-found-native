import { Alert } from "react-native";
import { CONFIRM_BUTTONS, CONFIRM_STYLE } from "../constants/confirm";

interface ConfirmOptions {
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

class ConfirmService {
  confirm(title: string, message?: string, options?: ConfirmOptions): Promise<boolean> {
    const {
      confirmText = CONFIRM_BUTTONS.CONFIRM,
      cancelText = CONFIRM_BUTTONS.CANCEL,
      destructive = false,
    } = options ?? {};

    return new Promise((resolve) => {
      Alert.alert(title, message, [
        {
          text: cancelText,
          style: CONFIRM_STYLE.CANCEL,
          onPress: () => resolve(false),
        },
        {
          text: confirmText,
          style: destructive ? CONFIRM_STYLE.DESTRUCTIVE : CONFIRM_STYLE.DEFAULT,
          onPress: () => resolve(true),
        },
      ]);
    });
  }

  delete(title: string, message?: string): Promise<boolean> {
    return this.confirm(title, message, {
      confirmText: CONFIRM_BUTTONS.DELETE,
      destructive: true,
    });
  }

  yesNo(title: string, message?: string): Promise<boolean> {
    return this.confirm(title, message, {
      confirmText: CONFIRM_BUTTONS.YES,
      cancelText: CONFIRM_BUTTONS.NO,
    });
  }
}

export const confirmService = new ConfirmService();
