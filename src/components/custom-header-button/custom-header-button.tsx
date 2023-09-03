import {Text} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {mainColors} from '../../utils/styles/styles.utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type CustomHeaderButtonProps = {
  onPressHandler: () => void;
  title: string;
  icon: ReactNode;
};
const CustomHeaderButton: FC<CustomHeaderButtonProps> = ({
  onPressHandler,
  title,
  icon,
}) => {
  return (
    <TouchableOpacity onPress={onPressHandler} style={{alignItems: 'center'}}>
      {icon}
      <Text style={{color: mainColors.grey, fontSize: 10, letterSpacing: 1}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
