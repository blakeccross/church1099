import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import fontFamily from '../../Assets/config/fontFamily';
import {HP, WP} from '../../Assets/config/screen-ratio';
import {Button} from '../../Components/Button/Button';
import {LoginModal} from '../../Components/loginModal/loginModal';
import {HomeStyle as Styles} from './home.style';
import { Video } from "expo-av";

const Home = props => {
  const [mod, setMod] = useState(false);
  return (
      <View style={Styles.mainContainer}>
        {/*}
        <Image
          source={require('../../Assets/Imgs/Worship.jpeg')}
          style={Styles.image}
  />*/}
  <Video
      source={{
        uri: 'https://scontent.cdninstagram.com/v/t50.2886-16/235044483_130047875991022_2685692339817724909_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjYwNi5jbGlwcy5kZWZhdWx0IiwicWVfZ3JvdXBzIjoiW1wiaWdfd2ViX2RlbGl2ZXJ5X3Z0c19vdGZcIl0ifQ&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=fBAXnLAICyoAX86vody&edm=AJBgZrYBAAAA&vs=17897749148191412_4073974742&_nc_vs=HBksFQAYJEdJTl9BZzd1eFhNaFIzWUFBTzI3MGlMMGZrVWxicV9FQUFBRhUAAsgBABUAGCRHQVVGRnc3elhsd2VyN3dBQUREZHZmZlZJaklqYnFfRUFBQUYVAgLIAQAoABgAGwAVAAAmiIXN8b2m2D8VAigCQzMsF0BN%2B6XjU%2FfPGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX%2BBwA%3D&_nc_rid=11cffad5a4&ccb=7-5&oe=62BF34AD&oh=00_AT_DNS2e0Mxq5rhBpTptp5e_ZaVXbGDxwCx_zMxyIRbXcQ&_nc_sid=78c662&dl=1',}}
        style={Styles.video}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        isMuted={true}
        shouldPlay={true}
      />
        <View style={Styles.absluteContainer}>
        <Text style={Styles.welcomechurchTxt}>
            Welcome to the future of church contracting.
          </Text>
          </View>
          <View style={{position: 'absolute', bottom: HP(7), alignSelf: 'center',}}>
          <Button
            btnStyle={Styles.btnStyle}
            btnTxt={'Get Started'}
            btnCol={'#2B47FC'}
            onPress={() => props.navigation.navigate('Signup')}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            style={Styles.loginBtn}>
            <Text style={Styles.loginText}>
              Already have an account?{' '}
              <Text style={{color: '#2B47FC'}}>Login</Text>
            </Text>
          </TouchableOpacity>
          </View>
      </View>
  );
};
export default Home;
