import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {mainColors} from '../../utils/styles/styles.utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './styles.custom-header';
import {useSelector} from 'react-redux';
import {selectProduct} from '../../store/product/product.selector';
import {selectDebt} from '../../store/debt/debt.selector';
import {
  calculateTotalInvestment,
  calculateTotalProfit,
  formatToMoney,
} from '../../utils/utils';
import {ProductProps} from '../../store/product/product.types';
import {selectInventory} from '../../store/inventory/inventory.selector';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {FETCH_PRODUCT} from '../../database/product-table';
import {InventoryProps} from '../../store/inventory/inventory.types';

const CustomHeader = () => {
  const inventory = useSelector(selectInventory);
  const products = useSelector(selectProduct);
  const [puhunan, setPuhunan] = useState(0);
  const [ginansya, setGinansya] = useState(0);

  const fetchProductAsync = async (inventoryUid: string) => {
    return await FETCH_PRODUCT(inventoryUid);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let totalGinansya = 0;
        let totalPuhunan = 0;
        for (const item of inventory) {
          const product: ProductProps[] = await fetchProductAsync(item.uid);
          const resultGinansya = product.reduce(
            (acc: number, product: ProductProps) => {
              const res = parseFloat(
                calculateTotalProfit(product.stock, product.salesPrice),
              );

              return acc + res;
            },
            0,
          );
          const resultPuhunan = product.reduce(
            (acc: number, product: ProductProps) => {
              const res = parseFloat(
                calculateTotalInvestment(product.stock, product.originalPrice),
              );

              return acc + res;
            },
            0,
          );
          totalGinansya += resultGinansya;
          totalPuhunan += resultPuhunan;
        }
        setGinansya(totalGinansya);
        setPuhunan(totalPuhunan);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getAllProducts();
  }, [inventory, products]);

  // const ginansya = useMemo(() => {
  //   return products.reduce((total: number, product: ProductProps) => {
  //     const result = parseFloat(
  //       calculateTotalProfit(product.stock, product.salesPrice),
  //     );
  //     return result + total;
  //   }, 0);
  // }, [products]);
  return (
    <>
      <LinearGradient
        colors={[
          'rgba(0,100,255,1)',
          'rgba(0,100,255,1)',
          'rgba(110,69,252,1)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{borderBottomEndRadius: 3, borderBottomStartRadius: 3}}>
        <View style={styles.titleContainer}>
          {/* <View style={{alignItems: 'center'}}>
            <Fontisto name="export" size={24} color="white" />
            <Text style={styles.text}>Export data</Text>
          </View> */}
          <Text style={styles.titleText}>Inventory</Text>
          {/* <View style={{alignItems: 'center'}}>
            <Fontisto name="import" size={24} color="white" />
            <Text style={styles.text}>Import</Text>
          </View> */}
        </View>
      </LinearGradient>
      <View style={styles.infoContainer}>
        <View style={styles.infoTitleContainer}>
          <View>
            <Text style={styles.infoTextTitle}>₱{formatToMoney(puhunan)}</Text>
            <Text style={styles.infoText}>expenditure</Text>
          </View>

          <View>
            <Text style={styles.infoTextTitle}>₱{formatToMoney(ginansya)}</Text>
            <Text style={styles.infoText}>Financial gain</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomHeader;
