// app/index.tsx
import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(true);
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect based on authentication status
  return isAuthenticated ? 
    <Redirect href="/home" /> : 
    <Redirect href="/login" />;
}