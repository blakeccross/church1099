import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../Assets/config/colors';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const ConvoStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  userdp: {
    width: WP(18),
    height: WP(18),
    borderRadius: WP(9),
  },
  dp: {
    width: WP(13),
    height: WP(13),
    borderRadius: WP(6.5),
    resizeMode: 'cover',
  },
  msgTxt: {
    fontFamily: fontFamily.bold,
    color: 'black',
    fontSize: 22,
  },
  nameTxt: {
    fontFamily: fontFamily.medium,
    fontSize: 17,
    color: 'black',
  },

  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    color: palette.lightGrey,
  },
  flatlistContainer: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: HP(8),
  },
  item: {
    height: HP(20),
    backgroundColor: 'green',
    width: WP(60),
    // maxWidth: WP(70),
  },
});
