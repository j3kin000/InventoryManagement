import {ListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight} from '../../utils/utils';
import {mainColors} from '../../utils/styles/styles.utils';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {InventoryFormProps} from '../inventory-form-modal/inventory-form-modal';
import FAB from 'react-native-fab';

export type CustomSwiperListViewProps = {
  data: [];
  dataProps: any;
  renderItem: ({item}: {item: any}) => React.JSX.Element;
  hiddenItem: (
    rowData: ListRenderItemInfo,
    rowMap: RowMap,
  ) => React.JSX.Element;
  onHandleRenderItemHandler: (item: any) => void;
  onHandeSetPostHandler: () => void;
  onHandleSetEditHandler: (data: any, closeRow: () => void) => void;
  onHandleSetDeleteHandler: () => void;
  onHandleSubmitFormHandler: () => void;
};
const CustomSwiperListView: FC<CustomSwiperListViewProps> = ({
  data,
  renderItem,
  onHandleRenderItemHandler,
  hiddenItem,
  onHandeSetPostHandler,
  onHandleSetEditHandler,
  onHandleSetDeleteHandler,
  onHandleSubmitFormHandler,
}) => {
  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginBottom: 20,
          backgroundColor: mainColors.white,
        }}>
        <Text>Ascending</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{paddingHorizontal: 10}}>Sort by</Text>
          <Octicons name="sort-asc" size={24} />
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View
      style={{
        height: windowHeight / 2,
        flex: 1, // This makes the container take up the entire available space
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Octicons size={48} name="checklist" color={mainColors.secondary} />
        <Text style={{fontWeight: 'bold', fontSize: 18, paddingTop: 20}}>
          Oops it’s empty here
        </Text>
        <Text style={{fontSize: 14}}>No List have been created yet</Text>
      </View>
    </View>
  );

  return (
    <>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={hiddenItem}
        rightOpenValue={-150}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        disableRightSwipe={true}
        stickyHeaderIndices={[0]}
        keyExtractor={item => item.uid}
      />
      <FAB
        buttonColor={mainColors.secondary}
        iconTextColor={mainColors.primary}
        onClickAction={onHandeSetPostHandler}
        visible={true}
        iconTextComponent={<AntDesign name="plus" />}
      />
    </>
  );
};

export default CustomSwiperListView;

const styles = StyleSheet.create({});
