import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing } from '../../constants/theme';

interface ArabicWordProps {
  arabic: string;
  transliteration?: string;
  meaning?: string;
  size?: 'large' | 'medium' | 'small';
}

export function ArabicWord({
  arabic,
  transliteration,
  meaning,
  size = 'large',
}: ArabicWordProps) {
  const arabicVariant =
    size === 'large'
      ? 'arabicLarge'
      : size === 'medium'
        ? 'arabicMedium'
        : 'arabicSmall';

  return (
    <View style={styles.container}>
      <Text variant={arabicVariant} align="center">
        {arabic}
      </Text>
      {transliteration && (
        <Text variant="caption" color={colors.textSecondary} align="center">
          {transliteration}
        </Text>
      )}
      {meaning && (
        <Text
          variant="bodyBold"
          color={colors.primary}
          align="center"
          style={styles.meaning}
        >
          {meaning}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  meaning: {
    marginTop: spacing.xs,
  },
});
