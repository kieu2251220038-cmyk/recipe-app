import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;
type ConfirmMode = 'logout' | 'delete' | null;

const settingsItems = [
  { key: 'notification', label: 'Thông Báo', icon: 'notifications-outline' as const },
  { key: 'help', label: 'Trung Tâm Trợ Giúp', icon: 'help-circle-outline' as const },
  { key: 'privacy', label: 'Chính Sách Bảo Mật', icon: 'shield-checkmark-outline' as const },
  { key: 'language', label: 'Ngôn Ngữ', icon: 'language-outline' as const },
  { key: 'darkmode', label: 'Giao Diện Tối', icon: 'moon-outline' as const },
  { key: 'logout', label: 'Đăng Xuất', icon: 'log-out-outline' as const },
];

export function SettingsScreen({ navigation }: Props) {
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);

  const onPressSetting = (key: string) => {
    if (key === 'notification') {
      navigation.navigate('NotificationSettings');
      return;
    }
    if (key === 'help') {
      navigation.navigate('HelpCenter');
      return;
    }
    if (key === 'privacy') {
      navigation.navigate('PrivacyPolicy');
      return;
    }
    if (key === 'language') {
      navigation.navigate('Language');
      return;
    }
    if (key === 'logout') {
      setConfirmMode('logout');
    }
  };

  const closeConfirm = () => setConfirmMode(null);

  const title = confirmMode === 'delete' ? 'Xóa Tài Khoản' : 'Đăng Xuất';
  const message =
    confirmMode === 'delete' ? 'Bạn có chắc chắn muốn xóa tài khoản không?' : 'Bạn có chắc chắn muốn đăng xuất không?';

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Cài Đặt</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.listWrap}>
          {settingsItems.map((item) => (
            <Pressable key={item.key} style={styles.itemRow} onPress={() => onPressSetting(item.key)}>
              <View style={styles.itemLeft}>
                <View style={styles.itemIconWrap}>
                  <Ionicons name={item.icon} size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.itemLabel}>{item.label}</Text>
              </View>

              <Ionicons name="chevron-forward" size={14} color="#F46D79" />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.deleteTextWrap} onPress={() => setConfirmMode('delete')}>
          <Text style={styles.deleteText}>Xóa Tài Khoản</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={confirmMode !== null} transparent animationType="fade" onRequestClose={closeConfirm}>
        <Pressable style={styles.overlay} onPress={closeConfirm}>
          <Pressable style={styles.confirmSheet} onPress={() => {}}>
            <Text style={styles.confirmTitle}>{title}</Text>
            <Text style={styles.confirmMessage}>{message}</Text>
            <View style={styles.actionRow}>
              <Pressable style={[styles.actionBtn, styles.cancelBtn]} onPress={closeConfirm}>
                <Text style={[styles.actionText, styles.cancelText]}>Hủy</Text>
              </Pressable>
              <Pressable style={[styles.actionBtn, styles.confirmBtn]} onPress={closeConfirm}>
                <Text style={[styles.actionText, styles.confirmText]}>Có</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0DADF',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F75E6C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemLabel: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteTextWrap: {
    marginTop: 10,
  },
  deleteText: {
    color: '#F06E7A',
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  confirmSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
  },
  confirmTitle: {
    textAlign: 'center',
    color: '#F45C6B',
    fontWeight: '700',
    fontSize: 24,
  },
  confirmMessage: {
    marginTop: 8,
    textAlign: 'center',
    color: '#5C5C5C',
    fontSize: 11,
  },
  actionRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 28,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F8C5CC',
  },
  confirmBtn: {
    backgroundColor: '#F75E6C',
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cancelText: {
    color: '#E1838E',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});
