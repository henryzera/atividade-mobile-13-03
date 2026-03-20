import { StyleSheet, Text, View } from 'react-native';

type GreetingCardProps = {
  darkMode?: boolean;
};

function resolveGreetingByHour() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'bom dia';
  }

  if (hour >= 12 && hour < 18) {
    return 'boa tarde';
  }

  return 'boa noite';
}

export function GreetingCard({ darkMode = false }: GreetingCardProps) {
  const greeting = resolveGreetingByHour();

  return (
    <View style={[styles.card, darkMode ? styles.cardDark : styles.cardLight]}>
      <Text style={[styles.message, darkMode ? styles.messageDark : styles.messageLight]}>
        Olá, {greeting}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 120,
    paddingHorizontal: 22,
    width: '100%',
  },
  cardLight: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(153,170,220,0.45)',
    shadowColor: '#7B92CC',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  cardDark: {
    backgroundColor: 'rgba(24,33,54,0.82)',
    borderColor: 'rgba(130,156,233,0.35)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  message: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  messageLight: {
    color: '#1A2642',
  },
  messageDark: {
    color: '#F3F7FF',
  },
});
