import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { colors, spacing } from '../../../src/constants/theme';

const SECTIONS = [
  {
    key: 'surahs',
    title: 'Surahs',
    desc: 'Popular surahs with translation',
    icon: 'book-outline' as const,
  },
  {
    key: 'salah',
    title: 'Salah Guide',
    desc: 'Understand every word of your prayers',
    icon: 'moon-outline' as const,
  },
  {
    key: 'duas',
    title: 'Duas',
    desc: 'Daily duas with meaning',
    icon: 'hand-left-outline' as const,
  },
];

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h1">Library</Text>
        <Text variant="body" color={colors.textSecondary}>
          Coming soon
        </Text>
      </View>

      <View style={styles.sections}>
        {SECTIONS.map((section) => (
          <Card key={section.key} style={[styles.card, { opacity: 0.5 }]}>
            <View style={styles.cardRow}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={section.icon}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <View style={styles.cardText}>
                <Text variant="h3">{section.title}</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  {section.desc}
                </Text>
              </View>
              <Text variant="small" color={colors.textTertiary}>
                Soon
              </Text>
            </View>
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
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
});
