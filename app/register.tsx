import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { router } from "expo-router";
import { authApi } from "../src/api/auth.api";
import { RegisterRequestDTO } from "../src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestDTO>();

  const onSubmit = async (data: RegisterRequestDTO) => {
    setLoading(true);
    try {
      const response = await authApi.register(data);
      await AsyncStorage.setItem("authToken", response.data.token);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || error.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20, color: "#000" }}>
        Register
      </Text>

      <Controller
        control={control}
        name="firstName"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
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
      {errors.firstName && (
        <Text style={{ color: "red", marginBottom: 5 }}>
          First name is required
        </Text>
      )}

      <Controller
        control={control}
        name="lastName"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
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
      {errors.lastName && (
        <Text style={{ color: "red", marginBottom: 5 }}>
          Last name is required
        </Text>
      )}

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
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 5 }}>Email is required</Text>
      )}

      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Username"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
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
      {errors.username && (
        <Text style={{ color: "red", marginBottom: 5 }}>
          Username is required
        </Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
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
              marginBottom: 10,
              color: "#000",
            }}
          />
        )}
      />
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 5 }}>
          Password is required (min 6 characters)
        </Text>
      )}

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Phone Number (optional)"
            placeholderTextColor="#999"
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
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

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ gap: 10 }}>
          <Button title="Register" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Back to Login"
            onPress={() => router.back()}
            color="#666"
          />
        </View>
      )}
    </ScrollView>
  );
}
