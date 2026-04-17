import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trendingRecipes } from '../data/trendingRecipes';
import { recipeCollections } from '../data/favorites';
import { HomeStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<HomeStackParamList, 'TrendingRecipeDetail'>;

export function TrendingRecipeDetailScreen({ route, navigation }: Props) {
  const recipe = trendingRecipes.find((item) => item.id === route.params.recipeId) ?? trendingRecipes[0];
  const [shareVisible, setShareVisible] = useState(false);
  const [saveCollectionVisible, setSaveCollectionVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const relatedRecipes = trendingRecipes.filter((item) => item.id !== recipe.id).slice(0, 3);

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId]
    );
  };

  const handleSaveCollections = () => {
    setSaveCollectionVisible(false);
    setSelectedCollections([]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
        indicatorStyle="black"
        nestedScrollEnabled
        alwaysBounceVertical
        keyboardDismissMode="on-drag"
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>{recipe.title}</Text>
          <View style={styles.rightIcons}>
            <Pressable style={styles.topIconBtn} onPress={() => setSaveCollectionVisible(true)}>
              <Ionicons name="heart-outline" size={13} color="#F15C6A" />
            </Pressable>
            <Pressable style={styles.topIconBtn} onPress={() => setShareVisible(true)}>
              <Ionicons name="share-social-outline" size={13} color="#F15C6A" />
            </Pressable>
          </View>
        </View>

        <View style={styles.imageWrap}>
          <Image source={{ uri: recipe.image }} style={styles.hero} />
          <View style={styles.imageFooter}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.metaRight}>
              <Text style={styles.metaText}>★ {recipe.likes}</Text>
              <Text style={styles.metaText}>👁 {recipe.views}</Text>
            </View>
          </View>
        </View>

        <View style={styles.chefRow}>
          <Image source={{ uri: recipe.chefAvatar }} style={styles.avatar} />
          <View style={styles.chefBody}>
            <Text style={styles.chefName}>@{recipe.chef}</Text>
            <Text style={styles.chefRole}>{recipe.chefRole}</Text>
            <Text style={styles.postedText}>{recipe.postedAgo}</Text>
          </View>
          <View style={styles.followBtn}>
            <Text style={styles.followText}>Đang theo dõi</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={14} color="#F15C6A" />
        </View>

        <View style={styles.separator} />

        <Pressable style={styles.reviewCta} onPress={() => navigation.navigate('RecipeReviews', { recipeId: recipe.id })}>
          <Text style={styles.reviewCtaText}>Xem Đánh Giá</Text>
          <Ionicons name="chevron-forward" size={15} color="#FFFFFF" />
        </Pressable>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Chi Tiết</Text>
          <Text style={styles.duration}>⏱ {recipe.time}</Text>
        </View>
        <Text style={styles.summary}>{recipe.summary}</Text>

        <Text style={styles.ingredientsTitle}>Nguyên Liệu</Text>
        {recipe.ingredients.map((item) => (
          <Text key={item} style={styles.ingredientItem}>- {item}</Text>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Mẹo nấu nhanh</Text>
          <Text style={styles.tipText}>
            Làm nóng chảo trước khi áp chảo gà để giữ độ mọng, và nêm từng lớp để vị đậm hơn.
          </Text>
        </View>

        {recipe.steps && recipe.steps.length > 0 ? (
          <View style={styles.stepsSection}>
            <Text style={styles.stepsTitle}>{recipe.steps.length} Bước Dễ Dàng</Text>
            {recipe.steps.map((step, index) => (
              <View key={`${recipe.id}-${index + 1}`} style={styles.stepCard}>
                <Text style={styles.stepIndex}>{index + 1}. </Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Công Thức Liên Quan</Text>
          {relatedRecipes.map((item) => (
            <Pressable
              key={item.id}
              style={styles.relatedCard}
              onPress={() => navigation.replace('TrendingRecipeDetail', { recipeId: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.relatedImage} />
              <View style={styles.relatedBody}>
                <Text style={styles.relatedName}>{item.title}</Text>
                <Text style={styles.relatedMeta}>{item.likes} ★  •  {item.time}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal visible={shareVisible} transparent animationType="fade" onRequestClose={() => setShareVisible(false)}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBackdrop} onPress={() => setShareVisible(false)} />
          <View style={styles.shareSheet}>
            <Text style={styles.shareTitle}>Chia Sẻ Công Thức</Text>
            <View style={styles.shareCard}>
              <View style={styles.shareRow}>
                <Image source={{ uri: recipe.chefAvatar }} style={styles.shareAvatar} />
                <Text style={styles.shareHandle}>@{recipe.chef}</Text>
              </View>
              <Pressable style={styles.shareLinkRow}>
                <Text style={styles.shareLinkText}>Sao chép URL công thức</Text>
              </Pressable>
              <Pressable style={styles.shareLinkRow}>
                <Text style={styles.shareLinkText}>Chia sẻ công thức này</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={saveCollectionVisible} transparent animationType="fade" onRequestClose={() => setSaveCollectionVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setSaveCollectionVisible(false)}>
          <Pressable style={styles.saveSheet} onPress={() => {}}>
            <View style={styles.saveSheetHeader}>
              <Text style={styles.saveSheetTitle}>Lưu Vào Bộ Sưu Tập</Text>
              <Pressable onPress={() => setSaveCollectionVisible(false)}>
                <Ionicons name="close" size={20} color="#F35E6D" />
              </Pressable>
            </View>

            <FlatList
              data={recipeCollections}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const isSelected = selectedCollections.includes(item.id);
                return (
                  <Pressable
                    style={[styles.collectionItem, isSelected && styles.collectionItemSelected]}
                    onPress={() => toggleCollection(item.id)}
                  >
                    {item.image ? (
                      <Image source={{ uri: item.image }} style={styles.collectionThumb} />
                    ) : (
                      <View style={styles.collectionThumbFallback} />
                    )}
                    <View style={styles.collectionInfo}>
                      <Text style={styles.collectionName}>{item.name}</Text>
                    </View>
                    {isSelected ? <Ionicons name="checkmark-circle" size={16} color="#F35E6D" /> : null}
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.collectionDivider} />}
            />

            <Pressable style={styles.createCollectionInlineBtn}>
              <Text style={styles.createCollectionInlineText}>+ Tạo Bộ Sưu Tập Mới</Text>
            </Pressable>

            <View style={styles.saveSheetButtons}>
              <Pressable
                style={[styles.saveBtn, styles.saveBtnSecondary]}
                onPress={() => setSaveCollectionVisible(false)}
              >
                <Text style={styles.saveBtnSecondaryText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.saveBtn, styles.saveBtnPrimary]}
                onPress={handleSaveCollections}
              >
                <Text style={styles.saveBtnPrimaryText}>Lưu</Text>
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
    backgroundColor: '#F1EFF0',
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 220,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 21,
    color: '#F45D6C',
    fontWeight: '700',
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  topIconBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAD5DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    marginTop: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  hero: {
    width: '100%',
    height: 165,
  },
  imageFooter: {
    backgroundColor: '#F75E6C',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  metaRight: {
    flexDirection: 'row',
    gap: 8,
  },
  metaText: {
    color: '#FFE3E6',
    fontSize: 10,
  },
  chefRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  chefBody: {
    flex: 1,
    marginLeft: 8,
  },
  chefName: {
    color: '#F15C6A',
    fontSize: 10,
    fontWeight: '700',
  },
  chefRole: {
    color: '#7A7A7A',
    fontSize: 9,
  },
  postedText: {
    color: '#A2A2A2',
    fontSize: 9,
  },
  followBtn: {
    backgroundColor: '#F9CDD3',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
  },
  followText: {
    color: '#F06C79',
    fontSize: 8,
    fontWeight: '600',
  },
  separator: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#F0C9CF',
  },
  reviewCta: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#F15C6A',
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  sectionRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F45D6C',
    fontSize: 32,
    fontWeight: '700',
  },
  duration: {
    marginLeft: 10,
    color: '#595959',
    fontSize: 11,
  },
  summary: {
    marginTop: 8,
    color: '#454545',
    fontSize: 10,
    lineHeight: 17,
  },
  ingredientsTitle: {
    marginTop: 14,
    color: '#F45D6C',
    fontSize: 33,
    fontWeight: '700',
  },
  ingredientItem: {
    color: '#ED6A78',
    fontSize: 10,
    lineHeight: 18,
  },
  tipCard: {
    marginTop: 12,
    backgroundColor: '#FFF2F4',
    borderWidth: 1,
    borderColor: '#F3C6CE',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipTitle: {
    color: '#F45D6C',
    fontSize: 14,
    fontWeight: '700',
  },
  tipText: {
    marginTop: 4,
    color: '#7A5860',
    fontSize: 10,
    lineHeight: 15,
  },
  stepsSection: {
    marginTop: 12,
  },
  stepsTitle: {
    color: '#F45D6C',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  stepCard: {
    backgroundColor: '#F8D2D7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepIndex: {
    color: '#DC5463',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  stepText: {
    flex: 1,
    color: '#9A4E57',
    fontSize: 10,
    lineHeight: 14,
  },
  relatedSection: {
    marginTop: 6,
  },
  relatedTitle: {
    color: '#F45D6C',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  relatedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0D6DA',
    marginBottom: 10,
  },
  relatedImage: {
    width: '100%',
    height: 110,
  },
  relatedBody: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  relatedName: {
    color: '#313131',
    fontSize: 13,
    fontWeight: '700',
  },
  relatedMeta: {
    marginTop: 2,
    color: '#F06D79',
    fontSize: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  shareSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F3CBD2',
    padding: 14,
  },
  shareTitle: {
    color: '#F35E6D',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  shareCard: {
    borderColor: '#F1D0D6',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: '#F3D5DA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
  },
  shareAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  shareHandle: {
    color: '#E45B71',
    fontSize: 12,
    fontWeight: '700',
  },
  shareLinkRow: {
    borderColor: '#F3D5DA',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  shareLinkText: {
    color: '#F06C79',
    fontSize: 11,
    fontWeight: '600',
  },
  saveSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    maxHeight: '70%',
  },
  saveSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  saveSheetTitle: {
    color: '#F35E6D',
    fontSize: 22,
    fontWeight: '700',
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  collectionItemSelected: {
    backgroundColor: '#FEF0F2',
    borderRadius: 10,
  },
  collectionThumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  collectionThumbFallback: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#F6D4DA',
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    color: '#373737',
    fontSize: 14,
    fontWeight: '600',
  },
  collectionDivider: {
    height: 1,
    backgroundColor: '#F0DADF',
  },
  createCollectionInlineBtn: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: '#F8CAD1',
    height: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createCollectionInlineText: {
    color: '#E97A88',
    fontSize: 11,
    fontWeight: '600',
  },
  saveSheetButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  saveBtn: {
    flex: 1,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnPrimary: {
    backgroundColor: '#F75E6C',
  },
  saveBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  saveBtnSecondary: {
    backgroundColor: '#F7CAD1',
  },
  saveBtnSecondaryText: {
    color: '#E97A88',
    fontSize: 12,
    fontWeight: '600',
  },
});
