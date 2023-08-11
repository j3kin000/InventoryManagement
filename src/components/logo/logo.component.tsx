import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {mainColors} from '../../utils/styles/styles.utils';
const Logo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Entypo name="bar-graph" size={48} color={mainColors.primary} />
      <Text style={styles.logoText}>ims</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Logo;
