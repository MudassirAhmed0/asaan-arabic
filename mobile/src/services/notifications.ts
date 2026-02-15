import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { router } from 'expo-router';
import { notificationsApi } from '../api/notifications';

// Show notifications when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let currentToken: string | null = null;
let responseListenerSetup = false;

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  // Android needs a notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  const tokenData = await Notifications.getDevicePushTokenAsync();
  const token = tokenData.data;
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';

  try {
    await notificationsApi.register(token, platform);
    currentToken = token;
  } catch {
    // Silent fail — registration can retry on next app open
  }

  return token;
}

export async function unregisterPushNotifications(): Promise<void> {
  if (currentToken) {
    try {
      await notificationsApi.unregister(currentToken);
    } catch {
      // Silent fail
    }
    currentToken = null;
  }
}

export function getCurrentToken(): string | null {
  return currentToken;
}

const SCREEN_ROUTES: Record<string, string> = {
  learn: '/(tabs)/learn',
  words: '/(tabs)/words',
  challenge: '/(tabs)/challenge',
  practice: '/(tabs)/challenge',
  review: '/review',
  profile: '/(tabs)/profile',
};

function handleNotificationNavigation(data: Record<string, unknown>) {
  const screen = data?.screen as string | undefined;
  if (screen && SCREEN_ROUTES[screen]) {
    setTimeout(() => {
      router.push(SCREEN_ROUTES[screen] as any);
    }, 500);
  }
}

export function setupNotificationListeners() {
  if (responseListenerSetup) return;
  responseListenerSetup = true;

  // User tapped a notification
  Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;
    handleNotificationNavigation(data);
  });

  // Check if app was opened from a notification (cold start)
  Notifications.getLastNotificationResponseAsync().then((response) => {
    if (response) {
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data);
    }
  });
}
