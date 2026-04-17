import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryRecipes, CategoryId } from '../data/categoryRecipes';
import { HomeStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<HomeStackParamList, 'RecipeSearch'>;

type SearchItem = {
  id: string;
  title: string;
  image: string;
  rating: string;
  time: string;
  categoryId: CategoryId;
  details: string;
  ingredients: string[];
};

const chips = [
  'Mì Ý',
  'Hải sản',
  'Bánh mì',
  'Chả giò',
  'Hamburger',
  'Đồ chay',
  'Spaghetti',
  'Pad Thai',
  'Món cuốn',
  'Cá hồi nướng',
];

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export function RecipeSearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [submittedChips, setSubmittedChips] = useState<string[]>([]);

  const dataset = useMemo<SearchItem[]>(() => {
    const records: SearchItem[] = [];
    (Object.keys(categoryRecipes) as CategoryId[]).forEach((categoryId) => {
      categoryRecipes[categoryId].forEach((recipe) => {
        records.push({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          rating: recipe.rating,
          time: recipe.time,
          categoryId,
          details: recipe.details,
          ingredients: recipe.ingredients,
        });
      });
    });
    return records;
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = normalize(submittedQuery);
    const hasText = normalizedQuery.length > 0;
    const hasChips = submittedChips.length > 0;

    if (!hasText && !hasChips) {
      return dataset.slice(0, 6);
    }

    return dataset.filter((item) => {
      const haystack = normalize([item.title, item.details, ...item.ingredients].join(' '));
      const textMatch = !hasText || haystack.includes(normalizedQuery);
      const chipMatch =
        !hasChips ||
        submittedChips.every((chip) => {
          return haystack.includes(normalize(chip));
        });
      return textMatch && chipMatch;
    });
  }, [dataset, submittedChips, submittedQuery]);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) => (prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]));
  };

  const runSearch = () => {
    setSubmittedQuery(query);
    setSubmittedChips(selectedChips);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchPanel}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Gợi ý công thức nấu ăn"
            placeholderTextColor="#E0909A"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={runSearch}
          />

          <Text style={styles.sectionTitle}>Gợi ý công thức nấu ăn</Text>

          <View style={styles.chipWrap}>
            {chips.map((chip) => {
              const selected = selectedChips.includes(chip);
              return (
                <Pressable key={chip} onPress={() => toggleChip(chip)}>
                  <Text style={[styles.chip, selected && styles.chipActive]}>{chip}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.addRow}>
            <Ionicons name="add-circle-outline" size={14} color="#F1808B" />
            <Text style={styles.addText}>Thêm dị ứng</Text>
          </View>

          <Pressable style={styles.searchButton} onPress={runSearch}>
            <Text style={styles.searchButtonText}>Tìm kiếm</Text>
          </Pressable>
        </View>

        <View style={styles.resultsPanel}>
          <Text style={styles.resultsTitle}>Kết quả ({results.length})</Text>
          <View style={styles.resultGrid}>
            {results.slice(0, 8).map((item) => (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.getParent()?.navigate('ProfileTab', {
                    screen: 'CategoryRecipeDetail',
                    params: { categoryId: item.categoryId, recipeId: item.id },
                  })
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.rating} ★   |   {item.time}</Text>
              </Pressable>
            ))}
          </View>
          {results.length === 0 ? <Text style={styles.emptyText}>Không có kết quả phù hợp.</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EFEDEE',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#F45D6C',
    fontSize: 22,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 18,
  },
  searchPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#AE7B82',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: '#F9D5DA',
    borderRadius: 999,
    height: 32,
    paddingHorizontal: 12,
    color: '#CB4E5E',
    fontSize: 12,
  },
  sectionTitle: {
    marginTop: 10,
    color: '#3A3A3A',
    fontSize: 12,
    fontWeight: '600',
  },
  chipWrap: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#FBDADF',
    color: '#D96A77',
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#F8717E',
    color: '#FFFFFF',
  },
  addRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addText: {
    color: '#7A7A7A',
    fontSize: 11,
  },
  searchButton: {
    marginTop: 14,
    alignSelf: 'center',
    width: 132,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#F75E6C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  resultsPanel: {
    marginTop: 12,
    paddingBottom: 8,
  },
  resultsTitle: {
    color: '#E06A77',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '48.8%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2D3D8',
  },
  image: {
    width: '100%',
    height: 80,
  },
  cardTitle: {
    paddingHorizontal: 8,
    paddingTop: 6,
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  cardMeta: {
    paddingHorizontal: 8,
    paddingBottom: 7,
    color: '#E06A77',
    fontSize: 9,
  },
  emptyText: {
    marginTop: 8,
    color: '#9F7A80',
    fontSize: 11,
  },
});
