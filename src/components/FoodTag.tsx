import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '../theme';

type FoodTagProps = {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
};

export function FoodTag({ label, emoji, selected, onPress }: FoodTagProps) {
  return (
    <Pressable onPress={onPress} style={[styles.item, selected && styles.selected]}>
      <View style={styles.thumb}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '31%',
    marginBottom: 12,
    alignItems: 'center',
  },
  selected: {
    transform: [{ translateY: -2 }],
  },
  thumb: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#FDEFF1',
    borderWidth: 1,
    borderColor: '#F5D7DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: palette.text,
  },
});
