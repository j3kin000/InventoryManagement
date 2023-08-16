import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {windowHeight} from '../../utils/utils';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../custom-button/custom-button.component';
import {mainColors} from '../../utils/styles/styles.utils';
import {Formik} from 'formik';
import {InventoryFormSchema} from '../../utils/schema/schema.utils';

export type InventoryFormSchema = {
  title: string;
  uid: string;
};
export type InventoryFormModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  onSubmitHandler: (values: InventoryFormSchema) => void;
  initialValues?: InventoryFormSchema;
};

const InventoryFormModal: FC<InventoryFormModalProps> = ({
  isOpenModal = false,
  setIsOpenModal = () => {},
  onSubmitHandler = () => {},
  initialValues = {title: '', uid: ''},
}) => {
  useEffect(() => {
    setIsOpenModal(isOpenModal);
  }, [isOpenModal]);

  const onCancelHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Modal visible={isOpenModal} transparent={true}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF80',
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,

            // bottom: 40,
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              paddingTop: 10,
              width: '100%',
              backgroundColor: 'transparent',
              shadowColor: '#000',
              shadowRadius: 5,
              shadowOpacity: 0.2,
              elevation: 5,
              // minHeight: 100,
              // minHeight: height * 0.8,
              maxHeight: windowHeight * 0.8,
            }}>
            <View
              style={{
                backgroundColor: '#FFF',
                width: '100%',
                paddingTop: 20,
                paddingHorizontal: 20,
                borderRadius: 10,
                // minHeight: height * 0.8,
                maxHeight: windowHeight * 0.8,
              }}>
              <View
                style={{
                  height: 40,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#00A7D3',
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                  }}>
                  Add Inventory
                </Text>
              </View>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                validationSchema={InventoryFormSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          paddingBottom: 10,
                          fontWeight: 'bold',
                        }}>
                        Title
                      </Text>
                      <TextInput
                        style={{
                          backgroundColor: '#F3F3F3',
                          borderRadius: 10,
                          fontSize: 16,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your title..."
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                      />
                      <Text
                        style={{fontSize: 16, color: 'red', marginBottom: 20}}>
                        {errors.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        marginBottom: 20,
                      }}>
                      <CustomButton
                        handleOnPress={onCancelHandler}
                        text="Cancel"
                        buttonStyle={{
                          backgroundColor: '#F3F3F3',
                          padding: 10,
                          marginHorizontal: 10,
                        }}
                        textStyle={{color: mainColors.dark}}
                      />
                      <CustomButton
                        handleOnPress={handleSubmit}
                        text="Submit"
                        buttonStyle={{padding: 10}}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InventoryFormModal;

const styles = StyleSheet.create({});
