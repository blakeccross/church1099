import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

const Styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  createTxt: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: '#000000',
  },
  input: {
    borderWidth: 0,
    width: '100%',
    backgroundColor: 'rgba(247,247,247,1)',
    color: 'rgb(0,0,0)',
    padding: 10,
  },
});
export default Styles;
