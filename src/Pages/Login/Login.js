import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import fontFamily from '../../Assets/config/fontFamily';
import {HP} from '../../Assets/config/screen-ratio';
//import SvgComponent from '../../Assets/Svgs';
import {Button} from '../../Components/Button/Button';
import {ForgotModal} from '../../Components/forgotModal/forgotModal';
import {Input} from '../../Components/Input/Input';
import {GlobalStyles} from '../../global/global.styles';
import AlertService from '../../services/alertService';
import {API} from '../../services/api.services';
import {loginStyle as Styles} from './loginStyles';

const Login = props => {
  const [mod, setMod] = useState(false);
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {}, [load]);
  const onLogin = async () => {
    if (email != '' && password != '') {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(email)) {
        setLoad(true);
        await API.login(email, password, props);
        setLoad(false);
      } else {
        AlertService.show('Invalid Email');
      }
    } else {
      AlertService.show('Missing', 'Please provide all required data!');
      // console.log("mail::"+email,"pa::"+password, name, phone, img, cv, gender, bio, location);
    }
  };
  return (
    <SafeAreaView style={{...Styles.container}}>
      <Text style={{...Styles.titleTxt}}>Welcome Back!</Text>
      <Text style={{...Styles.emailTxt}}>Please sign into your account</Text>
      <View style={{width: '80%', paddingTop: HP(2)}}>
        <Text style={{...Styles.emailTxt}}>Email</Text>
        <Input setValue={setEmail} placeTxt={''} keyboard={'email-address'} />
      </View>
      <View style={{width: '80%', paddingTop: HP(2)}}>
        <Text style={{...Styles.emailTxt}}>Password</Text>
        <Input setValue={setPassword} placeTxt={''} pass />
      </View>
      <View style={{width: '80%', paddingTop: HP(2)}}>
        <Button
          onPress={() => {
            onLogin();
          }}
          btnTxt={'Login'}
        />
      </View>
      <TouchableOpacity onPress={() => setMod(!mod)} style={{}}>
        <Text style={{...Styles.forgotTxt, paddingVertical: HP(1)}}>
          Forgot Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Signup');
        }}
        style={{}}>
        <Text style={{...Styles.forgotTxt, paddingVertical: HP(1)}}>
          <Text style={{fontFamily: fontFamily.light}}>
            Don't have an account?{' '}
          </Text>
          Sign Up
        </Text>
      </TouchableOpacity>
      <ForgotModal
        mod={mod}
        onPress={() => setMod(false)}
        email={forgotEmail}
        setEmail={setForgotEmail}
      />
      {load && (
        <View style={{position: 'absolute'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      )}
    </SafeAreaView>
  );
};
export default Login;
