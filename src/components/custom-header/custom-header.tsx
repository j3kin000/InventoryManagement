import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {mainColors} from '../../utils/styles/styles.utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles} from './styles.custom-header';

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
        <View style={styles.titleContainer}>
          <View style={{alignItems: 'center'}}>
            <Fontisto name="export" size={24} color="white" />
            <Text style={styles.text}>Export data</Text>
          </View>
          <Text style={styles.titleText}>Inventory</Text>
          <View style={{alignItems: 'center'}}>
            <Fontisto name="import" size={24} color="white" />
            <Text style={styles.text}>Import</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.infoContainer}>
        <View style={styles.infoTitleContainer}>
          <View>
            <Text style={styles.infoTextTitle}>412.311</Text>
            <Text style={styles.infoText}>expenditure</Text>
          </View>

          <View>
            <Text style={styles.infoTextTitle}>$ 412311</Text>
            <Text style={styles.infoText}>Financial gain</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomHeader;
