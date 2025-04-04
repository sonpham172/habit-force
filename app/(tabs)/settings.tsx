import { StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { View } from '@/components/Themed';
import { Text } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useProfile } from '../hooks/useProfile';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [showFAQ, setShowFAQ] = useState(false);
  const {onLogout} = useAuth();
  const userQuery = useProfile();
  const user = userQuery.data;
  const version = '1.0.0';

  // Generate random avatar color
  const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  const initials = 'F'; // Get from user name

  return (
    <View style={styles.container}>

      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: randomColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>

      <View style={styles.faqSection}>
        <TouchableOpacity 
          style={styles.faqButton}
          onPress={() => setShowFAQ(!showFAQ)}
        >
          <Text style={styles.settingText}>Frequently Asked Questions</Text>
        </TouchableOpacity>
        {showFAQ && (
          <View style={styles.faqContent}>
            <Text style={styles.faqQuestion}>How do I change my password?</Text>
            <Text style={styles.faqAnswer}>Tap the "Change Password" button above and follow the prompts.</Text>
            <Text style={styles.faqQuestion}>How do I update my profile?</Text>
            <Text style={styles.faqAnswer}>Use the "Edit Profile" button to modify your information.</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.versionText}>Version {version}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingText: {
    fontSize: 16,
  },
  faqSection: {
    marginTop: 20,
  },
  faqButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  faqContent: {
    padding: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  bottomSection: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 