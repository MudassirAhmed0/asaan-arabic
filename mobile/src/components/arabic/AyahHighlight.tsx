import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { AyahHighlight as AyahHighlightType } from '../../types';

interface AyahHighlightProps {
  ayah: AyahHighlightType;
  baseWord?: string;
}

export function AyahHighlight({ ayah, baseWord }: AyahHighlightProps) {
  const before = ayah.arabicText.slice(0, ayah.highlightStartIndex);
  const highlighted = ayah.arabicText.slice(
    ayah.highlightStartIndex,
    ayah.highlightEndIndex,
  );
  const after = ayah.arabicText.slice(ayah.highlightEndIndex);

  // Show helper when the highlighted form differs from the base word
  const showHelper = baseWord && highlighted.trim() !== baseWord.trim();

  return (
    <View style={styles.container}>
      {showHelper && (
        <Text variant="caption" color={colors.textTertiary} align="center">
          Your word {baseWord} appears here as{' '}
          <Text variant="caption" color={colors.primary} style={styles.helperHighlight}>
            {highlighted}
          </Text>
        </Text>
      )}
      <Text variant="arabicSmall" align="center">
        {before}
        <Text variant="arabicSmall" style={styles.highlighted}>
          {highlighted}
        </Text>
        {after}
      </Text>
      <Text variant="small" color={colors.textSecondary} align="center">
        {ayah.surahName} ({ayah.surahNum}:{ayah.ayahNum})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  highlighted: {
    color: colors.primary,
    fontWeight: '700',
  },
  helperHighlight: {
    fontWeight: '600',
  },
});
