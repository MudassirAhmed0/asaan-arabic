import { View, Pressable, StyleSheet } from 'react-native';
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
          <View style={styles.backArrow}>
            <View style={styles.backLine1} />
            <View style={styles.backLine2} />
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
          <View style={styles.closeIcon}>
            <View style={[styles.closeLine, styles.closeLineLeft]} />
            <View style={[styles.closeLine, styles.closeLineRight]} />
          </View>
        </Pressable>
      )}
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>
      {showBack && (
        <Pressable onPress={onClose} hitSlop={12} style={styles.navButton}>
          <View style={styles.closeIcon}>
            <View style={[styles.closeLine, styles.closeLineLeft]} />
            <View style={[styles.closeLine, styles.closeLineRight]} />
          </View>
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
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 18,
    height: 2,
    backgroundColor: colors.textSecondary,
    borderRadius: 1,
  },
  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },
  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },
  backArrow: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLine1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.textSecondary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateY: -3 }, { translateX: -2 }],
  },
  backLine2: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.textSecondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateY: 3 }, { translateX: -2 }],
  },
  trackContainer: {
    flex: 1,
  },
  track: {
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});
