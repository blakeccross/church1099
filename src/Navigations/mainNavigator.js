import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Pages/SplashScreen/splashScreen";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Profile from "../Pages/profile/profile";
import Setting from "../Pages/setting/setting";
import ChangePassword from "../Pages/changePassword/changePassword";
import EditProfile from "../Pages/editProfile/editProfile";
import Subscription from "../Pages/subscriptions/subscription";
import { TabNavigator } from "./tabNavigator";
import { MsgNavigator } from "./msgNavigator";
import Convo from "../Pages/conservation/conservation";
import Home from "../Pages/homePage/home";
import SignupEmp from "../Pages/signupEmployee/signupEmp";
import CreateJob from "../Pages/createJob/createJob";
import JobListing from "../Pages/jobListing/jobListing";
import MyJobs from "../Pages/myJobs/myJobs";
import Job from "../Pages/jobs/job";
import Search from "../Pages/search/search";
import EditJob from "../Pages/editJob/editJob";
import HiringSignup from "../Pages/hiringSignup/hiringSignup";
import JobApplicant from "../Pages/jobApplicant/jobApplicant";
import JobApply from "../Pages/jobApply/jobApply";
import UserList from "../Pages/userList/userList";
import Portfolio from "../Pages/portfolio/portfolio";
import UserExperience from "../Pages/userExperience/userExperience";
import Resume from "../Pages/Resume/Resume";
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
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupEmp" component={SignupEmp} />
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
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="HiringSignup" component={HiringSignup} />
      <Stack.Screen name="JobApplicant" component={JobApplicant} />
      <Stack.Screen name="JobApply" component={JobApply} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="Portfolio" component={Portfolio} />
      <Stack.Screen name="Resume" component={Resume} />
    </Stack.Navigator>
  </NavigationContainer>
);
