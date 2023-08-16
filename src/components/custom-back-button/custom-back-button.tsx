import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {mainColors} from '../../utils/styles/styles.utils';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root.navigation';
import {StackNavigationProp} from '@react-navigation/stack';

export type CustomBackButtonProps = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryScreen'>;
};
const CustomBackButton: FC<CustomBackButtonProps> = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      style={{margin: 20, alignItems: 'flex-start', justifyContent: 'center'}}
      onPress={goBack}>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: mainColors.grey,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={32}
          color={mainColors.secondary}
          style={{padding: 0, margin: 0, alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomBackButton;

const styles = StyleSheet.create({});
