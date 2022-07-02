import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import { API } from '../../services/api.services';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {SettingStyle as Styles} from './setting.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from '../../global/global.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import AlertService from '../../services/alertService';
import {ChangeBackgroundColor, GetUser} from '../../root/action';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';  
import { Feather } from '@expo/vector-icons';
import {Header} from '../../Components/header/header';

const Setting = props => {
  useEffect(() => {
    getData();
  }, []);
  const [userData, setuserData] = useState('');
  const getData = async () => {
    let res = await API.getUser();
    setuserData(res);
  }
  
  const onSignOut = async () => {
    AlertService.confirm('Are you sure you want to Logout?').then(async res => {
      if (res) {
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
    });
  };
  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#2b47fc' }} />
    <SafeAreaView style={{...Styles.container}}>
      <Header title= "Settings" onPress={() => props.navigation.goBack()}/>
      <ScrollView
          showsVerticalScrollIndicator={false}
      >
      <View style={{paddingHorizontal: WP(5), paddingTop: HP(2)}}>
        <TouchableOpacity
        style={{...Styles.section,...GlobalStyles.row, width: '100%'}}
          onPress={() => props.navigation.navigate('EditProfile')}>
            <Image
            source={{uri: userData['Profile Photo']}}
            style={{...Styles.dp}}
            />
          <Text style={{...Styles.setTxt}}>
          {userData['Name']}
          </Text>
          <Icon name={'chevron-forward'} style={{position: 'absolute', right: 10}} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        style={{...Styles.section,...GlobalStyles.row, width: '100%'}}
          onPress={() => props.navigation.navigate('ChangePassword')}>
            <MaterialCommunityIcons name="key" size={24} color="black" />
          <Text style={{...Styles.setTxt}}>
            Change Password
          </Text>
          <Icon name={'chevron-forward'} style={{position: 'absolute', right: 10}} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        style={{...Styles.section,...GlobalStyles.row, width: '100%'}}
          onPress={() => props.navigation.navigate('SocialLink')}>
            <Feather name="link-2" size={24} color="black" />
          <Text style={{...Styles.setTxt}}>
            Social Links
          </Text>
          <Icon name={'chevron-forward'} style={{position: 'absolute', right: 10}} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        style={{...Styles.section,...GlobalStyles.row, width: '100%'}}
          onPress={() => props.navigation.navigate('Subscription')}>
            <MaterialIcons name="payment" size={24} color="black" />
          <Text style={{...Styles.setTxt}}>
            Subscription
          </Text>
          <Icon name={'chevron-forward'} style={{position: 'absolute', right: 10}} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...Styles.section, justifyContent: 'center'}}
          onPress={() => {
            onSignOut();
          }}>
          {/* <Icon name={'return-up-back'} color={"#000"} size={24} /> */}
          <Text
            style={{
              ...Styles.setTxt,
              marginLeft: 0,
              color: 'red',
            }}>
            Signout
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View>
      <Text style={{
        textAlign: 'center'
      }}>Version 1.0</Text>
      </View>
    </SafeAreaView>
    </>
  );
};
const mapStateToProps = state => {
  const {backgroundColor} = state;
  const {user} = state;
  // console.log('redux user', user);

  // alert(backgroundColor);
  // console.log(backgroundColor);
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    changeBackgroundColor: bg => dispatch(ChangeBackgroundColor(bg)),
    getUser: userInfo => dispatch(GetUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
