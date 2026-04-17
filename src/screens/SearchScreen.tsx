import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryId } from '../data/categoryRecipes';

const topTabs = ['Phổ biến nhất', 'Mới nhất', 'Cạnh tranh'] as const;

type CommunityPost = {
  id: string;
  categoryId: CategoryId;
  recipeId: string;
  chef: string;
  postedAgo: string;
  title: string;
  description: string;
  image: string;
  rating: string;
  views: string;
};

const allPosts: CommunityPost[] = [
  {
    id: 'cp-1',
    categoryId: 'vegan',
    recipeId: 've5',
    chef: '@gclq_food',
    postedAgo: '1 min trước',
    title: 'Mì Ý sốt Bechamel',
    description: 'Mỳ Ý sốt béchamel mịn vị nấm, thơm bơ nhẹ, ăn rất cuốn.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    rating: '4.6',
    views: '49564',
  },
  {
    id: 'cp-2',
    categoryId: 'seafood',
    recipeId: 'se2',
    chef: '@torres_meat',
    postedAgo: '15 min trước',
    title: 'Cánh Gà Nướng',
    description: 'Cánh gà nướng sốt cay ngọt, lớp ngoài óng, thịt bên trong mọng.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80',
    rating: '4.1',
    views: '31547',
  },
  {
    id: 'cp-3',
    categoryId: 'dessert',
    recipeId: 'de2',
    chef: '@flavourwithvihan',
    postedAgo: '3 min trước',
    title: 'Bánh Brownie Hạt',
    description: 'Brownie ngọt đậm với hạt óc chó rang giòn ở lớp trên.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    rating: '4.7',
    views: '78579',
  },
];

export function CommunityScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<(typeof topTabs)[number]>('Cạnh tranh');

  const posts = useMemo(() => {
    if (activeTab === 'Mới nhất') {
      return [...allPosts].reverse();
    }
    if (activeTab === 'Phổ biến nhất') {
      return [...allPosts].sort((a, b) => Number(b.views) - Number(a.views));
    }
    return allPosts;
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.statusText}>16:04</Text>

        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.navigate('HomeTab')}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Cộng Đồng</Text>
          <View style={styles.headerIcons}>
            <Pressable style={styles.iconWrap}>
              <Ionicons name="heart-outline" size={13} color="#F15C6A" />
            </Pressable>
            <Pressable style={styles.iconWrap} onPress={() => navigation.navigate('NotificationTab')}>
              <Ionicons name="notifications-outline" size={13} color="#F15C6A" />
            </Pressable>
          </View>
        </View>

        <View style={styles.tabRow}>
          {topTabs.map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {posts.map((item) => (
          <View key={item.id} style={styles.postWrap}>
            <View style={styles.userRow}>
              <View style={styles.dotAvatar} />
              <View style={styles.userMeta}>
                <Text style={styles.userName}>{item.chef}</Text>
                <Text style={styles.userTime}>{item.postedAgo}</Text>
              </View>
            </View>

            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProfileTab', {
                  screen: 'CategoryRecipeDetail',
                  params: { categoryId: item.categoryId, recipeId: item.recipeId },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardFooter}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardStats}>
                  <Text style={styles.cardMeta}>★ {item.rating}</Text>
                  <Text style={styles.cardMeta}>◔ {item.views}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
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
    paddingBottom: 110,
  },
  statusText: {
    color: '#141414',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F45D6C',
    fontSize: 20,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  iconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAD5DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2C9CF',
    paddingBottom: 7,
  },
  tabText: {
    color: '#D58C95',
    fontSize: 11,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#F45D6C',
  },
  postWrap: {
    marginTop: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dotAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D8C7CA',
  },
  userMeta: {
    marginLeft: 8,
  },
  userName: {
    color: '#E56D7A',
    fontSize: 10,
    fontWeight: '700',
  },
  userTime: {
    color: '#AEA4A6',
    fontSize: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3CCD1',
  },
  image: {
    width: '100%',
    height: 146,
  },
  cardFooter: {
    backgroundColor: '#F75E6C',
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 8,
  },
  cardMeta: {
    color: '#FFE5E8',
    fontSize: 9,
  },
  cardDescription: {
    color: '#D56D79',
    fontSize: 10,
    lineHeight: 14,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 10,
  },
});
