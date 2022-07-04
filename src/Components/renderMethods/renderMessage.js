//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';

const RenderMessages = ({item, myid}) => {
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: item.createdBy == myid ? 'flex-end' : 'flex-start',
      }}>
      {item.createdBy == myid ? (
        <Text
          style={{
            ...styles.text,
            textAlign: 'left',
            backgroundColor: '#EDEFF3',
            color: 'black',
          }}>
          {item.mymsg}
        </Text>
      ) : (
        <Text style={styles.text}>{item.mymsg}</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'white',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'dodgerblue',
    minHeight: HP(7),
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    maxWidth: WP(70),
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 10,
    marginVertical: HP(0.5),
    marginHorizontal: WP(2),
    fontWeight: '400',
  },
});

//make this component available to the app
export default RenderMessages;
