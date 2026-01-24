import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import http from '../../src/api/http';

export default function HomeScreen() {
  const [secretMessage, setSecretMessage] = useState<string | null>(null);

  const fetchSecret = async () => {
    try {
      const response = await http.get<string>('/secret');
      setSecretMessage(response.data);
    } catch (error: any) {
      setSecretMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Get Secret" onPress={fetchSecret} />
      {secretMessage && (
        <Text style={styles.secret}>{secretMessage}</Text>
      )}
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
});
