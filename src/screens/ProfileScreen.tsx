import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { recipeCollections } from '../data/favorites';
import { myRecipes } from '../data/yourRecipes';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileLanding'>;
type ProfileTab = 'recipe' | 'favorites';

export function ProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('recipe');
  const [collections, setCollections] = useState(recipeCollections);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const recipeList = useMemo(() => {
    return myRecipes;
  }, []);

  const handleCreateCollection = () => {
    const trimmed = newCollectionName.trim();
    if (!trimmed) return;

    const nextId = `col-${Date.now()}`;
    setCollections((prev) => [
      ...prev,
      {
        id: nextId,
        name: trimmed,
        description: 'Bộ sưu tập mới',
        recipeCount: 0,
      },
    ]);
    setNewCollectionName('');
    setShowCreateModal(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
              }}
              style={styles.avatar}
            />
            <View style={styles.nameBlock}>
              <Text style={styles.name}>Dianne Russell</Text>
              <Text style={styles.handle}>@dianne_r</Text>
              <Text style={styles.bio}>Cảm hứng nấu ăn mỗi ngày, đồ Âu và món ăn nhẹ công thức chỉ vài bước.</Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable style={styles.headerIcon} onPress={() => navigation.navigate('AddRecipe')}>
                <Ionicons name="add" size={14} color="#F46A78" />
              </Pressable>
              <Pressable style={styles.headerIcon} onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons name="menu" size={14} color="#F46A78" />
              </Pressable>
            </View>
          </View>

          <View style={styles.ctaRow}>
            <Pressable style={styles.ctaButton} onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.ctaText}>Chỉnh Sửa Hồ Sơ</Text>
            </Pressable>
            <Pressable style={styles.ctaButton} onPress={() => navigation.navigate('ShareProfile')}>
              <Text style={styles.ctaText}>Chia Sẻ Hồ Sơ</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <Pressable style={styles.statItem}>
              <Text style={styles.statValue}>60</Text>
              <Text style={styles.statLabel}>công thức</Text>
            </Pressable>
            <Pressable
              style={styles.statItem}
              onPress={() => navigation.navigate('Following', { initialTab: 'following' })}
            >
              <Text style={styles.statValue}>120</Text>
              <Text style={styles.statLabel}>đang theo dõi</Text>
            </Pressable>
            <Pressable
              style={styles.statItem}
              onPress={() => navigation.navigate('Following', { initialTab: 'followers' })}
            >
              <Text style={styles.statValue}>250</Text>
              <Text style={styles.statLabel}>người theo dõi</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.segmented}>
          <Pressable
            onPress={() => setActiveTab('recipe')}
            style={[styles.segmentBtn, activeTab === 'recipe' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, activeTab === 'recipe' && styles.segmentTextActive]}>Công thức</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('favorites')}
            style={[styles.segmentBtn, activeTab === 'favorites' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, activeTab === 'favorites' && styles.segmentTextActive]}>Yêu thích</Text>
          </Pressable>
        </View>

        {activeTab === 'recipe' ? (
          <View style={styles.grid}>
            {recipeList.map((item) => (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('YourRecipeDetail', { recipeId: item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSub}>Món được yêu thích trên hồ sơ của bạn.</Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.metaText}>{item.likes} ★</Text>
                    <Text style={styles.metaText}>⏱ {item.time.replace(' phút', 'min')}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.collectionWrap}>
            {collections.map((collection) => (
              <Pressable
                key={collection.id}
                style={styles.collectionCard}
                onPress={() =>
                  navigation.navigate('Favorites', {
                    collectionId: collection.id,
                    collectionName: collection.name,
                  })
                }
              >
                {collection.image ? (
                  <Image source={{ uri: collection.image }} style={styles.collectionImage} />
                ) : (
                  <View style={[styles.collectionImage, styles.collectionImageFallback]} />
                )}
                <View style={styles.collectionFooter}>
                  <Text style={styles.collectionName}>{collection.name}</Text>
                </View>
              </Pressable>
            ))}

            <Pressable style={styles.createCollectionBtn} onPress={() => setShowCreateModal(true)}>
              <Text style={styles.createCollectionText}>+ Tạo Bộ Sưu Tập</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Modal visible={showCreateModal} transparent animationType="fade" onRequestClose={() => setShowCreateModal(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowCreateModal(false)}>
          <Pressable style={styles.createSheet} onPress={() => {}}>
            <Text style={styles.createTitle}>Tạo Bộ Sưu Tập</Text>
            <Text style={styles.createLabel}>Tên bộ sưu tập</Text>
            <TextInput
              value={newCollectionName}
              onChangeText={setNewCollectionName}
              placeholder="Nhập Tên"
              placeholderTextColor="#D9959F"
              style={styles.createInput}
            />
            <View style={styles.createButtonsRow}>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnMuted]} onPress={() => setShowCreateModal(false)}>
                <Text style={styles.sheetBtnMutedText}>Hủy</Text>
              </Pressable>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnMain]} onPress={handleCreateCollection}>
                <Text style={styles.sheetBtnMainText}>Tạo</Text>
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
  content: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 116,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3D3D8',
    borderRadius: 16,
    padding: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 12,
  },
  nameBlock: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: '#F35E6D',
    fontSize: 16,
    fontWeight: '700',
  },
  handle: {
    marginTop: 1,
    color: '#F48B97',
    fontSize: 10,
  },
  bio: {
    marginTop: 5,
    color: '#6C6C6C',
    fontSize: 10,
    lineHeight: 14,
  },
  headerActions: {
    gap: 4,
    marginLeft: 6,
  },
  headerIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCD7DC',
  },
  ctaRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  ctaButton: {
    flex: 1,
    height: 30,
    borderRadius: 14,
    backgroundColor: '#F8717E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  statsRow: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F3D3D8',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
  },
  statValue: {
    color: '#4A4A4A',
    fontWeight: '700',
    fontSize: 11,
  },
  statLabel: {
    color: '#767676',
    fontSize: 9,
    marginTop: 1,
  },
  segmented: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3D8DC',
    flexDirection: 'row',
  },
  segmentBtn: {
    width: 88,
    alignItems: 'center',
    paddingVertical: 8,
  },
  segmentBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F36A77',
  },
  segmentText: {
    color: '#8A8A8A',
    fontSize: 11,
  },
  segmentTextActive: {
    color: '#3D3D3D',
    fontWeight: '700',
  },
  grid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  card: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2CBD0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 102,
  },
  cardBody: {
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  cardTitle: {
    color: '#343434',
    fontSize: 10,
    fontWeight: '600',
  },
  cardSub: {
    marginTop: 2,
    color: '#868686',
    fontSize: 8,
    minHeight: 20,
  },
  cardMeta: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: '#F06C79',
    fontSize: 9,
  },
  collectionWrap: {
    marginTop: 12,
    gap: 12,
  },
  collectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2CBD0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  collectionImage: {
    width: '100%',
    height: 120,
  },
  collectionImageFallback: {
    backgroundColor: '#F7D9DE',
  },
  collectionFooter: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  collectionName: {
    color: '#353535',
    fontSize: 13,
    fontWeight: '600',
  },
  createCollectionBtn: {
    alignSelf: 'center',
    marginTop: 2,
    minWidth: 130,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8CAD1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  createCollectionText: {
    color: '#E97A88',
    fontSize: 11,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  createSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  createTitle: {
    color: '#F35E6D',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  createLabel: {
    marginTop: 14,
    color: '#454545',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  createInput: {
    borderRadius: 10,
    backgroundColor: '#F7CAD1',
    color: '#5B5B5B',
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  createButtonsRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  sheetBtn: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBtnMuted: {
    backgroundColor: '#F8CAD1',
  },
  sheetBtnMutedText: {
    color: '#E97A88',
    fontSize: 12,
    fontWeight: '600',
  },
  sheetBtnMain: {
    backgroundColor: '#F75E6C',
  },
  sheetBtnMainText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
