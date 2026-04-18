import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    firstName: 'Nghia',
    middleName: 'Co Ny',
    note: 'Dep Trai',
    link: '',
  });

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Chỉnh Sửa Trang Cá Nhân</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.avatarBlock}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
            }}
            style={styles.avatar}
          />
          <Pressable>
            <Text style={styles.editAvatarText}>Chỉnh Sửa Ảnh</Text>
          </Pressable>
        </View>

        <View style={styles.formWrap}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            value={form.firstName}
            onChangeText={(value) => setForm((prev) => ({ ...prev, firstName: value }))}
            placeholder="Shu"
            placeholderTextColor="#CD9AA3"
            style={styles.input}
          />

          <Text style={styles.label}>Tên Đệm</Text>
          <TextInput
            value={form.middleName}
            onChangeText={(value) => setForm((prev) => ({ ...prev, middleName: value }))}
            placeholder="Co Ny"
            placeholderTextColor="#CD9AA3"
            style={styles.input}
          />

          <Text style={styles.label}>Ghi Chú</Text>
          <TextInput
            value={form.note}
            onChangeText={(value) => setForm((prev) => ({ ...prev, note: value }))}
            placeholder="Dep Trai"
            placeholderTextColor="#CD9AA3"
            style={[styles.input, styles.noteInput]}
            multiline
          />

          <Text style={styles.label}>Link</Text>
          <TextInput
            value={form.link}
            onChangeText={(value) => setForm((prev) => ({ ...prev, link: value }))}
            placeholder=""
            placeholderTextColor="#CD9AA3"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Lưu</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F0F1',
  },
  container: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F35E6D',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 17,
  },
  avatarBlock: {
    marginTop: 18,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  editAvatarText: {
    marginTop: 6,
    color: '#F56A78',
    fontSize: 12,
    fontWeight: '500',
  },
  formWrap: {
    marginTop: 16,
  },
  label: {
    color: '#3F3F3F',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 11,
    marginBottom: 5,
  },
  input: {
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F7C4CB',
    paddingHorizontal: 12,
    color: '#6A5E62',
    fontSize: 12,
  },
  noteInput: {
    height: 52,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  saveBtn: {
    marginTop: 24,
    alignSelf: 'center',
    minWidth: 78,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F75E6C',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
