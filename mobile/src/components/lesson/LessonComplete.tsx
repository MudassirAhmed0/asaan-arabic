import { View, Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { CelebrationStat } from '../../types';

interface LessonCompleteProps {
  wordsInLesson: number;
  totalWordsLearned: number;
  celebrationStat: CelebrationStat;
  onContinue: () => void;
}

export function LessonComplete({
  wordsInLesson,
  totalWordsLearned,
  celebrationStat,
  onContinue,
}: LessonCompleteProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const animationDone = useRef(false);

  useEffect(() => {
    if (animationDone.current) return;

    const targetCount = totalWordsLearned;
    const startCount = Math.max(0, targetCount - wordsInLesson);
    let current = startCount;

    setDisplayCount(startCount);

    const interval = setInterval(() => {
      current++;
      setDisplayCount(current);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (current >= targetCount) {
        clearInterval(interval);
        animationDone.current = true;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [totalWordsLearned, wordsInLesson]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="h2" color={colors.primary} align="center">
          {wordsInLesson} New Words Unlocked!
        </Text>

        <View style={styles.counterContainer}>
          <Text variant="h1" color={colors.text} style={styles.counter}>
            {displayCount}
          </Text>
          <Text variant="body" color={colors.textSecondary}>
            Total Vocabulary
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text variant="bodyBold" align="center">
            {celebrationStat.ayahCoverage}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.continueButtonPressed,
        ]}
        onPress={onContinue}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  counterContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  counter: {
    fontSize: 56,
    lineHeight: 64,
  },
  statCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    width: '100%',
    gap: spacing.sm,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  continueButtonPressed: {
    opacity: 0.8,
  },
});
