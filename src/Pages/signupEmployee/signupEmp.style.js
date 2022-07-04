import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const SignupEmpStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  emailTxt: {
    color: '#BDBDBD',
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  createTxt: {
    fontSize: 14,
    color: 'rgb(177,177,177)',
    fontFamily: fontFamily.light,
    paddingRight: WP(18),
  },
  input: {
    borderWidth: 0,
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(247,247,247,1)',
    color: 'rgb(0,0,0)',
    padding: 10,
  },
});
