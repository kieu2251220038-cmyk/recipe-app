import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trendingRecipes } from '../data/trendingRecipes';
import { HomeStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<HomeStackParamList, 'RecipeReviews'>;

const sampleReviews = [
  {
    id: 'r1',
    user: '@r_joshua',
    time: '15 Phút Trước',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=120&q=80',
    text: 'Công thức này thật tuyệt vời! Thịt gà rất mềm và mọng nước, gia vị nêm nếm cực kỳ vừa miệng. Cả gia đình mình đều rất thích món burger này.',
    stars: 4,
  },
  {
    id: 'r2',
    user: '@josh-ryan',
    time: '40 Phút Trước',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    text: 'Bánh rất ngon và dễ làm tại nhà. Mình đã thêm một chút ớt bột để cay hơn một chút theo sở thích cá nhân. Cảm ơn đầu bếp đã chia sẻ!',
    stars: 3,
  },
  {
    id: 'r3',
    user: '@sweet-bear',
    time: '1 giờ trước',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    text: 'Món này hơi tốn thời gian chuẩn bị nhưng thành phẩm rất đáng thử. Phần sốt burger nên thêm chút mù tạt sẽ dậy vị hơn.',
    stars: 2,
  },
];

export function RecipeReviewsScreen({ route, navigation }: Props) {
  const recipe = trendingRecipes.find((item) => item.id === route.params.recipeId) ?? trendingRecipes[0];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Đánh Giá</Text>
          <View style={styles.headerGhost} />
        </View>

        <View style={styles.recipeCard}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.recipeBody}>
            <Text style={styles.recipeName}>{recipe.title}</Text>
            <Text style={styles.recipeMeta}>({sampleReviews.length + 455} Đánh giá)</Text>
            <View style={styles.recipeChefRow}>
              <Image source={{ uri: recipe.chefAvatar }} style={styles.chefAvatar} />
              <View>
                <Text style={styles.recipeChefUser}>@{recipe.chef}</Text>
                <Text style={styles.recipeChef}>{recipe.chefRole}</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate('WriteReview', { recipeId: recipe.id })}>
              <Text style={styles.addReview}>+Thêm Đánh Giá</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.commentsTitle}>Bình Luận</Text>

        {sampleReviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewTopRow}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <Text style={styles.reviewUser}>{review.user}</Text>
              <Text style={styles.reviewTime}>{review.time}</Text>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={`${review.id}-${star}`}
                  name={star <= review.stars ? 'star' : 'star-outline'}
                  size={13}
                  color="#F15C6A"
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F1F2',
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F15C6A',
    fontSize: 26,
    fontWeight: '800',
  },
  headerGhost: {
    width: 17,
  },
  recipeCard: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: '#F75E6C',
    padding: 8,
    flexDirection: 'row',
  },
  recipeImage: {
    width: 86,
    height: 86,
    borderRadius: 12,
  },
  recipeBody: {
    flex: 1,
    marginLeft: 8,
  },
  recipeName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  recipeMeta: {
    marginTop: 2,
    color: '#FFE5E8',
    fontSize: 10,
  },
  recipeChefRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chefAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  recipeChefUser: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  recipeChef: {
    color: '#FFE5E8',
    fontSize: 10,
  },
  addReview: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  commentsTitle: {
    marginTop: 12,
    color: '#F35E6D',
    fontWeight: '700',
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2CDD2',
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  reviewUser: {
    marginLeft: 6,
    color: '#F35E6D',
    fontWeight: '700',
    fontSize: 12,
  },
  reviewTime: {
    marginLeft: 'auto',
    color: '#B8A0A5',
    fontSize: 9,
  },
  reviewText: {
    marginTop: 8,
    color: '#595959',
    fontSize: 11,
    lineHeight: 16,
  },
  starsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
});
