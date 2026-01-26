import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export function Text({
  variant = 'body',
  color = colors.text,
  align,
  style,
  ...props
}: AppTextProps) {
  const typographyStyle = typography[variant];

  return (
    <RNText
      style={[
        typographyStyle,
        { color },
        align && { textAlign: align },
        variant.startsWith('arabic') && styles.arabic,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  arabic: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },
});
