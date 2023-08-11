import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectUserIsFirstTimeOpen} from '../../store/user/user.selector';

const Home = () => {
  const userIsFirstTimeOpen = useSelector(selectUserIsFirstTimeOpen);
  console.log('userIsFirstTimeOpen', userIsFirstTimeOpen);
  return (
    <View style={{}}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
