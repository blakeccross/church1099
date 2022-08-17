import React, { useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
export const Input = ({
  keyboard,
  pass,
  placeTxt,
  //disable,
  col,
  setValue,
  value,
  editable = true,
  onSubmit,
  returnKeyLabel,
  type,
  autoCorrect,
}) => {
  const Styles = StyleSheet.create({
    input: {
      borderWidth: 0,
      borderRadius: 10,
      height: 45,
      width: "100%",
      backgroundColor: col ? col : "rgba(247,247,247,1)",
      color: "#000",
      padding: 10,
    },
  });
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={(e) => setValue(e)}
        editable={editable}
        autoCapitalize={"none"}
        secureTextEntry={pass}
        keyboardType={keyboard}
        placeholder={placeTxt}
        placeholderTextColor={"#D3D3D3"}
        style={Styles.input}
        returnKeyType={returnKeyLabel}
        onSubmitEditing={onSubmit}
        textContentType={type}
        autoCorrect={autoCorrect}
      />
    </View>
  );
};
