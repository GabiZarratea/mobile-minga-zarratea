import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { apiUrl, endpoints } from '../../utils/api';
import NavBar from '../components/NavBar';

const Register = ({navigation}) => {

  const navigate = useNavigation()

  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit(event){
    event.preventDefault()
    
    if (!email || !photo || !password) {
      alert('Please enter email, photo and password.');
      return;
    }
    
    let data = {
      email: email,
      photo: photo,
      password: password,
    };
    
      axios.post(apiUrl + endpoints.register, data)
      .then(res => {
        alert('New user creation successful')
        navigation.navigate('SignIn')
      })
      .catch(function(error) {
      console.log(error.message)
      alert(`${err} This email is already registered`)
    })
  }

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Discover manga and comics, track your progress, have fun, read manga.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
        <Text style={styles.label}>Photo</Text>
        <TextInput style={styles.input} value={photo} onChangeText={setPhoto} placeholder="Url"/>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry/>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2, marginBottom: 5 }}>
          <Image source={require('../../assets/checkbox.png')} style={styles.checkbox} />
          <Text style={styles.checkboxText}>Send notification to my email</Text>
        </View>
        <TouchableOpacity onPress={handleFormSubmit}>
          <LinearGradient colors={['#F9A8D4', '#FA5C93']} top={[1, 0]} bottom={[0, 0]} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image source={require('../../assets/Google.png')} style={styles.iconGoogle} />
          <Text style={styles.buttonTextGoogle}>Sign Up with Google</Text>
        </TouchableOpacity>
        <Text style={styles.textEnd}>Already have an account?<Text style={styles.destacar}> Log in</Text></Text>
        <Text style={styles.textEnd}>Go back to <Text style={styles.destacar}>home page</Text></Text>
      </View>
    </View>
  )
}

export default Register

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
    marginBottom: 20
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
    color: '#FA62DF'
  }
})