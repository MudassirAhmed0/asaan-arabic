import { View, Pressable, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface MatchPair {
  arabic: string;
  transliteration?: string;
  meaning: string;
}

interface ActivityMatchProps {
  pairs: MatchPair[];
  onComplete: (allCorrect: boolean) => void;
}

export function ActivityMatch({ pairs, onComplete }: ActivityMatchProps) {
  const [selectedArabic, setSelectedArabic] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{
    arabic: number;
    meaning: number;
  } | null>(null);

  // Shuffle meanings for display (stable across renders)
  const [shuffledMeanings] = useState(() => {
    const indexed = pairs.map((p, i) => ({ meaning: p.meaning, origIndex: i }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    return indexed;
  });

  const handleArabicPress = useCallback(
    (index: number) => {
      if (matched.has(index)) return;
      setWrongPair(null);
      setSelectedArabic(index);
    },
    [matched],
  );

  const handleMeaningPress = useCallback(
    (meaningOrigIndex: number, meaningDisplayIndex: number) => {
      if (selectedArabic === null) return;
      if (matched.has(meaningOrigIndex)) return;

      if (selectedArabic === meaningOrigIndex) {
        // Correct match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const newMatched = new Set(matched);
        newMatched.add(meaningOrigIndex);
        setMatched(newMatched);
        setSelectedArabic(null);
        setWrongPair(null);

        if (newMatched.size === pairs.length) {
          setTimeout(() => onComplete(true), 400);
        }
      } else {
        // Wrong match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setWrongPair({
          arabic: selectedArabic,
          meaning: meaningDisplayIndex,
        });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedArabic(null);
        }, 600);
      }
    },
    [selectedArabic, matched, pairs.length, onComplete],
  );

  return (
    <View style={styles.container}>
      <Text variant="h3" align="center" style={styles.title}>
        Match the pairs
      </Text>
      <Text
        variant="caption"
        color={colors.textSecondary}
        align="center"
        style={styles.subtitle}
      >
        Tap a word, then tap its meaning
      </Text>

      <View style={styles.rows}>
        {pairs.map((pair, i) => {
          const meaningItem = shuffledMeanings[i];
          return (
            <View key={i} style={styles.row}>
              <Pressable
                style={[
                  styles.card,
                  matched.has(i) && styles.cardMatched,
                  selectedArabic === i && styles.cardSelected,
                  wrongPair?.arabic === i && styles.cardWrong,
                ]}
                onPress={() => handleArabicPress(i)}
                disabled={matched.has(i)}
              >
                <Text
                  variant="arabicSmall"
                  align="center"
                  color={matched.has(i) ? colors.success : colors.text}
                >
                  {pair.arabic}
                </Text>
                {pair.transliteration && (
                  <Text
                    variant="caption"
                    align="center"
                    color={matched.has(i) ? colors.success : colors.textSecondary}
                  >
                    {pair.transliteration}
                  </Text>
                )}
              </Pressable>
              <Pressable
                style={[
                  styles.card,
                  matched.has(meaningItem.origIndex) && styles.cardMatched,
                  wrongPair?.meaning === i && styles.cardWrong,
                ]}
                onPress={() =>
                  handleMeaningPress(meaningItem.origIndex, i)
                }
                disabled={matched.has(meaningItem.origIndex)}
              >
                <Text
                  variant="body"
                  align="center"
                  color={matched.has(meaningItem.origIndex) ? colors.success : colors.text}
                >
                  {meaningItem.meaning}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  rows: {
    gap: spacing.sm,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
    gap: 2,
  },
  cardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#F0F9F9',
  },
  cardMatched: {
    borderColor: colors.success,
    backgroundColor: '#F0FFF4',
  },
  cardWrong: {
    borderColor: colors.error,
    backgroundColor: '#FFF5F5',
  },
});
