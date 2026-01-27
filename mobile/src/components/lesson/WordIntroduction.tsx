import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { AyahHighlight } from '../arabic/AyahHighlight';
import { AudioButton } from './AudioButton';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { WordWithDetails } from '../../types';

interface WordIntroductionProps {
  word: WordWithDetails;
  onContinue: () => void;
}

export function WordIntroduction({ word, onContinue }: WordIntroductionProps) {
  const intro = word.introduction;
  if (!intro) return null;

  const isQuickCheck = intro.style === 'QUICK_CHECK';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Arabic word — always big and centered */}
        <View style={styles.wordSection}>
          <Text variant="arabicLarge" align="center">
            {word.arabic}
          </Text>
          <Text variant="caption" color={colors.textSecondary} align="center">
            {word.transliteration}
          </Text>
          <AudioButton audioUrl={word.audioUrl} label="Listen" />
        </View>

        {/* Meaning — shown for all styles EXCEPT quick check (until answered) */}
        {!isQuickCheck && (
          <View style={styles.meaningSection}>
            <Text variant="h2" color={colors.primary} align="center">
              {word.meaning}
            </Text>
          </View>
        )}

        {/* Style-specific content */}
        <IntroContent intro={intro} word={word} />
      </ScrollView>

      {/* Continue — only for non-quiz styles (quiz has its own flow) */}
      {!isQuickCheck && (
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continueButtonPressed,
          ]}
          onPress={onContinue}
        >
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Continue
          </Text>
        </Pressable>
      )}

      {isQuickCheck && (
        <QuickCheckSection intro={intro} word={word} onContinue={onContinue} />
      )}
    </View>
  );
}

function IntroContent({
  intro,
  word,
}: {
  intro: NonNullable<WordWithDetails['introduction']>;
  word: WordWithDetails;
}) {
  switch (intro.style) {
    case 'COGNATE':
      return (
        <View style={styles.contextCard}>
          <Text variant="caption" color={colors.accent} style={styles.contextLabel}>
            You already know this
          </Text>
          <Text variant="body" color={colors.textSecondary}>
            {intro.body}
          </Text>
        </View>
      );

    case 'QURAN_CONTEXT':
      return (
        <View style={styles.contextSection}>
          <View style={styles.contextCard}>
            <Text variant="body" color={colors.textSecondary}>
              {intro.body}
            </Text>
          </View>
          {word.ayahHighlights?.[0] && (
            <AyahHighlight ayah={word.ayahHighlights[0]} />
          )}
        </View>
      );

    case 'FUN_FACT':
      return (
        <View style={styles.contextSection}>
          <View style={styles.contextCard}>
            <Text variant="body" color={colors.textSecondary}>
              {intro.body}
            </Text>
          </View>
          {intro.factStat && (
            <View style={styles.statCard}>
              <Text variant="bodyBold" color={colors.primary} align="center">
                {intro.factStat}
              </Text>
            </View>
          )}
        </View>
      );

    case 'LIFE_CONNECTION':
      return (
        <View style={styles.contextCard}>
          <Text variant="caption" color={colors.accent} style={styles.contextLabel}>
            In your daily life
          </Text>
          <Text variant="body" color={colors.textSecondary}>
            {intro.body}
          </Text>
        </View>
      );

    case 'QUICK_CHECK':
      // Handled separately
      return null;

    default:
      return null;
  }
}

function QuickCheckSection({
  intro,
  word,
  onContinue,
}: {
  intro: NonNullable<WordWithDetails['introduction']>;
  word: WordWithDetails;
  onContinue: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const correctIndex = intro.quickCheckAnswer ?? 0;
  const answered = selectedIndex !== null;
  const isCorrect = selectedIndex === correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    if (index === correctIndex) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={styles.quizSection}>
      {!answered && (
        <>
          <Text variant="bodyBold" align="center" style={styles.quizQuestion}>
            {intro.quickCheckQuestion}
          </Text>
          <View style={styles.quizOptions}>
            {intro.quickCheckOptions?.map((option, i) => (
              <Pressable
                key={i}
                style={styles.quizOption}
                onPress={() => handleSelect(i)}
              >
                <Text variant="body" align="center">
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {answered && (
        <>
          <Text variant="h2" color={colors.primary} align="center">
            {word.meaning}
          </Text>
          <Text
            variant="body"
            color={isCorrect ? colors.success : colors.textSecondary}
            align="center"
            style={styles.quizFeedback}
          >
            {isCorrect ? 'You got it!' : `Not quite! It means "${word.meaning}"`}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.continueButtonPressed,
            ]}
            onPress={onContinue}
          >
            <Text variant="bodyBold" color={colors.textOnPrimary}>
              Continue
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.lg,
  },
  wordSection: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  meaningSection: {
    alignItems: 'center',
  },
  contextSection: {
    gap: spacing.md,
  },
  contextCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  contextLabel: {
    fontWeight: '600',
  },
  statCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  quizSection: {
    gap: spacing.md,
  },
  quizQuestion: {
    marginBottom: spacing.xs,
  },
  quizOptions: {
    gap: spacing.sm,
  },
  quizOption: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  quizFeedback: {
    marginBottom: spacing.sm,
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
