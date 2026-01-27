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
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

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

  const handleSelect = useCallback(
    (index: number) => {
      if (answered) return;

      setSelectedIndex(index);
      const isCorrect = index === round.correctIndex;

      if (isCorrect) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setScore((s) => s + 1);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    },
    [answered, round],
  );

  const handleNext = useCallback(() => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound((r) => r + 1);
      setSelectedIndex(null);
    } else {
      // score already includes this round's result from handleSelect
      setFinalScore(score);
      setFinished(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [currentRound, rounds.length, score]);

  const handleFinish = useCallback(() => {
    onComplete(finalScore, rounds.length);
  }, [finalScore, rounds.length, onComplete]);

  // Summary screen after all rounds
  if (finished) {
    const percent = Math.round((finalScore / rounds.length) * 100);
    const message =
      percent === 100
        ? 'Perfect!'
        : percent >= 60
          ? 'Nice work!'
          : 'Keep going — you\'ll get there!';

    return (
      <View style={styles.container}>
        <View style={styles.summaryContent}>
          <Text variant="h2" color={colors.primary} align="center">
            {message}
          </Text>
          <Text variant="h1" align="center" style={styles.scoreNumber}>
            {finalScore}/{rounds.length}
          </Text>
          <Text variant="body" color={colors.textSecondary} align="center">
            correct
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            pressed && styles.nextButtonPressed,
          ]}
          onPress={handleFinish}
        >
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Continue
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Do you remember?
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
          {currentRound < rounds.length - 1 ? 'Next' : 'See Results'}
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
  summaryContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  scoreNumber: {
    fontSize: 56,
    lineHeight: 64,
  },
});
