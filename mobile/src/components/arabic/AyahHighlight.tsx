import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { AyahHighlight as AyahHighlightType } from '../../types';

interface AyahHighlightProps {
  ayah: AyahHighlightType;
}

export function AyahHighlight({ ayah }: AyahHighlightProps) {
  const before = ayah.arabicText.slice(0, ayah.highlightStartIndex);
  const highlighted = ayah.arabicText.slice(
    ayah.highlightStartIndex,
    ayah.highlightEndIndex,
  );
  const after = ayah.arabicText.slice(ayah.highlightEndIndex);

  return (
    <View style={styles.container}>
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
      <Text
        variant="caption"
        color={colors.textSecondary}
        align="center"
        style={styles.translation}
      >
        {ayah.translation}
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
  translation: {
    fontStyle: 'italic',
  },
});
