import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { topChefs } from '../data/topChefs';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TopChef'>;

export function TopChefScreen({ navigation }: Props) {
  const featured = topChefs.slice(0, 2);
  const favorites = topChefs.slice(2, 4);
  const newcomers = topChefs.slice(4, 6);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.title}>Đầu Bếp Hàng Đầu</Text>
          <View style={styles.headerIcons}>
            <View style={styles.iconBubble}><Ionicons name="notifications-outline" size={12} color="#F35E6D" /></View>
            <View style={styles.iconBubble}><Ionicons name="search-outline" size={12} color="#F35E6D" /></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Đầu Bếp Được Xem Nhiều Nhất</Text>
        <View style={styles.featuredWrap}>
          {featured.map((chef) => (
            <Pressable key={chef.id} style={styles.featuredCard} onPress={() => navigation.navigate('TopChefProfile', { chefId: chef.id })}>
              <Image source={{ uri: chef.avatar }} style={styles.featuredImage} />
              <Text style={styles.featuredName}>{chef.name}</Text>
              <Text style={styles.featuredRole}>{chef.username}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.popularity}>{chef.popularity}</Text>
                <View style={styles.followBadge}><Text style={styles.followText}>Following</Text></View>
                <Ionicons name="share-social-outline" size={10} color="#F35E6D" />
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Đầu Bếp Được Thích Nhiều Nhất</Text>
        <View style={styles.grid}>
          {favorites.map((chef) => (
            <Pressable key={chef.id} style={styles.gridCard} onPress={() => navigation.navigate('TopChefProfile', { chefId: chef.id })}>
              <Image source={{ uri: chef.avatar }} style={styles.gridImage} />
              <Text style={styles.gridName}>{chef.name}</Text>
              <Text style={styles.gridRole}>{chef.username}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.popularity}>{chef.popularity}</Text>
                <View style={styles.followBadge}><Text style={styles.followText}>Following</Text></View>
                <Ionicons name="share-social-outline" size={10} color="#F35E6D" />
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Các Đầu Bếp Mới</Text>
        <View style={styles.grid}>
          {newcomers.map((chef) => (
            <Pressable key={`new-${chef.id}`} style={styles.gridCard} onPress={() => navigation.navigate('TopChefProfile', { chefId: chef.id })}>
              <Image source={{ uri: chef.avatar }} style={styles.gridImage} />
              <Text style={styles.gridName}>{chef.name}</Text>
              <Text style={styles.gridRole}>{chef.username}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.popularity}>{chef.popularity}</Text>
                <View style={styles.followBadge}><Text style={styles.followText}>Following</Text></View>
                <Ionicons name="share-social-outline" size={10} color="#F35E6D" />
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
  title: { color: '#F35E6D', fontSize: 24, fontWeight: '800', flex: 1, textAlign: 'center' },
  headerIcons: { flexDirection: 'row', gap: 6 },
  iconBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FCD7DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { marginTop: 10, marginBottom: 8, color: '#F35E6D', fontSize: 12, fontWeight: '700' },
  featuredWrap: {
    backgroundColor: '#F75E6C',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    gap: 8,
  },
  featuredCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 6 },
  featuredImage: { width: '100%', height: 98, borderRadius: 8 },
  featuredName: { marginTop: 4, color: '#303030', fontSize: 10, fontWeight: '700' },
  featuredRole: { color: '#D06472', fontSize: 9 },
  cardFooter: { marginTop: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  popularity: { color: '#F06A78', fontSize: 10 },
  followBadge: { backgroundColor: '#F8CBD2', borderRadius: 999, paddingHorizontal: 6, paddingVertical: 1 },
  followText: { color: '#F06A78', fontSize: 8, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 8 },
  gridCard: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#F2CDD2',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 6,
  },
  gridImage: { width: '100%', height: 104, borderRadius: 8 },
  gridName: { marginTop: 4, color: '#303030', fontSize: 10, fontWeight: '700' },
  gridRole: { color: '#D06472', fontSize: 9 },
});
