import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';
import type { ArabicInsight as ArabicInsightType, InsightType } from '../../types';

const TYPE_LABELS: Record<InsightType, string> = {
  ROOT_PATTERN: 'Root Pattern',
  GRAMMAR_TIP: 'Grammar Tip',
  CULTURAL_NOTE: 'Cultural Note',
  PATTERN_RECOGNITION: 'Pattern',
  WORD_FAMILY: 'Word Family',
};

interface ArabicInsightProps {
  insight: ArabicInsightType;
  premiumTier: 'free' | 'taste' | 'premium';
  isPremiumUser: boolean;
  onContinue: () => void;
  onUpgrade: () => void;
}

export function ArabicInsight({
  insight,
  premiumTier,
  isPremiumUser,
  onContinue,
  onUpgrade,
}: ArabicInsightProps) {
  // Premium tier + free user = blurred/locked
  const isLocked = premiumTier === 'premium' && !isPremiumUser;
  // Taste tier = show with gold badge
  const isTaste = premiumTier === 'taste';

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Type badge */}
        <View style={styles.typeBadge}>
          <Text variant="small" color={colors.accent} style={styles.typeText}>
            {TYPE_LABELS[insight.type]}
          </Text>
        </View>

        {/* Taste badge */}
        {isTaste && (
          <View style={styles.tasteBanner}>
            <Ionicons name="star" size={14} color={colors.accent} />
            <Text variant="small" color={colors.accent} style={styles.tasteBannerText}>
              Premium — free for you!
            </Text>
          </View>
        )}

        {/* Title — always visible */}
        <Text variant="h2" align="center" style={styles.title}>
          {insight.title}
        </Text>

        {isLocked ? (
          // ── Locked state: blurred content with frosted glass overlay ──
          <View style={styles.lockedContainer}>
            <View style={styles.blurredContent}>
              <View style={styles.blurredLine} />
              <View style={[styles.blurredLine, { width: '80%' }]} />
              <View style={[styles.blurredLine, { width: '90%' }]} />
              <View style={styles.blurredCard} />
              <View style={styles.blurredCard} />
            </View>

            <View style={styles.lockOverlay}>
              <View style={styles.lockCircle}>
                <Ionicons name="lock-closed" size={24} color={colors.accent} />
              </View>
              <Text variant="bodyBold" align="center">
                Upgrade to unlock Arabic Insights
              </Text>
              <Text variant="caption" color={colors.textSecondary} align="center">
                Learn grammar patterns, root families, and cultural context
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.upgradeButton,
                  pressed && styles.upgradeButtonPressed,
                ]}
                onPress={onUpgrade}
              >
                <Ionicons name="star" size={16} color={colors.textOnPrimary} />
                <Text variant="bodyBold" color={colors.textOnPrimary}>
                  Unlock Premium
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          // ── Full content (free/taste/premium user) ──
          <>
            <Text variant="body" color={colors.textSecondary} align="center">
              {insight.body}
            </Text>

            <View style={styles.examples}>
              {insight.examples.map((example, i) => (
                <View key={i} style={styles.exampleCard}>
                  <Text variant="arabicMedium" align="center">
                    {example.arabic}
                  </Text>
                  <Text variant="bodyBold" color={colors.primary} align="center">
                    {example.transliteration}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} align="center">
                    {example.meaning}
                  </Text>
                  {example.note && (
                    <Text variant="small" color={colors.textTertiary} align="center">
                      {example.note}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.continueButtonPressed,
        ]}
        onPress={onContinue}
      >
        <Text variant="bodyBold" color={colors.textOnPrimary}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  typeBadge: {
    backgroundColor: '#FDF6E3',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  typeText: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tasteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#FDF6E3',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  tasteBannerText: {
    fontWeight: '600',
  },
  title: {
    marginTop: spacing.sm,
  },
  examples: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  exampleCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // ── Locked state ──
  lockedContainer: {
    width: '100%',
    marginTop: spacing.md,
  },
  blurredContent: {
    gap: spacing.sm,
    opacity: 0.15,
  },
  blurredLine: {
    height: 14,
    backgroundColor: colors.textSecondary,
    borderRadius: 7,
    width: '100%',
  },
  blurredCard: {
    height: 80,
    backgroundColor: colors.textSecondary,
    borderRadius: borderRadius.md,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  lockCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDF6E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  upgradeButtonPressed: {
    opacity: 0.8,
  },

  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  continueButtonPressed: {
    opacity: 0.8,
  },
});
