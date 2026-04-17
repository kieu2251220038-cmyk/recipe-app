import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Language'>;

const languageOptions = [
  'Tiếng Anh',
  'Pháp',
  'Đức',
  'Ý',
  'Hàn Quốc',
  'Ấn Độ',
  'Tiếng Ả Rập',
  'Nga',
  'Spanish',
  'Tây Ban Nha',
  'Bengali',
  'Do Thái',
  'Urdu',
  'Ukrainian',
  'Hà Lan',
];

export function LanguageScreen({ navigation }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState('Ý');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Language</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.listWrap}>
          {languageOptions.map((language) => {
            const selected = selectedLanguage === language;
            return (
              <Pressable key={language} style={styles.itemRow} onPress={() => setSelectedLanguage(language)}>
                <View style={styles.radioOuter}>{selected && <View style={styles.radioInner} />}</View>
                <Text style={styles.itemLabel}>{language}</Text>
              </Pressable>
            );
          })}
        </View>
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
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F35E6D',
    fontSize: 15,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 17,
  },
  listWrap: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0DADF',
  },
  itemRow: {
    minHeight: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0DADF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  radioOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F68A95',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F56A78',
  },
  itemLabel: {
    flex: 1,
    marginLeft: 8,
    color: '#3D3D3D',
    fontSize: 11,
  },
});
