import React, { useState } from 'react'; // Import useState
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you have installed @react-native-async-storage/async-storage


const styles = StyleSheet.create({
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
      // Replace 'http://localhost:3000/api/login' with your actual endpoint
      const response = await fetch('http://10.0.2.2:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      navigation.replace('Home');
      navigation.navigate('Home')

      if (!response.ok) {
        // Handle errors returned from the server, such as invalid credentials
        Alert.alert('Error', data.msg || 'An error occurred');
        return;
      }

      // Store the token
      await AsyncStorage.setItem('userToken', data.token);

      // Navigate to another screen or reset the navigation stack
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <View style={styles.container}>
    <Text>Login</Text>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Update email state
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Update password state
      />
    </View>
    <Button title="Login" onPress={handleLogin} />
    <Button
      title="Go to Register"
      onPress={() => navigation.navigate('Register')}
    />
  </View>
  );
}
