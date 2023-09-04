import {Text, View} from 'react-native';
import React from 'react';
import {windowHeight} from '../../utils/utils';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import Octicons from 'react-native-vector-icons/Octicons';

const CustomListEmpty = () => {
  return (
    <View style={{...globalStyles.centerContainer, height: windowHeight / 2}}>
      <View style={{...globalStyles.centerContainer}}>
        <Octicons size={48} name="checklist" color={mainColors.secondary} />
        <Text style={{...globalStyles.title, paddingTop: 20}}>
          Oops it’s empty here
        </Text>
        <Text style={globalStyles.text}>No List have been created yet</Text>
      </View>
    </View>
  );
};

export default CustomListEmpty;
