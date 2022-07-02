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
import {Header} from '../../Components/header/header';
import {ChangeStyle as Styles} from './change.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
import {GlobalStyles} from '../../global/global.styles';
import AlertService from '../../services/alertService';
import {API} from '../../services/api.services';

const ChangePassword = props => {
  const [old, setOld] = useState('');
  const [newPas, setNewPas] = useState('');
  const [confirmPas, setConfirmPas] = useState('');

  const onSave = async () => {
    if (old != '' && newPas != '' && confirmPas != '') {
      if (newPas === confirmPas) {
        await API.changePassword(
          `update_ps?newps=${newPas}&oldps=${old}`,
          props,
        );
      } else AlertService.show('Unmatched!!', 'Please confirm new passwords!');
    } else AlertService.show('Missing Date!!', 'Please enter all fields!');
  };
  return (
    <SafeAreaView style={{...Styles.container, paddingTop: HP(1.5)}}>
      {/* <Header /> */}
      <View style={{...GlobalStyles.row, justifyContent: 'center'}}>
        <Text style={{...Styles.setTxt}}>Change Password</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: WP(6), marginTop: HP(5)}}>
        <Text style={{...Styles.setTxt, fontSize: 14}}>Old Password</Text>
        <Input value={old} setValue={setOld} />
        <Text style={{...Styles.setTxt, fontSize: 14, paddingTop: HP(1)}}>
          New Password
        </Text>
        <Input value={newPas} setValue={setNewPas} />
        <Text style={{...Styles.setTxt, fontSize: 14, paddingTop: HP(1)}}>
          Verify Password
        </Text>
        <Input value={confirmPas} setValue={setConfirmPas} />
        <View style={{alignSelf: 'center', width: WP(50), marginTop: HP(5)}}>
          <Button onPress={() => onSave()} btnTxt={'Save'} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ChangePassword;
