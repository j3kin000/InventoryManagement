import {Platform, StyleSheet} from 'react-native';
import {mainColors} from '../../utils/styles/styles.utils';

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,

    ...Platform.select({
      ios: {
        paddingTop: 70,
        paddingBottom: 75,
      },
      android: {
        paddingTop: 50,
        paddingBottom: 75,
      },
    }),
  },
  titleText: {
    color: mainColors.white,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
  },
  text: {
    color: mainColors.grey,
    fontSize: 10,
    letterSpacing: 1,
  },
  infoContainer: {
    position: 'absolute',
    backgroundColor: mainColors.primary,
    alignSelf: 'center',
    width: '95%',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 5,
    minHeight: 100,
    ...Platform.select({
      ios: {
        top: 120,
      },
      android: {
        top: 100,
      },
    }),
  },
  infoTitleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  infoTextTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  infoText: {
    color: '#C2C2C2',
    fontSize: 12,
    textAlign: 'center',
  },
});
