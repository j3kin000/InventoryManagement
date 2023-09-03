import {ImageBackground, Text, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import {useSelector} from 'react-redux';
import {selectUserIsFirstTimeOpen} from '../../store/user/user.selector';
import {globalStyles} from '../../utils/styles/styles.utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import Logo from '../../components/logo/logo.component';
import {styles} from './styles.splash-screen';

export type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LockScreen'>;
};
const SplashScreen: FC<SplashScreenProps> = ({navigation}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userIsFirstTimeOpen = useSelector(selectUserIsFirstTimeOpen);
  useEffect(() => {
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
  }, [userIsFirstTimeOpen]);
  const navigateToLockScreen = (
    pinStatus: 'choose' | 'enter' | 'locked' | undefined,
  ) => {
    navigation.replace('LockScreen', {pinStatus});
  };
  return (
    <ImageBackground
      source={require('../../../assets/splash-backgrounds.png')}
      style={globalStyles.container}>
      <View style={{marginVertical: 90}} />
      <View
        style={{
          ...styles.container,
        }}>
        <Logo />
        <Text numberOfLines={2} style={styles.titleContainer}>
          Do more to track {'\n'}your business.
        </Text>
      </View>
      {!userIsFirstTimeOpen && (
        <View style={styles.buttonContainer}>
          <CustomButton
            handleOnPress={() => navigateToLockScreen('choose')}
            text="Get Started"
            textStyle={styles.text}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default SplashScreen;
