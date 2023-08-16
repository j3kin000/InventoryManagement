import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FAB from 'react-native-fab';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ProductProps} from '../../database/product-table';

const data = [
  {
    uid: '0',
    inventoryUid: '1',
    image: require('../../../assets/curve-line.png'), // Use require here
    createdAt: '02/23/23:@3232',
    productName: 'Rebisco',
    stock: '121',
    originalPrice: '12',
    salesPrice: '15',
  },
];
const Product = () => {
  const [textWidth, setTextWidth] = useState(0);

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };
  const renderItem = ({item}: {item: ProductProps}) => {
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
                  {data.length}
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

export default Product;

const styles = StyleSheet.create({});
