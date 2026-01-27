import { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { colors, spacing, borderRadius } from '../../src/constants/theme';
import { authApi } from '../../src/api/auth';
import { AxiosError } from 'axios';

export default function PhoneLoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fullPhone = `+92${phone}`;

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authApi.sendOtp(fullPhone);
      router.push({
        pathname: '/(auth)/otp-verify',
        params: { phone: fullPhone },
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        if (typeof message === 'string') {
          setError(message);
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text variant="h1">Enter your number</Text>
          <Text variant="body" color={colors.textSecondary} style={styles.desc}>
            We'll send you a quick code
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.countryCode}>
            <Text variant="bodyBold">+92</Text>
          </View>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(t) => {
              setPhone(t.replace(/[^0-9]/g, ''));
              setError('');
            }}
            placeholder="3XX XXXXXXX"
            placeholderTextColor={colors.textTertiary}
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
          />
        </View>

        {error ? (
          <Text variant="caption" color={colors.error}>
            {error}
          </Text>
        ) : null}

        <Button
          title="Send Code"
          onPress={handleSendOtp}
          loading={loading}
          disabled={phone.length < 10}
          size="lg"
          style={styles.button}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  countryCode: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    marginTop: spacing.md,
  },
});
