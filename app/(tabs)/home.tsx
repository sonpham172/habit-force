import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import { getGreeting } from '@/app/utils/time';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useHabits } from '../hooks/useHabits';
import HabitItem from '../components/HabitItem';

export default function HomeScreen() {
  const { data: user, isLoading: isLoadingProfile } = useProfile();
  console.log('userss', user?._id);
  
  const { data: habits, isLoading: isLoadingHabits } = useHabits({userId: user?._id ?? ''});
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const greeting = getGreeting();
  console.log('habits', habits);
  

  const handleToggleHabit = (habitId: string) => {
    // TODO: Implement habit toggle
    console.log('Toggle habit:', habitId);
  };

  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {isLoadingProfile ? (
            <Text style={styles.greeting}>Loading...</Text>
          ) : (
            <>
              <Text style={styles.greeting}>
                {greeting}, {user?.username}!
              </Text>
              <View style={styles.streakContainer}>
                <Ionicons name="flame" size={24} color={colors.primary} />
                <Text style={styles.streakText}>3 Day Streak</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.habitsSection}>
          <Text style={styles.sectionTitle}>Today's Habits</Text>
          {isLoadingHabits ? (
            <Text style={styles.loadingText}>Loading habits...</Text>
          ) : habits?.length === 0 ? (
            <Text style={styles.emptyText}>No habits for today</Text>
          ) : (
            habits?.map((habit) => (
              <HabitItem
                key={habit._id}
                habit={habit}
                onToggle={handleToggleHabit}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SubLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  habitsSection: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingText: {
    textAlign: 'center',
    color: Colors.light.gray,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.light.gray,
    marginTop: 20,
  },
}); 