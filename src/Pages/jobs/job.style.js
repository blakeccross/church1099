import React, {useEffect} from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';

export const JobStyle = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: 'white',
  },
  HeaderTxt: {
    color: 'black',
    fontSize: 30,
    fontFamily: fontFamily.bold,
    marginLeft: WP(3),
    marginTop: HP(2),
    marginBottom: HP(1)
  },
  searchSection: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: WP(4),
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius:10,
},
  conTxt: {
    color: '#333333',
    fontSize: 20,
    fontFamily: fontFamily.light,
  },
  keyTxt: {
    color: '#333333',
    fontSize: 18,
    fontFamily: fontFamily.bold,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: HP(92),
    justifyContent: 'center',
    alignItems: 'center',
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
  },
  jobTxt: {
    color: '#333333',
    fontSize: 30,
    fontFamily: fontFamily.bold,
  },
  conTxt: {
    color: '#333333',
    fontSize: 25,
    fontFamily: fontFamily.light,
    paddingHorizontal: WP(20),
  },
  keyTxt: {
    color: '#333333',
    fontSize: 20,
    fontFamily: fontFamily.bold,
  },
  dp: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(8),
  },
  item: {
    flexDirection: 'row',
    //alignItems: 'center',
    //backgroundColor: 'white',
    //height: HP(18),
    //width: WP(97),
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  //keyView: {
  //  marginHorizontal: WP(3),
  //  marginTop: HP(3),
  //  backgroundColor: 'rgb(244,244,245)',
  //  paddingHorizontal: WP(5),
  //  paddingVertical: HP(2),
  //},
  descriptionTex: {
    marginTop: HP(3),
    color: '#333333',
    fontSize: 17,
    fontFamily: fontFamily.light,
    //paddingHorizontal: WP(0),
    textAlign: 'left',
  },
  blurContainer: {
    flex: 1,
    //padding: 20,
    //justifyContent: 'center',
  },
});
