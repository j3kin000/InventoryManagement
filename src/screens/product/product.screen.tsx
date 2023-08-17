import {
  BackHandler,
  Image,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FAB from 'react-native-fab';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';

import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {
  deleteProductAsync,
  fetchProductAsync,
  postProductAsync,
  putProductAsync,
} from '../../store/product/product.action';
import {styles} from './styles';
import ProductFormModal, {
  ProductFormProps,
} from '../../components/product-form-modal/product-form-modal';
import {RouteProp} from '@react-navigation/native';
import {TopTabParamList} from '../../navigation/top-tabs';
import {useSelector} from 'react-redux';
import {
  selectProduct,
  selectProductIsLoading,
} from '../../store/product/product.selector';
import CustomLoadingIndicator from '../../components/custom-loading-indicator/custom-loading-indicator';

export type ProductProps = {
  route: RouteProp<TopTabParamList, 'Product'>;
};
const Product: FC<ProductProps> = ({route}) => {
  const inventory = route.params.data;
  const product = useSelector(selectProduct);
  const productIsLoading = useSelector(selectProductIsLoading);
  console.log('productIsLoading', productIsLoading);
  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [formType, setFormType] = useState('POST');
  const [initialValues, setInitialValues] = useState<ProductFormProps>({
    inventoryUid: '',
    createdAt: '',
    uid: '',
    image: '',
    productName: '',
    stock: '',
    originalPrice: '',
    salesPrice: '',
  });
  const [textWidth, setTextWidth] = useState(0);

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };
  const renderItem = ({item}: {item: ProductFormProps}) => {
    return (
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 20}}>
            <Image
              resizeMethod="resize"
              source={{uri: 'https://via.placeholder.com/400x225'}}
              style={{
                resizeMode: 'cover',
                width: 60,
                height: 60,
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{flexGrow: 1}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {item.productName}
              </Text>
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
                  {product.length}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Text
                style={{fontSize: 14, marginBottom: 5}}
                onLayout={onTextLayout}>
                ₱{item.originalPrice}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: '50%', // Position the line in the middle of the container
                  width: textWidth,
                  height: 1,
                  backgroundColor: 'black',
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 5,
                }}>
                ₱{item.originalPrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 14, marginBottom: 5}}>
            Puhunan:₱{item.originalPrice}
          </Text>
          <Text style={{fontSize: 14, marginBottom: 5}}>
            Ginansya:₱{item.originalPrice}
          </Text>
        </View>
      </View>
    );
  };

  const hiddenItem = <T extends ProductFormProps>(
    rowData: ListRenderItemInfo<T>,
    rowMap: RowMap<T>,
  ) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          setPutProduct(rowData.item, () => rowMap[rowData.item.uid].closeRow())
        }>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteProduct(rowData.item.uid)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const ListHeaderComponent = () => {
    return (
      <View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Product List</Text>
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
              {product.length}
            </Text>
          </View>
        </View>

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
      </View>
    );
  };
  const ListEmptyComponent = () => <View></View>;
  const setPostProduct = async () => {
    setInitialValues({
      inventoryUid: '',
      createdAt: '',
      uid: '',
      image: '',
      productName: '',
      stock: '',
      originalPrice: '',
      salesPrice: '',
    });
    setFormType('POST');
    setIsOpenModal(true);
  };
  const setPutProduct = async (
    data: ProductFormProps,
    closeRow: () => void,
  ) => {
    setFormType('PUT');
    setInitialValues({
      ...initialValues,
      uid: data.uid,
      inventoryUid: data.inventoryUid,
      image: data.image,
      productName: data.productName,
      stock: data.stock,
      originalPrice: data.originalPrice,
      salesPrice: data.salesPrice,
    });

    setIsOpenModal(true);
    closeRow();
  };
  const deleteProduct = async (uid: string) => {
    await dispatch(deleteProductAsync(uid));
  };
  const onSubmitForm = async (values: ProductFormProps) => {
    const uid = uuid.v4();
    const data = values;

    if (formType === 'POST') {
      data.inventoryUid = inventory.uid;
      data.uid = uid.toString();
      data.createdAt = new Date().toISOString();
      await dispatch(postProductAsync(data));
    } else if (formType === 'PUT') {
      await dispatch(putProductAsync(data));
    }

    setIsOpenModal(false);
  };
  return (
    <View style={{...globalStyles.container, padding: 10}}>
      <SwipeListView
        data={product}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={(item: ProductFormProps) => item.uid}
      />
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={setPostProduct}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />

      <ProductFormModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onSubmitHandler={onSubmitForm}
        initialValues={initialValues}
      />

      <CustomLoadingIndicator isLoading={productIsLoading} />
    </View>
  );
};

export default Product;
