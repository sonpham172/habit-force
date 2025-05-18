import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { Habit } from '@/app/types/habit';
import { useHabitCompletion } from '@/app/hooks/useHabitCompletion';

interface HabitItemProps {
  habit: Habit;
  onPress?: (habit: Habit) => void;
}

export default function HabitItem({ habit, onPress }: HabitItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { completeHabit, isLoading } = useHabitCompletion();

  // Check if today's date is in completedDates
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates?.includes(today);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    if (!isCompletedToday) {
      completeHabit(habit._id);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress?.(habit)}
      activeOpacity={0.7}
    >
      <View style={styles.habitInfo}>
        <Text style={styles.name}>{habit.name}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={colors.gray} />
            <Text style={styles.detailText}>{habit.currentProgress}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons 
              name={habit.frequency === 'daily' ? 'calendar' : 'calendar-outline'} 
              size={16} 
              color={colors.gray} 
            />
            <Text style={styles.detailText}>{habit.frequency}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="stats-chart" size={16} color={colors.gray} />
            <Text style={styles.detailText}>
              {habit.completedDates?.length || 0}/{habit.targetDays}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.checkbox,
          isCompletedToday && { backgroundColor: colors.primary }
        ]}
        onPress={handleToggle}
        disabled={isLoading || isCompletedToday}
      >
        {isCompletedToday && (
          <Ionicons name="checkmark" size={20} color={colors.white} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    display: 'flex',
    width: width - 40,
  },
  habitInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.light.gray,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 