import { Button, ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Redirect, useRouter } from 'expo-router';
import { removeToken } from '../utils/secureStore';
import { useAuth } from '@/components/auth/AuthProvider';
import LoadingScreen from '@/components/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import ActionButton from '@/components/ActionButton';

export default function HomePage() {
  const router = useRouter();
  const {authState, loading} = useAuth();

  console.log('authState', authState, loading);
  const logout = async () => {
    await removeToken();
    router.replace('/(auth)/login');
    // const res = await POST(
    //   '/user/logout', 
    //   '',
    //   {
    //     email: 'finn@gmail.com',
    //     password: '123456789',
    //   }
    // );

    // console.log('Response:', res);
    // if(!res.errors) {
    //   await removeToken();
    //   router.replace('/(auth)/login');
    // }
  }

  if(loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!authState?.authenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <View style={styles.container}>
        {/* Replace with your actual logo */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <Text style={styles.mainTitle}>Home Page</Text>
        <Text style={styles.subTitle}>This is homepage!</Text>
        <ActionButton 
          title="Log out"
          onPress={logout}

        />
      </View>
    </SubLayout>
  );
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
