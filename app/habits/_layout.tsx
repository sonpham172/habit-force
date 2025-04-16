import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function HabitsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 