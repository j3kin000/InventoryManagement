import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectUserIsFirstTimeOpen} from '../../store/user/user.selector';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/custom-header/custom-header';
import Octicons from 'react-native-vector-icons/Octicons';
import {SwipeListView} from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FAB from 'react-native-fab';
const data = [
  {
    uid: '0',
    userUid: '1',

    title: 'Request for a new apple macbook pro',
    createdAt: 'sample Date',
    isActive: true,
  },
  {
    uid: '1',
    userUid: '1',
    title: ' sample Data',
    createdAt: 'sample Date',
    isActive: false,
  },
  {
    uid: '1',
    userUid: '1',
    title: ' sample Data',
    createdAt: 'sample Date',
    isActive: true,
  },
  {
    uid: '1',
    userUid: '1',
    title: ' sample Data',
    createdAt: 'sample Date',
    isActive: true,
  },
  {
    uid: '1',
    userUid: '1',
    title: ' sample Data',
    createdAt: 'sample Date',
    isActive: true,
  },
];

export type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
const Home: FC<HomeProps> = ({navigation}) => {
  const renderItem = (data, rowItem) => {
    return (
      <View style={{}}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('InventoryScreen', {inventory: data});
          }}>
          <View
            style={{
              backgroundColor: mainColors.primary,
              alignSelf: 'center',
              paddingHorizontal: 10,
              width: '95%',
              marginBottom: 40,
              borderRadius: 10,
              elevation: 5,
              minHeight: 110,
              borderStartColor: data.item.isActive ? 'green' : 'red',
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
              <Feather name="folder" size={20} color="#C2C2C2" />
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Octicons
                  name="dot-fill"
                  size={16}
                  color={data.item.isActive ? 'green' : 'red'}
                />

                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#C2C2C2',
                    fontWeight: 'bold',
                  }}>
                  {data.item.isActive ? 'OPEN' : 'CLOSED'}
                </Text>
              </View>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#00000',
                  paddingHorizontal: 5,
                }}>
                {data.item.title.trimStart()}
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
                12/12/2023
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: '#C2C2C2',
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                }}>
                2m
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const hiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
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
        data={data}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
      />
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={() => {
          console.log('FAB pressed');
        }}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
    fontSize: 14,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    minHeight: 110,
    marginBottom: 40,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,

    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,

    backgroundColor: 'red',
    right: 0,
  },
  closeButton: {
    backgroundColor: 'white',
    bottom: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    padding: 15,
    position: 'absolute',
    right: 30,
  },
});
