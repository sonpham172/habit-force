import { Stack } from 'expo-router';

export default function WelcomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false,}} />
    </Stack>
  );
} 