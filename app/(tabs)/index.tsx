import { useState } from 'react';
import { View, Text } from 'react-native';
import { http } from '../../src/api';
import { useMessage } from '../../src/store/MessageContext';
import { Button } from '../../src/components/ui';
import { authService, toastService } from '../../src/services';

export default function HomeScreen() {
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  const { confirm } = useMessage();

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
    const confirmed = await confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Yes',
      cancelText: 'No',
    });
    if (confirmed) {
      await authService.logout();
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Text className="text-2xl font-bold text-text mb-5">Home</Text>

      <View className="w-full gap-3 mb-8">
        <Text className="text-lg font-semibold text-text mb-2">Toast Demo</Text>
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
