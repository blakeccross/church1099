//import liraries
import React, {useState, useEffect} from 'react';
import {GlobalStyles} from '../../global/global.styles';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './jobApplicant.styles';
import {API} from '../../services/api.services';
import {HP, WP} from '../../Assets/config/screen-ratio';
import Icon from 'react-native-vector-icons/Ionicons';
const JobApplicant = ({navigation, route}) => {
  var data = route?.params?.data;
  const [applicants, setapplicants] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);
    let res = await API.getApplicantList(data?._id);
    setapplicants(res);
    setloading(false);
  };
  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Image
            style={styles.image}
            source={{uri: 'https:' + item['Profile Photo']}}
          />
          <View>
            <Text style={styles.name}>{item.Name}</Text>
            <Text style={styles.name}>{item.Location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewProfile}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
          <SafeAreaView style={{...styles.container}}>
      <View style={{...GlobalStyles.row, justifyContent: 'center', marginTop: HP(1), marginBottom: HP(2)}}>
        <Text style={{...GlobalStyles.H3}}>Applicants</Text>
        <Text style={styles.heading}>{data['Job Title']}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{paddingHorizontal: WP(3), position: 'absolute', left: 0}}>
          <Icon name={'chevron-back'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator color={'black'} size={'large'} />
        ) : (
          <View style={{flex: 1}}>
            {applicants.length > 0 ? (
              <FlatList
                //contentContainerStyle={{marginTop: HP(2)}}
                numColumns={2}
                data={applicants}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text style={styles.conditionText}>No applicants</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default JobApplicant;
