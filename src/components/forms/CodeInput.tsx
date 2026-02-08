import { useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import { TextInput, View } from "react-native";

interface CodeInputProps {
  control: Control<any>;
  name: string;
  length: number;
  onComplete?: (code: string) => void;
}

export function CodeInput({
  control,
  name,
  length = 6,
  onComplete,
}: CodeInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const handleChange = (text: string, index: number) => {
    const char = text
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(-1)
      .toUpperCase();

    const newValues = [...values];
    newValues[index] = char;
    setValues(newValues);

    const code = newValues.join("");
    field.onChange(code);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (code.length === length && onComplete) {
      onComplete(code);
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <View className="flex-row justify-between gap-2">
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={values[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="default"
            autoCapitalize="characters"
            maxLength={1}
            selectTextOnFocus
            className="flex-1 h-14 bg-surface border border-border rounded-lg text-center text-xl text-text font-semibold"
            accessibilityLabel={`Digit ${index + 1}`}
          />
        ))}
    </View>
  );
}
