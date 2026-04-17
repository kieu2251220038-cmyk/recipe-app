import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('OnboardingStory');
    }, 1400);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.logoWrap}>
        <Text style={styles.icon}>🍴</Text>
      </View>
      <Text style={styles.brand}>ĐỒ ĂN NHANH</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#F75E70',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    width: 78,
    height: 78,
    borderRadius: 999,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 34,
  },
  brand: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 32,
    letterSpacing: 1.4,
  },
});
