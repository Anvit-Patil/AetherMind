import React, { useState } from 'react'; // Import useState
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: -0.1, height: 1 },
    textShadowRadius: 10
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Translucent background
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FF6F61', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
    borderRadius: 5, 
    fontSize: 16, 
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.85, 
  }, 
});

export default function LoginScreen({ navigation }) {
  // State for form inputs and handling login (work in progress)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      // endpoint
      const response = await fetch('http://10.0.2.2:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token and navigate only if the response is okay
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('Home');
      } else {
        // Handle errors returned from the server, such as invalid credentials
        Alert.alert('Error', data.msg || 'An error occurred');
      }
      // Navigate to another screen or reset the navigation stack
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <ImageBackground
      source={require('../assets/image/back 4.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Go to Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
