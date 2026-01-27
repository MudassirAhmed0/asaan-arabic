import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { LessonCard } from '../../../src/components/lesson/LessonCard';
import { colors, spacing } from '../../../src/constants/theme';
import { useLessonList } from '../../../src/hooks/useLessons';
import { useProgressStore } from '../../../src/stores/progress';
import type { LessonListItem } from '../../../src/types';

export default function LearnScreen() {
  const router = useRouter();
  const { data: lessons, isLoading, error } = useLessonList();
  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned);

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
          <View style={styles.header}>
            <Text variant="h1">Learn</Text>
            <Text variant="body" color={colors.textSecondary}>
              Your Quranic vocabulary
            </Text>
            {totalWordsLearned > 0 && (
              <View style={styles.wordCount}>
                <Text variant="h2" color={colors.primary}>
                  {totalWordsLearned}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  words I know
                </Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <LessonCard lesson={item} onPress={() => handleLessonPress(item)} />
        )}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.center}>
              <ActivityIndicator color={colors.primary} size="large" />
            </View>
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
  wordCount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.sm,
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
