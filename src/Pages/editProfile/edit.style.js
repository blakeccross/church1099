import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const EditStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'rgb(244,244,245)',
  },
  emailTxt: {
    color: '#333333',
    fontSize: 18,
    fontFamily: fontFamily.regular,
    marginBottom: 5,
  },
  dp: {
    width: WP(25),
    height: WP(25),
    borderRadius: WP(3),
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});
