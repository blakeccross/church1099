//import liraries
import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './searchBar.styles';
import {palette} from '../../Assets/config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
const SearchBar = ({val, setval, search, onpress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onpress}>
        <AntDesign name="plus" color={palette.gray} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
