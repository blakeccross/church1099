import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import Styles from './editJob.styles';
import {GlobalStyles} from '../../global/global.styles';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
import {RadioButton} from 'react-native-paper';
import {API} from '../../services/api.services';
import AlertService from '../../services/alertService';
import DropDownPicker from 'react-native-dropdown-picker';
const EditJob = ({navigation, route}) => {
  var item = route?.params?.item;
  const [mod, setMod] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Pakistan punjab');
  const [position, setPosition] = useState('');
  const [isRemote, setIsRemote] = useState(false);

  const [items, setItems] = useState([
    {label: 'None', value: ''},
    {label: 'Communication', value: 'Communication'},
    {label: 'Video', value: 'Video'},
    {label: 'Design', value: 'Design'},
    {label: 'Production', value: 'Production'},
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
    setTitle(item['Job Title']);
    setDescription(item['Job Description']);
    setCategory(item['Category']);
    setIsRemote(item['Remote Friendly']);
    setLocation(item['State']);
    setPosition(item['Position type']);
  }, []);
  const updateJob = async () => {
    if (
      title != '' &&
      category != '' &&
      description != '' &&
      location != '' &&
      position != ''
    ) {
      await API.updateJobInfo(
        title,
        description,
        location,
        isRemote,
        category,
        navigation,
      );
    } else {
      AlertService.show('Missing', 'Enter all required data !!!');
    }
  };
  return (
    <SafeAreaView style={{...Styles.container}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: WP(6),
          paddingBottom: HP(5),
          paddingTop: HP(3),
        }}>
        <Text style={{...Styles.createTxt}}>Edit Job</Text>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: 'space-between',
            marginTop: HP(3),
          }}>
          <View style={{width: '45%'}}>
            <Text style={{...Styles.createTxt, fontSize: 13}}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
          </View>
          <View style={{width: '45%'}}>
            <Text style={{...Styles.createTxt, fontSize: 13}}>
              Church / Ministry
            </Text>
            <DropDownPicker
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              style={{borderWidth: 0}}
              placeholder={'Choose an option'}
              dropDownContainerStyle={{borderColor: 'rgb(244, 244, 245)'}}
            />
            {/* <Input value={category} setValue={setCategory} /> */}
          </View>
        </View>
        <View style={{marginTop: HP(3)}}>
          <Text style={{...Styles.createTxt, fontSize: 13}}>
            Job Description
          </Text>
          <TextInput
            onChangeText={e => {
              setDescription(e);
            }}
            value={description}
            multiline
            numberOfLines={8}
            textAlignVertical={'top'}
            autoCapitalize={'none'}
            placeholderTextColor={'#666666'}
            style={Styles.input}
          />
        </View>
        <View
          style={{
            ...GlobalStyles.row,
            justifyContent: 'space-between',
            marginTop: HP(3),
          }}>
          <View style={{width: '45%'}}>
            <Text style={{...Styles.createTxt, fontSize: 13}}>
              Job Location
            </Text>
            <Input value={location} setValue={setLocation} />
          </View>
          <View style={{width: '45%'}}>
            <Text style={{...Styles.createTxt, fontSize: 13}}>
              Position Type
            </Text>
            <Input value={position} setValue={setPosition} />
          </View>
        </View>
        <View style={{...GlobalStyles.row}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isRemote ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setIsRemote(!isRemote);
            }}
            value={isRemote}
          />
          <Text style={{...Styles.createTxt, fontSize: 13}}>Remote</Text>
        </View>
        <View style={{marginTop: HP(3)}}>
          <Button onPress={() => updateJob()} btnTxt={'Update Job'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditJob;
