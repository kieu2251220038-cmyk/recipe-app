import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryId, categoryRecipes } from '../data/categoryRecipes';
import { favoriteRecipes, recipeCollections } from '../data/favorites';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Favorites'>;

export function FavoritesScreen({ navigation, route }: Props) {
  const collectionId = route.params?.collectionId;

  const collection = useMemo(() => {
    if (!collectionId) return recipeCollections[0];
    return recipeCollections.find((item) => item.id === collectionId) ?? recipeCollections[0];
  }, [collectionId]);

  const collectionRecipes = useMemo(() => {
    if (!collectionId) return favoriteRecipes;
    const filtered = favoriteRecipes.filter((item) => item.collectionId === collectionId);
    return filtered.length ? filtered : favoriteRecipes;
  }, [collectionId]);

  const resolveDetailRoute = (itemCollectionId?: string): { categoryId: CategoryId; recipeId: string } => {
    const categoryId: CategoryId = itemCollectionId === 'col1' ? 'dessert' : 'vegan';
    const recipeId = categoryRecipes[categoryId][0]?.id ?? categoryRecipes.dessert[0].id;
    return { categoryId, recipeId };
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>{route.params?.collectionName ?? collection.name}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={collectionRecipes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <Pressable
                style={styles.recipeCard}
                onPress={() => {
                  const detailRoute = resolveDetailRoute(item.collectionId);
                  navigation.navigate('CategoryRecipeDetail', detailRoute);
                }}
              >
                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                <View style={styles.recipeFooter}>
                  <Text style={styles.recipeTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text style={styles.recipeDesc} numberOfLines={1}>
                      {item.description}
                    </Text>
                  )}
                  <View style={styles.recipeMetaRow}>
                    <Text style={styles.recipeMeta}>★ {item.likes}</Text>
                    <Text style={styles.recipeMeta}>◷ {item.time}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#F35E6D',
    fontSize: 21,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 17,
  },
  gridContent: {
    paddingBottom: 96,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 8,
  },
  gridItem: {
    flex: 1,
    marginBottom: 12,
  },
  recipeCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2CBD0',
  },
  recipeImage: {
    width: '100%',
    height: 112,
  },
  recipeFooter: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  recipeTitle: {
    color: '#4F4F4F',
    fontSize: 11,
    fontWeight: '700',
  },
  recipeDesc: {
    color: '#8F8F8F',
    fontSize: 8,
    marginTop: 2,
  },
  recipeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  recipeMeta: {
    color: '#F06C79',
    fontSize: 9,
  },
});
