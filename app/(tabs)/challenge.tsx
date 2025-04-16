import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import SubLayout, { ELayoutType } from '@/components/SubLayout';

export default function ChallengeScreen() {
  return (
    <SubLayout image={ELayoutType.WELCOME}>
      <View style={styles.container}>
        <Text style={styles.title}>Challenge</Text>
      </View>
    </SubLayout>
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
}); 