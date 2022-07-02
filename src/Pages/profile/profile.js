import React, {useEffect, useState} from 'react';
import {SafeAreaView,Text,Image,View,TouchableOpacity,TextInput, SectionList, ScrollView,Linking, FlatList} from 'react-native';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {Imgs} from '../../Assets/Imgs';
import {ProfileStyle as Styles} from './profile.style';
import Icon from 'react-native-vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';
import IconPlus from 'react-native-vector-icons/AntDesign';
import IconChat from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles} from '../../global/global.styles';
import {ExpModal} from '../../Components/expModal/expModal';
import {API} from '../../services/api.services';
import RenderExperience from '../../Components/flatlistRenders/renderExperience';
import Dropdown from '../../Components/dropdown/dropdown';
import { Button } from '../../Components/Button/Button';

const Profile = props => {
  const [mod, setMod] = useState(false);
  const [dropdownModal, setdropdownModal] = useState(false);
  const [selectedSkill, setselectedSkill] = useState('');
  const [allSkills, setallSkills] = useState([]);
  const [skills, setskills] = useState([]);
  const [userData, setuserData] = useState('');
  const [experience, setExperience] = useState([]);
  const [title, settitle] = useState('');
  const [empType, setempType] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [isEmployee, setisEmployee] = useState(true);
  const [location, setlocation] = useState('');
  const [description, setdescription] = useState('');
  const [ports, setPorts] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await API.getUser();
    let ex = await API.getExperienceList();
    let skil = await API.getSkillSet();
    let allSkill = await API.getAllSkills();
    let port = await API.portfolio();
    setskills(skil);
    setExperience(ex);
    setuserData(res);
    setallSkills(allSkill);
    setPorts(port);
    //console.log(allSkill)
  };
  const postExperience = async () => {
    let obj = {
      title: title,
      type: empType,
      company: companyName,
      description: description,
      start: startDate,
      photo: companyPhoto,
      ['Current Position']: isEmployee,
      end: endDate,
    };
    let res = await API.addExperience(obj);
    setMod(false);
    await getData();
  };
  const openLink = url => {
    Linking.openURL(url);
  };
  const uploadSkill = async obj => {
    let copy = [...skills];
    let list = skills.find(item => {
      return item._id == obj._id;
    });
    if (list) {
    } else {
      copy.push(obj);
    }
    let ids = copy.map(item => {
      return item._id;
    });
    setskills(copy);
    await API.updateSkill({['Skill Set']: ids});
  };
  const removeSkill = async obj => {
    let list = skills.filter(item => {
      return item.Type != obj.Type;
    });
    let ids = list.map(item => {
      return item._id;
    });
    setskills([...list]);
    await API.updateSkill({['Skill Set']: ids});
  };
  const renderSkill = item => {
    //console.log(item.Type)
    return (
      <View style={Styles.skillItem}>
        <Text style={{color: 'black', paddingLeft: 5}}>{item.Type}</Text>
      </View>
    );
  };
  const renderPort = item => {
    //console.log('item', item)
    return (
      <View style={Styles.portItem}>
        <Image source={{uri: "https:" + item.Photo}} style={{width:WP(25), height:HP(17), borderRadius: 10}}/>
      </View>
    );
  };
  return (
    <SafeAreaView style={{...Styles.container}}>
      <ScrollView contentContainerStyle={{paddingBottom: HP(8)}}>
        <View>
          {/*<Image source={{uri: "https:" + userData['Header']}} style={{width: '100%', height: HP(25)}} />*/}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Setting')}
            style={{
              position: 'absolute',
              right: WP(1),
              marginHorizontal: WP(5),
              marginTop: HP(3),
              padding: 7,
              borderRadius: 20,
              backgroundColor: 'white'
            }}>
            <Entypo name="dots-three-horizontal" color={'#000000'} size={20} />
          </TouchableOpacity>
          {/* <IconSetting name='settings-outline' size={25} color={focused ? '#087E8B' : 'black'} style={{...Styles.icon}}/> */}
        </View>
        <Image
          source={{uri: userData['Profile Photo']}}
          style={{...Styles.dp}}
        />
        <Text style={{...GlobalStyles.H2, textAlign: 'center', marginTop: HP(1)}}>{userData?.Name}</Text>
        <View style={{...GlobalStyles.row, alignSelf: 'center', marginTop: HP(1)}}>
          <Icon name="location-pin" color={'#666666'} size={14} />
          <Text style={{...GlobalStyles.P1}}>{userData?.Location}</Text>
        </View>
        <Text style={{...GlobalStyles.P1, textAlign: 'center', marginTop: HP(1)}}>
          {userData.Bio}
        </Text>
        <View style={{...GlobalStyles.row, width: '100%', justifyContent: 'center', marginTop: HP(2), marginBottom: HP(2)}}>
        <Button textCol='black' btnCol='white' btnStyle={{width: WP(43), marginRight: WP(1)}} btnTxt={'View Resume'} onPress={() => openLink('https:' + userData?.Resume)}/>
        <Button btnTxt={'Hire Me'} btnStyle={{width: WP(43), marginLeft: WP(1)}}/>
        </View>

            {/*SKILLS*/}
        <View style={{...Styles.panelView}}>

        <View
            style={{
              marginBottom: HP(2),
              ...GlobalStyles.row,
              justifyContent: 'space-between',
            }}>
            <Text style={{...GlobalStyles.H3}}>Skills</Text>
            <TouchableOpacity onPress={() => setdropdownModal(true)}>
              <IconPlus name={'plus'} color={'black'} size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap'}}
              data={skills}
              numColumns={3}
              renderItem={({item}) => renderSkill(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        {/*PORTFOLIO*/}
        <View style={{...Styles.panelView}}>
        <View
            style={{
              marginBottom: HP(2),
              ...GlobalStyles.row,
              justifyContent: 'space-between',
            }}>
            <Text style={{...GlobalStyles.H3}}>Portfolio</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Portfolio')}>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
              //columnWrapperStyle={{ flexWrap: 'wrap'}}
              data={ports}
              //numColumns={3}
              renderItem={({item}) => renderPort(item)}
              keyExtractor={(item, index) => index.toString()}
            />
            </TouchableOpacity>
        </View>
        {/*EXPERIENCE*/}
        <View>
          <View
            style={{
              ...Styles.panelView,
              marginBottom: HP(0),
              ...GlobalStyles.row,
              justifyContent: 'space-between',
            }}>
            <Text style={{...GlobalStyles.H3}}>Experience</Text>
            <TouchableOpacity onPress={() => setMod(true)}>
              <IconPlus name={'plus'} color={'black'} size={20} />
            </TouchableOpacity>
          </View>
          <View style={Styles.experienceList}>
            <FlatList
            data={experience}
            renderItem={({item}) => <RenderExperience item={item} />}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
      <Dropdown
        show={dropdownModal}
        setShow={setdropdownModal}
        list={allSkills}
        onpressItem={item => uploadSkill(item)}
        setval={setselectedSkill}
      />
      <ExpModal
        title={title}
        setTitle={settitle}
        empType={empType}
        setEmpType={setempType}
        cmpName={companyName}
        setCmpName={setcompanyName}
        location={location}
        setLocation={setlocation}
        startDate={startDate}
        setStart={setstartDate}
        endDate={endDate}
        setEndDate={setendDate}
        description={description}
        setDescription={setdescription}
        isworking={isEmployee}
        setIsworking={setisEmployee}
        show={mod}
        setShow={setMod}
        onPress={() => {
          setMod(false);
        }}
        pressSave={() => postExperiance()}
      />

    </SafeAreaView>
  );
};
export default Profile;
