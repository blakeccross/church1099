import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Pages/splashScreen/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Pages/login/login";
import Signup from "../Pages/signup/Signup";
import Profile from "../Pages/profile/profile";
import Settings from "../Pages/settings/settings";
import ChangePassword from "../Pages/changePassword/changePassword";
import EditProfile from "../Pages/editProfile/editProfile";
import Subscription from "../Pages/subscriptions/subscription";
import { TabNavigator } from "./tabNavigator";
import { MsgNavigator } from "./msgNavigator";
import Convo from "../Pages/conservation/conservation";
import Home from "../Pages/homePage/home";
import CreateJob from "../Pages/createJob/createJob";
import JobListing from "../Pages/jobListing/jobListing";
import MyJobs from "../Pages/myJobs/myJobs";
import Job from "../Pages/jobs/job";
import SearchJobs from "../Pages/searchJobs/searchJobs";
import SearchUsers from "../Pages/searchUsers/searchUsers";
import EditJob from "../Pages/editJob/editJob";
import JobApplicants from "../Pages/jobApplicants/jobApplicants";
import JobApply from "../Pages/jobApply/jobApply";
import NewConvo from "../Pages/newConvo/newConvo";
import Portfolio from "../Pages/portfolio/portfolio";
import UserExperience from "../Pages/userExperience/userExperience";
import Resume from "../Pages/Resume/Resume";
import AddExp from "../Pages/addExperience/addExp";
import SkillsCategory from "../Pages/skillsCategory/skillsCategory";
import Skills from "../Pages/skills/skills";
import AddPhoto from "../Pages/addPhoto/addPhoto";
import EditSkills from "../Pages/editSkills/editSkills";
import ProfileView from "../Pages/profileView/profileView";
import Discover from "../Pages/discover/discover";
import EditExp from "../Pages/editExperience/editExp";
import AddVideo from "../Pages/addVideo/addVideo";
import ForgotPassword from "../Pages/forgotPassword/forgotPassword";

const Stack = createStackNavigator();
export const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="EditJob" component={EditJob} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserExperience" component={UserExperience} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="MsgNavigator" component={MsgNavigator} />
      <Stack.Screen name="Convo" component={Convo} />
      <Stack.Screen name="CreateJob" component={CreateJob} />
      <Stack.Screen name="JobListing" component={JobListing} />
      <Stack.Screen name="MyJobs" component={MyJobs} />
      <Stack.Screen name="Job" component={Job} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SearchJobs" component={SearchJobs} />
      <Stack.Screen name="SearchUsers" component={SearchUsers} />
      <Stack.Screen name="JobApplicants" component={JobApplicants} />
      <Stack.Screen name="JobApply" component={JobApply} />
      <Stack.Screen name="newConvo" component={NewConvo} />
      <Stack.Screen name="Portfolio" component={Portfolio} />
      <Stack.Screen name="Resume" component={Resume} />
      <Stack.Screen name="AddExp" component={AddExp} />
      <Stack.Screen name="Skills" component={Skills} />
      <Stack.Screen name="SkillsCategory" component={SkillsCategory} />
      <Stack.Screen name="AddPhoto" component={AddPhoto} />
      <Stack.Screen name="AddVideo" component={AddVideo} />
      <Stack.Screen name="EditSkills" component={EditSkills} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="EditExp" component={EditExp} />
    </Stack.Navigator>
  </NavigationContainer>
);
