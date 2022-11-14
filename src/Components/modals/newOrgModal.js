import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";
import { Button } from "../Button/Button";
import fontFamily from "../../Assets/config/fontFamily";
import ReactNativeModal from "react-native-modal";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const NewOrgModal = ({ show, setShow, props }) => {
  const handlePress = () => {
    setShow(false);
    props.navigation.navigate("CreateOrg");
  };

  return (
    <ReactNativeModal
      isVisible={show}
      style={{ margin: 0 }}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
    >
      <View style={styles.modal}>
        <View style={styles.rectangle} />
        <View style={styles.container}>
          <Text style={styles.header}>Link your organization</Text>
          <Text style={styles.subTxt}>
            It looks like you don't have any organizations linked to your
            account. You can create one or request the admin to add you to the
            existing page.
          </Text>
          <Button
            btnStyle={{ alignSelf: "center", width: WP(50) }}
            onPress={handlePress}
            btnTxt={"+ Create Organization"}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modal: {
    paddingTop: 10,
    backgroundColor: "white",
    height: HP(35),
    width: WP(100),
    position: "absolute",
    bottom: 0,
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: "center",
    borderRadius: 25,
  },
  rectangle: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "grey",
    width: 50,
    height: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "#333333",
    fontSize: 30,
    textAlign: "center",
    fontFamily: fontFamily.bold,
    marginBottom: 8,
  },
  subTxt: {
    color: "#333333",
    fontSize: 20,
    textAlign: "center",
    fontFamily: fontFamily.regular,
    paddingHorizontal: WP(10),
    marginBottom: HP(3),
  },
});

export default NewOrgModal;
