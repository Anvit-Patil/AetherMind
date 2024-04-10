import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <ScrollView>
      {journalEntries.map((entry, index) => (
        <View key={index} style={{ margin: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>{entry.timestamp}</Text>
          <Text>{entry.summary}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
