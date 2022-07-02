import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {HP, WP} from '../../Assets/config/screen-ratio';
import {SVGS} from '../../Assets/Svgs';
import {Header} from '../../Components/header/header';
import {SubStyle as Styles} from './subscription.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
import {GlobalStyles} from '../../global/global.styles';

const Subscription = props => {
  return (
    <SafeAreaView style={{...Styles.container, paddingTop: HP(1.5)}}>
      {/* <Header/> */}
      <View style={{...GlobalStyles.row, justifyContent: 'center'}}>
        <Text style={{...Styles.setTxt}}>Subscription</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: WP(5), marginTop: HP(10)}}>
        <View style={{width: WP(50)}}>
          <Button btnTxt={'Cancel Subscription'} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Subscription;
