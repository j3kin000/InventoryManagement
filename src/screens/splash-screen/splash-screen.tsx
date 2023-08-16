import {Button, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root.navigation';
import {useSelector} from 'react-redux';
import {selectUserIsFirstTimeOpen} from '../../store/user/user.selector';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import CustomButton from '../../components/custom-button/custom-button.component';
import Logo from '../../components/logo/logo.component';

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
    <ImageBackground
      source={require('../../../assets/splash-backgrounds.png')}
      style={globalStyles.container}>
      <View style={{marginVertical: 90}} />
      <View
        style={{
          flex: 1,
        }}>
        <View style={{alignItems: 'center'}}>
          <Logo />
        </View>
        <Text
          numberOfLines={2}
          style={{
            letterSpacing: 3,
            fontSize: 32,
            color: mainColors.primary,
            marginVertical: 60,
            textAlign: 'left',
            paddingLeft: 40,
          }}>
          Do more to track {'\n'}your business.
        </Text>
      </View>
      {!userIsFirstTimeOpen && (
        <View
          style={{
            position: 'absolute',
            width: '95%',
            bottom: 40,
            alignSelf: 'center',
            backgroundColor: mainColors.secondary,
            borderRadius: 50,
          }}>
          <CustomButton
            handleOnPress={() => navigateToLockScreen('choose')}
            text="Get Started"
            textStyle={{
              textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color of the drop shadow
              textShadowOffset: {width: 2, height: 2}, // Offset of the drop shadow
              textShadowRadius: 5, // Radius of the drop shadow}}
            }}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default SplashScreen;
