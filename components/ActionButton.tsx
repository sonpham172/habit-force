import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ActionButton {
  title: string,
  onPress: ((event: GestureResponderEvent) => void) | undefined,
  disabled?: boolean,
  loading?: boolean,
  backgroundColor?: string,
  textColor?: string,
  borderRadius?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  style?: StyleProp<ViewStyle>, // extra style for button
  textStyle?: StyleProp<TextStyle>
}

export default function ActionButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  backgroundColor = '#fff',
  textColor = '#000',
  borderRadius = 16,
  paddingHorizontal = 12,
  paddingVertical = 8
}: ActionButton) {
  return(
    <TouchableOpacity
      style={[
        {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal,
          paddingVertical,
          borderRadius,
          backgroundColor: disabled ? '#CCCCCC' : backgroundColor,
        },
        style
      ]}
      onPress={onPress}
    >
      <View>
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <Text style={[
            styles.title,
            {
              color: textColor
            },
            textStyle
          ]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});