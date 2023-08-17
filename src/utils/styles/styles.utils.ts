import {StyleSheet} from 'react-native';

export const mainColors = {
  primary: '#FFFFFF',
  white: '#FFFFFF',
  secondary: '#5B3DDE',
  dark: '#000000',
  grey: '#F3F3F3',
};
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.primary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});
