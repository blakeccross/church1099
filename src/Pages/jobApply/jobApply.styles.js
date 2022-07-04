import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  jobTxt: {
    color: '#333333',
    fontSize: 25,
    fontFamily: fontFamily.bold,

  },
  conTxt: {
    color: '#333333',
    fontSize: 20,
    fontFamily: fontFamily.light,
    paddingHorizontal: WP(20),
  },
  keyTxt: {
    color: '#333333',
    fontSize: 18,
    fontFamily: fontFamily.bold,
  },
  keyView: {
    marginHorizontal: WP(3),
    marginTop: HP(3),
    backgroundColor: 'rgb(244,244,245)',
    paddingHorizontal: WP(5),
    paddingVertical: HP(2),
  },
  descriptionTex: {
    marginTop: HP(3),
    color: '#333333',
    fontSize: 15,
    fontFamily: fontFamily.light,
    //paddingHorizontal: WP(0),
    textAlign: 'left',
  },
});
export default styles;
