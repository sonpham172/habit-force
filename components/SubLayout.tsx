import Colors from "@/constants/Colors";
import { View, ActivityIndicator, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export enum ELayoutType {
  WELCOME,
  LOGO
}

const images = {
  [ELayoutType.WELCOME]: require("../assets/images/welcome-bg.png"),
  [ELayoutType.LOGO]: require("../assets/images/icon.png"),
};

interface ISubLayout {
  image: ELayoutType,
  children: React.ReactNode
}
export default function SubLayout({ image, children }: ISubLayout) {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={images[image]} style={styles.backgroundImage}/>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
    position: 'absolute',
  }
});
