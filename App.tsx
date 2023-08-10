import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Database from './src/database';

const db = new Database();

const App = () => {
  useEffect(() => {
    let products = [];
    db.addProduct({
      prodId: 1,
      prodName: 'asd',
      prodDesc: 'asdasdas',
      prodImage: './asdasd',
      prodPrice: '121',
    });
    db.listProduct()
      .then(data => {
        products = data;
        console.log('DATAssss', data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
