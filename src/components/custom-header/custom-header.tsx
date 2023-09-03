import {Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles.custom-header';
import {useSelector} from 'react-redux';
import {selectProduct} from '../../store/product/product.selector';
import {
  calculateTotalInvestment,
  calculateTotalProfit,
  formatToMoney,
  toastAlert,
} from '../../utils/utils';
import {ProductProps} from '../../store/product/product.types';
import {selectInventory} from '../../store/inventory/inventory.selector';
import {FETCH_PRODUCT} from '../../database/product-table';
import CustomHeaderButton from '../custom-header-button/custom-header-button';
import CustomQRModal from '../custom-QR-modal/custom-QR-modal';
import {selectDebt} from '../../store/debt/debt.selector';
import {BarCodeReadEvent} from 'react-native-camera';
import {onGenerateQR} from '../../utils/hooks/hooks';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {postInventoryAsync} from '../../store/inventory/inventory.action';
import {InventoryProps} from '../../store/inventory/inventory.types';
import {postDebtAsync} from '../../store/debt/debt.action';
import {DebtProps} from '../../store/debt/debt.types';
import {postProductAsync} from '../../store/product/product.action';
import CustomLoadingIndicator from '../custom-loading-indicator/custom-loading-indicator';

const CustomHeader = () => {
  const dispatch = useAppDispatch();
  const inventory = useSelector(selectInventory);
  const products = useSelector(selectProduct);
  const debt = useSelector(selectDebt);
  const [puhunan, setPuhunan] = useState('0');
  const [ginansya, setGinansya] = useState('0');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [qrTitle, setQrTitle] = useState('');
  const [qrTpe, setQrTpe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchProductAsync = async (inventoryUid: string) => {
    return await FETCH_PRODUCT(inventoryUid);
  };

  const qrData = useMemo(
    () => onGenerateQR(inventory, products, debt),
    [inventory, products, debt],
  );

  console.log('QRADATA', qrData);
  const onReadScan = (e: BarCodeReadEvent) => {
    if (!e.data) {
      const message = {
        title: 'Ops!',
        description: 'QR Code is Invalid',
        type: 'danger',
      };
      toastAlert(message);
      return;
    }
    const scannedData = JSON.parse(e.data);
    if (
      !Array.isArray(scannedData.Inventory) ||
      !Array.isArray(scannedData.Products) ||
      !Array.isArray(scannedData.Debts)
    ) {
      const message = {
        title: 'Ops!',
        description: 'QR Code is Invalid',
        type: 'danger',
      };
      toastAlert(message);
      return;
    }
    setIsLoading(true);
    scannedData.Inventory.map((item: InventoryProps, index: number) => {
      dispatch(postInventoryAsync(item));
    });
    scannedData.Products.map((item: ProductProps, index: number) => {
      dispatch(postProductAsync(item));
    });
    scannedData.Debts.map((item: DebtProps, index: number) => {
      dispatch(postDebtAsync(item));
    });
    setIsLoading(false);
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

  const generateQrCode = () => {
    if (inventory.length === 0) {
      toastAlert({
        title: 'Generate QR',
        type: 'error',
        description: 'Cannot generate Qr as inventory is empty',
      });
      return;
    }
    setQrTpe('generate');
    setQrTitle('My QR');
    setIsOpenModal(true);

    console.log('generateQrCode');
  };
  const scanQrCode = () => {
    setQrTpe('scan');
    setQrTitle('QR Reader');
    setIsOpenModal(true);

    console.log('scanQrCode');
  };
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
          <CustomHeaderButton
            icon={<AntDesign name="qrcode" size={24} color="white" />}
            onPressHandler={generateQrCode}
            title="Generate QR"
          />
          <Text style={styles.titleText}>Inventory</Text>
          <CustomHeaderButton
            icon={<AntDesign name="scan1" size={24} color="white" />}
            onPressHandler={scanQrCode}
            title="Scan QR"
          />
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
        <CustomQRModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          title={qrTitle}
          type={qrTpe}
          qrData={qrData}
          onReadScan={onReadScan}
        />
        <CustomLoadingIndicator isLoading={isLoading} />
      </View>
    </>
  );
};

export default CustomHeader;
