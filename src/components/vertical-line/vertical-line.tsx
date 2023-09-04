import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const VerticalLine = () => {
  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            height: 80,
          },
          android: {
            height: 70,
          },
        }),
      }}
    />
  );
};

export default VerticalLine;

const styles = StyleSheet.create({});
