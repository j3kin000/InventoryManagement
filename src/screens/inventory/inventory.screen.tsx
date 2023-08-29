import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root.navigation';
import {globalStyles} from '../../utils/styles/styles.utils';
import {InventoryTopTabNavigator} from '../../navigation/top-tabs';
import CustomBackButton from '../../components/custom-back-button/custom-back-button';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {fetchProductAsync} from '../../store/product/product.action';
import {fetchDebtAsync} from '../../store/debt/debt.action';

export type InventoryProps = {
  navigation: StackNavigationProp<RootStackParamList, 'InventoryScreen'>;
  route: RouteProp<RootStackParamList, 'InventoryScreen'>;
};
const Inventory: FC<InventoryProps> = ({navigation, route}) => {
  const inventory = route.params.inventory;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDebtAsync(inventory.uid));
    dispatch(fetchProductAsync(inventory.uid));
  }, []);

  return (
    <View style={globalStyles.container}>
      <CustomBackButton navigation={navigation} />
      <InventoryTopTabNavigator initialData={inventory} />
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({});
