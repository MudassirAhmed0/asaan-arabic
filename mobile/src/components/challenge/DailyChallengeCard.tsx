import { View, Pressable, Modal, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { useTodayChallenge, useSubmitAttempt } from '../../hooks/useChallenges';
import { useProgressStore } from '../../stores/progress';

export function DailyChallengeCard() {
  const { data, isLoading } = useTodayChallenge();
  const submitAttempt = useSubmitAttempt();
  const setProgress = useProgressStore((s) => s.setProgress);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [localAnswered, setLocalAnswered] = useState(false);
  const [quizResult, setQuizResult] = useState<boolean | null>(null);


  const handleQuizAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null || !data?.challenge) return;

      setSelectedAnswer(index);
      const payload = data.challenge.payload;
      const isCorrect = index === payload.correctIndex;

      Haptics.notificationAsync(
        isCorrect
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error,
      );

      setQuizResult(isCorrect);
      setLocalAnswered(true);

      submitAttempt
        .mutateAsync({
          challengeId: data.challenge.id,
          answer: index,
        })
        .then((res) => {
          setProgress({
            currentStreak: res.currentStreak,
            longestStreak: res.longestStreak,
          });
        })
        .catch(() => {});
    },
    [data, selectedAnswer, submitAttempt, setProgress],
  );

  const handleAcknowledge = useCallback(() => {
    if (!data?.challenge) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLocalAnswered(true);

    submitAttempt
      .mutateAsync({ challengeId: data.challenge.id })
      .then((res) => {
        setProgress({
          currentStreak: res.currentStreak,
          longestStreak: res.longestStreak,
        });
      })
      .catch(() => {});

    // Close modal immediately for fact types
    setModalVisible(false);
  }, [data, submitAttempt, setProgress]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  if (isLoading || !data?.challenge) return null;

  const { challenge } = data;
  const attempt = data.attempt;
  const payload = challenge.payload;
  const isAnswered = attempt?.answered || localAnswered;

  // --- Done banner ---
  if (isAnswered && !modalVisible) {
    const resultText =
      quizResult === true
        ? 'Correct!'
        : attempt?.correct === true
          ? 'Correct!'
          : quizResult === false || attempt?.correct === false
            ? 'Answered'
            : 'Done';

    return (
      <Card style={styles.banner}>
        <View style={styles.bannerRow}>
          <Ionicons name="checkmark-circle" size={18} color={colors.success} />
          <Text variant="caption" color={colors.textSecondary} style={styles.bannerTextFlex}>
            Today's Challenge
          </Text>
          <Text variant="caption" color={resultText === 'Correct!' ? colors.success : colors.textTertiary}>
            {resultText}
          </Text>
        </View>
      </Card>
    );
  }

  // --- Unanswered banner + modal ---
  const typeLabel =
    challenge.type === 'MEMORY_TEST'
      ? 'Memory Test'
      : challenge.type === 'QUICK_QUIZ'
        ? 'Quick Quiz'
        : challenge.type === 'FUN_FACT'
          ? 'Fun Fact'
          : 'Word of the Day';

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Card style={styles.banner}>
          <View style={styles.bannerRow}>
            <Text style={styles.star}>✦</Text>
            <Text variant="caption" color={colors.primary} style={styles.bannerTextFlex}>
              Today's Challenge
            </Text>
            <Text variant="caption" color={colors.textTertiary}>
              {typeLabel}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
          </View>
        </Card>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalLabelRow}>
              <Text style={styles.star}>✦</Text>
              <Text variant="caption" color={colors.primary} style={styles.label}>
                TODAY'S CHALLENGE
              </Text>
            </View>
            <Pressable onPress={handleCloseModal} hitSlop={12}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.modalContent}>
            {(challenge.type === 'MEMORY_TEST' || challenge.type === 'QUICK_QUIZ') && (
              <QuizContent
                type={challenge.type}
                payload={payload}
                selectedAnswer={selectedAnswer}
                quizResult={quizResult}
                onAnswer={handleQuizAnswer}
                onDone={handleCloseModal}
              />
            )}

            {challenge.type === 'FUN_FACT' && (
              <FunFactContent payload={payload} onAcknowledge={handleAcknowledge} />
            )}

            {challenge.type === 'WORD_OF_THE_DAY' && (
              <WordOfTheDayContent payload={payload} onAcknowledge={handleAcknowledge} />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

// --- Sub-components ---

function QuizContent({
  type,
  payload,
  selectedAnswer,
  quizResult,
  onAnswer,
  onDone,
}: {
  type: 'MEMORY_TEST' | 'QUICK_QUIZ';
  payload: Record<string, any>;
  selectedAnswer: number | null;
  quizResult: boolean | null;
  onAnswer: (index: number) => void;
  onDone: () => void;
}) {
  const answered = selectedAnswer !== null;

  return (
    <View style={styles.challengeContent}>
      {/* Question */}
      {type === 'MEMORY_TEST' && (
        <>
          <Text style={styles.arabicWord}>{payload.wordArabic}</Text>
          <Text variant="body" color={colors.textSecondary} align="center">
            {payload.question}
          </Text>
        </>
      )}
      {type === 'QUICK_QUIZ' && (
        <Text variant="h3" align="center">
          {payload.question}
        </Text>
      )}

      {/* Options */}
      <View style={styles.options}>
        {(payload.options as string[]).map((opt, i) => (
          <Pressable
            key={i}
            style={[
              styles.option,
              answered && i === payload.correctIndex && styles.optionCorrect,
              answered && selectedAnswer === i && i !== payload.correctIndex && styles.optionWrong,
            ]}
            onPress={() => onAnswer(i)}
            disabled={answered}
          >
            <Text
              variant="bodyBold"
              align="center"
              color={
                answered && i === payload.correctIndex
                  ? colors.success
                  : answered && selectedAnswer === i && i !== payload.correctIndex
                    ? colors.error
                    : colors.text
              }
            >
              {opt}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Inline result (appears after answering) */}
      {answered && (
        <View style={styles.inlineResult}>
          <Text
            variant="bodyBold"
            color={quizResult ? colors.success : colors.error}
            align="center"
          >
            {quizResult ? 'Correct!' : 'Not quite!'}
          </Text>
          {!quizResult && payload.correctIndex !== undefined && (
            <Text variant="caption" color={colors.textSecondary} align="center">
              The answer was: {payload.options[payload.correctIndex]}
            </Text>
          )}
          <Pressable
            style={({ pressed }) => [styles.doneButton, pressed && styles.buttonPressed]}
            onPress={onDone}
          >
            <Text variant="bodyBold" color={colors.textOnPrimary}>
              Done
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function FunFactContent({
  payload,
  onAcknowledge,
}: {
  payload: Record<string, any>;
  onAcknowledge: () => void;
}) {
  return (
    <View style={styles.challengeContent}>
      <Text variant="h2" align="center">
        {payload.headline}
      </Text>
      <Text variant="body" color={colors.textSecondary} style={styles.factText}>
        {payload.fact}
      </Text>
      <Pressable
        style={({ pressed }) => [styles.doneButton, pressed && styles.buttonPressed]}
        onPress={onAcknowledge}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Got it
        </Text>
      </Pressable>
    </View>
  );
}

function WordOfTheDayContent({
  payload,
  onAcknowledge,
}: {
  payload: Record<string, any>;
  onAcknowledge: () => void;
}) {
  return (
    <View style={styles.challengeContent}>
      <Text style={styles.wotdArabic}>{payload.wordArabic}</Text>
      <Text variant="bodyBold" color={colors.textSecondary}>
        {payload.wordTransliteration}
      </Text>
      <Text variant="h2" color={colors.primary}>
        {payload.wordMeaning}
      </Text>
      <Text variant="body" color={colors.textSecondary} style={styles.factText}>
        {payload.fact}
      </Text>
      {payload.frequency && (
        <View style={styles.freqBadge}>
          <Text variant="caption" color={colors.primary}>
            Appears {payload.frequency}x in the Quran
          </Text>
        </View>
      )}
      <Pressable
        style={({ pressed }) => [styles.doneButton, pressed && styles.buttonPressed]}
        onPress={onAcknowledge}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Got it
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Banner ---
  banner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bannerTextFlex: {
    flex: 1,
  },
  star: {
    fontSize: 14,
    color: colors.accent,
  },
  label: {
    fontWeight: '600',
    letterSpacing: 1,
  },

  // --- Modal ---
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },

  // --- Challenge content ---
  challengeContent: {
    alignItems: 'center',
    gap: spacing.md,
  },
  arabicWord: {
    ...typography.arabicLarge,
    fontSize: 48,
    color: colors.primary,
  },
  wotdArabic: {
    ...typography.arabicLarge,
    fontSize: 56,
    color: colors.primary,
  },
  options: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.sm,
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
    backgroundColor: colors.successLight,
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  inlineResult: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  factText: {
    marginTop: spacing.sm,
  },
  freqBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  doneButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    marginTop: spacing.sm,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
