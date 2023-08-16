import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {mainColors} from '../../utils/styles/styles.utils';
import Fontisto from 'react-native-vector-icons/Fontisto';

const CustomHeader = () => {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,

            ...Platform.select({
              ios: {
                paddingTop: 70,
                paddingBottom: 75,
              },
              android: {
                paddingTop: 50,
                paddingBottom: 75,
              },
            }),
          }}>
          <View style={{alignItems: 'center'}}>
            <Fontisto name="export" size={24} color="white" />
            <Text
              style={{
                color: '#c2c2c2',
                fontSize: 10,
                letterSpacing: 1,
              }}>
              Export data
            </Text>
          </View>
          <Text
            style={{
              color: mainColors.primary,
              fontWeight: '800',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            Inventory
          </Text>
          <View style={{alignItems: 'center'}}>
            <Fontisto name="import" size={24} color="white" />
            <Text
              style={{
                color: '#c2c2c2',
                fontSize: 10,
                letterSpacing: 1,
              }}>
              Import
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          // Common styles
          position: 'absolute',
          backgroundColor: mainColors.primary,
          alignSelf: 'center',
          width: '95%',
          justifyContent: 'center',
          borderRadius: 20,
          elevation: 5,
          minHeight: 100,
          ...Platform.select({
            ios: {
              top: 120,
            },
            android: {
              top: 100,
            },
          }),
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 20,
            paddingHorizontal: 40,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              412.311
            </Text>
            <Text style={{color: '#C2C2C2', fontSize: 12, textAlign: 'center'}}>
              expenditure
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              $ 412311
            </Text>
            <Text style={{color: '#C2C2C2', fontSize: 12}}>Financial gain</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
