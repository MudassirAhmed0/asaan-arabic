import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface QuickFireRound {
  wordId?: string;
  arabic: string;
  options: string[];
  correctIndex: number;
}

interface WordResult {
  wordId: string;
  correct: boolean;
}

interface ActivityQuickFireProps {
  rounds: QuickFireRound[];
  onComplete: (score: number, total: number, results?: WordResult[]) => void;
  onClose?: () => void;
  title?: string;
}

export function ActivityQuickFire({
  rounds,
  onComplete,
  onClose,
  title = 'Do you remember?',
}: ActivityQuickFireProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const resultsRef = useRef<WordResult[]>([]);

  // Shuffle each round's options once on mount
  const [shuffledRounds] = useState(() =>
    rounds.map((r) => {
      const correctOption = r.options[r.correctIndex];
      const opts = [...r.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...r, options: opts, correctIndex: opts.indexOf(correctOption) };
    }),
  );

  const round = shuffledRounds[currentRound];
  const answered = selectedIndex !== null;
  const isLastRound = currentRound >= rounds.length - 1;

  const handleSelect = useCallback(
    (index: number) => {
      if (answered) return;

      setSelectedIndex(index);
      const isCorrect = index === round.correctIndex;

      if (isCorrect) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setScore((s) => s + 1);
        scoreRef.current += 1;
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      // Track per-word result if wordId is available
      if (round.wordId) {
        resultsRef.current.push({
          wordId: round.wordId,
          correct: isCorrect,
        });
      }
    },
    [answered, round],
  );

  const handleNext = useCallback(() => {
    if (!isLastRound) {
      setCurrentRound((r) => r + 1);
      setSelectedIndex(null);
    } else {
      // Skip internal summary — go straight to parent's results
      const wordResults = resultsRef.current.length > 0 ? resultsRef.current : undefined;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete(scoreRef.current, rounds.length, wordResults);
    }
  }, [isLastRound, rounds.length, onComplete]);

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <Text variant="caption" color={colors.textSecondary}>
          {currentRound + 1} of {rounds.length}
        </Text>
        {onClose && (
          <Pressable onPress={onClose} hitSlop={12}>
            <Text variant="body" color={colors.textTertiary}>✕</Text>
          </Pressable>
        )}
      </View>

      <Text variant="h3" align="center" style={styles.title}>
        {title}
      </Text>

      <View style={styles.arabicContainer}>
        <Text variant="arabicLarge" align="center">
          {round.arabic}
        </Text>
      </View>

      {answered && (
        <Text
          variant="bodyBold"
          align="center"
          color={selectedIndex === round.correctIndex ? colors.success : colors.error}
          style={styles.feedback}
        >
          {selectedIndex === round.correctIndex
            ? 'Correct!'
            : `It means "${round.options[round.correctIndex]}"`}
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
                answered && isCorrect && styles.optionCorrect,
                answered && isSelected && !isCorrect && styles.optionWrong,
              ]}
              onPress={() => handleSelect(i)}
              disabled={answered}
            >
              <Text
                variant="bodyBold"
                align="center"
                color={
                  answered && isCorrect
                    ? colors.success
                    : answered && isSelected && !isCorrect
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

      {/* Always rendered to prevent layout shift — hidden until answered */}
      <Pressable
        style={({ pressed }) => [
          styles.nextButton,
          !answered && styles.nextButtonHidden,
          pressed && answered && styles.nextButtonPressed,
        ]}
        onPress={handleNext}
        disabled={!answered}
      >
        <Text variant="bodyBold" color={answered ? colors.textOnPrimary : 'transparent'}>
          {isLastRound ? 'Done' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
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
    backgroundColor: colors.successLight,
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  nextButtonHidden: {
    backgroundColor: 'transparent',
  },
  nextButtonPressed: {
    opacity: 0.8,
  },
});
