import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trendingRecipes } from '../data/trendingRecipes';
import { HomeStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<HomeStackParamList, 'TrendingRecipes'>;

type CommunityFilter = 'popular' | 'latest' | 'oldest';

export function TrendingRecipesScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<CommunityFilter>('popular');

  const listRecipes = useMemo(() => {
    const recipes = [...trendingRecipes];

    if (activeFilter === 'latest') {
      return recipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (activeFilter === 'oldest') {
      return recipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return recipes.sort((a, b) => b.popularity - a.popularity);
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Cộng Đồng</Text>
          <View style={styles.rightIcons}>
            <Pressable style={styles.topIconBtn}>
              <Ionicons name="heart-outline" size={13} color="#F15C6A" />
            </Pressable>
            <Pressable style={styles.topIconBtn}>
              <Ionicons name="search-outline" size={13} color="#F15C6A" />
            </Pressable>
          </View>
        </View>

        <View style={styles.filterRow}>
          <Pressable
            style={[styles.filterBtn, activeFilter === 'popular' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('popular')}
          >
            <Text style={[styles.filterLabel, activeFilter === 'popular' && styles.filterLabelActive]}>Phổ biến nhất</Text>
          </Pressable>
          <Pressable
            style={[styles.filterBtn, activeFilter === 'latest' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('latest')}
          >
            <Text style={[styles.filterLabel, activeFilter === 'latest' && styles.filterLabelActive]}>Mới nhất</Text>
          </Pressable>
          <Pressable
            style={[styles.filterBtn, activeFilter === 'oldest' && styles.filterBtnActive]}
            onPress={() => setActiveFilter('oldest')}
          >
            <Text style={[styles.filterLabel, activeFilter === 'oldest' && styles.filterLabelActive]}>Cũ nhất</Text>
          </Pressable>
        </View>

        {listRecipes.map((recipe) => (
          <Pressable
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() => navigation.navigate('TrendingRecipeDetail', { recipeId: recipe.id })}
          >
            <View style={styles.authorRow}>
              <Image source={{ uri: recipe.chefAvatar }} style={styles.avatar} />
              <View>
                <Text style={styles.authorName}>@{recipe.chef}</Text>
                <Text style={styles.authorTime}>{recipe.postedAgo}</Text>
              </View>
            </View>

            <Image source={{ uri: recipe.image }} style={styles.recipeThumb} />

            <View style={styles.cardFooter}>
              <View style={styles.titleRow}>
                <Text style={styles.recipeName}>{recipe.title}</Text>
                <View style={styles.metaBadgeRow}>
                  <Text style={styles.metaItem}>• {recipe.likes}</Text>
                  <Text style={styles.metaItem}>👁 {recipe.views}</Text>
                </View>
              </View>
              <Text style={styles.recipeDesc} numberOfLines={2}>{recipe.excerpt}</Text>
              <View style={styles.recipeBottomRow}>
                <Text style={styles.recipeTime}>⏱ {recipe.time}</Text>
                <Text style={styles.recipeLikes}>{recipe.views} lượt xem</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
    paddingBottom: 110,
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
    fontSize: 24,
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
  filterRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  filterBtnActive: {
    backgroundColor: '#F75E6C',
  },
  filterLabel: {
    color: '#F56A77',
    fontWeight: '500',
    fontSize: 12,
  },
  filterLabelActive: {
    color: '#FFFFFF',
  },
  recipeCard: {
    marginTop: 14,
    paddingBottom: 2,
    borderBottomColor: '#F0CDD2',
    borderBottomWidth: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 12,
  },
  authorName: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
  },
  authorTime: {
    color: '#A1A1A1',
    fontSize: 9,
  },
  recipeThumb: {
    width: '100%',
    height: 132,
    borderRadius: 10,
  },
  cardFooter: {
    marginTop: -2,
    backgroundColor: '#F75E6C',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    paddingHorizontal: 8,
    paddingTop: 7,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaBadgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  recipeName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
    paddingRight: 6,
  },
  metaItem: {
    color: '#FFE5E8',
    fontSize: 9,
  },
  recipeDesc: {
    color: '#FFE8EB',
    fontSize: 9,
    marginTop: 3,
    lineHeight: 14,
  },
  recipeBottomRow: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeTime: {
    color: '#FFE8EB',
    fontSize: 9,
  },
  recipeLikes: {
    color: '#FFE8EB',
    fontSize: 9,
  },
});
