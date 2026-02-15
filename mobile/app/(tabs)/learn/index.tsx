import { View, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Text } from '../../../src/components/ui/Text';
import { LessonCard } from '../../../src/components/lesson/LessonCard';
import { DailyChallengeCard } from '../../../src/components/challenge/DailyChallengeCard';
import { WeeklyReviewBanner } from '../../../src/components/review/WeeklyReviewBanner';
import { colors, spacing, borderRadius } from '../../../src/constants/theme';
import { useLessonList } from '../../../src/hooks/useLessons';
import { useProgressStore } from '../../../src/stores/progress';
import { LearnScreenSkeleton } from '../../../src/components/ui/Skeleton';
import type { LessonListItem } from '../../../src/types';

export default function LearnScreen() {
  const router = useRouter();
  const { data: lessons, isLoading, error } = useLessonList();
  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned);
  const currentStreak = useProgressStore((s) => s.currentStreak);
  const lastActivityAt = useProgressStore((s) => s.lastActivityAt);

  const greeting = useMemo(() => {
    if (totalWordsLearned === 0) return 'Begin your Quranic vocabulary journey';
    if (!lastActivityAt) return 'Your Quranic vocabulary';

    const now = new Date();
    const last = new Date(lastActivityAt);
    const diffDays = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return 'Your Quranic vocabulary';
    if (diffDays === 1 && currentStreak > 1)
      return `${currentStreak} days strong — keep going`;
    if (diffDays > 2) return 'Welcome back — pick up where you left off';
    return 'Welcome back';
  }, [totalWordsLearned, currentStreak, lastActivityAt]);

  const handleLessonPress = (lesson: LessonListItem) => {
    if (lesson.isLocked) return;
    router.push(`/lesson/${lesson.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
          <View style={styles.header}>
            <Text variant="h1">Learn</Text>
            <Text variant="body" color={colors.textSecondary}>
              {greeting}
            </Text>
            {(totalWordsLearned > 0 || currentStreak > 0) && (
              <View style={styles.statsRow}>
                {totalWordsLearned > 0 && (
                  <View style={styles.stat}>
                    <Text variant="h2" color={colors.primary}>
                      {totalWordsLearned}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary}>
                      words I know
                    </Text>
                  </View>
                )}
                {currentStreak > 0 && (
                  <View style={styles.streakBadge}>
                    <Ionicons name="flame" size={18} color={colors.accent} />
                    <Text variant="h2" color={colors.accent}>
                      {currentStreak}
                    </Text>
                    <Text variant="caption" color={colors.accent}>
                      day streak
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <DailyChallengeCard />
          <WeeklyReviewBanner />
        </>
        }
        renderItem={({ item }) => (
          <LessonCard lesson={item} onPress={() => handleLessonPress(item)} />
        )}
        ListEmptyComponent={
          isLoading ? (
            <LearnScreenSkeleton />
          ) : error ? (
            <View style={styles.center}>
              <Text variant="body" color={colors.error}>
                Failed to load lessons
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    backgroundColor: '#FDF6E3',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
