import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './src/lib/firebase';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/Navigations/mainNavigator';
import {store} from './src/root/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};
export default App;
