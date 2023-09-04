import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {mainColors} from '../../utils/styles/styles.utils';
import {styles} from './styles.logo';
const Logo = () => {
  return (
    <View style={styles.container}>
      <Entypo name="bar-graph" size={48} color={mainColors.primary} />
      <Text style={styles.logoText}>ims</Text>
    </View>
  );
};

export default Logo;
