import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface PremiumPaywallProps {
  onClose: () => void;
  onSubscribe: () => void;
  onRestore: () => void;
  isLoading?: boolean;
}

const VALUE_PROPS = [
  { icon: 'book' as const, text: '60 lessons, 300 Quranic words' },
  { icon: 'language' as const, text: 'Arabic insights — grammar, roots, patterns' },
  { icon: 'trending-up' as const, text: 'Cover 75%+ of Quranic vocabulary' },
  { icon: 'sparkles' as const, text: 'New lessons added regularly' },
];

export function PremiumPaywall({
  onClose,
  onSubscribe,
  onRestore,
  isLoading,
}: PremiumPaywallProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color={colors.textSecondary} />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="star" size={48} color={colors.accent} />
        </View>

        <Text variant="h1" align="center">
          Unlock All Lessons
        </Text>
        <Text variant="body" color={colors.textSecondary} align="center">
          Continue your Quranic Arabic journey with full access
        </Text>

        <View style={styles.valueProps}>
          {VALUE_PROPS.map((prop, i) => (
            <View key={i} style={styles.valueProp}>
              <Ionicons name={prop.icon} size={20} color={colors.primary} />
              <Text variant="body" style={styles.valuePropText}>
                {prop.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.subscribeButton,
            pressed && styles.buttonPressed,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={onSubscribe}
          disabled={isLoading}
        >
          <Text variant="bodyBold" color={colors.textOnPrimary}>
            {isLoading ? 'Loading...' : 'Subscribe'}
          </Text>
        </Pressable>

        <Pressable style={styles.restoreButton} onPress={onRestore}>
          <Text variant="caption" color={colors.textSecondary}>
            Restore Purchase
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: spacing.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDF6E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  valueProps: {
    width: '100%',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  valueProp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  valuePropText: {
    flex: 1,
  },
  actions: {
    gap: spacing.md,
    alignItems: 'center',
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  restoreButton: {
    padding: spacing.sm,
  },
});
