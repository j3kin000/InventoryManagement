import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {mainColors} from '../../utils/styles/styles.utils';
import {styles} from './styles-custom-loading-indicator';

export type CustomLoadingIndicatorProps = {
  isLoading: boolean;
};

const CustomLoadingIndicator: FC<CustomLoadingIndicatorProps> = ({
  isLoading = false,
}) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size="large"
            color={mainColors.secondary}
            style={styles.indicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoadingIndicator;
