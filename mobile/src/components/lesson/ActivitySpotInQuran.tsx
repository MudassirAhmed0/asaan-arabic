import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
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
  const [tappedWrong, setTappedWrong] = useState(false);

  const highlightedWord = ayah.arabicText.slice(
    ayah.highlightStartIndex,
    ayah.highlightEndIndex,
  );

  // Split ayah text into tappable segments
  const before = ayah.arabicText.slice(0, ayah.highlightStartIndex);
  const after = ayah.arabicText.slice(ayah.highlightEndIndex);

  const handleTapTarget = useCallback(() => {
    if (tappedCorrect) return;
    setTappedCorrect(true);
    setTappedWrong(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => onComplete(true), 600);
  }, [tappedCorrect, onComplete]);

  const handleTapOther = useCallback(() => {
    if (tappedCorrect) return;
    setTappedWrong(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setTimeout(() => setTappedWrong(false), 400);
  }, [tappedCorrect]);

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Spot it in the Quran
      </Text>
      <Text variant="caption" color={colors.textSecondary} align="center">
        Find "{targetMeaning}" in this ayah
      </Text>

      {tappedCorrect && (
        <Text variant="bodyBold" color={colors.success} align="center">
          Found it!
        </Text>
      )}
      {tappedWrong && (
        <Text variant="bodyBold" color={colors.error} align="center">
          Not that one — try again!
        </Text>
      )}

      <View style={styles.ayahContainer}>
        <View style={styles.ayahTextWrap}>
          <Pressable onPress={handleTapOther}>
            <Text
              variant="arabicMedium"
              color={tappedWrong ? colors.error : colors.text}
            >
              {before}
            </Text>
          </Pressable>
          <Pressable onPress={handleTapTarget}>
            <Text
              variant="arabicMedium"
              style={[
                styles.targetWord,
                tappedCorrect && styles.targetWordCorrect,
              ]}
            >
              {highlightedWord}
            </Text>
          </Pressable>
          <Pressable onPress={handleTapOther}>
            <Text
              variant="arabicMedium"
              color={tappedWrong ? colors.error : colors.text}
            >
              {after}
            </Text>
          </Pressable>
        </View>
        <Text variant="small" color={colors.textSecondary} align="center">
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
  ayahContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  ayahTextWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  targetWord: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
  targetWordCorrect: {
    color: colors.success,
    fontWeight: '700',
  },
});
