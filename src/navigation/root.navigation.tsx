// Assuming you have imported the necessary dependencies correctly
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from '../store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/home.screen';
import Inventory from '../screens/inventory/inventory.screen';
import Product from '../screens/product/product.screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globalStyles} from '../utils/styles/styles.utils';

const Stack = createStackNavigator();
const Navigation: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider style={globalStyles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="HomeScreen" component={Home} />
              <Stack.Screen name="InventoryScreen" component={Inventory} />
              <Stack.Screen name="ProductScreen" component={Product} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Navigation;
