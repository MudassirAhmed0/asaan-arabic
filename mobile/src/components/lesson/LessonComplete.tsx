import { View, Pressable, StyleSheet, Linking, Platform } from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
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
  const shareCardRef = useRef<View>(null);

  const captureCard = useCallback(async () => {
    return captureRef(shareCardRef, {
      format: 'png',
      quality: 1,
    });
  }, []);

  const handleShareInstagram = useCallback(async () => {
    try {
      const uri = await captureCard();
      // Try opening Instagram Stories directly
      const instagramUrl = Platform.select({
        ios: `instagram-stories://share?source_application=quran-words&backgroundImage=${encodeURIComponent(uri)}`,
        android: `instagram-stories://share`,
      });
      const canOpen = instagramUrl ? await Linking.canOpenURL(instagramUrl) : false;
      if (canOpen && instagramUrl) {
        await Linking.openURL(instagramUrl);
      } else {
        // Fallback to general share sheet
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      }
    } catch {
      // Fallback to general share sheet
      try {
        const uri = await captureCard();
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      } catch {
        // User cancelled
      }
    }
  }, [captureCard]);


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
      }
    }, 200);

    return () => clearInterval(interval);
  }, [totalWordsLearned, wordsInLesson]);

  return (
    <View style={styles.container}>
      {/* Hidden share card — rendered behind content for capture */}
      <View style={styles.shareCardWrapper} pointerEvents="none">
        <View ref={shareCardRef} style={styles.shareCard} collapsable={false}>
          <View style={styles.shareCardTop}>
            <Text style={styles.shareCardStar}>✦</Text>
            <Text style={styles.shareCardNumber}>{totalWordsLearned ?? '—'}</Text>
            <Text style={styles.shareCardLabel}>
              Qur'anic words learned
            </Text>
          </View>
          <View style={styles.shareCardDivider} />
          <Text style={styles.shareCardStat}>
            {celebrationStat.ayahCoverage}
          </Text>
          <Text style={styles.shareCardBranding}>
            Learn Qur'anic Arabic
          </Text>
        </View>
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
          style={({ pressed }) => [
            styles.shareButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleShareInstagram}
        >
          <Ionicons name="share-outline" size={18} color={colors.textOnPrimary} />
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Share to Story
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.buttonPressed,
          ]}
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

  // ── Hidden share card (behind content, for capture) ──
  shareCardWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shareCard: {
    width: 360,
    height: 640,
    backgroundColor: colors.primaryDark,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareCardTop: {
    alignItems: 'center',
    gap: 6,
  },
  shareCardStar: {
    fontSize: 28,
    color: colors.accent,
    marginBottom: 12,
  },
  shareCardNumber: {
    fontSize: 96,
    fontWeight: '800',
    color: colors.accent,
    lineHeight: 104,
  },
  shareCardLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  shareCardDivider: {
    width: 48,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: spacing.xl,
  },
  shareCardStat: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    lineHeight: 24,
  },
  shareCardBranding: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: spacing.xl,
  },

  // ── Main content ──
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    backgroundColor: colors.background,
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
