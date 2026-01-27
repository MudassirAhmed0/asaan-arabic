import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { MidLessonMessage } from '../../types';

interface MidLessonEncouragementProps {
  message: MidLessonMessage;
  wordCount: number;
  onContinue: () => void;
}

export function MidLessonEncouragement({
  message,
  wordCount,
  onContinue,
}: MidLessonEncouragementProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.countBadge}>
          <Text variant="h1" color={colors.primary}>
            {wordCount}
          </Text>
          <Text variant="caption" color={colors.textSecondary}>
            words down!
          </Text>
        </View>

        <Text variant="h2" align="center">
          {message.headline}
        </Text>
        <Text variant="body" color={colors.textSecondary} align="center">
          {message.body}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.continueButtonPressed,
        ]}
        onPress={onContinue}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Let's make them stick!
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  countBadge: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  continueButtonPressed: {
    opacity: 0.8,
  },
});
