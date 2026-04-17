import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryRecipes, categoryTabs, CategoryId, findCategoryRecipe } from '../data/categoryRecipes';
import { recipeCollections } from '../data/favorites';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'CategoryRecipeDetail'>;

export function CategoryRecipeDetailScreen({ navigation, route }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>(route.params.categoryId);
  const [activeRecipeId, setActiveRecipeId] = useState(route.params.recipeId);
  const [saveCollectionVisible, setSaveCollectionVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  useEffect(() => {
    setActiveCategoryId(route.params.categoryId);
    setActiveRecipeId(route.params.recipeId);
  }, [route.params.categoryId, route.params.recipeId]);

  const category = useMemo(
    () => categoryTabs.find((item) => item.id === activeCategoryId) ?? categoryTabs[0],
    [activeCategoryId],
  );
  const recipesInCategory = useMemo(() => categoryRecipes[activeCategoryId] ?? [], [activeCategoryId]);

  const recipe = useMemo(() => {
    return findCategoryRecipe(activeCategoryId, activeRecipeId) ?? recipesInCategory[0];
  }, [activeCategoryId, activeRecipeId, recipesInCategory]);

  const isDrinkOrSeafoodView = activeCategoryId === 'drinks' || activeCategoryId === 'seafood';

  useEffect(() => {
    if (!recipesInCategory.length) return;
    const hasRecipe = recipesInCategory.some((item) => item.id === activeRecipeId);
    if (!hasRecipe) {
      setActiveRecipeId(recipesInCategory[0].id);
    }
  }, [activeRecipeId, recipesInCategory]);

  const handleSwitchCategory = (nextCategory: 'drinks' | 'seafood') => {
    const firstRecipe = categoryRecipes[nextCategory][0];
    setActiveCategoryId(nextCategory);
    if (firstRecipe) {
      setActiveRecipeId(firstRecipe.id);
    }
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId]
    );
  };

  const handleSaveCollections = () => {
    setSaveCollectionVisible(false);
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Không tìm thấy công thức.</Text>
          <Pressable style={styles.emptyBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.emptyBtnText}>Quay lại</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.statusText}>16:04</Text>

        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>{category.label}</Text>
          <View style={styles.rightIcons}>
            <Pressable style={styles.topIconBtn} onPress={() => setSaveCollectionVisible(true)}>
              <Ionicons name="heart-outline" size={13} color="#F15C6A" />
            </Pressable>
            <Pressable style={styles.topIconBtn}>
              <Ionicons name="share-social-outline" size={13} color="#F15C6A" />
            </Pressable>
          </View>
        </View>

        {isDrinkOrSeafoodView ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentRow}
          >
            {[
              { id: 'drinks' as const, label: 'Đồ uống' },
              { id: 'seafood' as const, label: 'Hải sản' },
            ].map((item) => (
              <Pressable
                key={item.id}
                style={[styles.segmentBtn, activeCategoryId === item.id && styles.segmentBtnActive]}
                onPress={() => handleSwitchCategory(item.id)}
              >
                <Text style={[styles.segmentText, activeCategoryId === item.id && styles.segmentTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recipePickerRow}
        >
          {recipesInCategory.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setActiveRecipeId(item.id)}
              style={[styles.recipeChip, activeRecipeId === item.id && styles.recipeChipActive]}
            >
              <Image source={{ uri: item.image }} style={styles.recipeChipImage} />
              <Text
                style={[styles.recipeChipText, activeRecipeId === item.id && styles.recipeChipTextActive]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.imageWrap}>
          <Image source={{ uri: recipe.image }} style={styles.hero} />
          <View style={styles.imageFooter}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.metaRight}>
              <Text style={styles.metaText}>★ {recipe.rating}</Text>
              <Text style={styles.metaText}>◔ {recipe.views}</Text>
            </View>
          </View>
        </View>

        <View style={styles.chefRow}>
          <Image source={{ uri: recipe.chefAvatar }} style={styles.avatar} />
          <View style={styles.chefBody}>
            <Text style={styles.chefName}>@{recipe.chef}</Text>
            <Text style={styles.chefRole}>{recipe.chefRole}</Text>
          </View>
          <View style={styles.followBtn}>
            <Text style={styles.followText}>Đang Theo Dõi</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={14} color="#F15C6A" />
        </View>

        <View style={styles.separator} />

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Chi Tiết</Text>
          <Text style={styles.duration}>◷ {recipe.time}</Text>
        </View>
        <Text style={styles.summary}>{recipe.details}</Text>

        <Text style={styles.ingredientsTitle}>Nguyên Liệu</Text>
        {recipe.ingredients.map((item) => (
          <Text key={item} style={styles.ingredientItem}>· {item}</Text>
        ))}
      </ScrollView>

      <Modal visible={saveCollectionVisible} transparent animationType="fade" onRequestClose={() => setSaveCollectionVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setSaveCollectionVisible(false)}>
          <Pressable style={styles.saveSheet} onPress={() => {}}>
            <View style={styles.saveSheetHeader}>
              <Text style={styles.saveSheetTitle}>Lưu Vào Bộ Sưu Tập</Text>
              <Pressable onPress={() => setSaveCollectionVisible(false)}>
                <Ionicons name="close" size={20} color="#F35E6D" />
              </Pressable>
            </View>

            {recipeCollections.map((item) => {
              const isSelected = selectedCollections.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  style={[styles.collectionItem, isSelected && styles.collectionItemSelected]}
                  onPress={() => toggleCollection(item.id)}
                >
                  {item.image ? <Image source={{ uri: item.image }} style={styles.collectionThumb} /> : <View style={styles.collectionThumbFallback} />}
                  <Text style={styles.collectionName}>{item.name}</Text>
                  {isSelected ? <Ionicons name="checkmark-circle" size={16} color="#F35E6D" /> : null}
                </Pressable>
              );
            })}

            <Pressable style={styles.saveBtn} onPress={handleSaveCollections}>
              <Text style={styles.saveBtnText}>Lưu lựa chọn</Text>
            </Pressable>
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
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  content: {
    backgroundColor: '#F8F7F7',
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 120,
  },
  statusText: {
    color: '#141414',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#F35E6D',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 29,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  segmentRow: {
    marginTop: 8,
    gap: 8,
    paddingRight: 12,
  },
  segmentBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F2C4CB',
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  segmentBtnActive: {
    backgroundColor: '#F75E6C',
    borderColor: '#F75E6C',
  },
  segmentText: {
    color: '#F15C6A',
    fontSize: 11,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  recipePickerRow: {
    marginTop: 8,
    gap: 8,
    paddingRight: 12,
  },
  recipeChip: {
    width: 112,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2C4CB',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  recipeChipActive: {
    borderColor: '#F75E6C',
  },
  recipeChipImage: {
    width: '100%',
    height: 56,
  },
  recipeChipText: {
    color: '#5A5A5A',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  recipeChipTextActive: {
    color: '#F15C6A',
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
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hero: {
    width: '100%',
    height: 220,
  },
  imageFooter: {
    backgroundColor: '#F75E6C',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 22,
    flex: 1,
    lineHeight: 26,
  },
  metaRight: {
    flexDirection: 'row',
    gap: 8,
  },
  metaText: {
    color: '#FFE7EA',
    fontSize: 12,
  },
  chefRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  chefBody: {
    flex: 1,
    marginLeft: 8,
  },
  chefName: {
    color: '#F15C6A',
    fontSize: 12,
    fontWeight: '700',
  },
  chefRole: {
    color: '#525252',
    fontSize: 11,
  },
  followBtn: {
    backgroundColor: '#F9CDD3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 6,
  },
  followText: {
    color: '#F06C79',
    fontSize: 10,
    fontWeight: '600',
  },
  separator: {
    marginTop: 12,
    height: 1,
    backgroundColor: '#F0C9CF',
  },
  sectionRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F45D6C',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34,
  },
  duration: {
    marginLeft: 10,
    color: '#565656',
    fontSize: 13,
  },
  summary: {
    marginTop: 8,
    color: '#3F3F3F',
    fontSize: 12,
    lineHeight: 18,
  },
  ingredientsTitle: {
    marginTop: 14,
    color: '#F45D6C',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34,
  },
  ingredientItem: {
    color: '#ED6A78',
    fontSize: 11,
    lineHeight: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  saveSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
  },
  saveSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderRadius: 10,
  },
  collectionItemSelected: {
    backgroundColor: '#FEF0F2',
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
  collectionName: {
    flex: 1,
    color: '#373737',
    fontSize: 14,
    fontWeight: '600',
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: '#F75E6C',
    borderRadius: 10,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyText: {
    color: '#4B4B4B',
    fontSize: 15,
  },
  emptyBtn: {
    backgroundColor: '#F75E6C',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
