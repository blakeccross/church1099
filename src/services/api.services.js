const base_url = 'https://church1099.com/api/1.1/wf/';
const base_url1 = 'https://church1099.com/api/1.1/obj/';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertService from './alertService';
import {storageServices} from './storage.services';
import {CommonActions} from '@react-navigation/native';
async function getHeaderConfig() {
  const token = await AsyncStorage.getItem('token');
  // console.log('Token', token);
  return {
    headers: {Authorization: `Bearer ${token}`},
  };
}

const getUrl = rel => `${base_url}${rel}`;
const signup = (url, props) => {
  axios
    .post(
      `${base_url}signup?email=${email}&password=${password}&profilephoto=${img}&bio=${bio}&gender=${gender}&resume=${cv}&location=${location}&phone=${phone}&name=${name}&employer=${employer}`,
    )
    .then(async res => {
      // console.log(res);
      await AsyncStorage.setItem('id', res?.data?.response?.user_id);
      await AsyncStorage.setItem('token', res?.data?.response?.token);

      props?.navigation?.dispatch(
        CommonActions?.reset({
          index: 0,
          routes: [{name: 'TabNavigator'}],
        }),
      );
    })
    .catch(err => {
       console.log('error', err);
      AlertService.show('Error', 'Again signup & provide required data!');
    });
};
const userSignup = async (url, props) => {
  let response = '';
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  console.log(url)
  await axios(config)
    .then(async res => {
      response = res?.data;
      await AsyncStorage.setItem('id', res?.data?.response?.user_id);
      await AsyncStorage.setItem('token', res?.data?.response?.token);
      props?.navigation?.dispatch(
        CommonActions?.reset({
          index: 0,
          routes: [{name: 'TabNavigator'}],
        }),
      );
    })
    .catch(error => {
      console.log('error', error);
      AlertService.show('Error', 'Again signup & provide required data!');
    });
  return response;
};
const login = (email, password, props) => {
  axios
    .post(`${base_url}login?email=${email}&password=${password}`)
    .then(async res => {
      await AsyncStorage.setItem('id', res?.data?.response?.user_id);
      await AsyncStorage.setItem('token', res?.data?.response?.token);
      await AsyncStorage.setItem('email', email);
      // console.log('user info ', res?.data?.response);
      // await AsyncStorage.setItem("employer", false);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabNavigator'}],
        }),
      );
    })
    .catch(err => {
      // console.log(err.response.status);
      AlertService.show('Not Found', 'Please try again');
    });
};
const forgot = email => {
  axios
    .post(`${base_url}forgot?email=${email}`)
    .then(async res => {
      AlertService.show('Email sent!', 'Kindly check your provided email');
    })
    .catch(err => {
      // console.log(err.response.status);
      AlertService.show('Not Found', 'Please enter correct data!');
    });
};
const JobList = async email => {
  let value = [];
  await axios
    .get(`https://church1099.com/api/1.1/obj/joblisting`)
    .then(async res => {
      // AlertService.show("Email sent!", "Kindly check your provided email")
      // console.log('job list data', res?.data?.response?.results);
      value = res?.data?.response?.results;
    })
    .catch(err => {
      // console.log(err.response.status);
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return value;
};
const getNotifications = async () => {
  let id = await storageServices.fetchKey('id');
  let value = [];
  let temp = [];
  let arr = [];
  await axios
    .get(`https://church1099.com/api/1.1/obj/notification`)
    .then(async res => {
      temp = res?.data?.response?.results;
    })
    .catch(err => {});
  temp.map(item => {
    arr = item?.To;
    if (arr?.includes(id)) {
      value.push(item);
    }
  });
  return value;
};
const PostJob = async (title, desc, location, remote, category, props) => {
  let value = [];
  // console.log(
  //   `${base_url}postjob?title=${title}&description=${desc}&location=${location}&remote?=${remote}&category=${category}`,
  // );
  await axios
    .post(
      `${base_url}postjob?title=${title}&description=${desc}&location=${location}&remote?=${remote}&category=${category}`,
    )
    .then(async res => {
      AlertService.show('Posted!', 'Successfully Posted');
      props.navigation.goBack();
      props.navigation.replace('Job');
      // console.log(res);
    })
    .catch(err => {
      // console.log(err);
      AlertService.show('Not Posted', 'Please enter correct data!');
    });
  return value;
};
const editProfile = async (name, bio, photo, resume, gender, phone) => {
  const config = await getHeaderConfig();
  let value = [];
  const id = await AsyncStorage.getItem('id');
  const email = await AsyncStorage.getItem('email');
  // console.log(
  //   `${base_url1}user/${id}?email=${email}&name=${name}&bio=${bio}&gender=${gender}&phone=${phone}`,
  // );
  await axios
    .patch(
      `${base_url1}user/${id}?email=${email}&name=${name}&bio=${bio}&gender=${gender}&phone=${phone}`,
      {},
      config,
    )
    .then(async res => {
      AlertService.show('UPDATED!', 'Successfully Updated');
      // console.log('response from edit api ', res);
    })
    .catch(err => {
      // console.log('error', err);
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return value;
};
const getUser = async () => {
  const id = await AsyncStorage.getItem('id');
  // console.log('IDD', id);
  const tok = await AsyncStorage.getItem('token');
  // console.log('TOKEN', tok);
  let value = {};
  // console.log(`${base_url1}user/${id}`);
  await axios
    .get(`${base_url1}user/${id}`)
    .then(async res => {
      // AlertService.show("Posted!", "Successfully Posted")
      value = res?.data?.response;
      // console.log(res?.data?.response);
    })
    .catch(err => {
      // console.log(err);
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return value;
};
const changePassword = async (relativeUrl, props) => {
  const token = await AsyncStorage.getItem('token');
  const url = getUrl(relativeUrl);
  // console.log('url :', url, 'token', token);
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      // console.log('res', res);
      AlertService.show('Password Changed Successfully!!');
      props?.navigation?.goBack();
      // return res;
    })
    .catch(error => {
      // console.log(error);
      if (error?.response?.status == 400) {
        AlertService.show(
          'Wrong Old Password',
          'Kindly write correct old password',
        );
      }
    });
};
const searchJob = async (relativeUrl, data) => {
  //https://church1099.com/elasticsearch/msearch
  const token = await AsyncStorage.getItem('token');
  const url = getUrl(relativeUrl);
  // console.log('url :', url);
  const config = {
    method: 'post',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const response = await axios(config)
    .then(res => res)
    .catch(error => {
      // console.log('rror ', response);
      return {status: 500};
    });
  return response;
};
const updateJobInfo = async (
  title,
  desc,
  location,
  remote,
  category,
  navigation,
) => {
  let url = `${base_url}postjob?title=${title}&description=${desc}&location=${location}&remote?=${remote}&category=${category}`;
  // console.log(url);
  await axios
    .post(url)
    .then(async res => {
      AlertService.show('Updated!', 'Successfully updated');
      // props.navigation.goBack();
      // props.navigation.replace('Job');
      // console.log(res);
    })
    .catch(err => {
      // console.log(err);
      AlertService.show('Error', 'Enter Valid Data!');
    });
};
const GetMessageList = async relativeUrl => {
  const token = await AsyncStorage.getItem('token');
  const url = getUrl(relativeUrl);
  let response = '';
  // console.log('url :', url, 'token', token);
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      // console.log('res', res.data);
      response = res;
    })
    .catch(error => {
      // console.log('error', error);
      if (error?.response?.status == 400) {
        // AlertService.show(
        //   'Wrong Old Password',
        //   'Kindly write correct old password!',
        // );
      }
    });
  return response;
};
const getUserList = async relativeUrl => {
  const token = await AsyncStorage.getItem('token');
  // console.log('url :', relativeUrl, 'token', token);
  let response = '';
  const config = {
    method: 'POST',
    url: relativeUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      // console.log('res', res.data);
      response = res.data;
    })
    .catch(error => {
      // console.log('error', error);
      if (error?.response?.status == 400) {
        // AlertService.show(
        //   'Wrong Old Password',
        //   'Kindly write correct old password!',
        // );
      }
    });
  return response;
};
const userListForChat = async relativeUrl => {
  let response = '';
  const config = {
    method: 'GET',
    url: relativeUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: undefined,
  };
  await axios(config)
    .then(res => {
      //console.log('res', res.data);
      response = res.data.response.results;
    })
    .catch(error => {
      //console.log('error', error);
      if (error?.response?.status == 400) {
      }
    });
  return response;
};
const getConversationList = async relativeUrl => {
  const token = await AsyncStorage.getItem('token');
  // const url = getUrl(relativeUrl);
  let response = '';
  // console.log('url :', relativeUrl, 'token', token);
  const config = {
    method: 'GET',
    url: relativeUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      // console.log('res', res.data);
      response = res;
    })
    .catch(error => {
      // console.log('error', error);
      if (error?.response?.status == 400) {
      }
    });
  return response;
};
const getExperienceList = async () => {
  const token = await AsyncStorage.getItem('id');
  let d = '1599771467039x820731645948684800';
  let url = `https://church1099.com/api/1.1/wf/experience?user=${token}`;
  let response = [];
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res.data?.response.experience;
    })
    .catch(error => {});
  return response;
};
const getSkillSet = async () => {
  const token = await AsyncStorage.getItem('id');
  let d = '1599771467039x820731645948684800';
  let url = `https://church1099.com/api/1.1/wf/all_skills?User=${token}`;
  let response = [];
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res.data.response.Skill;
    })
    .catch(error => {});
  return response;
};
const getAllSkills = async () => {
  let url = `https://church1099.com/api/1.1/obj/skill`;
  let response = [];
  const config = {
    method: 'GET',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: undefined,
  };
  await axios(config)
    .then(res => {
      response = res.data?.response?.results;
    })
    .catch(error => {});
  return response;
};
const addExperience = async data => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  let response = '';
  // let url =
  //   'https://church1099.com/api/1.1/wf/create_experience?title=Testing&company=delete Me&photo&type=Full-Time&start=01/02/2020&end=01/03/2020&description=Test description';
  let url = `https://church1099.com/api/1.1/wf/create_experience?title=${data.title}&company=${data.company}&photo&type=${data.type}&start=${data.start}&end=${data.end}&description=${data.description}`;
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res;
    })
    .catch(error => {
      console.log(error);
    });
  return response;
};
const updateSkill = async list => {
  const id = await AsyncStorage.getItem('id');
  let response = '';
  let url = `https://church1099.com/api/1.1/obj/user/${id}`;
  const config = {
    method: 'PATCH',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: list,
  };
  await axios(config)
    .then(res => {
      response = res;
    })
    .catch(error => {
      console.log(error);
    });
  return response;
};
const getApplicantList = async (id = '1651521361459x871475238184943600') => {
  let url = `https://church1099.com/api/1.1/wf/applicants?id=${id}`;
  let response = [];
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res.data?.response?.applicants;
    })
    .catch(error => {});
  return response;
};
const deleteNotification = async url => {
  const config = {
    method: 'DELETE',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res;
    })
    .catch(error => {
      console.log(error);
    });
  return response;
};
const jobApply = async jobId => {
  const id = await AsyncStorage.getItem('id');
  console.log('id', id);
  let url = `https://church1099.com/api/1.1/wf/addapplicant?jobID=${jobId}&user=${id}`;
  let response = [];
  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  await axios(config)
    .then(res => {
      response = res.data;
    })
    .catch(error => {
      console.log('error', error);
    });
  return response;
};
const portfolio = async () => {
  const id = await AsyncStorage.getItem('id');
  //console.log(token);
  let response = [];
  
  let url = `https://church1099.com/api/1.1/wf/portfolio?userID=${id}`;

  const config = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(res => {
      response = res.data?.response?.Portfolio
      //console.log(res.data?.response?.Portfolio);
      //AlertService.show('WOW!', 'Successfully something');
    })
    .catch(error => {
      console.log(error);
    });
  return response;
};
export const API = {
  jobApply,
  signup,
  login,
  forgot,
  JobList,
  PostJob,
  portfolio,
  editProfile,
  getUser,
  changePassword,
  getNotifications,
  searchJob,
  updateJobInfo,
  GetMessageList,
  getConversationList,
  getUserList,
  getExperienceList,
  getSkillSet,
  addExperience,
  getAllSkills,
  updateSkill,
  userSignup,
  getApplicantList,
  deleteNotification,
  userListForChat,
};
