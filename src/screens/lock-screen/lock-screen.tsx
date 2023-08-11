import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import PINCode, {
  hasUserSetPinCode,
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from '@haskkor/react-native-pincode';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root.navigation';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {
  postFirstTimeOpenAsync,
  postUserAsync,
} from '../../store/user/user.action';
import uuid from 'react-native-uuid';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';

export type LockScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LockScreen'>;
  route: RouteProp<RootStackParamList, 'LockScreen'>;
};

const customTexts = {
  enter: {
    title: 'Enter PIN',
    subTitle: 'Enter 4- digit PIN to access',
    error: 'custom enter PIN error',
    backSpace: 'Del',
    footerText: 'Forgot PIN?',
  },
  set: {
    title: 'Set PIN',
    subTitle: 'Enter 4- digit PIN to access',
    repeat: 'Enter PIN again ',
  },
  // locked: {
  //   title: 'Custom locked title',
  //   subTitle: `You have entered wrong PIN {{maxAttempt}} times. The app is locked in {{lockDuration}}.`,
  //   lockedText: 'Locked',
  // },
  // reset: {
  //   title: 'Custom reset PIN title',
  //   subTitle: `Custom reset PIN sub title`,
  //   confirm: 'Custom confirm message',
  // },
};

const LockScreen: FC<LockScreenProps> = ({navigation, route}) => {
  const pinStatus = route.params.pinStatus || 'enter';
  const dispatch = useAppDispatch();

  const _finishProcess = async () => {
    const hasPin = await hasUserSetPinCode();
    console.log('hasPin', hasPin);
    if (hasPin) {
      console.log('hasPin success', hasPin);
      dispatch(postFirstTimeOpenAsync(true));

      navigation.replace('HomeScreen');
    }
  };

  return (
    <View style={{...globalStyles.container}}>
      <PINCode
        status={pinStatus}
        touchIDDisabled={true}
        finishProcess={_finishProcess}
        colorCircleButtons={mainColors.secondary}
        colorPassword={mainColors.dark}
        stylePinCodeButtonNumber={mainColors.primary}
        delayBetweenAttempts={0}
        stylePinCodeCircle={{width: 10, height: 10, borderRadius: 100}}
        titleChoose={customTexts.set.title}
        titleConfirm={customTexts.set.title}
        stylePinCodeColorTitle={mainColors.dark}
        stylePinCodeColorSubtitle={mainColors.dark}
        stylePinCodeTextTitle={{fontWeight: 'bold'}}
        subtitleChoose={customTexts.set.subTitle}
        subtitleConfirm={customTexts.set.repeat}
        subtitleEnter={customTexts.enter.subTitle}
        colorPasswordEmpty={mainColors.dark}
        stylePinCodeDeleteButtonColorHideUnderlay={mainColors.dark}
        stylePinCodeDeleteButtonColorShowUnderlay={mainColors.dark}
        customBackSpaceIcon={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="backspace"
              color={mainColors.secondary}
              size={30}
            />
          </View>
        )}
        timeLocked={0}
        styleLockScreenButton={{backgroundColor: mainColors.secondary}}
      />
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({});

// const _showEnterPinLock = async () => {
//   const hasPin = await hasUserSetPinCode();
//   if (hasPin) {
//     //   setPinStatus('enter');
//     //   setShowPinLock(true);
//   } else {
//     Alert.alert('OK', 'You have not set your pin.', [
//       {
//         onPress: () => {
//           // do nothing
//         },
//       },
//     ]);
//   }
// };

// const __clearPin = async () => {
//   await deleteUserPinCode();
//   await resetPinCodeInternalStates();
//   Alert.alert('OK', 'You have cleared your pin.', [
//     {
//       onPress: () => {
//         // do nothing
//       },
//     },
//   ]);
// };