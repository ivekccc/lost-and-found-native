import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import http from '../../src/api/http';
import { useAuth } from '../../src/store/AuthContext';

export default function HomeScreen() {
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchSecret = async () => {
    try {
      const response = await http.get<string>('/secret');
      setSecretMessage(response.data);
    } catch (error: any) {
      setSecretMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Get Secret" onPress={fetchSecret} />
      {secretMessage && (
        <Text style={styles.secret}>{secretMessage}</Text>
      )}
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff4444" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  secret: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    marginTop: 40,
  },
});
