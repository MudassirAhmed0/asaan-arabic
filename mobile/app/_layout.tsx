import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../src/stores/auth';
import { setupNotificationListeners } from '../src/services/notifications';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 500 });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 min — data is fresh
      gcTime: 1000 * 60 * 60 * 24, // 24h — keep in cache for persistence
    },
  },
});

const asyncPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'asaan-query-cache',
});

export default function RootLayout() {
  const loadSession = useAuthStore((s) => s.loadSession);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    setupNotificationListeners();
    async function init() {
      await loadSession();
      await SplashScreen.hideAsync();
    }
    init();
  }, [loadSession]);

  if (isLoading) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncPersister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="review"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="word/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="paywall"
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </PersistQueryClientProvider>
  );
}
