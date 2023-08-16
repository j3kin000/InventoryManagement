import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {RouteProp} from '@react-navigation/native';
import {TopTabParamList} from '../../navigation/top-tabs';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatToMoney, getDate, getDateDuration} from '../../utils/utils';
import CustomButton from '../../components/custom-button/custom-button.component';
export type InfoProps = {
  route: RouteProp<TopTabParamList, 'Info'>;
};
const Info: FC<InfoProps> = ({route}) => {
  const inventory = route.params.data;
  console.log('inve', inventory);
  return (
    <ScrollView style={{...globalStyles.container, padding: 10}}>
      {/* <View style={{alignItems: 'flex-start'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          General Information
        </Text>
      </View> */}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 20,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>
            Inventory Title
          </Text>
          <Text style={{fontSize: 14}}>{inventory.title}</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Status</Text>
          <Text style={{fontSize: 14}}>
            {inventory.isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Duration and Started
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: mainColors.grey,
            justifyContent: 'space-between',
            padding: 20,
            borderRadius: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="clockcircleo" size={24} color={mainColors.dark} />
            <View style={{paddingHorizontal: 10}}>
              <Text style={{color: mainColors.dark, fontSize: 12}}>
                Duration
              </Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {getDateDuration(inventory.createdAt)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="checkcircleo" size={24} color={mainColors.dark} />
            <View style={{paddingHorizontal: 10}}>
              <Text style={{color: mainColors.dark, fontSize: 12}}>
                Started
              </Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {getDate(inventory.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Personal Record
        </Text>
        <View
          style={{
            backgroundColor: mainColors.grey,
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                Puhunan
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                ${formatToMoney('202020')}
              </Text>
            </View>
            <View>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                Ginansya
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 14}}>
                ${formatToMoney('202020')}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 20}}>
            <Image source={require('../../../assets/curve-line.png')} />
          </View>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Product and Debt
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: mainColors.grey,
              padding: 20,
              borderRadius: 20,
              marginRight: 10,
              width: '45%',
            }}>
            <View>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Product
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 12}}>Item</Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 32,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                20
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: mainColors.grey,
              padding: 20,
              borderRadius: 20,
              marginRight: 10,
              width: '45%',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Debtor
              </Text>
              <Text style={{color: mainColors.dark, fontSize: 12}}>Number</Text>
              <Text
                style={{
                  color: mainColors.dark,
                  fontSize: 32,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                20
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <CustomButton text="Closed Inventory" handleOnPress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({});
