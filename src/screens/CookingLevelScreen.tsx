import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OptionCard } from '../components/OptionCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CookingLevel'>;

const levels = [
  {
    id: 'beginner',
    title: 'Người mới bắt đầu',
    subtitle: 'Tôi vừa mới học nấu ăn và muốn biết các kỹ năng cơ bản đơn giản nhất.',
  },
  {
    id: 'middle',
    title: 'Trung cấp',
    subtitle: 'Tôi đã biết nấu các món cơ bản và muốn thử thách với những kỹ thuật tốt hơn.',
  },
  {
    id: 'high',
    title: 'Nâng cao',
    subtitle: 'Tôi có kỹ năng nấu nướng tốt và có thể tự thực hiện các món ăn phức tạp.',
  },
  {
    id: 'pro',
    title: 'Chuyên nghiệp',
    subtitle: 'Tôi đã điều phối hoặc quản lý nhà bếp chuyên môn cao trong môi trường lớn.',
  },
];

export function CookingLevelScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string>('beginner');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Trình Độ Nấu Ăn Của Bạn Là Gì?</Text>
        <Text style={styles.sub}>Vui lòng chọn trình độ nấu nướng hiện tại để bọn mình đề xuất đúng hơn.</Text>

        <View style={styles.list}>
          {levels.map((level) => (
            <OptionCard
              key={level.id}
              title={level.title}
              subtitle={level.subtitle}
              selected={selected === level.id}
              onPress={() => setSelected(level.id)}
            />
          ))}
        </View>

        <PrimaryButton label="Tiếp Tục" onPress={() => navigation.navigate('Preference')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bg,
    padding: 18,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: palette.text,
  },
  sub: {
    marginTop: 8,
    marginBottom: 14,
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  list: {
    paddingTop: 6,
  },
});
