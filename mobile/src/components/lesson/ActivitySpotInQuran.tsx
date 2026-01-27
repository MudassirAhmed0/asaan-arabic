import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { AyahHighlight } from '../../types';

interface ActivitySpotInQuranProps {
  targetWord: string;
  targetMeaning: string;
  ayah: AyahHighlight;
  onComplete: (correct: boolean) => void;
}

export function ActivitySpotInQuran({
  targetWord,
  targetMeaning,
  ayah,
  onComplete,
}: ActivitySpotInQuranProps) {
  const [tappedCorrect, setTappedCorrect] = useState(false);
  const [tappedWrongIndex, setTappedWrongIndex] = useState<number | null>(null);

  // Split ayah into individual words with target detection
  const words = useMemo(() => {
    const text = ayah.arabicText;
    const parts = text.split(' ');
    const result: { word: string; isTarget: boolean; index: number }[] = [];
    let pos = 0;

    for (let i = 0; i < parts.length; i++) {
      const word = parts[i];
      if (!word) {
        pos++;
        continue;
      }
      const start = pos;
      const end = pos + word.length;
      // Word overlaps with highlighted range
      const isTarget =
        start < ayah.highlightEndIndex && end > ayah.highlightStartIndex;
      result.push({ word, isTarget, index: i });
      pos = end + 1; // +1 for space
    }

    return result;
  }, [ayah]);

  const handleTapTarget = useCallback(() => {
    if (tappedCorrect) return;
    setTappedCorrect(true);
    setTappedWrongIndex(null);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => onComplete(true), 600);
  }, [tappedCorrect, onComplete]);

  const handleTapOther = useCallback(
    (index: number) => {
      if (tappedCorrect) return;
      setTappedWrongIndex(index);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => setTappedWrongIndex(null), 500);
    },
    [tappedCorrect],
  );

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Spot it in the Quran
      </Text>
      <Text variant="body" color={colors.textSecondary} align="center">
        Find "{targetMeaning}" in this ayah
      </Text>

      {/* Visual reference — show what to look for */}
      <View style={styles.referenceCard}>
        <Text variant="caption" color={colors.textSecondary}>
          Look for this word:
        </Text>
        <Text variant="arabicSmall" color={colors.primary}>
          {targetWord}
        </Text>
      </View>

      {/* Feedback */}
      {tappedCorrect && (
        <Text variant="bodyBold" color={colors.success} align="center">
          Found it!
        </Text>
      )}
      {tappedWrongIndex !== null && (
        <Text variant="bodyBold" color={colors.error} align="center">
          Not that one — try again
        </Text>
      )}

      {/* Ayah with word-level tap targets */}
      <View style={styles.ayahContainer}>
        <View style={styles.ayahTextWrap}>
          {words.map((w) => (
            <Pressable
              key={w.index}
              onPress={() =>
                w.isTarget ? handleTapTarget() : handleTapOther(w.index)
              }
              disabled={tappedCorrect}
            >
              <View
                style={[
                  styles.wordPill,
                  w.isTarget && tappedCorrect && styles.wordPillCorrect,
                  !w.isTarget &&
                    tappedWrongIndex === w.index &&
                    styles.wordPillWrong,
                ]}
              >
                <Text
                  variant="arabicMedium"
                  color={
                    w.isTarget && tappedCorrect
                      ? colors.success
                      : tappedWrongIndex === w.index
                        ? colors.error
                        : colors.text
                  }
                >
                  {w.word}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Text variant="caption" color={colors.textSecondary} align="center">
          {ayah.surahName} ({ayah.surahNum}:{ayah.ayahNum})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  referenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ayahContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  ayahTextWrap: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  wordPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  wordPillCorrect: {
    backgroundColor: '#F0FFF4',
    borderWidth: 1,
    borderColor: colors.success,
  },
  wordPillWrong: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: colors.error,
  },
});
