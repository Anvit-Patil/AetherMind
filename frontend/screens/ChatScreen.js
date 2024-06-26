import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert, BackHandler, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FF6F61', // coral
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'rgba(144, 238, 144, 0.85)', // Semi-transparent message background
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  reply: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'rgba(64, 224, 208, 0.85)', // Semi-transparent reply background
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.85, 
  },
});

export default function ChatScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim().length === 0) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token not found');

      const response = await fetch('http://10.0.2.2:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.response || 'Server error');

      // Use a functional update to ensure we have the latest chat state
      setChat(currentChat => [...currentChat, { role: 'user', content: message.trim() }, { role: 'assistant', content: data.response }]);
      setMessage('');
    } catch (error) {
      console.error('Sending message failed:', error);
    }
  };

  const handleBackPress = useCallback(async () => {
    // Confirm with the user before sending the final message
    const confirmSaveSummary = () => {
      Alert.alert(
        "Leave Chat",
        "Do you want to save a summary of this conversation?",
        [
          { text: "Cancel", style: "cancel", onPress: () => navigation.goBack() },
          { text: "Yes", onPress: sendFinalMessage }
        ]
      );
    };

    const sendFinalMessage = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('userToken')}`,
          },
          body: JSON.stringify({ message: 'make a summary of the conversation in less than 10 words' }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.response || 'Server error');

        const summary = data.response;
        const timestamp = new Date().toISOString();

        // Retrieve existing journal entries and add the new one
        const existingEntries = JSON.parse(await AsyncStorage.getItem('journalEntries')) || [];
        const updatedEntries = [...existingEntries, { timestamp, summary }];

        // Save updated journal entries to storage
        await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

        // Navigate back to the JournalScreen after saving
        navigation.navigate('Journal');

      } catch (error) {
        Alert.alert('Error', 'Could not save the conversation summary.');
        console.error('Final message failed:', error);
      }
    };

    // Call the confirmation dialog
    confirmSaveSummary();

    return true; // Prevent the default back behavior
  }, [navigation]);

  useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandlerSubscription.remove();
  }, [handleBackPress]);

  return (
    <ImageBackground
      source={require('../assets/image/back 4.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <FlatList
          data={chat}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={item.role === 'user' ? styles.message : styles.reply}>{item.content}</Text>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
