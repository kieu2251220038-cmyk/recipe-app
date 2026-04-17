import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('example@example.com');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Quên Mật Khẩu</Text>
        <Text style={styles.sub}>Nhập địa chỉ email để nhận mã OTP giúp bạn đặt lại mật khẩu.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        </View>

        <PrimaryButton label="Tiếp Tục" onPress={() => navigation.navigate('Login')} />
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
    flexGrow: 1,
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
    color: palette.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  sub: {
    marginTop: 16,
    textAlign: 'center',
    color: '#626262',
    lineHeight: 18,
    fontSize: 13,
  },
  form: {
    marginTop: 36,
    marginBottom: 24,
  },
  label: {
    color: '#4D4D4D',
    marginBottom: 7,
    fontSize: 13,
  },
  input: {
    height: 44,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: '#F8D7DC',
    marginBottom: 13,
  },
});
