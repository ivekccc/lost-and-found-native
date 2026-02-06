import { useRef, useState } from "react";
import { TextInput } from "react-native";

export function usePasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const toggle = () => {
    setIsVisible((prev) => !prev);
    inputRef.current?.focus();
  };
  return {
    isVisible,
    inputRef,
    toggle,
    secureTextEntry: !isVisible,
  };
}
