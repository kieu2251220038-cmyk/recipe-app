import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodTag } from '../components/FoodTag';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Allergy'>;

const allergies = [
  ['Chuối', '🍌'],
  ['Chuối.', '🍌'],
  ['Kiwi', '🥝'],
  ['Hạnh nhân', '🌰'],
  ['Sữa', '🥛'],
  ['Trứng', '🍳'],
  ['Đậu phộng', '🥜'],
  ['Tôm', '🦐'],
  ['Nghêu', '🦪'],
] as const;

export function AllergyScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((it) => it !== value) : [...prev, value]));
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Bạn Có Bị Dị Ứng Với Thứ Gì Không?</Text>
      <Text style={styles.sub}>Lựa chọn bên dưới để hệ thống lọc ra công thức phù hợp tránh những nguyên liệu bạn không thể ăn.</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {allergies.map(([name, emoji]) => (
          <FoodTag
            key={`${name}-${emoji}`}
            label={name}
            emoji={emoji}
            selected={selected.includes(name)}
            onPress={() => toggle(name)}
          />
        ))}
      </ScrollView>

      <PrimaryButton label="Tiếp Tục" onPress={() => navigation.navigate('Login')} />
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
});
