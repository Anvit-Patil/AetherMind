import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    margin: 10,
  },
});

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Chat"
          onPress={() => navigation.navigate('Chat')} // Make sure 'Chat' is the name of your chat screen route
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Journals"
          onPress={() => navigation.navigate('Journal')} // Make sure 'Journal' is the name of your journal screen route
        />
      </View>
    </View>
  );
}
