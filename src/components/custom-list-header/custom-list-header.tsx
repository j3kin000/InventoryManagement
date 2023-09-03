import {Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {globalStyles} from '../../utils/styles/styles.utils';
import Octicons from 'react-native-vector-icons/Octicons';

export type CustomListHeaderProps = {
  isAscending: boolean;
  setAscending: Dispatch<SetStateAction<boolean>>;
};
const CustomListHeader: FC<CustomListHeaderProps> = ({
  isAscending,
  setAscending,
}) => {
  const onSortChangeHandler = () => {
    setAscending(!isAscending);
  };
  return (
    <View
      style={{
        ...globalStyles.rowContainer,
        backgroundColor: 'white',
      }}>
      <Text>{isAscending ? 'Ascending' : 'Descending'} </Text>
      <TouchableOpacity
        onPress={onSortChangeHandler}
        style={{
          flexDirection: 'row',
        }}>
        <Text style={{paddingHorizontal: 10}}>Sort by</Text>
        <Octicons name={isAscending ? 'sort-asc' : 'sort-desc'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomListHeader;
