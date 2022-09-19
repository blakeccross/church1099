import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Input } from "../../Components/Input/Input";
import { GlobalStyles } from "../../global/global.styles";
import { SignupStyle as Styles } from "./signup.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconCam from "react-native-vector-icons/SimpleLineIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../Components/Button/Button";
import { API } from "../../services/api.services";
import AlertService from "../../services/alertService";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";
import { firebaseServices } from "../../services/firebase.services";

const Signup = (props) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [gender, setGender] = useState(null);
  const [loading, setloading] = useState(false);
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
  const [formStep, setFormStep] = useState(1);
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };
  const validateEmailInput = () => {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email) === false) {
      AlertService.show("Email Error", "hmmm... that doesn't look quite right");
      return false;
    } else {
      setFormStep((cur) => cur + 1);
    }
  };
  const validateTextInput = () => {
    if (!name.trim()) {
      AlertService.show("Error", "hmmm... that doesn't look quite right");
      return false;
    } else {
      setFormStep((cur) => cur + 1);
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
      setFormStep((cur) => cur + 1);
    }
  };
  const validatePhoneInput = () => {
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (reg.test(phone) === false) {
      AlertService.show("Error", "hmmm... that doesn't look quite right");
      return false;
    } else {
      setFormStep((cur) => cur + 1);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  const renderSkills = ({ item, index }) => {
    const { id, name } = item;
    const isSelected = skills.filter((i) => i === name).length > 0;

    return (
      <Pressable
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

  const [isEnabled, setIsEnabled] = useState(true);

  const onApply = async () => {
    if (isEnabled) {
      let imageName = Date.now().toString();
      await firebaseServices.updateProfileImage(
        imageName,
        img,
        async (ImageProfile) => {
          if (
            email != "" &&
            password != "" &&
            name != "" &&
            phone != "" &&
            gender != null &&
            location != ""
          ) {
            setloading(true);
            let res = await API.userSignup(
              `https://church1099.com/api/1.1/wf/signup?email=${email}&password=${password}&profilephoto=${ImageProfile}&bio=${bio}&location=${location}&gender=${gender}&phone=${phone}&skills=${JSON.stringify(
                skills
              )}&name=${name}&employer?=no`,
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
        }
      );
    } else {
      AlertService.show(
        "Terms and Condition",
        "Agree to terms and conditions to continue!"
      );
    }
  };
  return (
    <SafeAreaView style={{ ...Styles.container, paddingTop: HP(2) }}>
      <View
        style={{ width: "90%", alignSelf: "center", justifyContent: "center" }}
      >
        {formStep === 0 && (
          <View style={Styles.stepContainer}>
            <Text style={Styles.titleTxt}>Choose Account Type</Text>
            <View
              style={{
                ...GlobalStyles.row,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity style={Styles.box} onPress={completeFormStep}>
                <Ionicons
                  name="person"
                  size={WP(17)}
                  color="#333333"
                  style={{ alignSelf: "center" }}
                />
                <Text style={{ ...Styles.subTxt }}>Finding Work</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.box}
                onPress={() => {
                  Linking.openURL("https://church1099.com/join");
                }}
              >
                <MaterialCommunityIcons
                  name="briefcase"
                  size={WP(17)}
                  color="#333333"
                  style={{ alignSelf: "center" }}
                />
                <Text style={{ ...Styles.subTxt }}>Hiring</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ ...Styles.infoTxt }}>
              What are you looking to do?
            </Text>
          </View>
        )}
        {formStep === 1 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>Get Started</Text>
            <Input
              setValue={setEmail}
              placeTxt={"Enter your email address"}
              value={email}
              keyboard={"email-address"}
              onSubmit={(email) => validateEmailInput(email)}
              returnKeyLabel={"done"}
            />
            <Text style={{ ...Styles.infoTxt }}>
              You'll use this email to sign in and if you ever need to reset
              your password
            </Text>
          </View>
        )}
        {formStep === 2 && (
          <View style={{ ...Styles.stepContainer }}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>What's Your Name?</Text>
            <Input
              value={name}
              setValue={setName}
              placeTxt={"Enter your full name"}
              onSubmit={completeFormStep}
              returnKeyLabel={"done"}
            />
          </View>
        )}
        {formStep === 3 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
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
        )}
        {formStep === 4 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>Phone Number?</Text>
            <Input
              value={phone}
              setValue={setPhone}
              placeTxt={"Enter your phone number"}
              keyboard={"phone-pad"}
              type={"telephoneNumber"}
            />
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
        )}
        {formStep === 5 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>Where Are You Located?</Text>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  height: 45,
                  backgroundColor: "rgba(247,247,247,1)",
                  fontSize: 16,
                },
              }}
              placeholder="Search"
              onPress={(data, details = null) => {
                completeFormStep(setLocation(data.description));
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
        )}
        {formStep === 6 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
              <Ionicons name="chevron-back" size={27} color={"#2b47fc"} />
            </TouchableOpacity>
            <Text style={Styles.titleTxt}>What Is Your Gender?</Text>
            <Button
              btnCol={"white"}
              textCol={"black"}
              btnStyle={{ backgroundColor: "rgba(247,247,247,1)" }}
              btnTxt={"Male"}
              onPress={() => {
                setFormStep((cur) => cur + 1), setGender("Male");
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
                setFormStep((cur) => cur + 1), setGender("Female");
              }}
            />
          </View>
        )}
        {formStep === 7 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
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
            {/*}
              {skill.map((item, i) => {
                return [renderSkills];
              })}
            </View>
            
        />*/}
            <Button
              btnStyle={{ position: "absolute", bottom: HP(10) }}
              onPress={completeFormStep}
              btnTxt={"Continue"}
            />
          </View>
        )}
        {formStep === 8 && (
          <View style={Styles.stepContainer}>
            <TouchableOpacity
              onPress={() => setFormStep((cur) => cur - 1)}
              style={{ paddingRight: WP(2) }}
            >
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
            <View style={{ position: "absolute", bottom: HP(7) }}>
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
        )}
      </View>
    </SafeAreaView>
  );
};
export default Signup;
