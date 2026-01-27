import { View, Pressable, StyleSheet } from 'react-native';
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
        <Text
          variant="small"
          color={lesson.isLocked ? colors.textTertiary : colors.textSecondary}
        >
          {lesson.wordCount} words
        </Text>
        {lesson.isCompleted && (
          <Text variant="small" color={colors.success}>
            Completed
          </Text>
        )}
        {isActive && (
          <Text variant="small" color={colors.primary}>
            Start
          </Text>
        )}
        {lesson.isLocked && (
          <Text variant="small" color={colors.textTertiary}>
            Locked
          </Text>
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
    paddingLeft: 40 + spacing.md, // align with title
  },
});
