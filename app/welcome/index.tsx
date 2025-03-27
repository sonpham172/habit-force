import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import SubLayout, { ELayoutType } from '@/components/SubLayout';
import ActionButton from '@/components/ActionButton';
import { removeToken } from '../utils/secureStore';

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <View style={styles.container}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <Text style={styles.mainTitle}>Habit Force</Text>
        <Text style={styles.subTitle}>Build better habit, one day a time!</Text>
        <ActionButton 
          title="Let's go"
          onPress={handleGetStarted}
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