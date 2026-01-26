import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { colors, spacing } from '../../src/constants/theme';
import { usersApi } from '../../src/api/users';
import { useAuthStore } from '../../src/stores/auth';

const STEPS = [
  { title: 'Learn 5 words', desc: 'Each lesson introduces 5 Quranic words with meaning, context, and audio.' },
  { title: 'Practice & reinforce', desc: 'Fun activities help the words stick — matching, quizzes, and more.' },
  { title: 'Track your progress', desc: 'Watch your word count grow. See how much of the Quran you can now recognize.' },
];

export default function OnboardingHowItWorksScreen() {
  const [loading, setLoading] = useState(false);
  const setOnboardingCompleted = useAuthStore((s) => s.setOnboardingCompleted);

  const handleStart = async () => {
    setLoading(true);
    try {
      await usersApi.completeOnboarding();
      setOnboardingCompleted(true);
      router.replace('/(tabs)/learn');
    } catch {
      // If API fails, still navigate — we'll retry on next session
      setOnboardingCompleted(true);
      router.replace('/(tabs)/learn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" align="center" style={styles.heading}>
          How it works
        </Text>

        <View style={styles.steps}>
          {STEPS.map((step, i) => (
            <Card key={i} style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text variant="bodyBold" color={colors.textOnPrimary}>
                  {i + 1}
                </Text>
              </View>
              <View style={styles.stepText}>
                <Text variant="h3">{step.title}</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {step.desc}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Start Learning"
          onPress={handleStart}
          loading={loading}
          size="lg"
          style={styles.button}
        />
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
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  heading: {
    marginBottom: spacing.xl,
  },
  steps: {
    gap: spacing.md,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    gap: 2,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});
