import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Redirect, useRouter } from 'expo-router';
import { removeToken } from './utils/secureStore';
import { POST } from './hooks/useFetchData';
import { useAuth } from '@/components/auth/AuthProvider';
import LoadingScreen from '@/components/LoadingScreen';

export default function Index() {
  const router = useRouter();
  const {authState, loading} = useAuth();

  console.log('authState', authState, loading);
  const logout = async () => {
    const res = await POST(
      '/user/logout', 
      '',
      {
        email: 'finn@gmail.com',
        password: '123456789',
      }
    );

    console.log('Response:', res);
    if(!res.errors) {
      await removeToken();
      router.replace('/(auth)/login');
    }
  }

  if(loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!authState?.authenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>this is home screen</Text>
      <Button title='Logout' onPress={logout} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
