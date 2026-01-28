import { useState } from 'react';
import { View, Text } from 'react-native';
import http from '../../src/api/http';
import { useAuth } from '../../src/store/AuthContext';
import { Button } from '../../src/components/ui';
import { toastService, confirmService } from '../../src/services';

export default function HomeScreen() {
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchSecret = async () => {
    try {
      const response = await http.get<string>('/secret');
      setSecretMessage(response.data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setSecretMessage('Error: ' + message);
    }
  };

  const handleLogout = async () => {
    const confirmed = await confirmService.yesNo('Logout', 'Are you sure you want to logout?');
    if (confirmed) {
      await logout();
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-5">Home</Text>

      <View className="w-full gap-3 mb-8">
        <Button
          title="Confirm Dialog"
          onPress={async () => {
            const result = await confirmService.delete('Delete Item', 'Are you sure you want to delete this item?');
            toastService.info('Result', result ? 'Confirmed' : 'Cancelled');
          }}
          variant="outline"
        />
      </View>

      <View className="w-full gap-3 mb-8">
        <Text className="text-lg font-semibold text-text-primary mb-2">Toast Demo</Text>
        <Button
          title="Success Toast"
          onPress={() => toastService.success('Success', 'Operation completed successfully')}
          variant="primary"
        />
        <Button
          title="Error Toast"
          onPress={() => toastService.error('Error', 'Something went wrong')}
          variant="primary"
        />
        <Button
          title="Warning Toast"
          onPress={() => toastService.warning('Warning', 'Please check your input')}
          variant="primary"
        />
        <Button
          title="Info Toast"
          onPress={() => toastService.info('Info', 'New update available')}
          variant="primary"
        />
      </View>

      <View className="w-full gap-3">
        <Button title="Get Secret" onPress={fetchSecret} variant="secondary" />
        {secretMessage && (
          <Text className="text-base text-text-secondary mt-2">{secretMessage}</Text>
        )}
        <Button title="Logout" onPress={handleLogout} variant="outline" />
      </View>
    </View>
  );
}
