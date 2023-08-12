import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import {RouteProp} from '@react-navigation/native';

export type InventoryProps = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryScreen'>;
  route: RouteProp<RootStackParamList, 'InventoryScreen'>;
};
const Inventory: FC<InventoryProps> = ({navigation, route}) => {
  console.log('ROUTES', route.params.inventory);
  return (
    <View>
      <Text>Inventory</Text>
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({});
