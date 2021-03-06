import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const ProfileStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'rgb(244,244,245)',
  },
  dp: {
    width: WP(30),
    height: WP(30),
    alignSelf: 'center',
    marginTop: HP(4),
    borderRadius: WP(15),
  },
  locTxt: {
    color: '#666666',
    fontSize: 14,
    fontFamily: fontFamily.light,
  },
  circleIcon: {
    backgroundColor: 'white',
    borderRadius: WP(7),
    ...GlobalStyles.row,
    paddingHorizontal: WP(3),
    paddingVertical: WP(3),
  },
  panelView: {
    backgroundColor: 'white',
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
    marginTop: HP(1)
  },
  skillTxt: {
    color: '#333333',
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  inp: {
    height: 40,
    marginTop: -HP(1),
    color: '#666666',
    fontFamily: fontFamily.light,
    fontSize: 18,
  },
  experienceList: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
  skillItem: {
    backgroundColor: '#F4F4F5',
    flexDirection: 'row',
    alignItems: 'center',
    // height: HP(5),
    borderRadius: 20,
    padding: 9,
    marginRight: 3,
    marginBottom: 5,
    justifyContent: 'center',
  },
  portItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    //padding: 5,
    marginRight: 10,
    //marginBottom: 5,
    justifyContent: 'center',
  },
});
