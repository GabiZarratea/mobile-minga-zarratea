import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../../redux/actions/auth.js';
import NavBar from '../components/NavBar.js';

const Home = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let token = useSelector((state) => state.auth.token);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      } else {
        console.log('token:' + error)
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    };

    getTokenFromStorage();
  }, []);

  const isLoggedIn = () => {
    return token && user;
  };
  
  return (
    <View style={styles.container}>
    <NavBar /> 
    <ImageBackground source={require('../../assets/background1.png')} style={styles.imageBackground} >
      <LinearGradient colors={['rgba(0, 0, 0, 0.50)', 'rgba(0, 0, 0, 0.50)']} start={[0, 0]} end={[0, 1]} style={styles.gradientOverlay}>
        <StatusBar hidden={true} />
        <View>
          <Text style={styles.titleHome}>Live the emotion of the manga</Text>
          <Text style={styles.subtitleHome}>Find the perfect manga for you</Text>
          {!isLoggedIn() && (
            <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
              <LinearGradient colors={['#F9A8D4', '#FA5C93']} top={[1, 0]} bottom={[0, 0]} style={styles.buttonGradient}>
                <Text style={styles.textButtonHome}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {isLoggedIn() && (
            <TouchableOpacity onPress={() => props.navigation.navigate('Mangas')}>
              <LinearGradient colors={['#F9A8D4', '#FA5C93']} top={[1, 0]} bottom={[0, 0]} style={styles.buttonGradient}>
                <Text style={styles.textButtonHome}>Explore</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  </View>
  )
}


export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    gradientOverlay: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleHome: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 40 * 1.2,
      width: 388,
      margin: 5
    },
    subtitleHome: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 40 * 1.2,
      width: 390,
      margin: 5
    },
    textButtonHome: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'bold',
      fontStyle: 'normal',
      color: 'white'
    },
    buttonGradient: {
      width: 363,
      paddingVertical: 15,
      paddingHorizontal: 55,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      margin: 15,
      alignSelf: 'center',
    },
});
  