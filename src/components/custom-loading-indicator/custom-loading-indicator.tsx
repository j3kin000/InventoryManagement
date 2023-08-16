import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {mainColors} from '../../utils/styles/styles.utils';

export type CustomLoadingIndicatorProps = {
  isLoading: boolean;
};
const CustomLoadingIndicator: FC<CustomLoadingIndicatorProps> = ({
  isLoading = false,
}) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF80',
          padding: 10,
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size="large"
            color={mainColors.secondary}
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoadingIndicator;

const styles = StyleSheet.create({});
