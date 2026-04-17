import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryRecipes, categoryTabs, CategoryId } from '../data/categoryRecipes';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'CategoriesLanding'>;

export function CategoriesScreen({ navigation, route }: Props) {
  const initialCategory = route.params?.initialCategory ?? 'breakfast';
  const [activeTab, setActiveTab] = useState<CategoryId>(initialCategory);

  const activeCategory = useMemo(() => categoryTabs.find((tab) => tab.id === activeTab) ?? categoryTabs[0], [activeTab]);
  const recipes = useMemo(() => categoryRecipes[activeTab], [activeTab]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageFrame}>
        <Text style={styles.statusText}>16:04</Text>

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>{activeCategory.label}</Text>
          <View style={styles.rightIcons}>
            <Pressable style={styles.iconCircle}>
              <Ionicons name="notifications-outline" size={12} color="#F35E6D" />
            </Pressable>
            <Pressable style={styles.iconCircle}>
              <Ionicons name="search-outline" size={12} color="#F35E6D" />
            </Pressable>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
          {categoryTabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {recipes.map((recipe) => (
            <Pressable
              key={recipe.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('CategoryRecipeDetail', {
                  categoryId: activeTab,
                  recipeId: recipe.id,
                })
              }
            >
              <Image source={{ uri: recipe.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={1}>{recipe.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>{recipe.subtitle}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{recipe.rating} ★</Text>
                  <Text style={styles.metaText}>⏱ {recipe.time}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EFEDEE',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pageFrame: {
    flex: 1,
    backgroundColor: '#F8F7F7',
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  statusText: {
    color: '#141414',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
  },
  header: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F35E6D',
    fontSize: 35,
    fontWeight: '700',
    lineHeight: 42,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FCD7DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabRow: {
    marginTop: 8,
    paddingRight: 12,
    gap: 10,
  },
  tabBtn: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabBtnActive: {
    backgroundColor: '#F75E6C',
  },
  tabText: {
    color: '#F35E6D',
    fontSize: 11,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 110,
  },
  card: {
    width: '48.5%',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2C3CA',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 96,
  },
  cardBody: {
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 7,
  },
  cardTitle: {
    color: '#252525',
    fontSize: 12,
    fontWeight: '500',
  },
  cardSubtitle: {
    marginTop: 1,
    color: '#7C7C7C',
    fontSize: 9,
    lineHeight: 12,
    minHeight: 24,
  },
  metaRow: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: '#F27A86',
    fontSize: 10,
  },
});
