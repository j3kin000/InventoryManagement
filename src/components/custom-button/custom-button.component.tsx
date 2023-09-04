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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: mainColors.secondary,
        borderRadius: 20,
        ...buttonStyle,
      }}
      onPress={handleOnPress}>
      <Text
        style={{
          fontFamily: 'ShadowsIntoLight-Regular',
          color: mainColors.primary,
          fontWeight: 'bold',
          fontSize: 16,

          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
