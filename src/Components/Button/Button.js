import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';

export const Button = ({
  btnStyle,
  btnTxt,
  onPress,
  disable,
  btnCol,
  textCol,
}) => {
  const Styles = StyleSheet.create({
    btn: {
      //height: 50,
      padding: 15,
      backgroundColor: btnCol ? btnCol : '#2b47fc',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      borderRadius: 25,
    },
  });
  return (
    <View>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={{...Styles.btn, ...btnStyle}}>
        {disable ? (
          <ActivityIndicator color={'white'} size="small" />
        ) : (
          <Text
            style={{
              color: textCol ? textCol : 'rgb(255,255,255)',
              fontFamily: fontFamily.bold,
              fontSize: 15,
            }}>
            {btnTxt}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
