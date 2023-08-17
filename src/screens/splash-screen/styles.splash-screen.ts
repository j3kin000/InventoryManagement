import {StyleSheet} from 'react-native';
import {mainColors} from '../../utils/styles/styles.utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    letterSpacing: 3,
    fontSize: 32,
    color: mainColors.white,
    marginVertical: 60,
    textAlign: 'left',
    paddingLeft: 40,
  },
  buttonContainer: {
    position: 'absolute',
    width: '95%',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: mainColors.secondary,
    borderRadius: 50,
  },
  text: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Color of the drop shadow
    textShadowOffset: {width: 2, height: 2}, // Offset of the drop shadow
    textShadowRadius: 5, // Radius of the drop shadow}}
  },
});
