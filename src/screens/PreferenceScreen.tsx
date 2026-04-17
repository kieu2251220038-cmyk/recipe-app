import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodTag } from '../components/FoodTag';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Preference'>;

const foods = [
  ['Gà/Nấu nướng', '🍲'],
  ['Canh', '🍵'],
  ['Trứng', '🍳'],
  ['Hải sản', '🦐'],
  ['Thịt đỏ', '🥩'],
  ['Thịt', '🍖'],
  ['Bánh mì kẹp', '🍔'],
  ['Pizza', '🍕'],
  ['Sushi', '🍣'],
  ['Cơm', '🍚'],
  ['Dessert', '🍰'],
  ['Bread', '🥐'],
] as const;

export function PreferenceScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string[]>(['Canh', 'Thịt', 'Sushi']);

  const canContinue = useMemo(() => selected.length > 0, [selected.length]);

  const toggle = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((it) => it !== value) : [...prev, value]));
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Chọn Sở Thích Ẩm Thực Của Bạn:</Text>
      <Text style={styles.sub}>Những món ăn bạn thích sẽ giúp đề xuất công thức nấu ăn cá nhân hóa tốt hơn.</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {foods.map(([name, emoji]) => (
          <FoodTag
            key={name}
            label={name}
            emoji={emoji}
            selected={selected.includes(name)}
            onPress={() => toggle(name)}
          />
        ))}
      </ScrollView>

      <View style={styles.actions}>
        <PrimaryButton label="Bỏ Qua" variant="soft" onPress={() => navigation.navigate('Allergy')} />
        <View style={styles.spacer} />
        <PrimaryButton
          label="Tiếp Tục"
          onPress={() => navigation.navigate('Allergy')}
          variant={canContinue ? 'primary' : 'soft'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bg,
    padding: 18,
  },
  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
    color: palette.text,
  },
  sub: {
    marginTop: 6,
    marginBottom: 12,
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 10,
  },
});
