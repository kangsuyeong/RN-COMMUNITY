import queryClient from '@/api/queryClient';
import useAuth from '@/hooks/queries/useAuth';
import { resources } from '@/i18n/resources';
import { getSecureStore } from '@/utils/secureStore';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { getLocales } from 'expo-localization';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export const unstable_settings = {
  anchor: '(tabs)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

const deivceLanguage = getLocales()[0].languageCode ?? 'ko';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deivceLanguage,
  fallbackLng: 'ko-Kr',
});

function RootNavigator() {
  const { auth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage =
        (await getSecureStore('language')) ?? deivceLanguage;
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  useEffect(() => {
    if (auth.id) {
      Toast.show({
        type: 'success',
        text1: t('Welcome Message', { nickname: auth.nickname ?? '회원' }),
        position: 'bottom',
      });
    }
  }, [auth.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Modal' }}
      />
    </Stack>
  );
}
