import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { GreetingCard } from '@/components/greeting-card';
import { UpdateInProgress } from '@/components/update-in-progress';

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.safeAreaDark : styles.safeAreaLight]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.container}>
        <GreetingCard darkMode={isDarkMode} />
        <UpdateInProgress onThemeChange={setIsDarkMode} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaLight: {
    backgroundColor: '#EEF3FF',
  },
  safeAreaDark: {
    backgroundColor: '#090E19',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 18,
  },
});
