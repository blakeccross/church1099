import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {GlobalStyles} from '../../global/global.styles';

export const loginStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleTxt: {
    color: 'black',
    fontSize: 25,
    fontFamily: fontFamily.semi_bold,
  },
  emailTxt: {
    color: '#BDBDBD',
    fontSize: 20,
    fontFamily: fontFamily.light,
  },

  forgotTxt: {
    color: 'rgb(74,74,74)',
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
});
