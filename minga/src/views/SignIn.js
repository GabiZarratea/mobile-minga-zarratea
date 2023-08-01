import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { apiUrl, endpoints } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';


const SignIn = ({navigation}) => {

  const navigate = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
  
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
  
    let data = {
      email: email,
      password: password,
    };
  
    axios.post(apiUrl + endpoints.signin, data)
    .then(res => {
      if (res && res.data && res.data.response) {
        const { user, photo, token } = res.data.response;

        AsyncStorage.setItem('token', token)
          .then(() => AsyncStorage.setItem('user', JSON.stringify(user)))
          .then(() => AsyncStorage.setItem('photo', photo))
          .then(() => {
            alert('User signed in!');
            navigation.navigate('Home');
          })
          .catch(error => {
            console.log(error.message);
            alert('An error occurred while saving data. Please try again later.');
          });
          console.log(token)
      } else {
        alert('Invalid response from the server');
      }
    })
    .catch(error => {
      if (error.response && error.response.data) {
        const err = error.response.data.message || 'Unknown error';
        alert(`Authentication failed! : ${err}`);
      } else {
        console.log(error.message)
        alert('An error occurred. Please try again later.');
      }
    });
  }
  

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome <Text style={styles.destacar}>back</Text>!</Text>
        <Text style={styles.subtitle}>Discover manga and comics, track your progress, have fun, read manga.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry/>
        <TouchableOpacity onPress={handleFormSubmit}>
          <LinearGradient colors={['#F9A8D4', '#FA5C93']} top={[1, 0]} bottom={[0, 0]} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image source={require('../../assets/Google.png')} style={styles.iconGoogle} />
          <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
        </TouchableOpacity>
        <Text style={styles.textEnd}>You don't have an account yet? <Text style={styles.destacar}>Sign Up</Text></Text>
        <Text style={styles.textEnd}>Go back to <Text style={styles.destacar}>home page</Text></Text>
      </View>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center'
  },
  form: {
    width: '70%',
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 80
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(31,31,31,0.50)',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    height: 40,
  },
  button: {
    backgroundColor: '#F9A8D4',
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFCFC',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingRight: 2,
    paddingBottom: 0,
    paddingLeft: 2,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 2,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    letterSpacing: 0.6,
    fontSize: 12,
    color: '#FA7EE4'
  },
  checkboxText: {
    color: 'rgba(31,31,31,0.75)',
    fontSize: 12
  },
  checkbox: {
    padding: 5
  },
  buttonGoogle: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(31,31,31,0.50)',
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonTextGoogle: {
    color: 'rgba(31,31,31,0.50)',
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10
  },
  iconGoogle: {
    opacity: 0.75
  },
  textEnd: {
    opacity: 0.75,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  destacar: {
    color: '#FA5EB3'
  }
})