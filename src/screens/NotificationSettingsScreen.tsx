import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'NotificationSettings'>;

export function NotificationSettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    callSound: true,
    vibration: true,
  });

  const toggles = [
    { key: 'general' as const, label: 'Thông Báo Chung' },
    { key: 'sound' as const, label: 'Âm Thanh' },
    { key: 'callSound' as const, label: 'Âm Thanh Cuộc Gọi' },
    { key: 'vibration' as const, label: 'Rung' },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Thông Báo</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.listWrap}>
          {toggles.map((item) => (
            <View key={item.key} style={styles.itemRow}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Switch
                value={settings[item.key]}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, [item.key]: value }))}
                thumbColor="#FFFFFF"
                trackColor={{ false: '#F6CCD2', true: '#F56A78' }}
                ios_backgroundColor="#F6CCD2"
                style={styles.switchControl}
              />
            </View>
          ))}
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
  },
  itemRow: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0DADF',
  },
  itemLabel: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
  },
  switchControl: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});
