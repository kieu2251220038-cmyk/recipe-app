import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FoodTag } from '../components/FoodTag';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const picks = [
  { emoji: '🍗', label: 'Nướng' },
  { emoji: '🥞', label: 'Bữa sáng' },
  { emoji: '🥗', label: 'Salad' },
  { emoji: '🍜', label: 'Mì' },
  { emoji: '🍪', label: 'Bánh' },
  { emoji: '🍸', label: 'Đồ uống' },
];

export function WelcomeScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.phoneFrame}>
        <Text style={styles.title}>Chào Mừng</Text>
        <Text style={styles.description}>
          Tìm kiếm những công thức nấu ăn tốt nhất thế giới dành cho bạn, cùng với từng bước hướng dẫn đảm bảo
          có thể học dễ dàng cùng kỹ năng nấu nướng mới.
        </Text>

        <View style={styles.grid}>
          {picks.map((pick) => (
            <FoodTag
              key={pick.label}
              label={pick.label}
              emoji={pick.emoji}
              selected={false}
              onPress={() => {}}
            />
          ))}
        </View>

        <View style={styles.footerActions}>
          <PrimaryButton label="TÔI LÀ NGƯỜI MỚI" onPress={() => navigation.navigate('CookingLevel')} />
          <View style={styles.spacer} />
          <PrimaryButton label="ĐÃ CÓ TÀI KHOẢN" variant="soft" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#EFEDEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFF',
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 20,
    minHeight: 720,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#2C2C2C',
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777',
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  grid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerActions: {
    marginTop: 'auto',
    paddingTop: 14,
  },
  spacer: {
    height: 10,
  },
});
