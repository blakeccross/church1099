import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import {palette} from '../../../Assets/config/colors';
import fontFamily from '../../../Assets/config/fontFamily';
import {WP} from '../../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../../global/global.styles';

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  userdp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(5),
    paddingLeft: WP(10),
  },
  dp: {
    width: WP(13),
    height: WP(13),
    borderRadius: WP(6.5),
  },
  msgTxt: {
    fontFamily: fontFamily.bold,
    color: 'black',
    fontSize: 22,
  },
  nameTxt: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: 'black',
  },
  modalView: {
    backgroundColor: 'white',
    flex: 0.8,
    borderRadius: 20,
    // position: 'absolute',
    width: '100%',
  },

  lastTxt: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    color: palette.lightGrey,
  },
  notFoundText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: palette.black,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginTop: '50%',
  },
});

export default styles;
