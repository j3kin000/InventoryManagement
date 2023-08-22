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
  BackHandler,
  Image,
  TouchableOpacityProps,
  TargetedEvent,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dispatch, SetStateAction} from 'react';
import {Formik, FormikErrors} from 'formik';
import {
  DebtFormSchema,
  InventoryFormSchema,
  ProductFormSchema,
} from '../../utils/schema/schema.utils';
import CustomButton from '../custom-button/custom-button.component';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';
import {windowHeight, windowWidth} from '../../utils/utils';
import {DebtProps, itemProps} from '../../store/debt/debt.types';
import {GestureResponderEvent} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomDropdownSelect from '../custom-dropdown-select/custom-dropdown-select';
import Picker from 'react-native-picker-select-gian';

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

const data = [
  {key: '1asdas', value: 'Mobiles', disabled: true},
  {key: '2', value: 'apple'},
  {key: '3', value: 'Cameras'},
  {key: '4', value: 'Computers', disabled: true},
  {key: '5', value: 'Vegetables'},
  {key: '6', value: 'Diary Products'},
  {key: '7', value: 'Drinks'},
  {key: '7', value: 'Drinks'},
  {key: '7', value: 'Drinks'},
  {key: '7', value: 'Drinks'},
  {key: '7', value: 'Drinks'},
];

type ProductFormModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  onSubmitHandler: (values: DebtProps) => void;
  initialValues?: DebtProps;
  onAddProductListHandler: (items: itemProps[]) => void;
  onRemoveProductListHandler: (item: string, items: itemProps[]) => void;
};

const DebtFormModal: FC<ProductFormModalProps> = ({
  isOpenModal = false,
  setIsOpenModal = () => {},
  onSubmitHandler = () => {},
  initialValues = initValues,
  onAddProductListHandler = () => {},
  onRemoveProductListHandler = () => {},
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

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
    console.log('Y-axis position:', yPosition);
    if (event && yPosition) {
      scrollToInput(findNodeHandle(yPosition));
    }
    onAddProductListHandler(items);
  };

  const onRemoveProductHandler = (
    event: GestureResponderEvent,
    item: string,
    items: itemProps[],
  ) => {
    const yPosition = event.nativeEvent.locationY;
    if (event && yPosition) {
      scrollToInput(findNodeHandle(yPosition));
    }
    onRemoveProductListHandler(item, items);
  };
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Orange', value: 'orange'},
    {label: 'Orange', value: 'orange'},

    {label: 'Melon', value: 'melon'},
    {label: 'Banana', value: 'banana', disabled: true, createdAt: 'a'},
  ]);
  const onSelectProduct = (value: string, handleChange: () => void) => {};
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
                  setFieldValue,
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
                        return (
                          <View
                            key={index}
                            style={{
                              backgroundColor: '#E6E7ED',
                              borderRadius: 10,
                              padding: 10,
                              marginTop: 10,
                            }}>
                            <TouchableOpacity
                              onPress={(event: GestureResponderEvent) => {
                                const updatedItems = values.items.filter(
                                  (_, i) => i !== parseInt(index),
                                );
                                console.log('updatedItems', updatedItems);
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
                            <View style={{paddingTop: 10}}>
                              <Text style={{fontSize: 16}}>Stock</Text>
                              {/* <SelectList
                                boxStyles={{
                                  borderWidth: 0,
                                  marginTop: 10,
                                  backgroundColor: mainColors.grey,
                                  borderRadius: 10,
                                  paddingLeft: 10,
                                }}
                                dropdownStyles={{
                                  borderWidth: 0,
                                  marginTop: 10,
                                  backgroundColor: mainColors.grey,
                                  borderRadius: 10,
                                  paddingLeft: 10,
                                }}
                                dropdownTextStyles={{...globalStyles.text}}
                                inputStyles={{...globalStyles.text}}
                                setSelected={val =>
                                  handleChange(`items.${index}.productName`)(
                                    val,
                                  )
                                }
                                searchPlaceholder={
                                  values.items[index].productName
                                }
                                data={data}
                                save="value"
                              /> */}
                              {console.log(
                                'values?.items[index]?.productName ',
                                values?.items[index]?.productName,
                              )}
                              <Picker
                                value={values?.items[index]?.productName || ''}
                                onValueChange={val => {
                                  console.log('VALUE', val);
                                  if (val)
                                    handleChange(`items.${index}.productName`)(
                                      val,
                                    );
                                }}
                                items={[
                                  {label: 'Football', value: 'football'},
                                  {label: 'Baseball', value: 'baseball'},
                                  {label: 'Hockey', value: 'hockey'},
                                ]}
                              />
                              {/* <CustomDropdownSelect
                                index={index}
                                handleChange={handleChange}
                                defaultValue={values.items[index].productName}
                              /> */}
                              {touched.items?.[index]?.productName &&
                                errors.items?.[index]?.productName && (
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: 'red',
                                      marginBottom: 20,
                                    }}>
                                    {errors.items?.[index]?.productName}
                                  </Text>
                                )}
                              <View style={styles.inputContainer}>
                                <Text style={globalStyles.title}>Stock</Text>
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
                                  errors.items?.[index]?.numberItems && (
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: 'red',
                                        marginBottom: 20,
                                      }}>
                                      {errors.items?.[index]?.numberItems}
                                    </Text>
                                  )}
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        onPress={(event: GestureResponderEvent) =>
                          onAddProductHandler(event, values.items)
                        }
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
