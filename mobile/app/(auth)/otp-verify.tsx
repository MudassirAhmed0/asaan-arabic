import { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { colors, spacing, borderRadius } from '../../src/constants/theme';
import { authApi } from '../../src/api/auth';
import { useAuthStore } from '../../src/stores/auth';
import { AxiosError } from 'axios';

export default function OtpVerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  const setTokens = useAuthStore((s) => s.setTokens);
  const fetchProfile = useAuthStore((s) => s.fetchProfile);

  const handleVerify = async () => {
    if (code.length !== 4 || !phone) {
      setError('Enter the 4-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authApi.verifyOtp(phone, code);
      await setTokens(response.accessToken, response.refreshToken);

      // Fetch profile to determine redirect
      try {
        await fetchProfile();
        const onboardingDone = useAuthStore.getState().onboardingCompleted;

        if (response.isNewUser || !onboardingDone) {
          router.replace('/(onboarding)/intro');
        } else {
          router.replace('/(tabs)/learn');
        }
      } catch {
        // Profile fetch failed but auth succeeded — go to onboarding
        router.replace('/(onboarding)/intro');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        if (typeof message === 'string') {
          setError(message);
        } else {
          setError('Invalid code. Please try again.');
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone) return;
    setResending(true);
    setError('');

    try {
      await authApi.sendOtp(phone);
      setCode('');
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        setError(typeof message === 'string' ? message : 'Failed to resend code.');
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text variant="h1">Check your messages</Text>
          <Text variant="body" color={colors.textSecondary} style={styles.desc}>
            Enter the code we just sent to {phone}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(t) => {
            setCode(t.replace(/[^0-9]/g, ''));
            setError('');
          }}
          placeholder="0000"
          placeholderTextColor={colors.textTertiary}
          keyboardType="number-pad"
          maxLength={4}
          textAlign="center"
          autoFocus
        />

        {error ? (
          <Text variant="caption" color={colors.error} align="center">
            {error}
          </Text>
        ) : null}

        <Button
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          disabled={code.length !== 4}
          size="lg"
          style={styles.button}
        />

        <Button
          title={resending ? 'Sending...' : 'Resend Code'}
          onPress={handleResend}
          variant="ghost"
          disabled={resending}
          style={styles.resend}
        />
      </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  desc: {
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 12,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
  resend: {
    marginTop: spacing.md,
  },
});
