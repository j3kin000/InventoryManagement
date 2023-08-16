import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Inventory from '../../screens/inventory/inventory.screen';
import Product from '../../screens/product/product.screen';
import Debt from '../../screens/debt/debt.screen';
import Info from '../../screens/info/info.screen';
import {InventoryProps} from '../../store/inventory/inventory.types';
import {FC} from 'react';

export type TopTabParamList = {
  Info: {data: InventoryProps};
  Product: {data: InventoryProps};
  Debt: {data: InventoryProps};
};

const Tab = createMaterialTopTabNavigator<TopTabParamList>();

export type InventoryTopTabNavigatorProps = {
  initialData: InventoryProps;
};
export const InventoryTopTabNavigator: FC<InventoryTopTabNavigatorProps> = ({
  initialData,
}) => {
  return (
    <Tab.Navigator initialRouteName="Info">
      <Tab.Screen
        name="Info"
        component={Info}
        initialParams={{data: initialData}}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        initialParams={{data: initialData}}
      />
      <Tab.Screen
        name="Debt"
        component={Debt}
        initialParams={{data: initialData}}
      />
    </Tab.Navigator>
  );
};
