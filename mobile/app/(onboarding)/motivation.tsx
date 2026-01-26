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
          Just 300 words cover{'\n'}70% of the Quran
        </Text>
        <Text
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          We start with the 50 most frequent words.
          5 words per lesson. 5 minutes per day.
          By the end, you'll recognize something on
          almost every page.
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
