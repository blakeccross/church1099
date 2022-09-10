import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertService from "./alertService";
import { storageServices } from "./storage.services";
import { CommonActions } from "@react-navigation/native";

const base_url = "https://church1099.com/api/1.1/wf/";
const base_url1 = "https://church1099.com/api/1.1/obj/";

async function getHeaderConfig() {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

const getUrl = (rel) => `${base_url}${rel}`;
const signup = (url, props, ImageProfile) => {
  axios
    .post(
      `${base_url}signup?email=${email}&password=${password}&profilephoto=${ImageProfile}&bio=${bio}&gender=${gender}&resume=${cv}&location=${location}&phone=${phone}&name=${name}&employer=${employer}`
    )
    .then(async (res) => {
      // console.log(res);
      await AsyncStorage.setItem("id", res?.data?.response?.user_id);
      await AsyncStorage.setItem("token", res?.data?.response?.token);

      props?.navigation?.dispatch(
        CommonActions?.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        })
      );
    })
    .catch((err) => {
      // console.log('error', err);
      AlertService.show("Error", "Again signup & provide required data!");
    });
};
const userSignup = async (url, props) => {
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  await axios(config)
    .then(async (res) => {
      response = res?.data;
      await AsyncStorage.setItem("id", res?.data?.response?.user_id);
      await AsyncStorage.setItem("token", res?.data?.response?.token);
      props?.navigation?.dispatch(
        CommonActions?.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        })
      );
    })
    .catch((error) => {
      console.log("error", error);
      AlertService.show("Error", "Again signup & provide required data!");
    });
  return response;
};
const login = (email, password, props) => {
  axios
    .post(`${base_url}login?email=${email}&password=${password}`)
    .then(async (res) => {
      await AsyncStorage.setItem("id", res?.data?.response?.user_id);
      await AsyncStorage.setItem("token", res?.data?.response?.token);
      await AsyncStorage.setItem("email", email);
      // console.log('user info ', res?.data?.response);
      // await AsyncStorage.setItem("employer", false);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        })
      );
    })
    .catch((err) => {
      // console.log(err.response.status);
      AlertService.show("That's weird", "Have you made an account yet?");
    });
};
const forgot = (email) => {
  axios
    .post(`${base_url}forgot?email=${email}`)
    .then(async (res) => {
      AlertService.show("Email sent!", "Kindly check your provided email");
    })
    .catch((err) => {
      // console.log(err.response.status);
      AlertService.show("Not Found", "Please enter correct data!");
    });
};
const myJobListings = async () => {
  const token = await AsyncStorage.getItem("token");
  const url = `${base_url}myJobListings`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(async (res) => {
      response = res.data.jobs;
    })
    .catch((err) => {
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return response;
};
const getJobs = async () => {
  let url = `${base_url}jobs`;
  const token = await AsyncStorage.getItem("token");
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(async (res) => {
      response = res.data.jobs;
    })
    .catch((err) => {
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return response;
};
const MyJobs = async () => {
  const token = await AsyncStorage.getItem("token");
  const url = `${base_url}myJobs`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.myJobs;
    })
    .catch((error) => {
      console.log("error", error);
    });
  return response;
};
const getNotifications = async () => {
  let id = await storageServices.fetchKey("id");
  let value = [];
  let temp = [];
  let arr = [];
  await axios
    .get(`https://church1099.com/api/1.1/obj/notification`)
    .then(async (res) => {
      temp = res?.data?.response?.results;
    })
    .catch((err) => {});
  temp.map((item) => {
    arr = item?.To;
    if (arr?.includes(id)) {
      value.push(item);
    }
  });
  return value;
};
const PostJob = async (
  title,
  church,
  location,
  position,
  emp,
  description,
  isRemote,
  props
) => {
  const token = await AsyncStorage.getItem("token");
  let url = `${base_url}postJob?title=${title}&church=${church}&location=${location}&position=${position}&emp=${emp}&description=${description}&remote=${isRemote}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then(async (res) => {
      AlertService.show("Posted!", "Successfully Posted");
      props.navigation.navigate("Job");
    })
    .catch((err) => {
      console.log(err);
      AlertService.show("Not Posted", "Please enter correct data!");
    });
  return response;
};
const editProfile = async (obj) => {
  const id = await AsyncStorage.getItem("id");
  let response = "";
  let url = `${base_url1}user/${id}`;
  const config = {
    method: "PATCH",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: obj,
  };

  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const getUser = async (user) => {
  const tok = await AsyncStorage.getItem("token");
  let value = {};
  await axios
    .get(`${base_url1}user/${user}`)
    .then(async (res) => {
      value = res?.data?.response;
    })
    .catch((err) => {
      // console.log(err);
      // AlertService.show("Not Found", "Please enter correct data!")
    });
  return value;
};
const changePassword = async (relativeUrl, props) => {
  const token = await AsyncStorage.getItem("token");
  const url = getUrl(relativeUrl);
  // console.log('url :', url, 'token', token);
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      // console.log('res', res);
      AlertService.show("Password Changed Successfully!!");
      props?.navigation?.goBack();
      // return res;
    })
    .catch((error) => {
      // console.log(error);
      if (error?.response?.status == 400) {
        AlertService.show(
          "Wrong Old Password",
          "Kindly write correct old password"
        );
      }
    });
};
const updateJobInfo = async (
  jobId,
  title,
  church,
  location,
  position,
  emp,
  description,
  isRemote,
  navigation
) => {
  const token = await AsyncStorage.getItem("token");
  let url = `${base_url}editjob?jobId=${jobId}&title=${title}&church=${church}&location=${location}&position=${position}&emp=${emp}&description=${description}&remote=${isRemote}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };

  await axios(config)
    .then(async (res) => {
      AlertService.show("Updated!", "Successfully updated");
      // props.navigation.goBack();
      navigation.goBack();
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
      AlertService.show("Error", "Enter Valid Data!");
    });
  return response;
};
const getMessages = async (relativeUrl) => {
  const token = await AsyncStorage.getItem("token");
  const url = `${base_url}messages?convoID=${relativeUrl}`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.response.messages;
    })
    .catch((error) => {
      console.log("error", error);
    });
  return response;
};
const createConvo = async (convoUsers) => {
  let list = JSON.stringify(convoUsers);
  const token = await AsyncStorage.getItem("token");
  let url = `${base_url}createConvo?users=${list}`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      //console.log("res", res);
      response = res.data.response.convo;
    })
    .catch((error) => {
      console.log("error", error);
    });
  return response;
};
const getUserList = async (relativeUrl) => {
  const token = await AsyncStorage.getItem("token");
  // console.log('url :', relativeUrl, 'token', token);
  let response = "";
  const config = {
    method: "POST",
    url: relativeUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      // console.log('res', res.data);
      response = res.data;
    })
    .catch((error) => {
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
const userListForChat = async (relativeUrl) => {
  let response = "";
  const config = {
    method: "GET",
    url: relativeUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: undefined,
  };
  await axios(config)
    .then((res) => {
      console.log("res", res.data);
      response = res.data.response.results;
    })
    .catch((error) => {
      //console.log('error', error);
      if (error?.response?.status == 400) {
      }
    });
  return response;
};
const getConversationList = async () => {
  const token = await AsyncStorage.getItem("token");
  const url = `https://church1099.com/api/1.1/wf/conversations`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.convos;
    })
    .catch((error) => {
      console.log("error", error);
      if (error?.response?.status == 400) {
      }
    });
  return response;
};
const getConversationListDetails = async (userID) => {
  const token = await AsyncStorage.getItem("token");
  const url = `https://church1099.com/api/1.1/wf/convo_details?UserID=${userID}`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      //console.log('res', res.data.response.convos);
      response = res.data.response.convos;
    })
    .catch((error) => {
      // console.log('error', error);
      if (error?.response?.status == 400) {
      }
    });
  return response;
};
const getExperienceList = async (userID) => {
  let url = `${base_url}experience?user=${userID}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data?.response.experience;
    })
    .catch((error) => {});
  return response;
};
const searchJob = async (query) => {
  const token = await AsyncStorage.getItem("id");
  let url = `${base_url}searchJob?query=${query}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.response.jobs;
    })
    .catch((error) => {});
  return response;
};
const searchUsers = async (query) => {
  const token = await AsyncStorage.getItem("id");
  let url = `${base_url}searchUsers?query=${query}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.response.users;
    })
    .catch((error) => {});
  return response;
};
const getSkills = async (category) => {
  let url = `${base_url}skills?category=${category}`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.response.skills;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const addExperience = async (data) => {
  const token = await AsyncStorage.getItem("token");
  let response = "";
  let url = `${base_url}create_experience?title=${data.title}&company=${data.company}&photo&type=${data.type}&start=${data.start}&end=${data.end}&description=${data.description}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const saveJob = async (job) => {
  const token = await AsyncStorage.getItem("token");
  let response = "";
  let url = `${base_url}saveJob?job=${job}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const removeJob = async (job) => {
  const id = await AsyncStorage.getItem("id");
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url}removeJob?user=${id}&job=${job}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const apply = async (jobId) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url}apply?job=${jobId}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const removeApply = async (jobId) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url}removeapply?job=${jobId}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const deletePost = async (postId) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url1}post/${postId}`;
  const config = {
    method: "DELETE",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const createPost = async (img, description, video) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url}post?image=${img}&video=${video}&description=${description}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  console.log(config);
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const deleteJobListing = async (jobId) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url1}job_listing/${jobId}`;
  const config = {
    method: "DELETE",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const addSkill = async (skill, operation) => {
  const id = await AsyncStorage.getItem("id");
  let url = `${base_url}addSkill?operation=${operation}&skill=${skill}&user=${id}`;
  let response = "";
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const editExperience = async (obj, id) => {
  let response = "";
  let url = `https://church1099.com/api/1.1/obj/experience/${id}`;
  const config = {
    method: "PATCH",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: obj,
  };
  await axios(config)
    .then((res) => {
      response = res;
      //console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const deleteExperience = async (id) => {
  let response = "";
  let url = `https://church1099.com/api/1.1/obj/experience/${id}`;
  const config = {
    method: "DELETE",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const getApplicantList = async (jobId) => {
  let url = `${base_url}applicants?id=${jobId}`;
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data?.response?.applicants;
    })
    .catch((error) => {});
  return response;
};
const deleteNotification = async (url) => {
  const config = {
    method: "DELETE",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const deleteConversation = async (url) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const sendMessage = async (url) => {
  let response = [];
  const token = await AsyncStorage.getItem("token");
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const addRead = async (relativeUrl) => {
  let response = [];
  let url = `${base_url}addRead?convoId=${relativeUrl}`;
  const token = await AsyncStorage.getItem("token");
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const portfolio = async (user) => {
  let response = [];
  let url = `${base_url}posts?user=${user}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.posts;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const getUserData = async (userId) => {
  const token = await AsyncStorage.getItem("token");
  let response = [];
  let url = `${base_url}user?userId=${userId}`;
  const config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  await axios(config)
    .then((res) => {
      response = res.data.user;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
export const API = {
  apply,
  removeApply,
  signup,
  login,
  getUserData,
  forgot,
  createPost,
  myJobListings,
  MyJobs,
  editExperience,
  deleteExperience,
  PostJob,
  portfolio,
  editProfile,
  getJobs,
  getUser,
  changePassword,
  getNotifications,
  sendMessage,
  createConvo,
  searchJob,
  searchUsers,
  deletePost,
  saveJob,
  removeJob,
  deleteJobListing,
  addRead,
  updateJobInfo,
  getMessages,
  getConversationList,
  getConversationListDetails,
  getUserList,
  getExperienceList,
  addExperience,
  getSkills,
  addSkill,
  userSignup,
  getApplicantList,
  deleteNotification,
  deleteConversation,
  userListForChat,
};
