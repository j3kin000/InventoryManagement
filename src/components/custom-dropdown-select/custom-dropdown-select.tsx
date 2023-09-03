import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export type CustomDropdownSelectProps = {
  defaultValue: string;
  index: number;
  handleChange: (field: string) => (value: any) => void;
};
const CustomDropdownSelect: FC<CustomDropdownSelectProps> = ({
  defaultValue,
  index,
  handleChange,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Orange', value: 'orange'},
    {label: 'Orange', value: 'orange'},

    {label: 'Melon', value: 'melon'},
    {label: 'Banana', value: 'banana', disabled: true, createdAt: 'a'},
  ]);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const settingFieldValue = useMemo(
    () => handleChange(`items.${index}.productName`)(value),
    [value, setValue],
  );
  const onSetValueChange = val => {
    setValue(val);
  };
  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onSetValueChange}
        setItems={setItems}
      />
    </>
  );
};

export default CustomDropdownSelect;

const styles = StyleSheet.create({});
