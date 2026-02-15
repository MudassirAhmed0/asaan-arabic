import { View, Modal, Pressable, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface MilestoneModalProps {
  visible: boolean;
  wordCount: number;
  onDismiss: () => void;
}

const MILESTONES: Record<number, { title: string; message: string; icon: string }> = {
  10: {
    title: 'First 10!',
    message: "You've learned 10 Qur'anic words. That's more than most people attempt.",
    icon: 'leaf',
  },
  25: {
    title: '25 Words Strong',
    message: "You can now recognize words in over 1,000 ayahs. Keep going!",
    icon: 'sparkles',
  },
  50: {
    title: 'Half Century!',
    message: "50 words — you're building real Qur'anic vocabulary. MashaAllah!",
    icon: 'star',
  },
  100: {
    title: 'Triple Digits!',
    message: "100 words. You now understand a significant portion of what you recite daily.",
    icon: 'trophy',
  },
  150: {
    title: 'Halfway There',
    message: "150 of 300 words complete. You're halfway to understanding 70% of the Qur'an.",
    icon: 'rocket',
  },
  200: {
    title: '200 Words!',
    message: "Two hundred words of the Qur'an. Your reading will never be the same.",
    icon: 'flame',
  },
  250: {
    title: 'Almost There',
    message: "250 words — just 50 more to complete your Qur'anic vocabulary foundation.",
    icon: 'diamond',
  },
  300: {
    title: 'Journey Complete!',
    message: "300 words — you now know the vocabulary that covers 70% of the Qur'an. SubhanAllah!",
    icon: 'ribbon',
  },
};

export function getMilestone(wordCount: number): number | null {
  const milestoneNumbers = Object.keys(MILESTONES).map(Number);
  return milestoneNumbers.includes(wordCount) ? wordCount : null;
}

export function MilestoneModal({ visible, wordCount, onDismiss }: MilestoneModalProps) {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const milestone = MILESTONES[wordCount];

  useEffect(() => {
    if (visible && milestone) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 6 }),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      scale.setValue(0.5);
      opacity.setValue(0);
    }
  }, [visible, milestone, scale, opacity]);

  if (!milestone) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
          <View style={styles.iconCircle}>
            <Ionicons name={milestone.icon as any} size={36} color={colors.accent} />
          </View>
          <Text style={styles.count}>{wordCount}</Text>
          <Text variant="h2" align="center">{milestone.title}</Text>
          <Text variant="body" color={colors.textSecondary} align="center" style={styles.message}>
            {milestone.message}
          </Text>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
            onPress={onDismiss}
          >
            <Text variant="bodyBold" color={colors.textOnPrimary}>Continue</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FDF6E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  count: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 64,
    marginBottom: spacing.sm,
  },
  message: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.lg,
  },
});
