import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingSkill'>;

export function OnboardingSkillScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nâng Cao Kỹ Năng Của Bạn</Text>
        <Text style={styles.description}>
          Học các kỹ thuật nấu ăn thiết yếu từ basic đến nâng cao cùng liên hệ.
        </Text>

        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800' }}
          style={styles.heroImage}
          imageStyle={styles.heroImageRounded}
        />

        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => navigation.navigate('Welcome')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bg,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 20,
    marginTop: 8,
  },
  description: {
    marginTop: 6,
    color: '#747474',
    fontSize: 13,
    lineHeight: 18,
  },
  heroImage: {
    flex: 1,
    marginTop: 16,
    overflow: 'hidden',
  },
  heroImageRounded: {
    borderRadius: 20,
  },
  footer: {
    paddingTop: 16,
  },
});
