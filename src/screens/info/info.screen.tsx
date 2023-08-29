import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {RouteProp} from '@react-navigation/native';
import {TopTabParamList} from '../../navigation/top-tabs';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  calculateTotalInvestment,
  calculateTotalProfit,
  formatToMoney,
  getDate,
  getDateDuration,
} from '../../utils/utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import {useSelector} from 'react-redux';
import {selectProduct} from '../../store/product/product.selector';
import {ProductProps} from '../../store/product/product.types';
import {selectDebt} from '../../store/debt/debt.selector';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {putInventoryAsync} from '../../store/inventory/inventory.action';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
export type InfoProps = {
  route: RouteProp<TopTabParamList, 'Info'>;
  navigation: StackNavigationProp<RootStackParamList, 'InventoryScreen'>;
};
const Info: FC<InfoProps> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const inventory = route.params.data;
  const products = useSelector(selectProduct);
  const debts = useSelector(selectDebt);
  const puhunan = useMemo(() => {
    return products.reduce((total: number, product: ProductProps) => {
      const result = parseFloat(
        calculateTotalInvestment(product.stock, product.originalPrice),
      );
      return result + total;
    }, 0);
  }, [products]);
  const ginansya = useMemo(() => {
    return products.reduce((total: number, product: ProductProps) => {
      const result = parseFloat(
        calculateTotalProfit(product.stock, product.salesPrice),
      );
      return result + total;
    }, 0);
  }, [products]);
  const isActive = useMemo(() => {
    return inventory.isActive;
  }, [inventory]);

  console.log('isActiveisActive', isActive);
  const onSubmitIsActive = () => {
    const updatedInventory = {...inventory, isActive: !inventory.isActive};
    dispatch(putInventoryAsync(updatedInventory));
    navigation.navigate('HomeScreen');
  };
  return (
    <ScrollView
      style={{...globalStyles.container, padding: 10}}
      showsVerticalScrollIndicator={false}>
      {/* <View style={{alignItems: 'flex-start'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          General Information
        </Text>
      </View> */}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 20,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>
            Inventory Title
          </Text>
          <Text style={{fontSize: 14}}>{inventory.title}</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Status</Text>
          <Text style={{fontSize: 14}}>{isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Duration and Started
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: mainColors.grey,
            justifyContent: 'space-between',
            padding: 20,
            borderRadius: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="clockcircleo" size={24} color={mainColors.dark} />
            <View style={{paddingHorizontal: 10}}>
              <Text style={{color: mainColors.dark, fontSize: 12}}>
                Duration
              </Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {getDateDuration(inventory.createdAt)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="checkcircleo" size={24} color={mainColors.dark} />
            <View style={{paddingHorizontal: 10}}>
              <Text style={{color: mainColors.dark, fontSize: 12}}>
                Started
              </Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {getDate(inventory.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Personal Record
        </Text>
        <View
          style={{
            backgroundColor: mainColors.grey,
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                Puhunan
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                ₱{formatToMoney(puhunan)}
              </Text>
            </View>
            <View>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                Ginansya
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                ₱{formatToMoney(ginansya)}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 20}}>
            <Image source={require('../../../assets/curve-line.png')} />
          </View>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Product and Debt
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: mainColors.grey,
              padding: 20,
              borderRadius: 20,
              marginRight: 10,
              width: '45%',
            }}>
            <View>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Product
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 12}}>Item</Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 32,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {products.length}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: mainColors.grey,
              padding: 20,
              borderRadius: 20,
              marginRight: 10,
              width: '45%',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Debtor
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 12}}>Number</Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 32,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {debts.length}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {isActive && (
        <View style={{marginVertical: 20}}>
          <CustomButton
            text="Closed Inventory"
            handleOnPress={onSubmitIsActive}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({});
