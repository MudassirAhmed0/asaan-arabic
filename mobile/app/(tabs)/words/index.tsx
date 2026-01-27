import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { colors, spacing } from '../../../src/constants/theme';
import { useProgressStore } from '../../../src/stores/progress';

export default function WordsScreen() {
  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">My Words</Text>
      </View>

      <Card style={styles.counter}>
        <Text variant="h1" color={colors.primary} align="center">
          {totalWordsLearned}
        </Text>
        <Text variant="body" color={colors.textSecondary} align="center">
          Quranic words I know
        </Text>
      </Card>

      <View style={styles.content}>
        <Text variant="body" color={colors.textTertiary} align="center">
          {totalWordsLearned > 0
            ? 'Your word bank is growing — full list coming soon'
            : 'Your first 5 words are one lesson away'}
        </Text>
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
  counter: {
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
});
