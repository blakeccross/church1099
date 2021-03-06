import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {HP, WP} from '../Assets/config/screen-ratio';
import fontFamily from '../Assets/config/fontFamily';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    //autoCapitalize: 'none',
    //placeholder:'Search',
    //placeholderTextColor: 'black',
    padding:0,
    fontSize: 18,
    borderRadius:10,
    height:45,
    backgroundColor:'#F4F4F5',
},
H1: {
  //color: 'black',
  fontSize: 30,
  fontFamily: fontFamily.bold,
},
H2: {
  color: 'black',
  fontSize: 25,
  fontFamily: fontFamily.bold,
},
H3: {
  color: 'black',
  fontSize: 20,
  fontFamily: fontFamily.bold,
},
P1: {
  color: 'black',
  fontSize: 15,
  fontFamily: fontFamily.regular,
},
P2: {
  color: '#666666',
  fontSize: 14,
  fontFamily: fontFamily.regular,
},
});
