import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '../theme';

type OptionCardProps = {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
};

export function OptionCard({ title, subtitle, selected, onPress }: OptionCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.wrap, selected && styles.selected]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {selected ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: '#F0E3E6',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    minHeight: 92,
  },
  selected: {
    borderColor: palette.primary,
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    color: palette.text,
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
    paddingRight: 16,
  },
  dot: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: palette.primary,
  },
});
