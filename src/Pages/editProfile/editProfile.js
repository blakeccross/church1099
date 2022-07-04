import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {SVGS} from '../../Assets/Svgs';
import {Header} from '../../Components/header/header';
import {EditStyle as Styles} from './edit.style';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
import {GlobalStyles} from '../../global/global.styles';
import DropDownPicker from 'react-native-dropdown-picker';
//import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {API} from '../../services/api.services';
import AlertService from '../../services/alertService';
import {ChangeBackgroundColor, GetUser} from '../../root/action';
import {connect} from 'react-redux';

const EditProfile = props => {
  const [img, setImg] = useState(props?.user['Profile Photo']);
  const [name, setName] = useState(props?.user?.Name);
  const [email, setEmail] = useState(props?.user?.authentication?.email?.email);
  const [phone, setPhone] = useState(props?.user['Phone Number']);
  const [loc, setLoc] = useState(props?.user?.Location);
  const [bio, setBio] = useState(props?.user?.Bio);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(
    props?.user?.Gender ? props?.user?.Gender : 'male',
  );
  const [value, setValue] = useState(props?.user?.Gender);
  const [items, setItems] = useState([
    {label: 'Female', value: 'Female'},
    {label: 'Male', value: 'Male'},
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const openGallery = () => {
    const options = {
      mediaType: 'photos',
      base64: true,
    };

    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else {
        let _img = response?.assets[0]?.uri;
        _img.replace('');
        // console.log('image---->', response?.assets[0]);
        setImg(response?.assets[0]?.uri);
        // this.imgToBin(response?.assets[0]?.uri,)
      }
    });
  };
  const updateProfile = async () => {
    await API.editProfile(name, bio, img, 'male', gender, phone);
    let user = await API.getUser();
    // props.getUser(user);
    // props.navigation.goBack();
  };
  const onSubmit = async () => {
    if (name != '' && bio != '' && value != '' && phone != '') {
      Alert.alert('Update', 'Are you sure you want to update?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => updateProfile(),
        },
      ]);
      // AlertService.confirm('Are you sure you want to update?').then(
      //   async res => {
      //     if (res) {
      //       console.log('if');
      //       await API.editProfile(name, bio, img, '', value, phone);
      //       let user = await API.getUser();
      //       props.getUser(user);
      //       // props.navigation.goBack();
      //     } else {
      //       console.log('else');
      //     }
      //   },
      // );
    } else AlertService.show('Required all  fields!');
  };
  return (
    <SafeAreaView style={{...Styles.container}}>
                {/* <Header /> */}
      <View style={{...GlobalStyles.row, justifyContent: 'center', marginTop: HP(1), marginBottom: HP(2)}}>
        <Text style={{...GlobalStyles.H3}}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: HP(8)}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{paddingHorizontal: WP(6)}}>
            <TouchableOpacity
              //onPress={() => openGallery()}
              style={{...GlobalStyles.row}}>
              {img ? (
                <Image source={{uri: img}} style={{...Styles.dp}} />
              ) : (
                <Image source={Imgs.dp} style={{...Styles.dp}} />
              )}
              <Text
                style={{...Styles.emailTxt, paddingLeft: WP(5)}}>
                Upload Profile Picture
              </Text>
            </TouchableOpacity>
            <View style={{paddingTop: HP(2)}}>
              <Text style={{...Styles.emailTxt}}>Full Name</Text>
              <Input col='white' value={name} setValue={setName} placeTxt={''} />
            </View>
            <View style={{paddingTop: HP(2)}}>
              <Text style={{...Styles.emailTxt}}>Email Address</Text>
              <Input
              col='white'
                value={email}
                setValue={setEmail}
                placeTxt={''}
                keyboard={'email-address'}
              />
            </View>
            {/* <View style={{ paddingTop: HP(2), }}>
                            <Text style={{ ...Styles.emailTxt }}>Password</Text>
                            <Input placeTxt={""} pass />
                        </View> */}
            <View style={{paddingTop: HP(2)}}>
              <Text style={{...Styles.emailTxt}}>Phone</Text>
              <Input
              col='white'
                value={phone}
                setValue={setPhone}
                placeTxt={''}
                keyboard={'phone-pad'}
              />
            </View>
            <View
              style={{
                ...GlobalStyles.row,
                width: '100%',
                paddingTop: HP(2),
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text style={{...Styles.emailTxt}}>
                  Location <Text style={{fontSize: 10}}>(City,State)</Text>
                </Text>
                <Input col='white' value={loc} setValue={setLoc} placeTxt={''} />
              </View>
              <View style={{width: '48%'}}>
                <Text style={{...Styles.emailTxt}}>Gender</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{
                    borderWidth: 0,
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}
                  placeholder={''}
                  dropDownContainerStyle={{backgroundColor: '#fff'}}
                  // overflow={{}}
                />
              </View>
            </View>
            <View style={{...GlobalStyles.row, paddingTop: HP(1)}}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginLeft: -8}}
              />
              <Text
                style={{...Styles.emailTxt, fontSize: 16, paddingRight: WP(9)}}>
                Show my contact info on Profile page
              </Text>
            </View>
            <View style={{paddingTop: HP(2)}}>
              <Text style={{...Styles.emailTxt}}>Bio</Text>
              {/* <TextInput multiline placeholder='' style={{ ...Styles.input }} /> */}
              <Input col= 'white' value={bio} setValue={setBio} placeTxt={''} />
            </View>
            <View style={{marginTop: HP(5)}}>
              <Button
                onPress={() => {
                  onSubmit();
                }}
                btnTxt={'Submit'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  const {backgroundColor} = state;
  const {user} = state;
  // console.log("redux user",user);

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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
