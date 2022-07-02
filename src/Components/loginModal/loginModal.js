import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';
import {Button} from '../Button/Button';
import {Header} from '../header/header';

export const LoginModal = ({onPress, mod, props}) => {
  const Styles = StyleSheet.create({
    churchTxt: {
      fontFamily: fontFamily.bold,
      fontSize: 22,
      color: 'rgb(43,71,252)',
    },
  });
  return (
    <ReactNativeModal
      isVisible={mod}
      onBackButtonPress={onPress}
      onBackdropPress={onPress}
      style={{margin: 0}}
      animationOut={'fadeIn'}
      animationIn={'fadeIn'}>
      <View
        style={{
          width: '100%',
          height: HP(25),
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
        }}>
        <Header onPress={onPress} cross />
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: 'center',
            paddingTop: HP(5),
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            style={{paddingHorizontal: WP(5)}}>
            <Text style={{...Styles.churchTxt}}>Log In</Text>
          </TouchableOpacity>
          <View style={{width: WP(40)}}>
            <Button
              onPress={() => props.navigation.navigate('Signup')}
              btnTxt={'Get Started'}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};
