import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { getGreeting } from '@/app/utils/time';
import Colors from '@/constants/Colors';
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import { useHabits } from '../hooks/useHabits';
import HabitItem from '../components/HabitItem';

export default function HomeScreen() {
  const greeting = getGreeting();
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const { data: user, isLoading: isLoadingProfile } = useProfile();
  console.log('userss', user?._id);
  
  const { data: habits, isLoading: isLoadingHabits } = useHabits({userId: user?._id ?? ''});


  const handleToggleHabit = (habitId: string) => {
    // TODO: Implement habit toggle
    console.log('Toggle habit:', habitId);
  };

  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <BlurView intensity={60} tint="light" style={styles.greetingCard}>
            <Ionicons name="sunny" size={40} color="#FFD700" style={styles.weatherIcon} />
            <View style={styles.greetingContent}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.username}>{user?.username}</Text>
            </View>
            <Text style={styles.time}>{currentTime}</Text>
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.streakCard}>
            <View style={styles.streakContent}>
              <Ionicons name="water" size={24} color="#4FC3F7" />
              <Text style={styles.streakText}>Streak: 5 Days!</Text>
            </View>
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.progressCard}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressDays}>5 Days!</Text>
          </BlurView>
        </View>

        {/* <View style={styles.menuSection}>
          <MenuCard icon="bar-chart" title="View Progress" count={20} />
          <MenuCard icon="stats-chart" title="View Progress" count={20} />
          <MenuCard icon="trophy" title="Challenges" count={20} />
          <MenuCard icon="flag" title="Challenges" count={30} />
          <MenuCard icon="settings" title="Settings" count={33} />
        </View> */}

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle  }>Today's Habits</Text>
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
    width: '100%',
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 20,
  },
  greetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  greetingContent: {
    flex: 1,
    marginLeft: 15,
  },
  greeting: {
    fontSize: 16,
    color: Colors.light.gray,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  time: {
    fontSize: 16,
    color: Colors.light.gray,
  },
  weatherIcon: {
    marginRight: 10,
  },
  streakCard: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  progressCard: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  progressTitle: {
    fontSize: 16,
    color: Colors.light.gray,
    marginBottom: 5,
  },
  progressDays: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  menuSection: {
    padding: 20,
  },
  menuCard: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuCount: {
    marginRight: 5,
    fontSize: 16,
    color: Colors.light.gray,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.gray,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.gray,
  },
}); 