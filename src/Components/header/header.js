import React from 'react';
import {SafeAreaView, Text, Image, View, TouchableOpacity} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../global/global.styles';
export const Header = ({onPress, title, onPressLogo, cross}) => {
  return (
    <View style={{...GlobalStyles.row, justifyContent: 'center', paddingTop: HP(1), paddingBottom: HP(2), backgroundColor: "#2b47fc"}}>
        <Text style={{...GlobalStyles.H3, color: 'white'}}>{title}</Text>
        <TouchableOpacity
          onPress={onPress}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'white'} size={24} />
        </TouchableOpacity>
      </View>
  );
};