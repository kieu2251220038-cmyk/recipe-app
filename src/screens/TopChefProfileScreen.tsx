import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { topChefs } from '../data/topChefs';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TopChefProfile'>;

export function TopChefProfileScreen({ route, navigation }: Props) {
  const chef = useMemo(() => topChefs.find((item) => item.id === route.params.chefId) ?? topChefs[0], [route.params.chefId]);
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [mute, setMute] = useState(false);
  const [muteTag, setMuteTag] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerName}>{chef.username}</Text>
          <View style={styles.headerIcons}>
            <Pressable style={styles.iconBubble} onPress={() => setShowShare(true)}>
              <Ionicons name="share-social-outline" size={12} color="#F35E6D" />
            </Pressable>
            <Pressable style={styles.iconBubble} onPress={() => setShowSettings(true)}>
              <Ionicons name="ellipsis-vertical" size={12} color="#F35E6D" />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileRow}>
          <Image source={{ uri: chef.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{chef.name}</Text>
            <Text style={styles.role}>{chef.bio}</Text>
            <View style={styles.followBtn}><Text style={styles.followBtnText}>Following</Text></View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}><Text style={styles.statNum}>{chef.stats.posts}</Text><Text style={styles.statLabel}>công thức</Text></View>
          <View style={styles.statBox}><Text style={styles.statNum}>{chef.stats.followers}</Text><Text style={styles.statLabel}>Đang theo dõi</Text></View>
          <View style={styles.statBox}><Text style={styles.statNum}>{chef.stats.following}</Text><Text style={styles.statLabel}>Người theo dõi</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Recipes</Text>
        {chef.coverRecipes.map((item) => (
          <Pressable key={item.id} style={styles.recipeCard} onPress={() => navigation.navigate('TopChefRecipes', { chefId: chef.id })}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal transparent visible={showSettings} animationType="fade" onRequestClose={() => setShowSettings(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowSettings(false)}>
          <Pressable style={styles.panel} onPress={() => {}}>
            <View style={styles.panelUserRow}>
              <Image source={{ uri: chef.avatar }} style={styles.panelAvatar} />
              <Text style={styles.panelUser}>{chef.username}</Text>
            </View>
            <Text style={styles.panelHeading}>Quản lý thông báo</Text>
            <View style={styles.switchRow}><Text style={styles.switchLabel}>Tắt tiếng thông báo</Text><Switch value={mute} onValueChange={setMute} trackColor={{ false: '#F2D7DB', true: '#F45D6C' }} thumbColor="#FFFFFF" /></View>
            <View style={styles.switchRow}><Text style={styles.switchLabel}>Tắt tiếng tài khoản</Text><Switch value={muteTag} onValueChange={setMuteTag} trackColor={{ false: '#F2D7DB', true: '#F45D6C' }} thumbColor="#FFFFFF" /></View>
            <View style={styles.switchRow}><Text style={styles.switchLabel}>Chặn tài khoản</Text><Switch value={false} onValueChange={() => {}} disabled trackColor={{ false: '#F2D7DB', true: '#F45D6C' }} thumbColor="#FFFFFF" /></View>
            <Text style={styles.report}>Báo cáo</Text>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal transparent visible={showShare} animationType="fade" onRequestClose={() => setShowShare(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowShare(false)}>
          <Pressable style={styles.sharePanel} onPress={() => {}}>
            <View style={styles.panelUserRow}>
              <Image source={{ uri: chef.avatar }} style={styles.panelAvatar} />
              <Text style={styles.panelUser}>{chef.username}</Text>
            </View>
            <Text style={styles.shareAction}>Sao chép URL hồ sơ</Text>
            <Text style={styles.shareAction}>Chia sẻ hồ sơ</Text>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F3F1F2' },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 110 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerName: { color: '#F35E6D', fontSize: 28, fontWeight: '700' },
  headerIcons: { flexDirection: 'row', gap: 6 },
  iconBubble: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FCD7DC', alignItems: 'center', justifyContent: 'center' },
  profileRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 8 },
  name: { color: '#F35E6D', fontWeight: '700', fontSize: 12 },
  role: { color: '#666', fontSize: 9, lineHeight: 12, maxWidth: '95%' },
  followBtn: { marginTop: 5, alignSelf: 'flex-start', backgroundColor: '#F8CBD2', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  followBtnText: { color: '#F35E6D', fontSize: 10, fontWeight: '700' },
  statsRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { width: '32%', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F0CCD1', borderRadius: 10, alignItems: 'center', paddingVertical: 6 },
  statNum: { fontSize: 11, fontWeight: '700', color: '#3C3C3C' },
  statLabel: { fontSize: 9, color: '#949494' },
  sectionTitle: { marginTop: 6, marginBottom: 8, color: '#F35E6D', fontSize: 11, fontWeight: '700', textAlign: 'center' },
  recipeCard: { marginBottom: 10, borderRadius: 12, borderWidth: 1, borderColor: '#F0CCD1', overflow: 'hidden' },
  recipeImage: { width: '100%', height: 80 },
  recipeTitle: { textAlign: 'center', backgroundColor: '#FFFFFF', color: '#3A3A3A', paddingVertical: 6, fontSize: 11, fontWeight: '600' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.45)', justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 30 },
  panel: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14 },
  sharePanel: { width: '78%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, alignSelf: 'flex-end', marginRight: 8 },
  panelUserRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  panelAvatar: { width: 34, height: 34, borderRadius: 17, marginRight: 8 },
  panelUser: { color: '#F35E6D', fontWeight: '700', fontSize: 12 },
  panelHeading: { color: '#333', marginBottom: 8, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  switchLabel: { color: '#333', fontSize: 12 },
  report: { marginTop: 8, color: '#333', fontSize: 12 },
  shareAction: { color: '#333', fontSize: 13, marginBottom: 8 },
});
