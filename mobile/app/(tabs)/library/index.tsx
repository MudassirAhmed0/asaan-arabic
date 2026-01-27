import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { colors, spacing } from '../../../src/constants/theme';

const SECTIONS = [
  { title: 'Surahs', desc: 'Read any surah with word-by-word meaning' },
  { title: 'Salah Guide', desc: 'Understand every word of your daily prayers' },
  { title: 'Duas', desc: 'Daily duas with meaning you\'ll actually remember' },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Library</Text>
        <Text variant="body" color={colors.textSecondary}>
          Explore and understand
        </Text>
      </View>

      <View style={styles.sections}>
        {SECTIONS.map((section, i) => (
          <Card key={i} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text variant="h3" color={colors.textTertiary}>
                {section.title}
              </Text>
              <Text variant="small" color={colors.textTertiary}>
                Coming Soon
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
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
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
