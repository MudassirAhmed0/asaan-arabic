import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Text } from '../ui/Text';
import { AyahHighlight } from '../arabic/AyahHighlight';
import { AudioButton } from './AudioButton';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { WordWithDetails } from '../../types';

interface WordIntroductionProps {
  word: WordWithDetails;
  onContinue: () => void;
}

const isFullUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');

export function WordIntroduction({ word, onContinue }: WordIntroductionProps) {
  const intro = word.introduction;
  const lastPlayedWordId = useRef<string | null>(null);

  // Auto-play pronunciation when word appears
  useEffect(() => {
    if (lastPlayedWordId.current === word.id) return;
    lastPlayedWordId.current = word.id;

    // Stop any previous playback
    Speech.stop();

    const timer = setTimeout(async () => {
      if (isFullUrl(word.audioUrl)) {
        try {
          const { sound } = await Audio.Sound.createAsync({ uri: word.audioUrl });
          await sound.playAsync();
          return;
        } catch {
          // Fall through to TTS
        }
      }
      Speech.speak(word.arabic, { language: 'ar', rate: 0.8 });
    }, 400);

    return () => clearTimeout(timer);
  }, [word.id]);

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
          <AudioButton audioUrl={word.audioUrl} arabicText={word.arabic} label="Listen again" size="large" />
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
            <AyahHighlight ayah={word.ayahHighlights[0]} baseWord={word.arabic} />
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
  const [shuffled] = useState(() => {
    const origCorrect = intro.quickCheckAnswer ?? 0;
    const options = [...(intro.quickCheckOptions ?? [])];
    const correctOption = options[origCorrect];
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return { options, correctIndex: options.indexOf(correctOption) };
  });
  const answered = selectedIndex !== null;
  const isCorrect = selectedIndex === shuffled.correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    if (index === shuffled.correctIndex) {
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
            {shuffled.options.map((option, i) => (
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
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  continueButtonPressed: {
    opacity: 0.8,
  },
});
