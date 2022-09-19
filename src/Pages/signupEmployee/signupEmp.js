import React, { useState } from "react";
import {
  SafeAreaView,
  Switch,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { SVGS } from "../../Assets/Svgs";
import { Input } from "../../Components/Input/Input";
import { GlobalStyles } from "../../global/global.styles";
import { SignupEmpStyle as Styles } from "./signupEmp.style";
import { Button } from "../../Components/Button/Button";

const SignupEmp = (props) => {
  const [img, setImg] = useState("https://reactjs.org/logo-og.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [cv, setCv] = useState("https://reactjs.org/logo-og.png");
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const TryUploadFile = () => {
    // console.log('DoC');
    // DocumentPickerUtil.allFiles()
  };
  const openGallery = () => {
    const options = {
      mediaType: "photos",
      base64: true,
    };

    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else {
        let _img = response?.assets[0]?.uri;
        _img.replace("");
        // console.log('image---->', response?.assets[0]);
        // setImg(response?.assets[0]?.uri)
        // setCv(response?.assets[0]?.uri)
        // this.imgToBin(response?.assets[0]?.uri,)
      }
    });
  };
  const onApply = async () => {
    // console.log(email, password, name, phone, img, cv, gender, bio, location);
    //     if(isEnabled){
    //     if (email != '' && password != '' && name != '' && phone != '' && img != '' && cv != '' && gender != null && bio != '' && location != '') {
    //     let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //     if (reg.test(email)) {
    //            await API.signup(email, password, gender, bio, img, cv, location, phone,props)
    //         }
    //         else {
    //             AlertService.show("Invalid Email")
    //         }
    //     }
    //     else {
    //         AlertService.show("Missing", "Please provide all required data!")
    //         // console.log("mail::"+email,"pa::"+password, name, phone, img, cv, gender, bio, location);
    //     }
    // }else{
    //     AlertService.show("Terms and Condition","Agree to terms and conditions to continue!")
    // }
    props.navigation.navigate("TabNavigator");
  };
  return (
    <SafeAreaView style={{ ...Styles.container, paddingTop: HP(2) }}>
      <ScrollView contentContainerStyle={{ paddingBottom: HP(7) }}>
        <View style={{ alignSelf: "center" }}>
          <SVGS.ChurchLogo width={150} height={20} />
        </View>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.emailTxt }}>Church Name</Text>
            <Input setValue={setName} placeTxt={""} />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.emailTxt }}>Full Name</Text>
            <Input setValue={setName} placeTxt={""} />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.emailTxt }}>Email Address</Text>
            <Input
              setValue={setEmail}
              placeTxt={""}
              keyboard={"email-address"}
            />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.emailTxt }}>Password</Text>
            <Input setValue={setPassword} placeTxt={""} pass />
          </View>
          <View style={{ paddingTop: HP(2) }}>
            <Text style={{ ...Styles.emailTxt }}>Phone</Text>
            <Input setValue={setPhone} placeTxt={""} keyboard={"phone-pad"} />
          </View>
          <View
            style={{
              ...GlobalStyles.row,
              width: "100%",
              paddingTop: HP(2),
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "48%" }}>
              <Text style={{ ...Styles.emailTxt }}>
                Location <Text style={{ fontSize: 10 }}>(City,State)</Text>
              </Text>
              <Input setValue={setLocation} placeTxt={""} />
            </View>
            <View style={{ width: "48%" }}>
              <Text style={{ ...Styles.emailTxt }}>Gender</Text>
              <TouchableOpacity style={{ justifyContent: "center" }}>
                {/* <Input disable placeTxt={""} />
                                <Icon name='keyboard-arrow-down' size={24} color={'black'} style={{ ...Styles.icon }} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...GlobalStyles.row, paddingTop: HP(1) }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#ffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginLeft: -8 }}
            />
            <Text style={{ ...Styles.createTxt, paddingRight: WP(9) }}>
              Creating an account means you're ok with our{" "}
              <Text
                onPress={() => console.log("ss")}
                style={{ color: "#0000FF" }}
              >
                Terms of Use
              </Text>
            </Text>
          </View>
          {/*<View style={{ paddingTop: HP(2), }}>
                        <Text style={{ ...Styles.emailTxt }}>Bio</Text>
                        <TextInput onChangeText={(e) => setBio(e)} multiline placeholder='' style={{ ...Styles.input }} />
                    </View>
                     <TouchableOpacity onPress={() => openGallery()} style={{ backgroundColor: 'rgb(247,247,247)', marginTop: HP(3), width: WP(30), height: WP(30), justifyContent: 'center', alignItems: 'center' }}>
                        {img ?
                            <Image source={{ uri: img }} style={{ width: WP(30), height: WP(30) }} />
                            :
                            <IconCam name='camera' size={30} color={'#BDBDBD'} />
                        }
                    </TouchableOpacity>
                    <View style={{ paddingTop: HP(2), }}>
                        <Text style={{ ...Styles.emailTxt }}>Resume</Text>
                        <TouchableOpacity onPress={() => TryUploadFile()} style={{ backgroundColor: 'rgb(247,247,247)', alignItems: 'center', paddingVertical: HP(1.5) }}>
                            <Text style={{ color: 'black', fontFamily: fontFamily.medium, fontSize: 15 }}>Click to upload a file</Text>
                        </TouchableOpacity>
                    </View> */}
          <View style={{ marginTop: HP(7) }}>
            <Button onPress={() => onApply()} btnTxt={"Apply"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignupEmp;
