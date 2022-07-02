import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
//import ReactNativeModal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {GlobalStyles} from '../../global/global.styles';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import Icon from 'react-native-vector-icons/Entypo';
import {SVGS} from '../../Assets/Svgs';
import moment from 'moment';
export const ExpModal = ({
  show,
  setShow,
  onPress,
  title,
  setTitle,
  empType,
  setEmpType,
  cmpName,
  setCmpName,
  location,
  setLocation,
  isworking,
  setIsworking,
  startDate,
  setStart,
  endDate,
  setEndDate,
  description,
  setDescription,
  pressSave,
}) => {
  const toggleSwitch = () => setIsworking(!isworking);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setdateType] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log(date);
    if (dateType == 'start') {
      setStart(moment(date).format('YYYY-MM-DD'));
    } else {
      setEndDate(moment(date).format('YYYY-MM-DD'));
    }
    setDatePickerVisibility(false);
  };
  return (
<Modal
    animationType={'slide'}
    visible={show}
    //transparent={true}
    presentationStyle={'pageSheet'}
    //selectedJob={selectedJob}
    //style={{margin: 0}}
    onRequestClose={() => setShow(false)}
    onBackButtonPress={() => setShow(false)}
    onBackdropPress={() => setShow(false)}>
        <View style={{
          paddingHorizontal: WP(6),
          paddingTop: HP(3),}}>
            <TouchableOpacity
            onPress={() => setShow(false)}>
        <Text style={{color: 'blue', textAlign: 'right'}}>Cancel</Text>
        </TouchableOpacity>
        </View>
      <View style={{marginBottom: HP(10), paddingHorizontal: HP(3)}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: HP(8)}}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{...GlobalStyles.row, justifyContent: 'space-between', paddingBottom: HP(1)}}>
              <Text style={{...GlobalStyles.H2}}>Add Experience</Text>
            </View>
            <Text style={{...Styles.enterTxt}}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
            <Text style={{...Styles.enterTxt, paddingTop: HP(1)}}>
              Employement Type
            </Text>
            <Input value={empType} setValue={setEmpType} />
            <Text style={{...Styles.enterTxt, paddingTop: HP(1)}}>
              Company Name
            </Text>
            <View style={{...GlobalStyles.row}}>
              <SVGS.photo />
              <View style={{flex: 1, marginLeft: WP(5)}}>
                <Input value={cmpName} setValue={setCmpName} />
              </View>
            </View>
            <Text style={{...Styles.enterTxt, paddingTop: HP(1)}}>
              Location
            </Text>
            <Input value={location} setValue={setLocation} />
            <View style={{...GlobalStyles.row, paddingTop: HP(1)}}>
              <Text style={{...Styles.enterTxt, flex: 1}}>
                I am currently working in this role
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isworking ? '#ffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isworking}
                style={{marginLeft: 0}}
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
                <Text style={{...Styles.enterTxt}}>Start Date </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDatePickerVisibility(true);
                    setdateType('start');
                  }}>
                  <Input
                    setValue={setStart}
                    value={startDate}
                    editable={false}
                    placeTxt={''}
                  />
                </TouchableOpacity>
              </View>
              {!isworking ? (
                <></>
              ) : (
                <View style={{width: '48%'}}>
                  <Text style={{...Styles.enterTxt}}>End Date</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisibility(true);

                      setdateType('end');
                    }}>
                    <Input
                      setValue={setEndDate}
                      value={endDate}
                      editable={false}
                      placeTxt={''}
                    />
                    {/* <Text>jskdjkjdkj</Text> */}
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{paddingTop: HP(2)}}>
              <Text style={{...Styles.enterTxt}}>Description</Text>
              <TextInput
                value={description}
                onChangeText={e => setDescription(e)}
                multiline
                placeholder=""
                style={{...Styles.input}}
              />
            </View>
            <View style={{marginTop: HP(5)}}>
              <Button onPress={pressSave} btnTxt={'Add Experience'} />
            </View>
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Modal>
  );
};
const Styles = StyleSheet.create({
  modView: {
    backgroundColor: 'white',
    height: '94%',
    width: '95%',
    position: 'absolute',
    top: HP(3),
    paddingVertical: HP(1),
    paddingHorizontal: WP(5),
    alignSelf: 'center',
  },
  resetTxt: {
    color: 'rgb(0,0,0)',
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    fontSize: 20,
  },
  enterTxt: {
    color: 'black',
    fontFamily: fontFamily.regular,
    // textAlign:'center',
    fontSize: 15,
    paddingBottom: 2,
  },

  input: {
    borderWidth: 0,
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(247,247,247,1)',
    color: 'rgb(0,0,0)',
    padding: 10,
    borderRadius: 10,
    paddingTop: 7,
  },
});
export default ExpModal;