//import liraries
import React, {Component, useState} from 'react';
import {Modal, View, Text, ScrollView, Switch, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import { Button } from '../Button/Button';
import fontFamily from '../../Assets/config/fontFamily';
import { GlobalStyles } from '../../global/global.styles';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const SubscribeModal = ({show, setShow, onpressItem}) => {
  const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Modal
    style={{
      backgroundColor: 'black',
    }}
    animationType={'slide'}
      visible={show}
      //transparent={true}
      presentationStyle={'FullScreen'}
      //style={{margin: 0}}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}>
        <View style={{
          backgroundColor: 'rgb(244,244,245)',
          paddingHorizontal: WP(6),
          paddingTop: HP(7),
          paddingBottom: HP(3)}}>
            <TouchableOpacity
            onPress={() => setShow(false)}>
        <Ionicons name="ios-close-sharp" size={35} color="#333333" />
        </TouchableOpacity>
        </View>
        <View style={styles.modal}>
          <Text style={styles.header}>Subscribe</Text>
          <Text style={styles.subTxt}>We truly want to make what we do affordable and simple for you and your ministry.</Text>
          <View style={styles.container}>
          <Ionicons name="ios-chatbubble" size={24} color="#333333" />
          <Text style={styles.billingTxt}>Create Unlimited Job Listings</Text>
          </View>
          <View style={styles.container}>
          <MaterialCommunityIcons name="briefcase-outline" size={24} color="#333333" />
          <Text style={styles.billingTxt}>Message Potential Hires</Text>
          </View>
          <View style={{...styles.container, marginBottom: HP(3)}}>
          <Ionicons name="md-person-circle-sharp" size={24} color="#333333" />
          <Text style={styles.billingTxt}>Access to all resumes</Text>
          </View>
          <View style={styles.OptionContainer}>
          <Text style={styles.price}>$100 per month</Text>
          <View style={{position: 'absolute', right: 15}}>
          <Ionicons name="checkmark-circle-outline" size={27} color="black" />
          </View>
          </View>
          <View style={{...styles.OptionContainer, marginBottom: HP(3)}}>
          <Text style={styles.price}>$1000 per year</Text>
          </View>
          <Button btnTxt={'Subscribe'} />
        </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: WP(6),
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgb(244,244,245)',
  },
  billingTxt: {
    color: '#333333',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: fontFamily.bold,
    marginLeft: 10,
  },
  container: {
    ...GlobalStyles.row,
    justifyContent: 'left',
    alignItems: 'center',
    height: HP(8),
    marginLeft: WP(10)
    //marginVertical: 3
  },
  OptionContainer: {
    ...GlobalStyles.row,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    height: HP(10),
    marginVertical: 5,
  },
  header: {
    color: '#333333',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    marginBottom: 8,
  },
  price: {
    color: '#333333',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    marginVertical: 10,
  },
  subTxt: {
    color: '#333333',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    paddingHorizontal: WP(10),
    marginBottom: HP(3),
  },
  jobTxt: {
    color: '#333333',
    fontSize: 30,
    fontFamily: fontFamily.bold,
  },
});

export default SubscribeModal;
