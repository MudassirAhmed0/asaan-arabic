import { Pressable, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useCallback, useRef } from 'react';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface AudioButtonProps {
  audioUrl: string;
  label?: string;
}

export function AudioButton({ audioUrl, label = 'Play' }: AudioButtonProps) {
  const soundRef = useRef<Audio.Sound | null>(null);

  const play = useCallback(async () => {
    try {
      // Unload previous if exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      soundRef.current = sound;
      await sound.playAsync();
    } catch {
      // Audio might not be available — fail silently
    }
  }, [audioUrl]);

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={play}
    >
      <Text variant="caption" color={colors.primary}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
