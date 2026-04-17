import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myRecipes } from '../data/yourRecipes';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'YourRecipes'>;

export function YourRecipesScreen({ navigation }: Props) {
  const featured = myRecipes.slice(0, 2);
  const others = myRecipes.slice(2);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Món Ăn</Text>
          <View style={styles.headerIcons}>
            <View style={styles.iconBubble}><Ionicons name="notifications-outline" size={12} color="#F35E6D" /></View>
            <Pressable style={styles.iconBubble} onPress={() => navigation.navigate('AddRecipe')}>
              <Ionicons name="add" size={13} color="#F35E6D" />
            </Pressable>
          </View>
        </View>

        <View style={styles.featuredBox}>
          <Text style={styles.featuredLabel}>Được Xem Nhiều Nhất Hôm Nay</Text>
          <View style={styles.featuredRow}>
            {featured.map((item) => (
              <Pressable
                key={item.id}
                style={styles.featuredCard}
                onPress={() => navigation.navigate('YourRecipeDetail', { recipeId: item.id })}
              >
                <View>
                  <Image source={{ uri: item.image }} style={styles.featuredImage} />
                  <View style={styles.likeTag}>
                    <Ionicons name="heart" size={10} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.featuredName} numberOfLines={1}>{item.title}</Text>
                <View style={styles.featuredMetaRow}>
                  <Text style={styles.featuredMeta}>★ {item.likes}</Text>
                  <Text style={styles.featuredMeta}>⏱ {item.time}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.grid}>
          {others.map((item) => (
            <Pressable key={item.id} style={styles.gridCard} onPress={() => navigation.navigate('YourRecipeDetail', { recipeId: item.id })}>
              <Image source={{ uri: item.image }} style={styles.gridImage} />
              <Text style={styles.gridName} numberOfLines={2}>{item.title}</Text>
              <View style={styles.gridMetaRow}>
                <Text style={styles.gridMeta}>★ {item.likes}</Text>
                <Text style={styles.gridMeta}>⏱ {item.time}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F0F1' },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 110 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#F35E6D', fontSize: 32, fontWeight: '800' },
  headerIcons: { flexDirection: 'row', gap: 6 },
  iconBubble: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FCD7DC', alignItems: 'center', justifyContent: 'center' },
  featuredBox: { marginTop: 10, backgroundColor: '#F75E6C', borderRadius: 14, padding: 10 },
  featuredLabel: { color: '#FFFFFF', fontWeight: '700', marginBottom: 8, fontSize: 11 },
  featuredRow: { flexDirection: 'row', gap: 8 },
  featuredCard: { flex: 1, borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  featuredImage: { width: '100%', height: 86 },
  likeTag: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F56A79',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredName: { paddingHorizontal: 6, paddingTop: 4, color: '#474747', fontWeight: '600', fontSize: 10 },
  featuredMetaRow: { paddingHorizontal: 6, paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
  featuredMeta: { color: '#F06C79', fontSize: 9 },
  grid: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  gridCard: { width: '48.5%', borderWidth: 1, borderColor: '#F2CDD2', borderRadius: 12, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  gridImage: { width: '100%', height: 94 },
  gridName: { paddingHorizontal: 6, paddingTop: 5, color: '#474747', fontWeight: '600', fontSize: 10, minHeight: 30 },
  gridMetaRow: { paddingHorizontal: 6, paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
  gridMeta: { color: '#F06C79', fontSize: 9 },
});
