import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const SettingStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    //backgroundColor: 'rgb(244,244,245)',
  },
  setTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: fontFamily.regular,
    marginLeft: WP(3),
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 3,
    padding: 15,
    flexDirection: 'row',
  },
  dp: {
    width: WP(15),
    height: WP(15),
    borderRadius: WP(15),
  },
});
