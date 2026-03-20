import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';

type UpdateInProgressProps = {
  darkMode?: boolean;
};

type NewsItem = {
  id: string;
  app: string;
  title: string;
  body: string;
  time: string;
};

const NEWS: NewsItem[] = [
  {
    id: '1',
    app: 'Release Center',
    title: 'Patch 1.0.1 preparado',
    body: 'Correção no fluxo de login em dispositivos com conexão instável.',
    time: 'Agora',
  },
  {
    id: '2',
    app: 'Infra Mobile',
    title: 'Atualização de desempenho',
    body: 'Cache de notícias otimizado para reduzir carregamento inicial.',
    time: '2 min',
  },
  {
    id: '3',
    app: 'QA Watch',
    title: 'Hotfix em validação',
    body: 'Equipe testando ajuste de notificação push para iOS 18.',
    time: '6 min',
  },
  {
    id: '4',
    app: 'Build Monitor',
    title: 'OTA pronto para envio',
    body: 'Pacote incremental pronto para distribuição sem atualização de loja.',
    time: '12 min',
  },
];

const lightPalette = {
  accent: '#3E6DF8',
  bg: '#EAF0FF',
  border: 'rgba(123,147,214,0.35)',
  glass: 'rgba(255,255,255,0.62)',
  glassBorder: 'rgba(255,255,255,0.85)',
  panel: 'rgba(255,255,255,0.54)',
  text: '#0E1A38',
  textMuted: '#4E5F88',
  textSoft: '#5F6F98',
};

const darkPalette = {
  accent: '#6E8CFF',
  bg: '#10182A',
  border: 'rgba(119,143,226,0.4)',
  glass: 'rgba(23,34,56,0.68)',
  glassBorder: 'rgba(128,153,229,0.42)',
  panel: 'rgba(17,27,46,0.72)',
  text: '#F2F6FF',
  textMuted: '#AFC0EC',
  textSoft: '#95A7D4',
};

export function UpdateInProgress({ darkMode = false }: UpdateInProgressProps) {
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [otaMessage, setOtaMessage] = useState('OTA pronto para fixes rápidos.');
  const [isFetchingNews, setIsFetchingNews] = useState(true);

  const palette = darkMode ? darkPalette : lightPalette;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFetchingNews(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleMockNewsSync = () => {
    if (isFetchingNews) {
      return;
    }

    setIsFetchingNews(true);
    setTimeout(() => {
      setIsFetchingNews(false);
    }, 2200);
  };

  const handleOtaFix = async () => {
    if (isCheckingUpdate) {
      return;
    }

    if (__DEV__) {
      setOtaMessage('OTA disponível no build de produção (preview/release).');
      return;
    }

    setIsCheckingUpdate(true);

    try {
      setOtaMessage('Verificando novas correções OTA...');
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) {
        setOtaMessage('Nenhum fix OTA novo encontrado.');
        return;
      }

      setOtaMessage('Fix OTA encontrado. Baixando pacote...');
      await Updates.fetchUpdateAsync();
      setOtaMessage('Fix aplicado. Reiniciando app...');
      await Updates.reloadAsync();
    } catch {
      setOtaMessage('Não foi possível validar OTA agora. Tente novamente.');
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <Text style={[styles.title, { color: palette.text }]}>Atualização em Andamento</Text>

      <View style={[styles.otaPanel, { backgroundColor: palette.panel, borderColor: palette.border }]}>
        <Text style={[styles.otaTitle, { color: palette.textMuted }]}>OTA para fixes rápidos</Text>
        <Pressable
          onPress={handleOtaFix}
          style={({ pressed }) => [
            styles.otaButton,
            { backgroundColor: palette.accent, opacity: pressed ? 0.88 : 1 },
          ]}>
          <Text style={styles.otaButtonText}>
            {isCheckingUpdate ? 'Verificando OTA...' : 'Buscar correções OTA'}
          </Text>
        </Pressable>
        <Text style={[styles.otaMessage, { color: palette.text }]}>{otaMessage}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.newsContent}
        onScrollBeginDrag={handleMockNewsSync}
        showsVerticalScrollIndicator={false}
        style={styles.newsScroll}>
        {NEWS.map((item) => (
          <View
            key={item.id}
            style={[
              styles.newsCard,
              {
                backgroundColor: palette.glass,
                borderColor: palette.glassBorder,
              },
            ]}>
            <View style={styles.newsTopRow}>
              <Text style={[styles.newsApp, { color: palette.textMuted }]}>{item.app}</Text>
              <Text style={[styles.newsTime, { color: palette.textMuted }]}>{item.time}</Text>
            </View>
            <Text style={[styles.newsTitle, { color: palette.text }]}>{item.title}</Text>
            <Text style={[styles.newsBody, { color: palette.textSoft }]}>{item.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.loadingRow}>
        <ActivityIndicator color={palette.accent} size="small" />
        <Text style={[styles.loadingLabel, { color: palette.textMuted }]}>
          {isFetchingNews ? 'Recebendo novas atualizações...' : 'Atualizado. Aguardando novas notícias...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    flex: 1,
    gap: 14,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  otaPanel: {
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  otaTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  otaButton: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 14,
  },
  otaButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  otaMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  newsScroll: {
    borderRadius: 18,
    flex: 1,
  },
  newsContent: {
    gap: 10,
    paddingBottom: 8,
    paddingTop: 4,
  },
  newsCard: {
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 92,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  newsTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  newsApp: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  newsTime: {
    fontSize: 12,
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  newsBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  loadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 28,
  },
  loadingLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
});
