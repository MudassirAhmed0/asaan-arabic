import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { colors, spacing } from '../../src/constants/theme';

export default function OnboardingIntroScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" align="center">
          You already know{'\n'}more Arabic than{'\n'}you think
        </Text>
        <Text
          variant="body"
          color={colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Your Urdu vocabulary is already 40% Arabic.
          You're not starting from zero.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={() => router.push('/(onboarding)/motivation')}
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
