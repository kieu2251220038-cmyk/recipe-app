import { Pressable, StyleSheet, Text } from 'react-native';
import { palette } from '../theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'soft';
};

export function PrimaryButton({ label, onPress, variant = 'primary' }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'soft' ? styles.soft : styles.primary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant === 'soft' ? styles.softText : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: palette.primary,
  },
  soft: {
    backgroundColor: '#FCD8DD',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  softText: {
    color: palette.primaryDark,
  },
  pressed: {
    opacity: 0.8,
  },
});
