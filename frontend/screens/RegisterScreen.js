import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  // Your style definitions remain unchanged
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%', 
    marginBottom: 15, 
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
    borderRadius: 5, 
    fontSize: 16, 
  },
});

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }

    try {
      // Replace 'http://localhost:3000/user/register' with your actual endpoint
      const response = await fetch('http://10.0.2.2:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors returned from the server
        Alert.alert('Registration Error', data.msg || 'An error occurred during registration.');
        return;
      }

      // On successful registration, save the token and navigate to the chat screen
      await AsyncStorage.setItem('userToken', data.token);
      navigation.replace('Home');
      navigation.navigate('Home'); // Make sure 'Chat' is the name of your chat screen route

    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail} // Update the email state
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update the password state
        />
      </View>

      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
}
