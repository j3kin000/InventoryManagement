import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root.navigation';
import {globalStyles} from '../../utils/styles/styles.utils';
import {InventoryTopTabNavigator} from '../../navigation/top-tabs';
import CustomBackButton from '../../components/custom-back-button/custom-back-button';

export type InventoryProps = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryScreen'>;
  route: RouteProp<RootStackParamList, 'InventoryScreen'>;
};
const Inventory: FC<InventoryProps> = ({navigation, route}) => {
  const inventory = route.params.inventory;

  return (
    <View style={globalStyles.container}>
      <CustomBackButton navigation={navigation} />
      <InventoryTopTabNavigator initialData={inventory} />
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({});
