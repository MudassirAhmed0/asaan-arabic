import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { colors, spacing } from '../../src/constants/theme';

export default function OnboardingMotivationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" align="center">
          300 words.{'\n'}70% of the Quran.
        </Text>
        <Text
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          5 words a day. 5 minutes a lesson.
          You'll start recognizing words on every page of the Quran.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={() => router.push('/(onboarding)/how-it-works')}
          size="lg"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});
