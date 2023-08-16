import {Dimensions, PixelRatio, ToastAndroid} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import moment from 'moment-timezone';

const {fontScale, scale, width} = Dimensions.get('screen');

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// export const XS = width < 330
// export const SM = width < 375
// export const MD = width < 400
// export const LG = width >= 400

export const scaleFont = (fontSize = 0) => {
  const scaledFontScale = fontScale > 1 ? 1 + 1 * 0.1 : 1;
  return (
    (PixelRatio.getPixelSizeForLayoutSize(fontSize) * scaledFontScale) / scale
  );
};

// export const fixedFont = (fontSize) => {
//     // unaffected by phone font setting
//     const setScale = fontScale > 1 ? 0.8 : 1
//     return (PixelRatio.getPixelSizeForLayoutSize(fontSize) * setScale) / scale
//   }

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 200,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 200,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export default toastConfig;

export const toastAlert = ({title = '', type = 'info', description = ''}) => {
  Toast.show({
    type: type,
    text1: title,
    text2: description,

    position: 'bottom', // You can set the position to 'bottom' to ensure it appears at the bottom
    topOffset: 60, // Adjust this value to position the toast message at the desired distance from the bottom
  });
};

export const formatToMoney = (number: string) => {
  return parseFloat(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const getDateDuration = (date: string) => {
  // Given date
  const givenDate = new Date(date); // Replace with your given date

  // Current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(
    timeDifferenceMillis / (1000 * 60 * 60 * 24),
  );

  return `${daysDifference} days`;
};

export const getHourlyDuration = (date: string) => {
  // Given date
  const givenDate = moment.tz(date, 'Asia/Manila'); // Parse the given date in UTC timezone

  // Current date and time in Asia/Manila timezone
  const currentDate = moment.tz('Asia/Manila');

  // Calculate the time difference in minutes
  const minutesDifference = currentDate.diff(givenDate, 'minutes');
  console.log('givenDate', givenDate);

  console.log('currentDate', currentDate);

  console.log('minutesDifference', minutesDifference);
  // Check if the duration is less than an hour
  if (minutesDifference < 60) {
    return `${minutesDifference}m`;
  }

  // Check if the duration is exactly an hour
  if (minutesDifference === 60) {
    return `1h`;
  }

  // If the duration is more than an hour, convert to hours and minutes
  const hours = Math.floor(minutesDifference / 60);
  const remainingMinutes = minutesDifference % 60;

  if (hours < 24) {
    return `${hours}h ${remainingMinutes}m`;
  }

  // If the duration is more than a day
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours}h ${remainingMinutes}m`;
};

// Example usage
const duration = getHourlyDuration('2023-08-15T05:51:47.047Z');
console.log(`Duration: ${duration}`);

export const getDate = (date: string) => {
  const currentDate = new Date(date);

  const year = currentDate.getFullYear(); // 4-digit year
  const month = currentDate.getMonth(); // 0-based month (0 - January, 11 - December)
  const day = currentDate.getDate();

  return `${month}-${day}-${year}`;
};