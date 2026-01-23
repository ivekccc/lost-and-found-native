import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../src/store/AuthContext";
import { AuthRequestDTO } from "../src/types";

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<AuthRequestDTO>();

  const onSubmit = async (data: AuthRequestDTO) => {
    setLoading(true);
    try {
      await login(data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20, color: "#000" }}>
        Login
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 10,
              color: "#000",
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              marginBottom: 20,
              color: "#000",
            }}
          />
        )}
      />

      {errors.email && (
        <Text style={{ color: "red", marginBottom: 5 }}>Email is required</Text>
      )}
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 5 }}>Password is required</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  );
}
