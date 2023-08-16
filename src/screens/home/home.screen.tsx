import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import CustomHeader from '../../components/custom-header/custom-header';
import Octicons from 'react-native-vector-icons/Octicons';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import FAB from 'react-native-fab';
import InventoryFormModal, {
  InventoryFormSchema,
} from '../../components/inventory-form-modal/inventory-form-modal';
import {InventoryProps} from '../../store/inventory/inventory.types';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {
  deleteInventoryAsync,
  fetchInventoryAsync,
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
import {getDate, getHourlyDuration, windowHeight} from '../../utils/utils';

export type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
const Home: FC<HomeProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const inventory = useSelector(selectInventory);
  const inventoryIsLoading = useSelector(selectInventoryIsLoading);
  const inventoryError = useSelector(selectInventoryError);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [formType, setFormType] = useState('POST');
  const [initialValues, setInitialValues] = useState<InventoryFormSchema>({
    title: '',
    uid: '',
  });

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

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginBottom: 20,
          backgroundColor: mainColors.primary,
        }}>
        <Text>Ascending</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{paddingHorizontal: 10}}>Sort by</Text>
          <Octicons name="sort-asc" size={24} />
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View
      style={{
        height: windowHeight / 2,
        flex: 1, // This makes the container take up the entire available space
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Octicons size={48} name="checklist" color={mainColors.secondary} />
        <Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 20}}>
          Oops it’s empty here
        </Text>
        <Text style={{fontSize: 14}}>No Inventory have been created yet</Text>
      </View>
    </View>
  );
  const setPostInventory = async () => {
    setFormType('POST');
    setIsOpenModal(true);
  };
  const setPutInventory = async (
    data: {title: string; uid: string},
    closeRow: () => void,
  ) => {
    setInitialValues({...initialValues, title: data.title, uid: data.uid});
    console.log('setInitial', initialValues);
    setFormType('PUT');
    setIsOpenModal(true);
    closeRow();
  };

  const fetchInventory = async () => {
    console.log('FETCHING');
    await dispatch(fetchInventoryAsync());
  };

  const deleteInventory = async (uid: string) => {
    await dispatch(deleteInventoryAsync(uid));
  };
  const onSubmitForm = async (values: InventoryFormSchema) => {
    console.log('asdas', values);
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
      <View
        style={{
          ...Platform.select({
            ios: {
              height: 80,
            },
            android: {
              height: 70,
            },
          }),
        }}
      />

      <SwipeListView
        data={inventory}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={(item: InventoryProps) => item.uid}
      />
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={setPostInventory}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />

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
