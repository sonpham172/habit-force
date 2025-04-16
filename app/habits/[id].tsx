import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <BlurView intensity={60} tint="light" style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="fitness" size={24} color={Colors.light.primary} />
          <Text style={styles.title}>Habit Details</Text>
        </View>
        <Text style={styles.id}>ID: {id}</Text>
        {/* TODO: Fetch and display habit details */}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.light.text,
  },
  id: {
    fontSize: 16,
    color: Colors.light.gray,
    marginBottom: 10,
  },
}); 