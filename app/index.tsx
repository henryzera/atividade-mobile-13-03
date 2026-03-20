import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GreetingCard } from '@/components/greeting-card';
import { UpdateInProgress } from '@/components/update-in-progress';

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showGreetingScreen, setShowGreetingScreen] = useState(false);
  const toggleContent = useCallback(() => {
    setShowGreetingScreen((previousState) => !previousState);
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      toggleContent();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [toggleContent]);

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.safeAreaDark : styles.safeAreaLight]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={toggleContent}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}>
            <Ionicons
              color={isDarkMode ? '#F3F7FF' : '#1A2642'}
              name="chevron-back"
              size={18}
              style={styles.backIcon}
            />
            <Text style={[styles.backButtonText, isDarkMode ? styles.textDark : styles.textLight]}>Voltar</Text>
          </Pressable>

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, isDarkMode ? styles.textDark : styles.textLight]}>
              {isDarkMode ? 'Dark' : 'Light'}
            </Text>
            <Switch
              onValueChange={setIsDarkMode}
              thumbColor={isDarkMode ? '#DCE6FF' : '#FFFFFF'}
              trackColor={{ false: '#B8C7F2', true: '#4A65C8' }}
              value={isDarkMode}
            />
          </View>
        </View>

        {showGreetingScreen ? (
          <View style={styles.greetingScreen}>
            <GreetingCard darkMode={isDarkMode} />
          </View>
        ) : (
          <UpdateInProgress darkMode={isDarkMode} />
        )}
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
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  backIcon: {
    marginRight: 2,
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  greetingScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textLight: {
    color: '#1A2642',
  },
  textDark: {
    color: '#F3F7FF',
  },
});
