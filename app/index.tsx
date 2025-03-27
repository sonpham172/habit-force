import { Button, ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { removeToken } from './utils/secureStore';
import { POST } from './hooks/useFetchData';
import { useAuth } from '@/components/auth/AuthProvider';
import LoadingScreen from '@/components/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import ActionButton from '@/components/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const { authState, loading } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTimeAccess = async () => {
      try {
        const hasVisited = await AsyncStorage.getItem('hasVisited');
        if (!hasVisited) {
          await AsyncStorage.setItem('hasVisited', 'true');
          setIsFirstTime(true);
        } else {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error('Error checking first time access:', error);
        setIsFirstTime(false);
      }
    };

    checkFirstTimeAccess();
  }, []);

  useEffect(() => {
    if (!loading && isFirstTime !== null) {
      if (!authState?.authenticated) {
        if (isFirstTime) {
          router.replace('/welcome');
        } else {
          router.replace('/(auth)/login');
        }
      } else {
        router.replace('/home');
      }
    }
  }, [loading, authState?.authenticated, isFirstTime]);

  if (loading || isFirstTime === null) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  buttonLetgo: {
    backgroundColor: 'red',
    padding: 10
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: "center",
    color: '#333',
  },
});
