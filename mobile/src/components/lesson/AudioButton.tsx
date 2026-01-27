import { Pressable, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/Text';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface AudioButtonProps {
  audioUrl: string;
  arabicText?: string;
  label?: string;
  size?: 'default' | 'large';
}

const isFullUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');

export function AudioButton({ audioUrl, arabicText, label = 'Play', size = 'default' }: AudioButtonProps) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    // Stop any in-progress playback first
    Speech.stop();
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    setPlaying(true);

    // Only attempt file playback if it's a real URL
    if (isFullUrl(audioUrl)) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate((status) => {
          if ('didJustFinish' in status && status.didJustFinish) {
            setPlaying(false);
          }
        });
        await sound.playAsync();
        return;
      } catch {
        // Fall through to TTS
      }
    }

    // TTS fallback
    if (arabicText) {
      Speech.speak(arabicText, {
        language: 'ar',
        rate: 0.8,
        onDone: () => setPlaying(false),
        onError: () => setPlaying(false),
      });
    } else {
      setPlaying(false);
    }
  }, [audioUrl, arabicText]);

  const isLarge = size === 'large';
  const iconSize = isLarge ? 20 : 16;
  const iconColor = playing ? colors.textOnPrimary : colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isLarge && styles.buttonLarge,
        playing && styles.playing,
        pressed && styles.pressed,
      ]}
      onPress={play}
    >
      <Ionicons name={playing ? 'volume-high' : 'volume-medium'} size={iconSize} color={iconColor} />
      <Text
        variant={isLarge ? 'body' : 'caption'}
        color={iconColor}
      >
        {playing ? 'Playing…' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonLarge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.xs,
  },
  playing: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
