import {
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import CustomHeader from '../../components/custom-header/custom-header';
import Octicons from 'react-native-vector-icons/Octicons';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import uuid from 'react-native-uuid';
import InventoryFormModal, {
  InventoryFormProps,
} from '../../components/inventory-form-modal/inventory-form-modal';
import {InventoryProps} from '../../store/inventory/inventory.types';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {
  deleteInventoryAsync,
  postInventoryAsync,
  putInventoryAsync,
} from '../../store/inventory/inventory.action';
import {
  selectInventory,
  selectInventoryError,
  selectInventoryIsLoading,
} from '../../store/inventory/inventory.selector';
import CustomLoadingIndicator from '../../components/custom-loading-indicator/custom-loading-indicator';
import {styles} from './styles.home';
import {getDate, getHourlyDuration} from '../../utils/utils';
import VerticalLine from '../../components/vertical-line/vertical-line';
import CustomListHeader from '../../components/custom-list-header/custom-list-header';
import CustomListEmpty from '../../components/custom-list-empty/custom-list-empty';
import CustomFab from '../../components/custom-fab/custom-fab';
import {sortByDate} from '../../utils/hooks/hooks';

export type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
const Home: FC<HomeProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const inventory: InventoryProps[] = useSelector(selectInventory);
  const inventoryIsLoading = useSelector(selectInventoryIsLoading);
  const inventoryError = useSelector(selectInventoryError);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formType, setFormType] = useState('POST');
  const [initialValues, setInitialValues] = useState<InventoryFormProps>({
    title: '',
    uid: '',
  });
  const [isAscending, setAscending] = useState(true);

  const inventoryItems = useMemo(
    () => sortByDate(inventory, isAscending),
    [isAscending, inventory],
  );
  const renderItem = ({item}: {item: InventoryProps}) => {
    return (
      <View style={{}}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('InventoryScreen', {inventory: item});
          }}>
          <View
            style={{
              backgroundColor: mainColors.primary,
              alignSelf: 'center',
              paddingHorizontal: 10,
              width: '95%',
              marginBottom: 40,
              borderRadius: 10,
              elevation: 2,
              minHeight: 110,
              borderStartColor: item.isActive ? 'green' : 'red',
              borderStartWidth: 5,
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Feather name="folder" size={20} color="#C2C2C2" />

                <Text style={{color: '#C2C2C2', marginLeft: 5, fontSize: 12}}>
                  Tap To View
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Octicons
                  name="dot-fill"
                  size={16}
                  color={item.isActive ? 'green' : 'red'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#C2C2C2',
                    fontWeight: 'bold',
                  }}>
                  {item.isActive ? 'OPEN' : 'CLOSED'}
                </Text>
              </View>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: mainColors.dark,
                  paddingHorizontal: 5,
                }}>
                {item?.title?.trimStart()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  color: '#C2C2C2',
                  fontWeight: 'bold',
                }}>
                {getDate(item.createdAt)}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: '#C2C2C2',
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                }}>
                {getHourlyDuration(item.createdAt)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const hiddenItem = <T extends InventoryProps>(
    rowData: ListRenderItemInfo<T>,
    rowMap: RowMap<T>,
  ) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          setPutInventory(
            {title: rowData.item.title, uid: rowData.item.uid},
            () => rowMap[rowData.item.uid].closeRow(),
          )
        }>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteInventory(rowData.item.uid)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const setPostInventory = async () => {
    setInitialValues({...initialValues, title: '', uid: ''});

    setFormType('POST');
    setIsOpenModal(true);
  };
  const setPutInventory = async (
    data: {title: string; uid: string},
    closeRow: () => void,
  ) => {
    setFormType('PUT');
    setInitialValues({...initialValues, title: data.title, uid: data.uid});

    setIsOpenModal(true);
    closeRow();
  };

  const deleteInventory = async (uid: string) => {
    await dispatch(deleteInventoryAsync(uid));
  };
  const onSubmitForm = async (values: InventoryFormProps) => {
    const uid = uuid.v4();
    const data = {
      uid: formType === 'POST' ? uid.toString() : values.uid,
      title: values.title,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    if (formType === 'POST') {
      await dispatch(postInventoryAsync(data));
    } else if (formType === 'PUT') {
      await dispatch(putInventoryAsync(data));
    }

    setIsOpenModal(false);
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader />
      <VerticalLine />
      <SwipeListView
        data={inventoryItems}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={() => (
          <CustomListHeader
            isAscending={isAscending}
            setAscending={setAscending}
          />
        )}
        ListEmptyComponent={CustomListEmpty}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={(item: InventoryProps) => item.uid}
        style={{marginBottom: 40}}
      />
      <CustomFab onFabHandler={setPostInventory} />
      <InventoryFormModal
        initialValues={initialValues}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onSubmitHandler={onSubmitForm}
      />
      <CustomLoadingIndicator isLoading={inventoryIsLoading} />
    </View>
  );
};

export default Home;
