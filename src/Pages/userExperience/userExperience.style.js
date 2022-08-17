import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const userExperience = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'rgb(244, 244, 245)',
  },
  createTxt: {
    color: '#333333',
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  titleTxt: {
    color: '#333333',
    fontSize: 18,
    fontFamily: fontFamily.bold,
  },
  nothingTxt: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    color: '#666666',
  },
  input: {
    borderWidth: 0,
    width: '100%',
    backgroundColor: 'rgba(247,247,247,1)',
    color: 'rgb(0,0,0)',
    padding: 10,
  },
  applicantViewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: HP(0.5),
  },
});
