//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {HP, WP} from '../../Assets/config/screen-ratio';
const Dropdown = ({list, show, setShow, setval, onpressItem}) => {
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          onpressItem(item), setShow(false);
        }}
        style={styles.item}>
        <Text style={styles.skillText}>{item.Type}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ReactNativeModal
      isVisible={show}
      style={{margin: 0}}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}>
      <View style={styles.modView}>
        <FlatList
          data={list}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ReactNativeModal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  modView: {
    paddingTop: 30,
    backgroundColor: 'white',
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: '0%',
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: 'center',
    borderRadius: 15,
  },
  item: {
    borderBottomWidth: 0.5,
    height: HP(6),
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  skillText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 10,
  },
});

//make this component available to the app
export default Dropdown;
