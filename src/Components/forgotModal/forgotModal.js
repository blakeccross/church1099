import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {API} from '../../services/api.services';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
export const ForgotModal = ({mod, setMod, onPress, email, setEmail}) => {
  const Styles = StyleSheet.create({
    modView: {
      backgroundColor: 'white',
      height: '37%',
      width: '100%',
      position: 'absolute',
      top: HP(3),
      paddingVertical: HP(3),
      paddingHorizontal: WP(5),
    },
    resetTxt: {
      color: 'rgb(0,0,0)',
      fontFamily: fontFamily.bold,
      textAlign: 'center',
      fontSize: 20,
    },
    enterTxt: {
      color: 'rgb(0,0,0)',
      fontFamily: fontFamily.light,
      // textAlign:'center',
      fontSize: 15,
    },
  });
  return (
    <ReactNativeModal
      isVisible={mod}
      style={{margin: 0}}
      onBackButtonPress={onPress}
      onBackdropPress={onPress}>
      <View style={{...Styles.modView}}>
        <Text style={{...Styles.resetTxt}}>Reset Password</Text>
        <Text style={{...Styles.enterTxt, paddingTop: HP(1)}}>
          Enter the email associated with your account, and we'll email you a
          link to reset your password.
        </Text>
        <Text style={{...Styles.enterTxt, paddingTop: HP(1)}}>Email</Text>
        <View style={{paddingTop: HP(1)}}>
          <Input setValue={setEmail} keyboard={'email-address'} />
        </View>
        <View style={{paddingTop: HP(3)}}>
          <Button
            onPress={() => API.forgot(email)}
            btnTxt={'Send Reset Link'}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
