//import liraries
import React, {Component} from 'react';
import {Modal, View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import { Button } from '../Button/Button';
import fontFamily from '../../Assets/config/fontFamily';
import { GlobalStyles } from '../../global/global.styles';

const JobModal = ({show, setShow, selectedJob, onpressItem}) => {
  return (
    <Modal
    animationType={'slide'}
      visible={show}
      //transparent={true}
      presentationStyle={'pageSheet'}
      selectedJob={selectedJob}
      //style={{margin: 0}}
      onRequestClose={() => setShow(false)}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}>
        <View style={{
          paddingHorizontal: WP(6),
          paddingVertical: HP(3)}}>
            <TouchableOpacity
            onPress={() => setShow(false)}>
        <Text style={{color: 'blue', textAlign: 'right'}}>Cancel</Text>
        </TouchableOpacity>
        </View>
      <View style={{marginBottom: HP(10)}}>
      <ScrollView 
      renderItem={({item}) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: WP(4)}}>
          <Text style={{...GlobalStyles.H1, marginBottom: WP(2)}}>{selectedJob['Job Title']}</Text>
          <Text style={{...GlobalStyles.H3}}>{selectedJob.Church}</Text>
          <Text style={{...GlobalStyles.H3}}>Category: {selectedJob.Category}</Text>
          <View
      style={{margin: WP(5)}}
      >
          <Button
            btnStyle={{alignSelf: 'center'}}
            onPress={() => applyForJob()}
            btnTxt={'Apply'}
            //disable={loading}
          />
  </View>
  <Text style={{...GlobalStyles.H3}}>Job Description</Text>
          <Text style={{...GlobalStyles.P1}}>{selectedJob['Job Description']}</Text>
      </ScrollView>
  </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  modView: {
    //paddingTop: 30,
    backgroundColor: 'white',
    //height: '50%',
    //width: '95%',
    position: 'absolute',
    bottom: '3%',
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: 'center',
    borderRadius: 15,
  },
  item: {
    borderBottomWidth: 0.5,
    height: HP(6),
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skillText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingHorizontal: 10,
  },
  jobTxt: {
    color: '#333333',
    fontSize: 30,
    fontFamily: fontFamily.bold,
  },
});

//make this component available to the app
export default JobModal;
