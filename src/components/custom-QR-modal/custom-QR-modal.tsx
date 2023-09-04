import {
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {scaleFont, windowHeight} from '../../utils/utils';

export type CustomQRModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  type: string;
  title: string;
  onReadScan: (e: BarCodeReadEvent) => void;
  qrData: string;
};
const CustomQRModal: FC<CustomQRModalProps> = ({
  isOpenModal,
  setIsOpenModal,
  type,
  title,
  onReadScan,
  qrData,
}) => {
  const onCancelHandler = () => {
    setIsOpenModal(!isOpenModal);
  };
  const scannerRectSize = Dimensions.get('window').width * 0.7; // Adjust the size of the square as needed

  return (
    <Modal
      visible={isOpenModal}
      transparent={false}
      animationType="fade"
      onRequestClose={onCancelHandler}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
          }}>
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <Text style={globalStyles.title}>{title}</Text>
              <TouchableOpacity onPress={onCancelHandler}>
                <AntDesign
                  name="closecircle"
                  size={32}
                  color={mainColors.dark}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              {type === 'scan' ? (
                <>
                  <QRCodeScanner
                    containerStyle={{flex: 1}}
                    cameraStyle={styles.camera}
                    onRead={onReadScan}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    showMarker={true}
                    customMarker={
                      <>
                        <View
                          style={[
                            styles.rectangle,
                            {width: scannerRectSize, height: scannerRectSize},
                          ]}
                        />
                      </>
                    }
                    reactivate={true}
                    reactivateTimeout={1000}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      marginTop: 50,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                        padding: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust opacity as needed
                      }}>
                      <AntDesign name="warning" color="yellow" size={24} />
                      <Text
                        style={{
                          color: mainColors.white,
                          paddingHorizontal: 10,
                        }}>
                        Scanning QR code will Override your current progress!!!
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: mainColors.white,
                        padding: 10,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust opacity as needed
                      }}>
                      Make sure the QR code is within the frame
                    </Text>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                    margin: 30,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 10,

                      padding: 40,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingBottom: 20,
                          fontSize: scaleFont(20),
                        }}>
                        Inventory Management System
                      </Text>
                    </View>
                    <QRCode
                      value={qrData}
                      logoSize={30}
                      logoBackgroundColor="transparent"
                      size={windowHeight / 4}
                    />
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingTop: 20,
                          fontSize: scaleFont(16),
                        }}>
                        Scan this Qr Code to Transfer your progress to others
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomQRModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F4F5FB',
  },
  inputContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    paddingTop: 40,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  scannerContainer: {
    flex: 1,
  },
  camera: {
    height: windowHeight / 1.1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: mainColors.secondary, // Change the color as needed
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    backgroundColor: 'red',
  },
});
