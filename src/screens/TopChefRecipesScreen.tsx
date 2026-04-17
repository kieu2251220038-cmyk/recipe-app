import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chefRecipes, topChefs } from '../data/topChefs';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TopChefRecipes'>;

export function TopChefRecipesScreen({ navigation, route }: Props) {
  const chef = topChefs.find((item) => item.id === route.params.chefId) ?? topChefs[0];
  const pageTitle = chef.id === 'neil' ? 'Thực Đơn Đồ Chay' : `Món Của ${chef.name.split(' ')[0]}`;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.title}>{pageTitle}</Text>
          <View style={styles.headerIcons}>
            <View style={styles.iconBubble}><Ionicons name="notifications-outline" size={12} color="#F35E6D" /></View>
            <View style={styles.iconBubble}><Ionicons name="search-outline" size={12} color="#F35E6D" /></View>
          </View>
        </View>

        <View style={styles.grid}>
          {chefRecipes.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.meta}>★ {item.likes}</Text>
                <Text style={styles.meta}>⏱ {item.time}</Text>
              </View>
            </View>
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
  title: { color: '#F35E6D', fontSize: 34, fontWeight: '800', flex: 1, textAlign: 'center' },
  headerIcons: { flexDirection: 'row', gap: 6 },
  iconBubble: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FCD7DC', alignItems: 'center', justifyContent: 'center' },
  grid: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  card: { width: '48%', borderWidth: 1, borderColor: '#F1CBD1', borderRadius: 10, overflow: 'hidden', backgroundColor: '#FFFFFF' },
  image: { width: '100%', height: 104 },
  name: { paddingHorizontal: 6, paddingTop: 6, color: '#333', fontSize: 10, minHeight: 30 },
  metaRow: { paddingHorizontal: 6, paddingBottom: 6, flexDirection: 'row', justifyContent: 'space-between' },
  meta: { color: '#F06A78', fontSize: 9 },
});
