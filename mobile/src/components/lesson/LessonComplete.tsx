import { View, Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { ShareCard } from '../share/ShareCard';
import { captureAndShare } from '../share/shareUtils';
import { MilestoneModal, getMilestone } from './MilestoneModal';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { CelebrationStat } from '../../types';

interface LessonCompleteProps {
  wordsInLesson: number;
  totalWordsLearned: number | null;
  celebrationStat: CelebrationStat;
  activityScore?: number;
  activityTotal?: number;
  onContinue: () => void;
}

export function LessonComplete({
  wordsInLesson,
  totalWordsLearned,
  celebrationStat,
  activityScore,
  activityTotal,
  onContinue,
}: LessonCompleteProps) {
  const [displayCount, setDisplayCount] = useState<number | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const shareCardRef = useRef<View>(null);

  useEffect(() => {
    if (totalWordsLearned === null) return;

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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (getMilestone(targetCount)) {
          setTimeout(() => setShowMilestone(true), 600);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [totalWordsLearned, wordsInLesson]);

  return (
    <View style={styles.container}>
      <MilestoneModal
        visible={showMilestone}
        wordCount={totalWordsLearned ?? 0}
        onDismiss={() => setShowMilestone(false)}
      />

      {/* Hidden share card for capture */}
      <View style={styles.shareCardWrapper} pointerEvents="none">
        <ShareCard
          ref={shareCardRef}
          variant="lesson"
          wordCount={totalWordsLearned ?? 0}
          ayahStat={celebrationStat.ayahCoverage}
        />
      </View>

      <View style={styles.content}>
        <Text variant="h1" color={colors.primary} align="center">
          MashaAllah! {wordsInLesson} new words
        </Text>

        <View style={styles.counterContainer}>
          <Text variant="h1" color={colors.text} style={styles.counter}>
            {displayCount ?? '—'}
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

        {activityTotal != null && activityTotal > 0 && (
          <Text variant="caption" color={colors.textSecondary} align="center">
            Activities: {activityScore ?? 0}/{activityTotal} correct
          </Text>
        )}
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [styles.shareButton, pressed && styles.buttonPressed]}
          onPress={() => captureAndShare(shareCardRef)}
        >
          <Ionicons name="share-outline" size={18} color={colors.textOnPrimary} />
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Share to Story
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.continueButton, pressed && styles.buttonPressed]}
          onPress={onContinue}
        >
          <Text variant="bodyBold" color={colors.textSecondary}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
  shareCardWrapper: {
    position: 'absolute',
    top: -9999,
    left: 0,
    zIndex: -1,
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
    fontSize: 72,
    lineHeight: 80,
  },
  statCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    width: '100%',
    gap: spacing.sm,
  },
  buttons: {
    gap: spacing.sm,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  continueButton: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
