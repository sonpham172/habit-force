import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import SubLayout, { ELayoutType } from '@/components/SubLayout';

export default function HomeScreen() {
  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 