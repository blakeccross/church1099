import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Input } from "../../Components/Input/Input";
import { GlobalStyles } from "../../global/global.styles";
import { SignupStyle as Styles } from "./signup.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconCam from "react-native-vector-icons/SimpleLineIcons";
import { Button } from "../../Components/Button/Button";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";
import { firebaseServices } from "../../services/firebase.services";
import { manipulateAsync } from "expo-image-manipulator";
import PagerView from "react-native-pager-view";
import PhoneInput from "react-native-phone-input";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const Signup = (props) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [header, setHeader] = useState("");
  const [skills, setSkills] = useState([]);
  const [gender, setGender] = useState(null);
  const [loading, setloading] = useState(false);
  const ref = React.useRef(PagerView);
  const phoneRef = React.useRef();

  const skill = [
    { id: "Worship Leading", name: "Worship Leading" },
    { id: "Speaking", name: "Speaking" },
    { id: "Vocals", name: "Vocals" },
    { id: "Web Design", name: "Web Design" },
    { id: "Graphic Design", name: "Graphic Design" },
    { id: "Social Media Management", name: "Social Media Management" },
    { id: "Electric Guitar", name: "Electric Guitar" },
    { id: "Piano", name: "Piano" },
    { id: "Acoustic Guitar", name: "Acoustic Guitar" },
    { id: "Drums", name: "Drums" },
    { id: "Songwriting", name: "Songwriting" },
    { id: "Live Mixing", name: "Live Mixing" },
    { id: "Bass Guitar", name: "Bass Guitar" },
    { id: "Video Editing", name: "Video Editing" },
  ];

  const validateEmailInput = () => {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email) === false) {
      AlertService.show("Email Error", "hmmm... that doesn't look quite right");
      return false;
    } else {
      ref.current.setPage(1);
    }
  };

  const validatePassword = () => {
    let reg = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (reg.test(password) === false) {
      AlertService.show(
        "Error",
        "Password may be in between 6-16 characters long, with one number, and one special character"
      );
      return false;
    } else {
      ref.current.setPage(3);
    }
  };
  const validatePhoneInput = () => {
    ref.current.setPage(4);
  };

  const onPhoneInputChange = (value, iso2) => {
    setPhone(value);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const manipResult = await manipulateAsync(result.uri, [
      { resize: { height: 320, width: 320 } },
    ]);

    if (!result.cancelled) {
      setImg(manipResult.uri);
    }
  };

  const renderSkills = ({ item, index }) => {
    const { id, name } = item;
    const isSelected = skills.filter((i) => i === name).length > 0;

    return (
      <Pressable
        key={index}
        style={{
          ...Styles.skillItem,
          backgroundColor: isSelected ? "#2b47fc" : "#F4F4F5",
        }}
        onPress={() => {
          if (isSelected) {
            setSkills((prev) => prev.filter((i) => i !== name));
          } else {
            setSkills((prev) => [...prev, name]);
          }
          let skillList = skills.map((name) => {
            return name;
          });
        }}
      >
        <Text
          style={{
            color: isSelected ? "white" : "black",
            textAlign: "center",
          }}
        >
          {item.id}
        </Text>
      </Pressable>
    );
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      null;
    }
    return token;
  }

  const onApply = async () => {
    let token = await registerForPushNotificationsAsync();
    let imageName = Date.now().toString();
    await firebaseServices.uploadImage(imageName, img, async (ImageProfile) => {
      if (
        email != "" &&
        password != "" &&
        name != "" &&
        gender != null &&
        location != ""
      ) {
        setloading(true);
        await API.signup(
          `https://church1099.com/api/1.1/wf/signup?email=${email}&password=${password}&profilephoto=${ImageProfile}&header=${header}&location=${location}&gender=${gender}&phone=${phone}&skills=${JSON.stringify(
            skills
          )}&name=${name}&expo_token=${token}`,
          props,
          ImageProfile
        );
        setloading(false);
      } else {
        AlertService.show("Missing", "Please provide all required data");
        console.log(
          "mail::" + email,
          "pa::" + password,
          name,
          phone,
          ImageProfile,
          gender,
          location
        );
      }
    });
  };
  return (
    <SafeAreaView style={{ ...Styles.container }}>
      <PagerView
        style={{ flex: 1, marginTop: HP(2) }}
        ref={ref}
        scrollEnabled={false}
        initialPage={0}
      >
        <View style={Styles.stepContainer} key="0">
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>Get Started</Text>
          <Input
            setValue={setEmail}
            autoCorrect={false}
            placeTxt={"Enter your email address"}
            value={email}
            keyboard={"email-address"}
            onSubmit={(email) => validateEmailInput(email)}
            returnKeyLabel={"done"}
          />
          <Text style={{ ...Styles.infoTxt }}>
            You'll use this email to sign in and if you ever need to reset your
            password
          </Text>
        </View>

        <View style={Styles.stepContainer} key="1">
          <TouchableOpacity onPress={() => ref.current.setPage(0)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>What's Your Full Name?</Text>
          <Input
            value={name}
            setValue={setName}
            autoCorrect={false}
            placeTxt={"Enter your full name"}
            onSubmit={() => ref.current.setPage(2)}
            returnKeyLabel={"done"}
          />
        </View>

        <View style={Styles.stepContainer} key="2">
          <TouchableOpacity onPress={() => ref.current.setPage(1)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>Set Your Password</Text>
          <Input
            value={password}
            setValue={setPassword}
            placeTxt={"Enter your password"}
            pass
            onSubmit={(password) => validatePassword(password)}
            returnKeyLabel={"done"}
          />
        </View>

        <View style={Styles.stepContainer} key="3">
          <TouchableOpacity onPress={() => ref.current.setPage(2)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>Phone Number?</Text>
          <PhoneInput
            ref={phoneRef}
            initialCountry={"us"}
            initialValue=""
            onChangePhoneNumber={onPhoneInputChange}
            autoFormat={true}
            textProps={{
              placeholder: "Enter a phone number...",
              borderWidth: 0,
              borderRadius: 10,
              height: 45,
              width: "100%",
              backgroundColor: "rgba(247,247,247,1)",
              color: "#000",
              padding: 10,
            }}
          />
          {/* <Input
            value={phone}
            setValue={setPhone}
            placeTxt={"Enter your phone number"}
            keyboard={"phone-pad"}
            type={"telephoneNumber"}
          /> */}
          <Text style={{ ...Styles.infoTxt }}>
            Don't worry. We won't bother you, but this will be helpful in case
            you get locked out of your account!
          </Text>
          <Button
            btnStyle={{ marginTop: 15 }}
            onPress={(phone) => validatePhoneInput(phone)}
            btnTxt={"Continue"}
          />
        </View>

        <View style={Styles.stepContainer} key="4">
          <TouchableOpacity onPress={() => ref.current.setPage(3)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>Where Are You Located?</Text>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                height: 45,
                backgroundColor: "rgba(247,247,247,1)",
                fontSize: 16,
              },
            }}
            placeholder="Search"
            onPress={(data, details = null) => {
              ref.current.setPage(5);
              setLocation(data.description);
            }}
            query={{
              key: "AIzaSyCqfZsYioXmmp-FpCdAEZjnw8uJ4dwsYFo",
              language: "en",
            }}
          />
          <Text style={{ ...Styles.infoTxt }}>
            This will help Churches see how far you are from them.
          </Text>
        </View>

        <View style={Styles.stepContainer} key="5">
          <TouchableOpacity onPress={() => ref.current.setPage(4)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>What Is Your Gender?</Text>
          <Button
            btnCol={"white"}
            textCol={"black"}
            btnStyle={{ backgroundColor: "rgba(247,247,247,1)" }}
            btnTxt={"Male"}
            onPress={() => {
              ref.current.setPage(6);
              setGender("Male");
            }}
          />
          <Button
            btnCol={"white"}
            textCol={"black"}
            btnTxt={"Female"}
            setGender={"Female"}
            btnStyle={{
              marginTop: 10,
              backgroundColor: "rgba(247,247,247,1)",
            }}
            onPress={() => {
              ref.current.setPage(6);
              setGender("Female");
            }}
          />
        </View>

        <View style={Styles.stepContainer} key="6">
          <TouchableOpacity onPress={() => ref.current.setPage(5)}>
            <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
          </TouchableOpacity>
          <Text style={Styles.titleTxt}>What Are You Interested In?</Text>

          <FlatList
            data={skill}
            renderItem={renderSkills}
            columnWrapperStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            numColumns={3}
          />
          <Button
            btnStyle={{ position: "absolute", bottom: HP(10) }}
            onPress={() => ref.current.setPage(7)}
            btnTxt={"Continue"}
          />
        </View>

        <View
          style={{
            ...Styles.stepContainer,
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key="7"
        >
          <View>
            <TouchableOpacity onPress={() => ref.current.setPage(6)}>
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>Profile Photo</Text>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: "rgb(247,247,247)",
                marginTop: HP(3),
                width: WP(80),
                height: WP(80),
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              {img ? (
                <Image
                  source={{ uri: img }}
                  style={{ width: WP(80), height: WP(80), borderRadius: 10 }}
                />
              ) : (
                <IconCam name="camera" size={30} color={"#BDBDBD"} />
              )}
            </TouchableOpacity>
            <Text style={{ ...Styles.infoTxt }}>Say Cheese.</Text>
          </View>
          <View>
            <Button
              disable={loading}
              onPress={() => onApply()}
              btnTxt={"Apply"}
            />
            <View style={{ ...GlobalStyles.row, paddingTop: HP(1) }}>
              <Text style={{ ...Styles.createTxt }}>
                By creating an account, it means that you agree with our{" "}
                <Text
                  onPress={() => console.log("ss")}
                  style={{ color: "#0000FF" }}
                >
                  Terms of Use
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </PagerView>
    </SafeAreaView>
  );
};
export default Signup;
