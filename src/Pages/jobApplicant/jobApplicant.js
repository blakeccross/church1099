import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./jobApplicant.styles";
import { API } from "../../services/api.services";
import { Header } from "../../Components/header/header";

const JobApplicant = ({ navigation, route }) => {
  var data = route.params;
  const [applicants, setapplicants] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);
    const jobId = data.id;
    let res = await API.getApplicantList(jobId);
    setapplicants(res);
    setloading(false);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: "https:" + item["Profile Photo"] }}
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
    <>
      <Header title="Applicants" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator color={"black"} size={"large"} />
        ) : (
          <View style={{ flex: 1 }}>
            {applicants.length > 0 ? (
              <FlatList
                //contentContainerStyle={{marginTop: HP(2)}}
                numColumns={2}
                data={applicants}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text style={styles.conditionText}>No applicants</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default JobApplicant;
