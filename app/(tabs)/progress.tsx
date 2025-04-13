import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { getGreeting } from '@/app/utils/time';
import Colors from '@/constants/Colors';
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import { MenuCard } from '../components/MenuCard';
import { useHabits } from '../hooks/useHabits';
import HabitItem from '../components/HabitItem';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const MountainIllustration = () => (
  <View style={styles.illustrationContainer}>
    <LinearGradient
      colors={['#FF6B6B', '#FFB88C']}
      style={styles.sunsetGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Svg height="200" width={width - 40} viewBox="0 0 400 200">
        {/* Sun circle */}
        <Circle cx="200" cy="100" r="60" fill="#FFF" opacity="0.9" />
        {/* Mountains */}
        <Path
          d="M0 200 L150 80 L200 120 L300 40 L400 200 Z"
          fill="#2C3E50"
          opacity="0.8"
        />
      </Svg>
    </LinearGradient>
  </View>
);

const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) => (
  <BlurView intensity={60} tint="light" style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
  </BlurView>
);

export default function ProgressScreen() {
  

  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Streak Day Streak</Text>
            <View style={styles.iconContainer}>
              <Ionicons name="flame" size={24} color="#FF6B6B" />
            </View>
          </View>
          
          <MountainIllustration />

          <View style={styles.streakContainer}>
            <Text style={styles.streakTitle}>7 Day Streak</Text>
            <Text style={styles.streakSubtitle}>Keep going! You're doing great!</Text>
          </View>

          <View style={styles.statsGrid}>
            <StatCard title="Total Days" value="319" />
            <StatCard title="Streak" value="316" subtitle="Days" />
            <StatCard title="Best" value="320" subtitle="Days" />
          </View>

          <View style={styles.graphContainer}>
            {/* Add your graph component here */}
            <Text style={styles.graphTitle}>Progress Graph</Text>
          </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  illustrationContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  sunsetGradient: {
    flex: 1,
    padding: 20,
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  streakTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  streakSubtitle: {
    fontSize: 16,
    color: Colors.light.gray,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: (width - 60) / 3,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: Colors.light.gray,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: Colors.light.gray,
  },
  graphContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 20,
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