import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import type { LearnedWordItem } from '../../types';

interface Props {
  item: LearnedWordItem;
  onPress: () => void;
}

export function WordListItem({ item, onPress }: Props) {
  const needsRevision = item.status === 'NEEDS_REVISION';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        needsRevision && styles.containerRevision,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.arabicContainer}>
        <Text style={styles.arabic}>{item.word.arabic}</Text>
      </View>

      <View style={styles.details}>
        <Text variant="bodyBold" numberOfLines={1}>
          {item.word.transliteration}
        </Text>
        <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {item.word.meaning}
        </Text>
      </View>

      {needsRevision && <View style={styles.revisionDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  containerRevision: {
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
  },
  pressed: {
    opacity: 0.7,
  },
  arabicContainer: {
    minWidth: 64,
    alignItems: 'center',
  },
  arabic: {
    ...typography.arabicMedium,
    color: colors.primary,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  revisionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
  },
});
