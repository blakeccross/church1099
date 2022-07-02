import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const NotiStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  jobTxt: {
    color: 'black',
    fontSize: 23,
    fontFamily: fontFamily.bold,
    marginLeft: WP(3),
    marginTop: HP(2),
    marginBottom: HP(1)
  },
  dp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(8),
  },
  nameTxt: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: 'black',
  },
  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    color: '#707070',
    // color:palette.lightGrey
  },
  swipeAbleButtonContainer: {
    marginLeft: WP(7),
    //marginRight: WP(4),
  },
  //swipeAbleButtonText: {
    //marginTop: HP(0.3),
    //color: 'white',
    //fontFamily: fontFamily.UbuntuRegular,
  //},
  swipeAbleButton: {
    width: WP(20),
    height: HP(10),
    backgroundColor: '#ff0000',
    alignSelf: 'center',
    marginTop: HP(2),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingHorizontal: WP(5),
    marginTop: HP(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: HP(10),
    //width: WP(97),
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  portItem: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    //padding: 5,
    marginBottom: 10,
    //marginBottom: 5,
    justifyContent: 'center',
  },
});
