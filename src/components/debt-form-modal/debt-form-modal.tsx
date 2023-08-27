import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  findNodeHandle,
  StyleSheet,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dispatch, SetStateAction} from 'react';
import {Formik} from 'formik';
import {DebtFormSchema} from '../../utils/schema/schema.utils';
import CustomButton from '../custom-button/custom-button.component';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import {DebtProps, itemProps} from '../../store/debt/debt.types';
import {GestureResponderEvent} from 'react-native';
import RNPickerSelect, {
  PickerSelectProps,
} from 'react-native-picker-select-gian';
import {getProductList} from '../../utils/hooks/hooks';
import {useSelector} from 'react-redux';
import {selectProduct} from '../../store/product/product.selector';

type ProductFormModalProps = {
  isOpenModal: boolean;
  items: ItemsProps[];
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  onSubmitHandler: (values: DebtProps) => void;
  initialValues?: DebtProps;
};

export const item: itemProps = {
  uid: '',
  image: '',
  productName: '',
  salesPrice: '',
  numberItems: '',
};

export const initValues: DebtProps = {
  uid: '',
  name: '',
  inventoryUid: '',
  createdAt: '',
  items: [item],
  isPaid: false,
};

const placeholder = {
  label: 'Select a product...',
  value: null,
  color: '#9EA0A4', // Placeholder text color
};
export type ItemsProps = {
  uid: string;
  label: string;
  value: string;
  image: string;
  salesPrice: string;
};
const DebtFormModal: FC<ProductFormModalProps> = ({
  items,
  isOpenModal = false,
  setIsOpenModal = () => {},
  onSubmitHandler = () => {},
  initialValues = initValues,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setIsOpenModal(isOpenModal);
  }, [isOpenModal]);

  const onCancelHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const scrollToInput = (inputRef: number | null) => {
    if (scrollViewRef.current && inputRef) {
      scrollViewRef.current.scrollTo({
        y: inputRef - 500,
        animated: true,
      });
    }
  };

  const onAddProductHandler = (
    event: GestureResponderEvent,
    items: itemProps[],
  ) => {
    const yPosition = event.nativeEvent.locationY;
    if (event && yPosition) {
      scrollToInput(findNodeHandle(yPosition));
    }
  };

  const handlePickerOpen = () => {
    setPickerOpen(true);
  };

  const handlePickerClose = () => {
    setPickerOpen(false);
  };
  return (
    <Modal
      animationType="fade"
      visible={isOpenModal}
      transparent={false}
      onRequestClose={onCancelHandler}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          style={{
            flex: 1,
            flexGrow: 1,
          }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={globalStyles.title}>Product Form</Text>
              <TouchableOpacity onPress={onCancelHandler}>
                <AntDesign
                  name="closecircle"
                  size={32}
                  color={mainColors.dark}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                validationSchema={DebtFormSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setValues,
                }) => (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}> Name</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6E7ED',
                          borderRadius: 10,
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your Name..."
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        onFocus={(
                          event: NativeSyntheticEvent<TextInputFocusEventData>,
                        ) => {
                          if (event && event.target) {
                            scrollToInput(findNodeHandle(event.target));
                          }
                        }}
                      />
                      {touched.name && errors.name && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginBottom: 20,
                          }}>
                          {errors.name}
                        </Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}> Product List</Text>

                      {values.items.map((item, index) => {
                        const currentItem = errors.items?.[index] as itemProps; // Explicitly cast to itemProps type

                        return (
                          <View
                            key={index}
                            style={{
                              backgroundColor: '#E6E7ED',
                              borderRadius: 10,
                              padding: 10,
                              marginTop: 10,
                            }}>
                            {items.length !== 1 && (
                              <TouchableOpacity
                                onPress={(event: GestureResponderEvent) => {
                                  const updatedItems = values.items.filter(
                                    (_, i) => i !== index,
                                  );
                                  setValues({...values, items: updatedItems});
                                }}
                                style={{
                                  alignItems: 'flex-end',
                                }}>
                                <AntDesign
                                  name="close"
                                  size={16}
                                  color={mainColors.dark}
                                />
                              </TouchableOpacity>
                            )}
                            <View>
                              <View style={styles.inputContainer}>
                                <Text style={{fontSize: 16, fontWeight: '600'}}>
                                  Product
                                </Text>
                                {items.length !== 1 ? (
                                  <RNPickerSelect
                                    Icon={() => {
                                      return (
                                        <View
                                          style={{
                                            position: 'absolute',
                                            right: 18,
                                            top: 30,
                                          }}>
                                          <AntDesign
                                            name="caretdown"
                                            size={12}
                                            color={mainColors.dark}
                                          />
                                        </View>
                                      );
                                    }}
                                    placeholder={pickerOpen ? {} : placeholder}
                                    fixAndroidTouchableBug={true}
                                    style={pickerStyles}
                                    useNativeAndroidPickerStyle={false}
                                    onOpen={handlePickerOpen}
                                    onClose={handlePickerClose}
                                    value={
                                      values?.items[index]?.productName || ''
                                    }
                                    onValueChange={val => {
                                      if (val) {
                                        handleChange(
                                          `items.${index}.productName`,
                                        )(val);

                                        return;
                                      }
                                      handleChange(
                                        `items.${index}.productName`,
                                      )('');
                                    }}
                                    items={items}
                                  />
                                ) : (
                                  <View
                                    style={{
                                      marginTop: 10,
                                      backgroundColor: mainColors.grey,
                                      borderRadius: 10,
                                      paddingLeft: 10,
                                      paddingVertical: 15,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: 'black',
                                      }}>
                                      {items[0].value}
                                    </Text>
                                  </View>
                                )}
                                {touched.items?.[index]?.productName &&
                                  currentItem?.productName && (
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: 'red',
                                        marginBottom: 20,
                                      }}>
                                      {currentItem?.productName}
                                    </Text>
                                  )}
                              </View>
                              <View style={styles.inputContainer}>
                                <Text style={{fontSize: 16, fontWeight: '600'}}>
                                  Stock
                                </Text>
                                <TextInput
                                  style={{
                                    marginTop: 10,
                                    backgroundColor: mainColors.grey,
                                    borderRadius: 10,
                                    fontSize: 14,
                                    paddingLeft: 10,
                                  }}
                                  keyboardType="numeric"
                                  placeholder="Enter your Stock..."
                                  onChangeText={handleChange(
                                    `items.${index}.numberItems`,
                                  )} // Update field name here
                                  onBlur={handleBlur(
                                    `items.${index}.numberItems`,
                                  )} // Update field name here
                                  value={values.items[index].numberItems}
                                  onFocus={(
                                    event: NativeSyntheticEvent<TextInputFocusEventData>,
                                  ) => {
                                    if (event && event.target) {
                                      scrollToInput(
                                        findNodeHandle(event.target),
                                      );
                                    }
                                  }}
                                />
                                {touched.items?.[index]?.numberItems &&
                                  currentItem?.numberItems && (
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: 'red',
                                        marginBottom: 20,
                                      }}>
                                      {currentItem?.numberItems}
                                    </Text>
                                  )}
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                    {items.length !== 1 && (
                      <View style={styles.inputContainer}>
                        <TouchableOpacity
                          onPress={(event: GestureResponderEvent) => {
                            const updatedItems = [...values.items, item];
                            setValues({...values, items: updatedItems});
                          }}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <AntDesign
                            name="plus"
                            size={24}
                            color={mainColors.secondary}
                          />
                          <Text
                            style={{
                              ...globalStyles.title,
                              fontWeight: 'normal',
                              color: mainColors.secondary,
                              marginHorizontal: 10,
                            }}>
                            Add Product
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={styles.buttonContainer}>
                      <CustomButton
                        handleOnPress={handleSubmit}
                        text="Submit"
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DebtFormModal;

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
    padding: 20,
  },
  inputContainer: {
    paddingTop: 20,
  },
  buttonContainer: {
    paddingTop: 40,
  },
});
export const pickerStyles = StyleSheet.create({
  inputIOS: {
    color: '#000000',
    marginTop: 10,
    backgroundColor: mainColors.grey,
    borderRadius: 10,
    fontSize: 14,
    paddingLeft: 10,
  },

  inputAndroid: {
    color: '#000000',
    marginTop: 10,
    backgroundColor: mainColors.grey,
    borderRadius: 10,
    fontSize: 14,
    paddingLeft: 10,
  },
  modalViewMiddle: {
    // Style for the modal bottom container
    backgroundColor: 'red',
  },
  modalViewTop: {
    backgroundColor: 'red',
  },
  modalItemText: {
    // Style for the text of each item in the modal
    fontSize: 18,
    color: 'red',
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  // placeholder: {
  //   // Style for the placeholder text in the modal
  //   fontSize: 18,
  //   paddingVertical: 15,
  //   paddingHorizontal: 10,
  //   textAlign: 'center',
  //   color: '#9EA0A4',
  // },
});
