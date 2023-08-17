import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import Octicons from 'react-native-vector-icons/Octicons';

const CustomListHeader = () => {
  return (
    <View
      style={{
        ...globalStyles.rowContainer,
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

export default CustomListHeader;
