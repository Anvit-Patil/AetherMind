import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 0.85, 
  },
  entryContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textTimestamp: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  textSummary: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    backgroundColor: 'transparent', // Ensure scroll view has transparent background
  },
});

export default function JournalScreen() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const loadJournalEntries = async () => {
      const entries = JSON.parse(await AsyncStorage.getItem('journalEntries')) || [];
      setJournalEntries(entries);
    };

    loadJournalEntries();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/image/back 4.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={styles.scrollView}>
        {journalEntries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.textTimestamp}>{entry.timestamp}</Text>
            <Text style={styles.textSummary}>{entry.summary}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
