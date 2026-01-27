import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { colors, spacing } from '../../src/constants/theme';
import { authApi } from '../../src/api/auth';
import { useAuthStore } from '../../src/stores/auth';

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const { setTokens, fetchProfile, onboardingCompleted } = useAuthStore();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [devLoading, setDevLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params.id_token;
      handleGoogleAuth(idToken);
    } else if (response?.type === 'error') {
      setGoogleLoading(false);
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    } else if (response?.type === 'dismiss') {
      setGoogleLoading(false);
    }
  }, [response]);

  const handleGoogleAuth = async (idToken: string) => {
    try {
      setGoogleLoading(true);
      const result = await authApi.googleAuth(idToken);
      await setTokens(result.accessToken, result.refreshToken);
      await fetchProfile();

      if (result.isNewUser || !onboardingCompleted) {
        router.replace('/(onboarding)/intro');
      } else {
        router.replace('/(tabs)/learn');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Google sign-in failed. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDevLogin = async () => {
    try {
      setDevLoading(true);
      const result = await authApi.devLogin();
      await setTokens(result.accessToken, result.refreshToken);
      await fetchProfile();

      if (result.isNewUser || !onboardingCompleted) {
        router.replace('/(onboarding)/intro');
      } else {
        router.replace('/(tabs)/learn');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Dev login failed.';
      Alert.alert('Error', message);
    } finally {
      setDevLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text variant="arabicLarge" align="center">
            بِسْمِ اللّٰهِ
          </Text>
          <Text variant="h1" align="center" style={styles.title}>
            Finally understand{'\n'}what you hear in the Quran
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            5 words a day. 5 minutes a lesson.{'\n'}
            Start recognizing words on every page.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Continue with Phone"
            onPress={() => router.push('/(auth)/phone-login')}
            size="lg"
            style={styles.button}
          />
          <Button
            title="Continue with Google"
            onPress={() => {
              setGoogleLoading(true);
              promptAsync();
            }}
            variant="outline"
            size="lg"
            style={styles.button}
            loading={googleLoading}
            disabled={!request}
          />
          {__DEV__ && (
            <Button
              title="Dev Login (skip auth)"
              onPress={handleDevLogin}
              variant="outline"
              size="lg"
              style={styles.button}
              loading={devLoading}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});
