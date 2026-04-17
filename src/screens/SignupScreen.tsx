import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { palette } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('Nguyen Van A');
  const [email, setEmail] = useState('example@example.com');
  const [phone, setPhone] = useState('+84');
  const [birth, setBirth] = useState('DD / MM / YYYY');
  const [password, setPassword] = useState('12345678');
  const [confirm, setConfirm] = useState('12345678');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Đăng Ký</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Họ Và Tên</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} />

          <Text style={styles.label}>Số Điện Thoại</Text>
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />

          <Text style={styles.label}>Ngày Tháng Năm Sinh</Text>
          <TextInput value={birth} onChangeText={setBirth} style={styles.input} />

          <Text style={styles.label}>Mật Khẩu</Text>
          <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

          <Text style={styles.label}>Nhập Lại Mật Khẩu</Text>
          <TextInput value={confirm} onChangeText={setConfirm} style={styles.input} secureTextEntry />

          <PrimaryButton label="Đăng Ký" onPress={() => navigation.navigate('Login')} />

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập ngay.</Text>
          </Pressable>
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
    flexGrow: 1,
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
    color: palette.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  form: {
    marginTop: 24,
  },
  label: {
    color: '#4D4D4D',
    marginBottom: 7,
    fontSize: 13,
  },
  input: {
    height: 42,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: '#F8D7DC',
    marginBottom: 12,
  },
  link: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6A6A6A',
    fontSize: 12,
  },
});
