import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FAB from 'react-native-fab';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ProductProps} from '../../database/product-table';
import {debtProps} from '../../store/debt/debt.types';
import {getDate} from '../../utils/utils';

const data = [
  {
    uid: '0',
    inventoryUid: '1',
    name: 'Rodolfo',
    item: [
      {
        productName: 'Rebisco',
        image: '',
        price: '15',
        itemNo: '12',
      },
      {
        productName: 'Chocolate',
        price: '19.1',
        itemNo: '12',
      },
    ],
    createdAt: '02/23/23:@3232',
    stock: '121',
    originalPrice: '12',
    salesPrice: '15',
  },
];
const Debt = () => {
  const [textWidth, setTextWidth] = useState(0);

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };
  const renderItem = ({item}: {item: debtProps}) => {
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
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Text style={{paddingHorizontal: 10}}>
                  {item.item[0].itemNo} X{' '}
                </Text>
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
                <Text style={{paddingHorizontal: 10}}>
                  {item.item[0].productName}
                </Text>
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
                  ₱{item.item[0].price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const hiddenItem = ({item}: {item: ProductProps}) => {
    return <View></View>;
  };

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
              {data.length}
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

  return (
    <View style={{...globalStyles.container, padding: 10}}>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={(item: ProductProps) => item.uid}
      />
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={() => {}}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />
    </View>
  );
};

export default Debt;

const styles = StyleSheet.create({});
