import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Styles from './searchList.styles';
import {GlobalStyles} from '../../../global/global.styles';
import {HP, WP} from '../../../Assets/config/screen-ratio';
import IconCircle from 'react-native-vector-icons/Feather';
import ReactNativeModal from 'react-native-modal';
import moment from 'moment';
import styles from './searchList.styles';

const SearchList = ({data, onpress, show, setshow, setselected}) => {
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          ...GlobalStyles.row,
          justifyContent: 'space-between',
          marginTop: HP(5),
          borderBottomWidth: 0.5,
          borderBottomColor: 'gray',
          paddingBottom: HP(1),
          marginHorizontal: WP(5),
        }}>
        <TouchableOpacity
          onPress={() => onpress(item)}
          style={{...GlobalStyles.row}}>
          <Image source={{uri: item?.image}} style={{...Styles.userdp}} />
          <View style={{paddingLeft: WP(3)}}>
            <Text style={{...Styles.nameTxt}}>{item.name}</Text>
            <Text style={{...Styles.lastTxt}}>id: {item.id}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <ReactNativeModal
      isVisible={show}
      onBackButtonPress={() => setshow(false)}
      onBackdropPress={() => setshow(false)}
      //   contentContainerStyle={{pa
      //   }}
    >
      <View style={Styles.modalView}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.notFoundText}>No Record Found</Text>
        )}
      </View>
    </ReactNativeModal>
  );
};
export default SearchList;
