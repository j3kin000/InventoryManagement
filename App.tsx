import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  DELETE_USER,
  FETCH_USER,
  POST_USER,
  PUT_USER,
} from './src/database/user-table';
import Navigation from './src/navigation/root.navigation';
// uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

const App = () => {
  useEffect(() => {
    const init = async () => {
      // await POST_USER({
      //   uid: 'asdad3a',
      //   pin: '12122',
      // });
      // await DELETE_USER();
      await PUT_USER({pin: '10201', uid: ''});
      // const data = await FETCH_USER('10001');

      // console.log('datass', data.rows.item(0));
    };

    init();
  }, []);

  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({});
