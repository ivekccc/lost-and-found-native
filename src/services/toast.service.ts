import Toast from "react-native-toast-message";
import { TOAST_DURATION, TOAST_POSITION, TOAST_TYPE, type ToastType } from "../constants/toast";

interface ToastOptions {
  duration?: number;
  onPress?: () => void;
  onHide?: () => void;
}

class ToastService {
  private show(type: ToastType, title: string, text?: string, options?: ToastOptions): void {
    Toast.show({
      type,
      text1: title,
      text2: text,
      position: TOAST_POSITION,
      visibilityTime: options?.duration ?? TOAST_DURATION.MEDIUM,
      onPress: options?.onPress,
      onHide: options?.onHide,
    });
  }

  success(title: string, text?: string, options?: ToastOptions): void {
    this.show(TOAST_TYPE.SUCCESS, title, text, options);
  }

  error(title: string, text?: string, options?: ToastOptions): void {
    this.show(TOAST_TYPE.ERROR, title, text, { duration: TOAST_DURATION.LONG, ...options });
  }

  warning(title: string, text?: string, options?: ToastOptions): void {
    this.show(TOAST_TYPE.WARNING, title, text, options);
  }

  info(title: string, text?: string, options?: ToastOptions): void {
    this.show(TOAST_TYPE.INFO, title, text, options);
  }

  hide(): void {
    Toast.hide();
  }
}

export const toastService = new ToastService();
