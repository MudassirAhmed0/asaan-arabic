import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface ActivityFillMeaningProps {
  arabic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  onComplete: (correct: boolean) => void;
}

export function ActivityFillMeaning({
  arabic,
  prompt,
  options,
  correctIndex,
  onComplete,
}: ActivityFillMeaningProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const showResult = selectedIndex !== null;

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;

      setSelectedIndex(index);
      const isCorrect = index === correctIndex;

      if (isCorrect) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      setTimeout(() => onComplete(isCorrect), 800);
    },
    [showResult, correctIndex, onComplete],
  );

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Fill in the meaning
      </Text>

      <View style={styles.promptContainer}>
        <Text variant="arabicMedium" align="center">
          {arabic}
        </Text>
        <Text
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.prompt}
        >
          {prompt}
        </Text>
      </View>

      {showResult && (
        <Text
          variant="bodyBold"
          align="center"
          color={selectedIndex === correctIndex ? colors.success : colors.error}
          style={styles.feedback}
        >
          {selectedIndex === correctIndex ? 'Correct!' : `Not quite! It means "${options[correctIndex]}"`}
        </Text>
      )}

      <View style={styles.options}>
        {options.map((option, i) => {
          const isCorrect = i === correctIndex;
          const isSelected = selectedIndex === i;

          return (
            <Pressable
              key={i}
              style={[
                styles.option,
                showResult && isCorrect && styles.optionCorrect,
                showResult && isSelected && !isCorrect && styles.optionWrong,
              ]}
              onPress={() => handleSelect(i)}
              disabled={showResult}
            >
              <Text
                variant="body"
                align="center"
                color={
                  showResult && isCorrect
                    ? colors.success
                    : showResult && isSelected && !isCorrect
                      ? colors.error
                      : colors.text
                }
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    marginBottom: spacing.lg,
  },
  promptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  prompt: {
    marginTop: spacing.sm,
  },
  feedback: {
    marginBottom: spacing.sm,
  },
  options: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: '#F0FFF4',
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: '#FFF5F5',
  },
});
