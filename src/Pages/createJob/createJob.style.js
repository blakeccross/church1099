import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const CreateJobStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  createTxt: {
    marginTop: HP(2),
    fontFamily: fontFamily.bold,
    marginBottom: 5,
    fontSize: 15,
    color: '#000000',
  },
  input: {
    borderWidth: 0,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'rgba(247,247,247,1)',
    color: 'rgb(0,0,0)',
    padding: 10,
  },
});
