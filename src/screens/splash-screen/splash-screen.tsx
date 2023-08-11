import {Button, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import {useSelector} from 'react-redux';
import {selectUserIsFirstTimeOpen} from '../../store/user/user.selector';

export type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LockScreen'>;
};
const SplashScreen: FC<SplashScreenProps> = ({navigation}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userIsFirstTimeOpen = useSelector(selectUserIsFirstTimeOpen);
  useEffect(() => {
    console.log('userIsFirstTimeOpen', userIsFirstTimeOpen);
    if (userIsFirstTimeOpen) {
      timeoutRef.current = setTimeout(() => {
        navigateToLockScreen('enter');
      }, 2000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, []);
  const navigateToLockScreen = (
    pinStatus: 'choose' | 'enter' | 'locked' | undefined,
  ) => {
    navigation.replace('LockScreen', {pinStatus});
  };
  return (
    <View>
      <Text>SplashScreen</Text>
      {!userIsFirstTimeOpen && (
        <Button
          title="Set Up Pin"
          onPress={() => navigateToLockScreen('choose')}
        />
      )}
    </View>
  );
};

export default SplashScreen;
