import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {mainColors} from '../../utils/styles/styles.utils';

export type CustomButtonProps = {
  handleOnPress: () => void;
  text: string;
  buttonStyle?: ViewStyle; // Define a customStyle prop of type ViewStyle
  textStyle?: TextStyle; // Define a customStyle prop of type ViewStyle
};
const CustomButton: FC<CustomButtonProps> = ({
  handleOnPress,
  text,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: mainColors.secondary,
        borderRadius: 50,
        ...buttonStyle,
      }}
      onPress={handleOnPress}>
      <Text
        style={{
          fontFamily: 'ShadowsIntoLight-Regular',
          color: mainColors.primary,
          fontWeight: 'bold',
          fontSize: 16,
          textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color of the drop shadow
          textShadowOffset: {width: 2, height: 2}, // Offset of the drop shadow
          textShadowRadius: 5, // Radius of the drop shadow
          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
