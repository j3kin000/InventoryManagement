import React, {FC} from 'react';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root.navigation';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {postFirstTimeOpenAsync} from '../../store/user/user.action';
import {useAppDispatch} from '../../utils/reducer/reducerHooks.utils';
import {BackHandler, View} from 'react-native';

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
        stylePinCodeTextTitle={{fontWeight: 'bold', fontSize: 32}}
        subtitleChoose={customTexts.set.subTitle}
        subtitleConfirm={customTexts.set.repeat}
        subtitleEnter={customTexts.enter.subTitle}
        colorPasswordEmpty={mainColors.dark}
        stylePinCodeDeleteButtonColorHideUnderlay={mainColors.dark}
        stylePinCodeDeleteButtonColorShowUnderlay={mainColors.dark}
        customBackSpaceIcon={() => (
          <View style={globalStyles.centerContainer}>
            <MaterialIcons
              name="backspace"
              color={mainColors.secondary}
              size={30}
            />
          </View>
        )}
        timeLocked={0}
        disableLockScreen={true}
        styleLockScreenButton={{backgroundColor: mainColors.secondary}}
        iconButtonDeleteDisabled={true}
        onClickButtonLockedPage={() => {
          console.log('Quitting');
          BackHandler.exitApp();
        }}
      />
    </View>
  );
};

export default LockScreen;

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
