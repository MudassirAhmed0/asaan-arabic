import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface QuickFireRound {
  arabic: string;
  options: string[];
  correctIndex: number;
}

interface ActivityQuickFireProps {
  rounds: QuickFireRound[];
  onComplete: (score: number, total: number) => void;
}

export function ActivityQuickFire({
  rounds,
  onComplete,
}: ActivityQuickFireProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const round = rounds[currentRound];
  const showResult = selectedIndex !== null;

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;

      setSelectedIndex(index);
      const isCorrect = index === round.correctIndex;

      if (isCorrect) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setScore((s) => s + 1);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      setTimeout(() => {
        if (currentRound < rounds.length - 1) {
          setCurrentRound((r) => r + 1);
          setSelectedIndex(null);
        } else {
          onComplete(isCorrect ? score + 1 : score, rounds.length);
        }
      }, 800);
    },
    [showResult, round, currentRound, rounds.length, score, onComplete],
  );

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Quick Fire!
      </Text>
      <Text
        variant="caption"
        color={colors.textSecondary}
        align="center"
        style={styles.subtitle}
      >
        {currentRound + 1} of {rounds.length}
      </Text>

      <View style={styles.arabicContainer}>
        <Text variant="arabicLarge" align="center">
          {round.arabic}
        </Text>
      </View>

      {showResult && (
        <Text
          variant="bodyBold"
          align="center"
          color={selectedIndex === round.correctIndex ? colors.success : colors.error}
          style={styles.feedback}
        >
          {selectedIndex === round.correctIndex ? 'Correct!' : 'Not quite!'}
        </Text>
      )}

      <View style={styles.options}>
        {round.options.map((option, i) => {
          const isCorrect = i === round.correctIndex;
          const isSelected = selectedIndex === i;

          return (
            <Pressable
              key={`${currentRound}-${i}`}
              style={[
                styles.option,
                showResult && isCorrect && styles.optionCorrect,
                showResult && isSelected && !isCorrect && styles.optionWrong,
              ]}
              onPress={() => handleSelect(i)}
              disabled={showResult}
            >
              <Text
                variant="bodyBold"
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  arabicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedback: {
    marginBottom: spacing.md,
  },
  options: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
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
