import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useCallback, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Text } from '../src/components/ui/Text';
import { Card } from '../src/components/ui/Card';
import { ActivityQuickFire } from '../src/components/lesson/ActivityQuickFire';
import { colors, spacing, borderRadius } from '../src/constants/theme';
import { useCurrentReview, useSubmitReview } from '../src/hooks/useReviews';
import { useProgressStore } from '../src/stores/progress';

type Phase = 'loading' | 'quiz' | 'done';

export default function WeeklyReviewScreen() {
  const router = useRouter();
  const { data, isLoading } = useCurrentReview();
  const submitReview = useSubmitReview();
  const setProgress = useProgressStore((s) => s.setProgress);

  const [phase, setPhase] = useState<Phase>('loading');
  const [score, setScore] = useState({ score: 0, total: 0 });
  const [wrongWords, setWrongWords] = useState<
    { arabic: string; meaning: string }[]
  >([]);
  const [streakUpdated, setStreakUpdated] = useState(false);

  const shareCardRef = useRef<View>(null);

  // Once data loads, move to quiz phase
  if (phase === 'loading' && !isLoading && data) {
    if (!data.available || data.completed || data.rounds.length === 0) {
      // Shouldn't be here — go back
      router.back();
      return null;
    }
    setPhase('quiz');
  }

  const handleClose = useCallback(() => {
    Alert.alert(
      'End review?',
      "Your progress won't be saved.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ],
    );
  }, [router]);

  const handleComplete = useCallback(
    (
      quizScore: number,
      total: number,
      results?: { wordId: string; correct: boolean }[],
    ) => {
      setScore({ score: quizScore, total });
      setPhase('done');
      setStreakUpdated(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Find wrong words for display
      if (results && data?.rounds) {
        const wrong = results
          .filter((r) => !r.correct)
          .map((r) => {
            const round = data.rounds.find((rd) => rd.wordId === r.wordId);
            return round
              ? { arabic: round.arabic, meaning: round.meaning }
              : null;
          })
          .filter(Boolean) as { arabic: string; meaning: string }[];
        setWrongWords(wrong);
      }

      // Submit to backend
      if (results && results.length > 0) {
        submitReview
          .mutateAsync(results)
          .then((result) => {
            setStreakUpdated(true);
            setProgress({
              currentStreak: result.currentStreak,
              longestStreak: result.longestStreak,
            });
          })
          .catch(() => {});
      }
    },
    [data, submitReview, setProgress],
  );

  const handleShare = useCallback(async () => {
    try {
      const uri = await captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
      });
      const instagramUrl = Platform.select({
        ios: `instagram-stories://share?source_application=quran-words&backgroundImage=${encodeURIComponent(uri)}`,
        android: `instagram-stories://share?source_application=quran-words&backgroundImage=${encodeURIComponent(uri)}`,
      });
      const canOpen = instagramUrl
        ? await Linking.canOpenURL(instagramUrl)
        : false;
      if (canOpen && instagramUrl) {
        await Linking.openURL(instagramUrl);
      } else {
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      }
    } catch {
      try {
        const uri = await captureRef(shareCardRef, {
          format: 'png',
          quality: 1,
        });
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      } catch {
        // User cancelled
      }
    }
  }, []);

  // Loading
  if (phase === 'loading' || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  // Quiz
  if (phase === 'quiz' && data?.rounds) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ActivityQuickFire
          rounds={data.rounds}
          onComplete={handleComplete}
          onClose={handleClose}
          title={`Week ${data.weekNumber} check-in`}
        />
      </SafeAreaView>
    );
  }

  // Done — results
  if (phase === 'done') {
    const percent = Math.round((score.score / score.total) * 100);
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Hidden share card */}
        <View style={styles.shareCardWrapper} pointerEvents="none">
          <View
            ref={shareCardRef}
            style={styles.shareCard}
            collapsable={false}
          >
            <View style={styles.shareCardTop}>
              <Text style={styles.shareCardStar}>✦</Text>
              <Text style={styles.shareCardNumber}>
                {score.score}/{score.total}
              </Text>
              <Text style={styles.shareCardLabel}>Weekly Review</Text>
            </View>
            <View style={styles.shareCardDivider} />
            <Text style={styles.shareCardStat}>
              Week {data?.weekNumber} — {percent}% recall
            </Text>
            <Text style={styles.shareCardBranding}>
              Learn Qur'anic Arabic
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.doneContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.doneHeader}>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Ionicons name="close" size={24} color={colors.textTertiary} />
            </Pressable>
          </View>

          <View style={styles.scoreSection}>
            <Text variant="h2" color={colors.primary} align="center">
              {percent === 100
                ? 'Perfect week!'
                : percent >= 80
                  ? 'Strong recall!'
                  : percent >= 60
                    ? 'Good progress!'
                    : 'Keep reviewing!'}
            </Text>
            <Text style={styles.bigScore}>
              {score.score}/{score.total}
            </Text>
            <Text variant="body" color={colors.textSecondary} align="center">
              correct this week
            </Text>
            {streakUpdated && (
              <Text
                variant="caption"
                color={colors.textTertiary}
                align="center"
                style={styles.streakNote}
              >
                Streak updated
              </Text>
            )}
          </View>

          {wrongWords.length > 0 && (
            <Card style={styles.wrongSection}>
              <Text variant="bodyBold" color={colors.textSecondary}>
                Words to revisit
              </Text>
              {wrongWords.map((w, i) => (
                <View key={i} style={styles.wrongWord}>
                  <Text style={styles.wrongArabic}>{w.arabic}</Text>
                  <Text variant="body" color={colors.textSecondary}>
                    {w.meaning}
                  </Text>
                </View>
              ))}
              <Text variant="small" color={colors.textTertiary}>
                These will show up more often in practice
              </Text>
            </Card>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.shareBtn,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleShare}
          >
            <Ionicons
              name="share-outline"
              size={18}
              color={colors.textOnPrimary}
            />
            <Text variant="bodyBold" color={colors.textOnPrimary}>
              Share to Story
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonOutline,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text variant="bodyBold" color={colors.primary}>
              Done
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  doneHeader: {
    alignItems: 'flex-end',
    paddingVertical: spacing.sm,
  },
  scoreSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  bigScore: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 56,
  },
  streakNote: {
    marginTop: spacing.xs,
  },
  wrongSection: {
    padding: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  wrongWord: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  wrongArabic: {
    fontSize: 22,
    fontFamily: 'Amiri',
    color: colors.primary,
    lineHeight: 34,
    minWidth: 56,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    gap: spacing.sm,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
  },

  // Share card (hidden, for capture)
  shareCardWrapper: {
    position: 'absolute',
    top: -9999,
    left: 0,
    right: 0,
    zIndex: -1,
    alignItems: 'center',
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
    fontSize: 72,
    fontWeight: '800',
    color: colors.accent,
    lineHeight: 80,
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
});
