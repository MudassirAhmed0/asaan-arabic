import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { LessonListItem } from '../../types';

interface LessonCardProps {
  lesson: LessonListItem;
  onPress: () => void;
}

export function LessonCard({ lesson, onPress }: LessonCardProps) {
  const isActive = !lesson.isLocked && !lesson.isCompleted;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        lesson.isCompleted && styles.cardCompleted,
        lesson.isLocked && styles.cardLocked,
        isActive && styles.cardActive,
        pressed && !lesson.isLocked && styles.cardPressed,
      ]}
      onPress={onPress}
      disabled={lesson.isLocked}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.lessonNumber,
            lesson.isCompleted && styles.lessonNumberCompleted,
            isActive && styles.lessonNumberActive,
            lesson.isLocked && styles.lessonNumberLocked,
          ]}
        >
          <Text
            variant="bodyBold"
            color={
              lesson.isCompleted || isActive
                ? colors.textOnPrimary
                : colors.textTertiary
            }
          >
            {lesson.orderIndex}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text
            variant="h3"
            color={lesson.isLocked ? colors.textTertiary : colors.text}
          >
            {lesson.title}
          </Text>
          <Text
            variant="caption"
            color={lesson.isLocked ? colors.textTertiary : colors.textSecondary}
          >
            {lesson.subtitle}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text
            variant="caption"
            color={lesson.isLocked ? colors.textTertiary : colors.textSecondary}
          >
            {lesson.wordCount} words
          </Text>
          {/* Lessons 4-7: "Premium — free for you!" badge */}
          {lesson.premiumTier === 'taste' && !lesson.isLocked && (
            <View style={styles.tasteBadge}>
              <Ionicons name="star" size={11} color={colors.accent} />
              <Text variant="small" color={colors.accent} style={styles.badgeText}>
                Premium — free for you!
              </Text>
            </View>
          )}
          {/* Lessons 8+: "Premium" badge */}
          {lesson.premiumTier === 'premium' && !lesson.isLocked && (
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={11} color={colors.accent} />
              <Text variant="small" color={colors.accent} style={styles.badgeText}>
                Premium
              </Text>
            </View>
          )}
        </View>
        {lesson.isCompleted && (
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text variant="caption" color={colors.success}>
              Done
            </Text>
          </View>
        )}
        {isActive && (
          <View style={styles.startBadge}>
            <Text variant="caption" color={colors.textOnPrimary}>
              Start
            </Text>
            <Ionicons name="arrow-forward" size={14} color={colors.textOnPrimary} />
          </View>
        )}
        {lesson.isLocked && (
          <View style={styles.statusBadge}>
            <Ionicons name="lock-closed" size={14} color={colors.textTertiary} />
            <Text variant="caption" color={colors.textTertiary}>
              Locked
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompleted: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  cardActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cardLocked: {
    opacity: 0.6,
  },
  cardPressed: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberCompleted: {
    backgroundColor: colors.success,
  },
  lessonNumberActive: {
    backgroundColor: colors.primary,
  },
  lessonNumberLocked: {
    backgroundColor: colors.borderLight,
  },
  titleContainer: {
    flex: 1,
    gap: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 40 + spacing.md,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  startBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tasteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FDF6E3',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FDF6E3',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontWeight: '600',
  },
});
