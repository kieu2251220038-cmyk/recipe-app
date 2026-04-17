import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FollowTab, followingUsers } from '../data/followingUsers';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Following'>;
type SheetMode = 'menu' | 'notify' | 'mute';

export function FollowingScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<FollowTab>(route.params?.initialTab ?? 'following');
  const [query, setQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<SheetMode>('menu');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [users, setUsers] = useState(followingUsers);
  const followingCount = useMemo(() => users.filter((item) => item.isFollowing).length, [users]);
  const followerCount = 250;

  const selectedUser = useMemo(() => users.find((item) => item.id === selectedId), [selectedId, users]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = activeTab === 'following' ? users.filter((user) => user.isFollowing) : users;

    if (!normalized) return source;

    return source.filter(
      (user) => user.handle.toLowerCase().includes(normalized) || user.name.toLowerCase().includes(normalized)
    );
  }, [activeTab, query, users]);

  const openMenu = (id: string) => {
    setSelectedId(id);
    setSheetMode('menu');
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setSheetMode('menu');
  };

  const updateUser = (id: string, patch: Partial<(typeof users)[number]>) => {
    setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeFollower = (id: string) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReport = () => {
    closeSheet();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.userTag}>@dianne_r</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.counterRow}>
          <Pressable
            style={[styles.counterBtn, activeTab === 'following' && styles.counterBtnActive]}
            onPress={() => setActiveTab('following')}
          >
            <Text style={[styles.counterText, activeTab === 'following' && styles.counterTextActive]}>
              {followingCount} Đang Theo Dõi
            </Text>
          </Pressable>
          <Pressable
            style={[styles.counterBtn, activeTab === 'followers' && styles.counterBtnActive]}
            onPress={() => setActiveTab('followers')}
          >
            <Text style={[styles.counterText, activeTab === 'followers' && styles.counterTextActive]}>{followerCount} Theo Dõi</Text>
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm Kiếm"
            placeholderTextColor="#D9959F"
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.itemInfo}>
                <Text style={styles.handle}>{item.handle}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              {activeTab === 'following' ? (
                <>
                  <Pressable style={styles.followBtn}>
                    <Text style={styles.followText}>Following</Text>
                  </Pressable>
                  <Pressable style={styles.moreBtn} onPress={() => openMenu(item.id)}>
                    <MaterialCommunityIcons name="dots-vertical" size={15} color="#F06C79" />
                  </Pressable>
                </>
              ) : (
                <View style={styles.followerActionRow}>
                  <Text style={styles.followerFollowingText}>Following</Text>
                  <Pressable style={styles.deleteBtn} onPress={() => removeFollower(item.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        />
      </View>

      <Modal visible={sheetOpen} transparent animationType="fade" onRequestClose={closeSheet}>
        <Pressable style={styles.overlay} onPress={closeSheet}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {selectedUser && (
              <>
                <View style={styles.sheetGrip} />
                <View style={styles.sheetHeader}>
                  <Image source={{ uri: selectedUser.avatar }} style={styles.sheetAvatar} />
                  <Text style={styles.sheetHandle}>{selectedUser.handle}</Text>
                </View>

                {sheetMode === 'menu' && (
                  <>
                    <Pressable style={styles.sheetRow} onPress={() => setSheetMode('notify')}>
                      <Text style={styles.sheetText}>Quản lý thông báo</Text>
                    </Pressable>
                    <View style={styles.sheetDivider} />
                    <Pressable style={styles.sheetRow} onPress={() => setSheetMode('mute')}>
                      <Text style={styles.sheetText}>Tắt tiếng thông báo</Text>
                    </Pressable>
                  </>
                )}

                {sheetMode === 'notify' && (
                  <>
                    <View style={styles.sheetBackRow}>
                      <Pressable onPress={() => setSheetMode('menu')}>
                        <Ionicons name="chevron-back" size={18} color="#F06C79" />
                      </Pressable>
                      <Text style={styles.sheetSectionTitle}>Quản lý thông báo</Text>
                      <View style={{ width: 18 }} />
                    </View>
                    <View style={styles.switchRow}>
                      <Text style={styles.sheetText}>Thông báo</Text>
                      <Switch
                        value={selectedUser.notificationsEnabled}
                        onValueChange={(value) => updateUser(selectedUser.id, { notificationsEnabled: value })}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#F6CCD2', true: '#F56A78' }}
                        ios_backgroundColor="#F6CCD2"
                        style={styles.switchControl}
                      />
                    </View>
                    <View style={styles.switchRow}>
                      <Text style={styles.sheetText}>Chặn tài khoản</Text>
                      <Switch
                        value={selectedUser.accountBlocked}
                        onValueChange={(value) => updateUser(selectedUser.id, { accountBlocked: value })}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#F6CCD2', true: '#F56A78' }}
                        ios_backgroundColor="#F6CCD2"
                        style={styles.switchControl}
                      />
                    </View>
                    <Pressable style={styles.sheetRow} onPress={handleReport}>
                      <Text style={styles.sheetTextDanger}>Báo cáo</Text>
                    </Pressable>
                  </>
                )}

                {sheetMode === 'mute' && (
                  <>
                    <View style={styles.sheetBackRow}>
                      <Pressable onPress={() => setSheetMode('menu')}>
                        <Ionicons name="chevron-back" size={18} color="#F06C79" />
                      </Pressable>
                      <Text style={styles.sheetSectionTitle}>Tắt tiếng thông báo</Text>
                      <View style={{ width: 18 }} />
                    </View>
                    <View style={styles.switchRow}>
                      <Text style={styles.sheetText}>Bài đăng</Text>
                      <Switch
                        value={selectedUser.postsMuted}
                        onValueChange={(value) => updateUser(selectedUser.id, { postsMuted: value })}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#F6CCD2', true: '#F56A78' }}
                        ios_backgroundColor="#F6CCD2"
                        style={styles.switchControl}
                      />
                    </View>
                  </>
                )}
              </>
            )}
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
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userTag: {
    color: '#F05F6E',
    fontSize: 13,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 17,
  },
  counterRow: {
    marginTop: 12,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F2CDD2',
  },
  counterBtn: {
    flex: 1,
    paddingBottom: 8,
    alignItems: 'center',
  },
  counterBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F36A77',
  },
  counterText: {
    color: '#9A9A9A',
    fontSize: 10,
    fontWeight: '600',
  },
  counterTextActive: {
    color: '#5B5B5B',
  },
  searchBox: {
    marginTop: 10,
    height: 30,
    borderRadius: 14,
    backgroundColor: '#F8CCD3',
    justifyContent: 'center',
    paddingHorizontal: 11,
  },
  searchInput: {
    color: '#D86D7B',
    fontSize: 11,
    paddingVertical: 0,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 116,
  },
  itemRow: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 9,
  },
  handle: {
    color: '#F17684',
    fontSize: 10,
    fontWeight: '600',
  },
  name: {
    color: '#595959',
    fontSize: 11,
  },
  followBtn: {
    width: 84,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F7CAD1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: {
    color: '#E97A88',
    fontSize: 10,
    fontWeight: '600',
  },
  moreBtn: {
    marginLeft: 6,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  followerFollowingText: {
    color: '#F29CAA',
    fontSize: 10,
    fontWeight: '600',
  },
  deleteBtn: {
    minWidth: 44,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F7CAD1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#E97A88',
    fontSize: 9,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    minHeight: 170,
  },
  sheetGrip: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E7E3E4',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sheetAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sheetHandle: {
    marginLeft: 8,
    color: '#F17684',
    fontSize: 11,
    fontWeight: '600',
  },
  sheetBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginLeft: -8,
    marginRight: -8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  sheetSectionTitle: {
    color: '#515151',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: '#F3ECEE',
  },
  sheetRow: {
    paddingVertical: 9,
  },
  sheetText: {
    color: '#4A4A4A',
    fontSize: 12,
  },
  sheetTextDanger: {
    color: '#E96A7A',
    fontSize: 12,
  },
  switchRow: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchControl: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});
