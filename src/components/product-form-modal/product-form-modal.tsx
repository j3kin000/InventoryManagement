import React, {FC, useEffect, useRef} from 'react';
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dispatch, SetStateAction} from 'react';
import {Formik} from 'formik';
import {
  InventoryFormSchema,
  ProductFormSchema,
} from '../../utils/schema/schema.utils';
import CustomButton from '../custom-button/custom-button.component';
import {globalStyles, mainColors} from '../../utils/styles/styles.utils';

export type ProductFormProps = {
  inventoryUid: string;
  uid: string;
  image: string;
  productName: string;
  createdAt: string;
  stock: string;
  originalPrice: string;
  salesPrice: string;
};

type ProductFormModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  onSubmitHandler: (values: ProductFormProps) => void;
  initialValues?: ProductFormProps;
};

const ProductFormModal: FC<ProductFormModalProps> = ({
  isOpenModal = false,
  setIsOpenModal = () => {},
  onSubmitHandler = () => {},
  initialValues = {
    inventoryUid: '',
    createdAt: '',
    uid: '',
    image: '',
    productName: '',
    stock: '',
    originalPrice: '',
    salesPrice: '',
  },
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
          ref={scrollViewRef}
          style={{
            flex: 1,
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
                validationSchema={ProductFormSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}>Image</Text>
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}
                        onPress={() => {}}>
                        <View
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            backgroundColor: '#E6E7ED',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <AntDesign
                            name="pluscircle"
                            size={18}
                            color={mainColors.dark}
                          />
                          <Text
                            style={{...globalStyles.text, paddingVertical: 10}}>
                            Upload {`\n`} Image
                          </Text>
                          {errors.image && (
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'red',
                                marginBottom: 20,
                              }}>
                              {errors.image}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}>Product Name</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6E7ED',
                          borderRadius: 10,
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your Product Name..."
                        onChangeText={handleChange('productName')}
                        onBlur={handleBlur('productName')}
                        value={values.productName}
                        onFocus={(
                          event: NativeSyntheticEvent<TextInputFocusEventData>,
                        ) => {
                          if (event && event.target) {
                            scrollToInput(findNodeHandle(event.target));
                          }
                        }}
                        error={touched.productName && errors.productName}
                      />
                      {touched.productName && errors.productName && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginBottom: 20,
                          }}>
                          {errors.productName}
                        </Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}>Stock</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6E7ED',
                          borderRadius: 10,
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your Stock..."
                        onChangeText={handleChange('stock')}
                        onBlur={handleBlur('stock')}
                        value={values.stock}
                        onFocus={(
                          event: NativeSyntheticEvent<TextInputFocusEventData>,
                        ) => {
                          if (event && event.target) {
                            scrollToInput(findNodeHandle(event.target));
                          }
                        }}
                        error={touched.stock && errors.stock}
                      />
                      {touched.stock && errors.stock && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginBottom: 20,
                          }}>
                          {errors.stock}
                        </Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}>Original Price</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6E7ED',
                          borderRadius: 10,
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your Original Price..."
                        onChangeText={handleChange('originalPrice')}
                        onBlur={handleBlur('originalPrice')}
                        value={values.originalPrice}
                        onFocus={(
                          event: NativeSyntheticEvent<TextInputFocusEventData>,
                        ) => {
                          if (event && event.target) {
                            scrollToInput(findNodeHandle(event.target));
                          }
                        }}
                        error={touched.originalPrice && errors.originalPrice}
                      />
                      {touched.originalPrice && errors.originalPrice && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginBottom: 20,
                          }}>
                          {errors.originalPrice}
                        </Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={globalStyles.title}>Sales Price</Text>
                      <TextInput
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6E7ED',
                          borderRadius: 10,
                          fontSize: 14,
                          paddingLeft: 10,
                        }}
                        placeholder="Enter your Sales Price..."
                        onChangeText={handleChange('salesPrice')}
                        onBlur={handleBlur('salesPrice')}
                        value={values.salesPrice}
                        onFocus={(
                          event: NativeSyntheticEvent<TextInputFocusEventData>,
                        ) => {
                          if (event && event.target) {
                            scrollToInput(findNodeHandle(event.target));
                          }
                        }}
                        error={touched.salesPrice && errors.salesPrice}
                      />
                      {touched.salesPrice && errors.salesPrice && (
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'red',
                            marginBottom: 20,
                          }}>
                          {errors.salesPrice}
                        </Text>
                      )}
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

export default ProductFormModal;

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
