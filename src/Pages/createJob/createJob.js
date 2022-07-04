import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {Header} from '../../Components/header/header';
import {CreateJobStyle as Styles} from './createJob.style';
import {GlobalStyles} from '../../global/global.styles';
import {Input} from '../../Components/Input/Input';
import {Button} from '../../Components/Button/Button';
import {API} from '../../services/api.services';
import AlertService from '../../services/alertService';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
const CreateJob = props => {
  const [mod, setMod] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
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
  const onPost = async () => {
    if (
      title != '' &&
      category != '' &&
      description != '' &&
      location != '' &&
      position != ''
    ) {
      await API.PostJob(
        title,
        description,
        location,
        isRemote,
        category,
        props,
      );
    } else {
      AlertService.show('Missing', 'Enter all required data');
    }
  };
  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: '#2b47fc' }} />
    <SafeAreaView style={{...Styles.container}}>
      <Header title= "Create Job" onPress={() => props.navigation.goBack()}/>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: WP(6),
          paddingBottom: HP(5),
        }}>
          <View style={{width: '100%'}}>
            <Text style={{...Styles.createTxt}}>Job Title</Text>
            <Input value={title} setValue={setTitle} />
          </View>
          <View style={{width: '100%'}}>
            <Text style={{...Styles.createTxt}}>
              Church / Ministry
            </Text>
            <DropDownPicker
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              style={{borderWidth: 0, backgroundColor: 'rgba(247,247,247,1)',}}
              placeholder={'Choose an option'}
              dropDownContainerStyle={{borderColor: 'rgb(244, 244, 245)'}}
            />
            {/* <Input value={category} setValue={setCategory} /> */}
          </View>
        <View>
          <Text style={{...Styles.createTxt}}>
            Job Description
          </Text>
          <TextInput
            onChangeText={e => {
              setDescription(e);
            }}
            value={description}
            multiline
            height={HP(15)}
            numberOfLines={8}
            textAlignVertical={'top'}
            autoCapitalize={'none'}
            placeholderTextColor={'#666666'}
            style={Styles.input}
          />
        </View>
          <View style={{width: '100%'}}>
            <Text style={{...Styles.createTxt}}>
              Job Location
            </Text>
            <Input value={location} setValue={setLocation} />
          </View>
          <View style={{width: '100%'}}>
            <Text style={{...Styles.createTxt}}>
              Position Type
            </Text>
            <Input value={position} setValue={setPosition} />
          </View>
        <View style={{...GlobalStyles.row, marginTop: HP(2), justifyContent: 'space-between',}}>
        <Text style={{...Styles.createTxt, marginBottom: 15,}}>Is this position remote?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#2B47FC'}}
            thumbColor={isRemote ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setIsRemote(!isRemote);
            }}
            value={isRemote}
          />
        </View>
        <View style={{marginTop: HP(3)}}>
          <Button onPress={() => onPost()} btnTxt={'POST'} />
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};
export default CreateJob;
