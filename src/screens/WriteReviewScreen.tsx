import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trendingRecipes } from '../data/trendingRecipes';
import { HomeStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<HomeStackParamList, 'WriteReview'>;

export function WriteReviewScreen({ route, navigation }: Props) {
  const recipe = useMemo(
    () => trendingRecipes.find((item) => item.id === route.params.recipeId) ?? trendingRecipes[0],
    [route.params.recipeId],
  );
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [recommend, setRecommend] = useState<'yes' | 'no'>('yes');
  const [showDone, setShowDone] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Viết Đánh Giá</Text>
          <View style={styles.headerGhost} />
        </View>

        <View style={styles.recipeBlock}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          <View style={styles.recipeFooter}>
            <Text style={styles.recipeName}>{recipe.title}</Text>
          </View>
        </View>

        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Pressable key={item} onPress={() => setRating(item)}>
              <Ionicons name={item <= rating ? 'star' : 'star-outline'} size={26} color="#F65B6B" />
            </Pressable>
          ))}
        </View>
        <Text style={styles.starHint}>Đánh giá chung của bạn</Text>

        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          placeholder="Hãy viết đánh giá của bạn!"
          placeholderTextColor="#A67880"
          style={styles.textArea}
        />

        <Pressable style={styles.addImageRow}>
          <Ionicons name="add-circle-outline" size={14} color="#F07885" />
          <Text style={styles.addImageText}>Thêm Ảnh</Text>
        </Pressable>

        <Text style={styles.question}>Bạn có muốn đề xuất công thức này không?</Text>
        <View style={styles.yesNoRow}>
          <Pressable style={styles.choiceItem} onPress={() => setRecommend('no')}>
            <Text style={styles.yesNoText}>Không</Text>
            <Ionicons name={recommend === 'no' ? 'radio-button-on' : 'radio-button-off'} size={14} color="#F15C6A" />
          </Pressable>
          <Pressable style={styles.choiceItem} onPress={() => setRecommend('yes')}>
            <Text style={styles.yesNoText}>Có</Text>
            <Ionicons name={recommend === 'yes' ? 'radio-button-on' : 'radio-button-off'} size={14} color="#F15C6A" />
          </Pressable>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={[styles.actionBtn, styles.cancelBtn]} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Hủy</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.submitBtn]} onPress={() => setShowDone(true)}>
            <Text style={styles.submitText}>Gửi</Text>
          </Pressable>
        </View>
      </ScrollView>

      {showDone ? (
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Cảm Ơn Bạn Đã Gửi Đánh Giá!</Text>
            <View style={styles.checkWrap}>
              <Ionicons name="checkmark" size={42} color="#F45D6C" />
            </View>
            <Text style={styles.dialogText}>Cảm ơn bạn đã dành thời gian chia sẻ ý kiến với cộng đồng.</Text>
            <Pressable
              style={styles.homeBtn}
              onPress={() => {
                setShowDone(false);
                navigation.navigate('HomeLanding');
              }}
            >
              <Text style={styles.homeBtnText}>Quay Về Trang Chủ</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1EFF0',
  },
  content: {
    flexGrow: 1,
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
    fontSize: 24,
    fontWeight: '800',
  },
  headerGhost: {
    width: 17,
  },
  recipeBlock: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 118,
  },
  recipeFooter: {
    backgroundColor: '#F75E6C',
    paddingVertical: 8,
    alignItems: 'center',
  },
  recipeName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 34,
  },
  starRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starHint: {
    marginTop: 4,
    textAlign: 'center',
    color: '#8A8A8A',
    fontSize: 10,
  },
  textArea: {
    marginTop: 12,
    height: 92,
    borderRadius: 10,
    backgroundColor: '#F8CBD2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
    color: '#4A4A4A',
  },
  addImageRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addImageText: {
    color: '#7B7B7B',
    fontSize: 12,
  },
  question: {
    marginTop: 10,
    color: '#555',
    fontSize: 11,
  },
  yesNoRow: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 30,
  },
  choiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  yesNoText: {
    color: '#7A7A7A',
    fontSize: 12,
  },
  actionRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F8CBD2',
  },
  submitBtn: {
    backgroundColor: '#F15C6A',
  },
  cancelText: {
    color: '#C66C78',
    fontWeight: '700',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  dialog: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 18,
    alignItems: 'center',
  },
  dialogTitle: {
    color: '#2A2A2A',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 34,
    lineHeight: 38,
  },
  checkWrap: {
    marginTop: 10,
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F7B4BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
  },
  homeBtn: {
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: '#F15C6A',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
