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
//import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
//import {Imgs} from '../../Assets/Imgs';
//import {SVGS} from '../../Assets/Svgs';
import {Header} from '../../Components/header/header';
import {SocialStyle as Styles} from './social.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../global/global.styles';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
const SocialLink = props => {
  return (
    <SafeAreaView style={{...Styles.container, paddingTop: HP(1.5)}}>
      {/* <Header /> */}
      <View style={{...GlobalStyles.row, justifyContent: 'center'}}>
        <Text style={{...Styles.setTxt}}>Social Links</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: WP(5)}}>
        <View style={{...GlobalStyles.row}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            Facebook
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>
        <View style={{...GlobalStyles.row, paddingTop: HP(1.5)}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            Youtube
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>
        <View style={{...GlobalStyles.row, paddingTop: HP(1.5)}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            Twitter
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>
        <View style={{...GlobalStyles.row, paddingTop: HP(1.5)}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            Instagram
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>
        <View style={{...GlobalStyles.row, paddingTop: HP(1.5)}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            LinkedIn
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>

        <View style={{...GlobalStyles.row, paddingTop: HP(1.5)}}>
          <Text
            style={{
              ...Styles.setTxt,
              fontSize: 14,
              borderColor: 'rgb(247,247,247)',
              borderWidth: 0.8,
              paddingHorizontal: HP(1),
              paddingVertical: HP(1.7),
              width: WP(22),
            }}>
            Spotify
          </Text>
          <View style={{flex: 1}}>
            <Input />
          </View>
        </View>
        <View style={{width: WP(40), alignSelf: 'center', marginTop: HP(4)}}>
          <Button btnTxt={'Save'} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SocialLink;
