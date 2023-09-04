import {StyleSheet} from 'react-native';
import {mainColors} from '../../utils/styles/styles.utils';
import {windowHeight} from '../../utils/utils';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF80',
    padding: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 5,
    maxHeight: windowHeight * 0.8,
  },
  titleContainer: {
    height: 40,
    marginBottom: 10,
  },
  titleText: {
    color: '#00A7D3',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#F3F3F3',
    padding: 10,
    marginHorizontal: 10,
  },
  cancelButtonText: {
    color: mainColors.dark,
  },
  submitButton: {
    padding: 10,
  },
});
