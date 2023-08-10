import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  DELETE_USER,
  FETCH_USER,
  POST_USER,
  PUT_USER,
} from './src/database/user-table';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // await POST_USER({
      //   uid: 'asdad3a',
      //   pin: '12122',
      // });
      // await DELETE_USER();
      await PUT_USER({pin: '1000', uid: 'asdad3a'});
      const data = await FETCH_USER('1000');

      console.log('datass', data.rows.item(0));
    };

    init();
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
