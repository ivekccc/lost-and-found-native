import { TextInput, Text, View, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  placeholder,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4">
          {label && (
            <Text className="text-text-primary text-sm font-medium mb-1">
              {label}
            </Text>
          )}
          <TextInput
            placeholder={placeholder || label}
            placeholderTextColor="#999"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            className={`
              border rounded-lg px-4 py-3 text-text-primary bg-white
              ${error ? "border-error" : "border-border"}
            `}
            {...rest}
          />
          {error && (
            <Text className="text-error text-xs mt-1">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
