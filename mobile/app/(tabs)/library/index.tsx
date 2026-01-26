import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { colors, spacing } from '../../../src/constants/theme';

const SECTIONS = [
  { title: 'Surahs', desc: 'Browse all 114 surahs with translations' },
  { title: 'Salah Guide', desc: 'Step-by-step prayer with Arabic and meaning' },
  { title: 'Duas', desc: 'Common duas with transliteration and translation' },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Library</Text>
        <Text variant="body" color={colors.textSecondary}>
          Your Quranic reference
        </Text>
      </View>

      <View style={styles.sections}>
        {SECTIONS.map((section, i) => (
          <Card key={i} style={styles.card}>
            <Text variant="h3">{section.title}</Text>
            <Text variant="caption" color={colors.textSecondary}>
              {section.desc}
            </Text>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  sections: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    gap: spacing.xs,
  },
});
