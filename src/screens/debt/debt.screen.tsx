import {
  Image,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FAB from 'react-native-fab';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {getDate} from '../../utils/utils';
import CustomListHeader from '../../components/custom-list-header/custom-list-header';
import CustomListEmpty from '../../components/custom-list-empty/custom-list-empty';
import {DebtProps, itemProps} from '../../store/debt/debt.types';
import CustomButton from '../../components/custom-button/custom-button.component';
import {styles} from './styles';
import VerticalLine from '../../components/vertical-line/vertical-line';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {useSelector} from 'react-redux';
import {selectDebt, selectDebtIsLoading} from '../../store/debt/debt.selector';
import DebtFormModal, {
  ItemsProps,
  initValues,
  item,
} from '../../components/debt-form-modal/debt-form-modal';
import {
  deleteDebtAsync,
  postDebtAsync,
  putDebtAsync,
} from '../../store/debt/debt.action';
import {getProductList} from '../../utils/hooks/hooks';
import {selectProduct} from '../../store/product/product.selector';
import uuid from 'react-native-uuid';
import {RouteProp} from '@react-navigation/native';
import {TopTabParamList} from '../../navigation/top-tabs';
import {InventoryProps} from '../../store/inventory/inventory.types';

export type DebtFCProps = {
  route: RouteProp<TopTabParamList, 'Debt'>;
};

const Debt: FC<DebtFCProps> = ({route}) => {
  const inventory: InventoryProps = route.params.data;
  const isInventoryActive = inventory.isActive;
  const dispatch = useAppDispatch();
  const debt = useSelector(selectDebt);
  const debtIsLoading = useSelector(selectDebtIsLoading);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [initialValues, setInitialValues] = useState(initValues);
  const [formType, setFormType] = useState('POST');
  const products = useSelector(selectProduct);
  const items: ItemsProps[] = getProductList(products);

  const ItemList = (item: itemProps, index: number) => {
    const perItemPrice =
      parseFloat(item.salesPrice) * parseFloat(item.numberItems);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          <Text style={{paddingHorizontal: 10}}>{item.numberItems} X</Text>
          <Image
            resizeMethod="resize"
            source={{uri: 'https://via.placeholder.com/400x225'}}
            style={{
              resizeMode: 'cover',
              width: 30,
              height: 30,
              borderRadius: 10,
            }}
          />
          <Text style={{paddingHorizontal: 10}}>{item.productName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            ₱{perItemPrice}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item}: {item: DebtProps}) => {
    console.log('ITEMS', item);
    const totalPrice = item.items.reduce(
      (totalPrice, data) =>
        parseFloat(data.salesPrice) * parseFloat(data.numberItems) + totalPrice,
      0,
    );
    return (
      <View
        style={{
          backgroundColor: mainColors.primary,
          alignSelf: 'center',
          width: '95%',
          marginBottom: 40,
          borderRadius: 10,
          elevation: 2,
          minHeight: 110,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#A076F9',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: mainColors.primary, fontSize: 16}}>
              {item.name}
            </Text>
            <Text
              style={{
                color: mainColors.primary,
                fontSize: 16,
              }}>
              {getDate(item.createdAt)}
            </Text>
            <View>
              {isInventoryActive ? (
                <CustomButton
                  text={item.isPaid ? 'Paid' : 'Unpaid'}
                  handleOnPress={() => setPutPaidDebt(item)}
                  buttonStyle={{padding: 10}}
                />
              ) : (
                <View>
                  <Text
                    style={{
                      fontFamily: 'ShadowsIntoLight-Regular',
                      color: mainColors.primary,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.isPaid ? 'Paid' : 'Unpaid'}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderBottomColor: mainColors.dark,
              borderBottomWidth: 0.5,
            }}>
            <Text style={{color: mainColors.dark, fontSize: 16}}>Total</Text>
            <Text
              style={{
                color: mainColors.dark,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              ₱{totalPrice}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            {Array.isArray(item.items) &&
              item.items.map((data, index) => {
                return ItemList(data, index);
              })}
          </View>
          {isInventoryActive && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 10,
              }}>
              <CustomButton
                text="Delete"
                handleOnPress={() => deleteDebt(item.uid)}
                buttonStyle={{
                  padding: 10,
                  backgroundColor: 'red',
                  marginHorizontal: 10,
                }}
              />
              <CustomButton
                text="Edit"
                handleOnPress={() => setPutDebt(item)}
                buttonStyle={{padding: 10, backgroundColor: 'blue'}}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const setPostDebt = async () => {
    setFormType('POST');
    setInitialValues({
      uid: '',
      name: '',
      inventoryUid: '',
      createdAt: '',
      items: [item],
      isPaid: false,
    });
    setIsOpenModal(true);
  };
  const setPutDebt = async (data: DebtProps) => {
    setFormType('PUT');
    setInitialValues(data);
    setIsOpenModal(true);
  };
  const deleteDebt = async (uid: string) => {
    await dispatch(deleteDebtAsync(uid));
  };
  const setPutPaidDebt = async (data: DebtProps) => {
    data.isPaid = !data.isPaid;
    dispatch(putDebtAsync(data));
  };
  const onSubmitForm = async (values: DebtProps) => {
    console.log('VALUES', values);
    values.items.map((item, index) => {
      const product = items.filter(prod => prod.value === item.productName);
      values.items[index].salesPrice = product[0].salesPrice;
    });
    const data = values;
    console.log('DARA', data);
    if (formType === 'POST') {
      const uid = uuid.v4();
      data.inventoryUid = inventory.uid;
      data.uid = uid.toString();
      data.createdAt = new Date().toISOString();
      console.log('DATA', data);
      await dispatch(postDebtAsync(data));
    } else if (formType === 'PUT') {
      await dispatch(putDebtAsync(data));
    }

    setIsOpenModal(false);
  };
  return (
    <View style={{...globalStyles.container, padding: 10}}>
      <View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Debt List</Text>
          <View
            style={{
              backgroundColor: mainColors.grey,
              borderRadius: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                paddingHorizontal: 10,
              }}>
              {debt.length}
            </Text>
          </View>
        </View>
      </View>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={debt}
        renderItem={renderItem}
        rightOpenValue={-150}
        ListHeaderComponent={CustomListHeader}
        ListEmptyComponent={CustomListEmpty}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={(item: DebtProps) => item.uid}
        style={{marginBottom: 40}}
      />
      {products.length !== 0 && isInventoryActive && (
        <FAB
          buttonColor={mainColors.secondary}
          iconTextColor={mainColors.primary}
          onClickAction={setPostDebt}
          visible={true}
          iconTextComponent={<AntDesign name="plus" />}
        />
      )}

      <DebtFormModal
        items={items}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onSubmitHandler={onSubmitForm}
        initialValues={initialValues}
      />
    </View>
  );
};

export default Debt;
