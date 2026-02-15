import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../../constants/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

function SkeletonBox({ width = '100%', height = 20, borderRadius: br = borderRadius.sm, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius: br, backgroundColor: colors.border, opacity },
        style,
      ]}
    />
  );
}

export function LessonCardSkeleton() {
  return (
    <View style={skeletonStyles.lessonCard}>
      <View style={skeletonStyles.lessonCardHeader}>
        <SkeletonBox width={48} height={48} borderRadius={borderRadius.md} />
        <View style={skeletonStyles.lessonCardText}>
          <SkeletonBox width={120} height={14} />
          <SkeletonBox width={200} height={18} style={{ marginTop: 6 }} />
        </View>
      </View>
      <SkeletonBox width={80} height={12} style={{ marginTop: 12 }} />
    </View>
  );
}

export function LearnScreenSkeleton() {
  return (
    <View style={skeletonStyles.container}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <LessonCardSkeleton key={i} />
      ))}
    </View>
  );
}

export function WordListSkeleton() {
  return (
    <View style={skeletonStyles.container}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <View key={i} style={skeletonStyles.wordItem}>
          <View style={{ flex: 1 }}>
            <SkeletonBox width={100} height={16} />
            <SkeletonBox width={150} height={14} style={{ marginTop: 6 }} />
          </View>
          <SkeletonBox width={70} height={28} borderRadius={borderRadius.full} />
        </View>
      ))}
    </View>
  );
}

export function PracticeSkeleton() {
  return (
    <View style={skeletonStyles.practiceContainer}>
      <SkeletonBox width={200} height={24} style={{ alignSelf: 'center' }} />
      <SkeletonBox width={140} height={14} style={{ alignSelf: 'center', marginTop: 8 }} />
      <View style={skeletonStyles.practiceOptions}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonBox key={i} height={56} borderRadius={borderRadius.md} style={{ marginTop: 12 }} />
        ))}
      </View>
      <SkeletonBox height={48} borderRadius={borderRadius.lg} style={{ marginTop: 24 }} />
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  lessonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  lessonCardText: {
    flex: 1,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  practiceContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  practiceOptions: {
    marginTop: spacing.xl,
  },
});

export { SkeletonBox };
