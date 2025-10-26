import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import SplashScreen from '../Utils/SplashScreen'; // Assuming you put the component in the same file or a path like './SplashScreen'
import { ThemeProvider } from '../Utils/ThemeProvider';
// 4. App Component
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Once showSplash is false, return the main application UI
  return (
    <ThemeProvider>
      {showSplash ? (
        <SplashScreen setShowSplash={() => setShowSplash(true)} />
      ) : (
        <View style={styles.appContainer}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Text style={styles.mainContentText}>Welcome to Fuel Master!</Text>
          <Text>Your Main Application Content Goes Here.</Text>
        </View>
      )}
    </ThemeProvider>
  );
}

// 5. Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Remove unused styles like themeToggle if they aren't part of the main content
});
