import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../../../src/components/ui/Text';
import { ActivityQuickFire } from '../../../src/components/lesson/ActivityQuickFire';
import { colors, spacing, borderRadius } from '../../../src/constants/theme';
import { useReviewWords, useCompleteReview } from '../../../src/hooks/useWords';
import { useProgressStore } from '../../../src/stores/progress';

type Phase = 'idle' | 'reviewing' | 'done';

export default function ChallengeScreen() {
  const { data, isLoading, refetch } = useReviewWords();
  const completeReviewMutation = useCompleteReview();
  const [phase, setPhase] = useState<Phase>('idle');
  const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
  const setProgress = useProgressStore((s) => s.setProgress);

  const handleStart = useCallback(() => {
    setPhase('reviewing');
  }, []);

  const handleComplete = useCallback(
    (score: number, total: number) => {
      setLastScore({ score, total });
      setPhase('done');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      completeReviewMutation
        .mutateAsync()
        .then((result) => {
          setProgress({
            currentStreak: result.currentStreak,
            longestStreak: result.longestStreak,
          });
        })
        .catch(() => {
          // Streak will sync on next app open
        });
    },
    [completeReviewMutation, setProgress],
  );

  const handlePlayAgain = useCallback(() => {
    setPhase('idle');
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Daily Review</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  // Not enough words learned yet
  if (!data || data.rounds.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Daily Review</Text>
          <Text variant="body" color={colors.textSecondary}>
            Strengthen your vocabulary
          </Text>
        </View>
        <View style={styles.centered}>
          <Text variant="h3" align="center">
            Complete your first lesson
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.emptySubtext}
          >
            Once you've learned some words, you'll be able to review them here
            every day
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Reviewing — show the quiz
  if (phase === 'reviewing') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Daily Review</Text>
        </View>
        <ActivityQuickFire rounds={data.rounds} onComplete={handleComplete} />
      </SafeAreaView>
    );
  }

  // Done — show completion
  if (phase === 'done') {
    const percent = Math.round((lastScore.score / lastScore.total) * 100);
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Daily Review</Text>
        </View>
        <View style={styles.centered}>
          <Text variant="h2" color={colors.primary} align="center">
            {percent === 100
              ? 'Perfect recall!'
              : percent >= 60
                ? 'Solid review!'
                : 'Good effort — keep learning!'}
          </Text>
          <Text variant="body" color={colors.textSecondary} align="center">
            {lastScore.score}/{lastScore.total} correct
          </Text>
          <Text
            variant="caption"
            color={colors.textSecondary}
            align="center"
            style={styles.streakNote}
          >
            Your streak has been updated
          </Text>
        </View>
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonOutline,
              pressed && styles.buttonPressed,
            ]}
            onPress={handlePlayAgain}
          >
            <Text variant="bodyBold" color={colors.primary}>
              Review Again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Idle — show start card
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h1">Daily Review</Text>
        <Text variant="body" color={colors.textSecondary}>
          Strengthen your vocabulary
        </Text>
      </View>
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text variant="h2" align="center">
            {data.rounds.length} words to review
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.cardSubtext}
          >
            Quick recall practice from your {data.totalLearned} learned words
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleStart}
        >
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Start Review
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  emptySubtext: {
    maxWidth: 280,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardSubtext: {
    marginTop: spacing.xs,
  },
  streakNote: {
    marginTop: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
