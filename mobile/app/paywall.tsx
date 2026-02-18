import { View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../src/components/ui/Text';
import { colors, spacing, borderRadius } from '../src/constants/theme';

export default function PaywallScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="star" size={32} color={colors.accent} />
        </View>
        <Text variant="h1" style={styles.title}>
          Asaan Arabic Pro
        </Text>
        <Text
          variant="body"
          color={colors.textSecondary}
          style={styles.subtitle}
        >
          Premium features are coming soon. Your words are yours forever —
          premium will unlock grammar insights, practice mode, and weekly
          reviews.
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => router.back()}
        >
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            Got it
          </Text>
        </Pressable>
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
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FDF6E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.lg,
  },
});
