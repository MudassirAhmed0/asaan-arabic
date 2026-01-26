import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { colors, spacing } from '../../../src/constants/theme';

export default function ChallengeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Daily Challenge</Text>
        <Text variant="body" color={colors.textSecondary}>
          A quick daily exercise to keep your streak
        </Text>
      </View>
      <View style={styles.content}>
        <Text variant="body" color={colors.textTertiary} align="center">
          Today's challenge coming soon
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
