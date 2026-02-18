import {
  View,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback, useMemo, useRef } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { WordListItem } from '../../../src/components/words/WordListItem';
import { ShareCard } from '../../../src/components/share/ShareCard';
import { captureAndShare } from '../../../src/components/share/shareUtils';
import { colors, spacing, borderRadius } from '../../../src/constants/theme';
import { useLearnedWords } from '../../../src/hooks/useWords';
import { WordListSkeleton } from '../../../src/components/ui/Skeleton';

type Filter = 'ALL' | 'NEEDS_REVISION';

export default function WordsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  const statusParam = filter === 'NEEDS_REVISION' ? 'NEEDS_REVISION' : undefined;
  const searchParam = search.length >= 2 ? search : undefined;

  const { data, isLoading, refetch } = useLearnedWords(searchParam, statusParam);
  const shareCardRef = useRef<View>(null);

  const handleShare = useCallback(() => captureAndShare(shareCardRef), []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleWordPress = useCallback(
    (wordId: string) => {
      router.push(`/word/${wordId}`);
    },
    [router],
  );

  const revisionCount = useMemo(() => {
    if (!data) return 0;
    if (filter === 'NEEDS_REVISION') return data.words.length;
    return data.words.filter((w) => w.status === 'NEEDS_REVISION').length;
  }, [data, filter]);

  const totalCount = data?.totalCount ?? 0;
  const hasWords = totalCount > 0;

  // Empty state
  if (!isLoading && !hasWords) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h1">My Words</Text>
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="star-outline" size={48} color={colors.textTertiary} />
          </View>
          <Text variant="h3" align="center">
            Your word bank is empty
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.emptySubtext}
          >
            Your first 5 words are one lesson away
          </Text>
          <Pressable
            style={({ pressed }) => [styles.emptyButton, pressed && styles.buttonPressed]}
            onPress={() => router.push('/(tabs)/learn')}
          >
            <Text variant="bodyBold" color={colors.textOnPrimary}>
              Start Learning
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Hidden share card for capture */}
      <View style={styles.shareCardWrapper} pointerEvents="none">
        <ShareCard
          ref={shareCardRef}
          variant="words"
          wordCount={totalCount}
        />
      </View>

      <View style={styles.header}>
        <Text variant="h1">My Words</Text>
      </View>

      {/* Word Count Banner */}
      <Card style={styles.banner}>
        <Text style={styles.bannerCount}>{totalCount}</Text>
        <Text variant="body" color={colors.textSecondary} align="center">
          Quranic words I know
        </Text>
        {totalCount > 0 && (
          <Pressable
            style={({ pressed }) => [styles.shareBadge, pressed && { opacity: 0.7 }]}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={14} color={colors.primary} />
            <Text variant="caption" color={colors.primary}>Share</Text>
          </Pressable>
        )}
      </Card>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [styles.practiceButton, pressed && styles.buttonPressed]}
          onPress={() => router.push('/(tabs)/practice')}
        >
          <Ionicons name="flash-outline" size={18} color={colors.textOnPrimary} />
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Practice
          </Text>
        </Pressable>

        <View style={styles.filterChips}>
          <Pressable
            style={[styles.chip, filter === 'ALL' && styles.chipActive]}
            onPress={() => setFilter('ALL')}
          >
            <Text
              variant="caption"
              color={filter === 'ALL' ? colors.textOnPrimary : colors.textSecondary}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            style={[styles.chip, filter === 'NEEDS_REVISION' && styles.chipRevision]}
            onPress={() => setFilter('NEEDS_REVISION')}
          >
            <Ionicons
              name="flag"
              size={12}
              color={filter === 'NEEDS_REVISION' ? '#fff' : colors.warning}
              style={{ marginRight: 4 }}
            />
            <Text
              variant="caption"
              color={
                filter === 'NEEDS_REVISION' ? '#fff' : colors.textSecondary
              }
            >
              Revision{revisionCount > 0 ? ` (${revisionCount})` : ''}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by meaning or transliteration"
          placeholderTextColor={colors.textTertiary}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
          </Pressable>
        )}
      </View>

      {/* Word List */}
      {isLoading ? (
        <WordListSkeleton />
      ) : (
        <FlatList
          data={data?.words ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordListItem
              item={item}
              onPress={() => handleWordPress(item.wordId)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text variant="body" color={colors.textTertiary} align="center">
                {filter === 'NEEDS_REVISION'
                  ? 'No words marked for revision'
                  : 'No words match your search'}
              </Text>
            </View>
          }
          onRefresh={refetch}
          refreshing={false}
        />
      )}
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
  banner: {
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
  },
  bannerCount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 56,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  filterChips: {
    flexDirection: 'row',
    gap: spacing.xs,
    flex: 1,
    justifyContent: 'flex-end',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipRevision: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  separator: {
    height: spacing.sm,
  },
  emptyList: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  emptyIcon: {
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    maxWidth: 280,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  shareBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  shareCardWrapper: {
    position: 'absolute',
    top: -9999,
    left: 0,
    zIndex: -1,
  },
});
