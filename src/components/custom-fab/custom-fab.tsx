import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import FAB from 'react-native-fab';
import {mainColors} from '../../utils/styles/styles.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';

export type CustomFabProps = {
  onFabHandler: () => void;
};
const CustomFab: FC<CustomFabProps> = ({onFabHandler}) => {
  return (
    <>
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={onFabHandler}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />
    </>
  );
};

export default CustomFab;

const styles = StyleSheet.create({});
