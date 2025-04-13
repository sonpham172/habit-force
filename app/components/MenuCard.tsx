import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import React from 'react';

export const MenuCard = ({ icon, title, count }: { icon: any; title: string; count: number }) => (
  <BlurView intensity={60} tint="light" style={styles.menuCard}>
    <View style={styles.menuContent}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={24} color={Colors.light.primary} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.menuRight}>
        <Text style={styles.menuCount}>{count}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.light.gray} />
      </View>
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    padding: 20,
    paddingTop: 60,
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
}); 