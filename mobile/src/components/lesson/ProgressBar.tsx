import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0–1
  onClose: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export function ProgressBar({ progress, onClose, onBack, showBack }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {showBack && onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
      ) : (
        <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      )}
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
      {showBack && (
        <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  navButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackContainer: {
    flex: 1,
  },
  track: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
