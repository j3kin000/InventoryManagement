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
import SplashScreen from '../screens/splash-screen/splash-screen';
import LockScreen from '../screens/lock-screen/lock-screen';
import {ProductProps} from '../database/product-table';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {InventoryProps} from '../store/inventory/inventory.types';
import {InventoryTopTabNavigator} from './top-tabs';
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 200,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
export type RootStackParamList = {
  SplashScreen: undefined;
  LockScreen: {pinStatus: 'choose' | 'enter' | 'locked' | undefined};
  InventoryScreen: {inventory: InventoryProps};
  HomeScreen: undefined;
  ProductScreen: {product: ProductProps};
};
const Stack = createStackNavigator<RootStackParamList>();

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
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen
                name="LockScreen"
                component={LockScreen}
                initialParams={{pinStatus: 'choose'}}
              />
              <Stack.Screen name="HomeScreen" component={Home} />
              <Stack.Screen
                name="InventoryScreen"
                component={Inventory}
                // options={{headerShown: true}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
      <Toast config={toastConfig} visibilityTime={5000} />
    </Provider>
  );
};

export default Navigation;
