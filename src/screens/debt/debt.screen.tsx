import {
  Image,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
  initValues,
  item,
} from '../../components/debt-form-modal/debt-form-modal';
import {useFormikContext} from 'formik';

const Debt = () => {
  const dispatch = useAppDispatch();
  const debt = useSelector(selectDebt);
  const debtIsLoading = useSelector(selectDebtIsLoading);
  const [textWidth, setTextWidth] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [initialValues, setInitialValues] = useState<DebtProps>(initValues);
  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  const ItemList = (item: itemProps, index: number) => {
    console.log('asd', item);
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
          <Text style={{paddingHorizontal: 10}}>{item.itemNo} X</Text>
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
            ₱{item.price}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item}: {item: DebtProps}) => {
    console.log('ITEMS', item.items);
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
              {item.createdAt}
            </Text>
            <View>
              <CustomButton
                text="Paid"
                handleOnPress={() => {}}
                buttonStyle={{padding: 10}}
              />
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
              ₱1212
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            {Array.isArray(item.items) &&
              item.items.map((data, index) => {
                return ItemList(data, index);
              })}
          </View>
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
        </View>
      </View>
    );
  };

  const setPostDebt = async () => {
    setInitialValues(initValues);
    setIsOpenModal(true);
  };
  const setPutDebt = async (data: DebtProps) => {
    setInitialValues(initValues);
  };
  const deleteDebt = async (uid: string) => {};
  const onAddProductList = (items: itemProps[]) => {
    items.push(item);
    setInitialValues({...initialValues, items: items});
  };
  const formikContext = useFormikContext<DebtProps>();

  const onRemoveProuctList = (item: string, items: itemProps[]) => {
    console.log('item', item);
    // items.filter(data => data.productName !== item.productName);
    const updatedItems = items.filter((_, i) => i !== parseInt(item));
    // console.log('items', updatedItems);
    formikContext.setFieldValue('items', Array.from(updatedItems));
    // setInitialValues({...initialValues, items: updatedItems});
  };
  const onSubmitForm = async (values: DebtProps) => {
    console.log('VALUES', values);
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
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={setPostDebt}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />
      <DebtFormModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onSubmitHandler={onSubmitForm}
        onAddProductListHandler={onAddProductList}
        onRemoveProductListHandler={onRemoveProuctList}
        initialValues={initialValues}
      />
    </View>
  );
};

export default Debt;
