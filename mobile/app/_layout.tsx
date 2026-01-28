import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../src/stores/auth';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout() {
  const loadSession = useAuthStore((s) => s.loadSession);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    async function init() {
      await loadSession();
      await SplashScreen.hideAsync();
    }
    init();
  }, [loadSession]);

  if (isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
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
      </Stack>
    </QueryClientProvider>
  );
}
