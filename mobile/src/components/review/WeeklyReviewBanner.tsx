import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useCurrentReview } from '../../hooks/useReviews';

export function WeeklyReviewBanner() {
  const router = useRouter();
  const { data, isLoading } = useCurrentReview();

  if (isLoading || !data) return null;

  // Not enough words — hide entirely
  if (!data.available) return null;

  // Already completed this week — minimal display
  if (data.completed) return null;

  // Premium locked — show gold banner with lock
  if (data.isPremiumLocked) {
    return (
      <View style={styles.wrapper}>
        <Pressable onPress={() => router.push('/review' as any)}>
          <Card style={styles.bannerPremium}>
            <View style={styles.row}>
              <Ionicons name="calendar" size={20} color={colors.accent} />
              <View style={styles.textGroup}>
                <Text variant="bodyBold" color={colors.accent}>
                  Weekly Review
                </Text>
                <View style={styles.premiumRow}>
                  <Ionicons name="star" size={11} color={colors.accent} />
                  <Text variant="small" color={colors.accent}>
                    Premium
                  </Text>
                </View>
              </View>
              <Ionicons name="lock-closed" size={16} color={colors.accent} />
            </View>
          </Card>
        </Pressable>
      </View>
    );
  }

  // Available — tap to start
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => router.push('/review' as any)}>
        <Card style={styles.bannerActive}>
          <View style={styles.row}>
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <View style={styles.textGroup}>
              <Text variant="bodyBold" color={colors.primary}>
                Weekly Review
              </Text>
              <Text variant="small" color={colors.textSecondary}>
                Test your knowledge — {data.rounds.length} words
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  bannerActive: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  bannerPremium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderColor: colors.accent,
    borderWidth: 1,
    backgroundColor: '#FDF6E3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  textGroup: {
    flex: 1,
    gap: 1,
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
