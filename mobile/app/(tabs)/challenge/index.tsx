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
import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { ActivityQuickFire } from '../../../src/components/lesson/ActivityQuickFire';
import { colors, spacing, borderRadius } from '../../../src/constants/theme';
import { usePractice, useSubmitQuizResults } from '../../../src/hooks/useWords';
import { useProgressStore } from '../../../src/stores/progress';
import { wordsApi } from '../../../src/api/words';
import type { PracticeRound } from '../../../src/api/words';

type Phase = 'idle' | 'practicing' | 'done';

export default function PracticeScreen() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [practiceMode, setPracticeMode] = useState<'quick' | 'revision' | 'all'>('quick');
  const [lastScore, setLastScore] = useState({ score: 0, total: 0 });
  const [wrongWords, setWrongWords] = useState<
    { arabic: string; meaning: string }[]
  >([]);
  const [streakUpdated, setStreakUpdated] = useState(false);

  const shareCardRef = useRef<View>(null);
  const setProgress = useProgressStore((s) => s.setProgress);

  // Always fetch with no filter for the idle screen counts
  const { data, isLoading, refetch } = usePractice();

  useFocusEffect(
    useCallback(() => {
      if (phase === 'idle') refetch();
    }, [refetch, phase]),
  );
  const submitResults = useSubmitQuizResults();

  const [activeRounds, setActiveRounds] = useState<PracticeRound[]>([]);

  const handleStart = useCallback(
    async (mode: 'quick' | 'revision' | 'all') => {
      setPracticeMode(mode);

      try {
        const count = mode === 'quick' ? 5 : undefined;
        const status = mode === 'revision' ? ('NEEDS_REVISION' as const) : undefined;
        const result = await wordsApi.getPractice(count, status);

        if (result.rounds.length === 0) return;

        setActiveRounds(result.rounds);
        setPhase('practicing');
      } catch {
        // Fetch failed
      }
    },
    [],
  );

  const handleClose = useCallback(() => {
    Alert.alert(
      'End practice?',
      "Your progress won't be saved.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => {
            setPhase('idle');
            setActiveRounds([]);
          },
        },
      ],
    );
  }, []);

  const handleComplete = useCallback(
    (
      score: number,
      total: number,
      results?: { wordId: string; correct: boolean }[],
    ) => {
      setLastScore({ score, total });
      setPhase('done');
      setStreakUpdated(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Find wrong words for display
      if (results && activeRounds.length > 0) {
        const wrong = results
          .filter((r) => !r.correct)
          .map((r) => {
            const round = activeRounds.find(
              (rd) => rd.wordId === r.wordId,
            );
            return round
              ? { arabic: round.arabic, meaning: round.meaning }
              : null;
          })
          .filter(Boolean) as { arabic: string; meaning: string }[];
        setWrongWords(wrong);
      }

      // Submit results to backend
      if (results && results.length > 0) {
        submitResults
          .mutateAsync(results)
          .then((result) => {
            setStreakUpdated(true);
            setProgress({
              currentStreak: result.currentStreak,
              longestStreak: result.longestStreak,
            });
          })
          .catch(() => {
            // Streak will sync on next app open
          });
      }
    },
    [activeRounds, submitResults, setProgress],
  );

  const handlePlayAgain = useCallback(() => {
    setPhase('idle');
    setWrongWords([]);
    setActiveRounds([]);
    refetch();
  }, [refetch]);

  const handleShare = useCallback(async () => {
    try {
      const uri = await captureRef(shareCardRef, { format: 'png', quality: 1 });
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
        const uri = await captureRef(shareCardRef, { format: 'png', quality: 1 });
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      } catch {
        // User cancelled
      }
    }
  }, []);

  // Loading
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Practice</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  // Empty state — not enough words
  if (!data || data.totalLearned < 4) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">Practice</Text>
          <Text variant="body" color={colors.textSecondary}>
            Test your recall
          </Text>
        </View>
        <View style={styles.emptyCenter}>
          <Ionicons name="flash-outline" size={48} color={colors.textTertiary} />
          <Text variant="h3" align="center">
            Learn a few more words
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.emptySubtext}
          >
            You need at least 4 words to start practicing
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Practicing — quiz
  if (phase === 'practicing' && activeRounds.length > 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ActivityQuickFire
          rounds={activeRounds}
          onComplete={handleComplete}
          onClose={handleClose}
          title={practiceMode === 'revision' ? "Let's nail these" : 'Quick recall'}
        />
      </SafeAreaView>
    );
  }

  // Done — results
  if (phase === 'done') {
    const percent = Math.round((lastScore.score / lastScore.total) * 100);
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
                {lastScore.score}/{lastScore.total}
              </Text>
              <Text style={styles.shareCardLabel}>Practice Score</Text>
            </View>
            <View style={styles.shareCardDivider} />
            <Text style={styles.shareCardStat}>
              {data.totalLearned} Qur'anic words in my vocabulary
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
          {/* Close button */}
          <View style={styles.doneHeader}>
            <Pressable onPress={handlePlayAgain} hitSlop={12}>
              <Ionicons name="close" size={24} color={colors.textTertiary} />
            </Pressable>
          </View>

          <View style={styles.scoreSection}>
            <Text variant="h2" color={colors.primary} align="center">
              {percent === 100
                ? 'Perfect recall!'
                : percent >= 80
                  ? 'Great practice!'
                  : percent >= 60
                    ? 'Solid effort!'
                    : 'Keep at it!'}
            </Text>
            <Text style={styles.bigScore}>
              {lastScore.score}/{lastScore.total}
            </Text>
            <Text variant="body" color={colors.textSecondary} align="center">
              correct
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

          {/* Wrong words summary */}
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
            <Ionicons name="share-outline" size={18} color={colors.textOnPrimary} />
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
            onPress={handlePlayAgain}
          >
            <Text variant="bodyBold" color={colors.primary}>
              Practice Again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Idle — simple action buttons
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h1">Practice</Text>
        <Text variant="body" color={colors.textSecondary}>
          Test your recall
        </Text>
      </View>

      <View style={styles.centered}>
        {/* Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.statsNumber}>{data.totalLearned}</Text>
          <Text variant="body" color={colors.textSecondary} align="center">
            Quranic words I know
          </Text>
          {data.revisionCount > 0 && (
            <Text variant="caption" color={colors.warning} align="center" style={styles.revisionNote}>
              {data.revisionCount} {data.revisionCount === 1 ? 'needs' : 'need'} revision
            </Text>
          )}
        </Card>

        {/* Action buttons */}
        <View style={styles.actions}>
          {/* Quick Practice — primary */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionPrimary,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => handleStart('quick')}
          >
            <Ionicons name="flash" size={20} color={colors.textOnPrimary} />
            <View style={styles.actionTextGroup}>
              <Text variant="bodyBold" color={colors.textOnPrimary}>
                Quick Practice
              </Text>
              <Text variant="caption" color="rgba(255,255,255,0.7)">
                5 words, revision first
              </Text>
            </View>
          </Pressable>

          {/* Practice Revision — amber, only if revision words exist */}
          {data.revisionCount > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.actionRevision,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => handleStart('revision')}
            >
              <Ionicons name="flag" size={20} color={colors.textOnPrimary} />
              <View style={styles.actionTextGroup}>
                <Text variant="bodyBold" color={colors.textOnPrimary}>
                  Practice Revision ({data.revisionCount})
                </Text>
                <Text variant="caption" color="rgba(255,255,255,0.7)">
                  Focus on flagged words
                </Text>
              </View>
            </Pressable>
          )}

          {/* Practice All — outlined */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionOutline,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => handleStart('all')}
          >
            <Ionicons name="library-outline" size={20} color={colors.primary} />
            <View style={styles.actionTextGroup}>
              <Text variant="bodyBold" color={colors.primary}>
                Practice All ({data.totalLearned})
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Every word you've learned
              </Text>
            </View>
          </Pressable>
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  emptyCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptySubtext: {
    maxWidth: 280,
  },
  statsCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statsNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 56,
  },
  revisionNote: {
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
  },
  actionRevision: {
    backgroundColor: colors.warning,
  },
  actionOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionTextGroup: {
    flex: 1,
    gap: 2,
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

  // Done phase
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
