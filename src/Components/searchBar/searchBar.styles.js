import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HP(10),
    alignItems: 'center',
    paddingRight: 25,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  input: {
    width: WP(81),
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 20,
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  msgTxt: {
    fontFamily: fontFamily.bold,
    color: 'black',
    fontSize: 22,
  },
  button: {
    backgroundColor: 'white',
    width: WP(15),
    height: HP(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
export default styles;
