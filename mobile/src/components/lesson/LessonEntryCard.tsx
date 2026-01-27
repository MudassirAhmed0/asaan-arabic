import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface LessonEntryCardProps {
  lessonNumber: number;
  title: string;
  subtitle: string;
  wordCount: number;
  onStart: () => void;
}

export function LessonEntryCard({
  lessonNumber,
  title,
  subtitle,
  wordCount,
  onStart,
}: LessonEntryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="caption" color={colors.textSecondary} align="center">
          Lesson {lessonNumber}
        </Text>
        <Text variant="h1" align="center" style={styles.title}>
          {title}
        </Text>
        <Text variant="body" color={colors.textSecondary} align="center">
          {subtitle}
        </Text>
        <View style={styles.badge}>
          <Text variant="bodyBold" color={colors.primary}>
            {wordCount} new words
          </Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.startButton,
          pressed && styles.startButtonPressed,
        ]}
        onPress={onStart}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Start Lesson
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xxl,
  },
  content: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  badge: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  startButtonPressed: {
    opacity: 0.8,
  },
});
