import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myRecipes } from '../data/yourRecipes';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'YourRecipeDetail'>;

export function YourRecipeDetailScreen({ route, navigation }: Props) {
  const recipe = myRecipes.find((item) => item.id === route.params.recipeId) ?? myRecipes[0];
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(recipe.title);
  const [editTime, setEditTime] = useState(recipe.time);
  const [isPublished, setIsPublished] = useState(true);

  const handleDeleteRecipe = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Công Thức Đang Thịnh Hành</Text>
          <View style={styles.headerIcons}>
            <Pressable
              style={styles.iconBubble}
              onPress={() => setEditModalVisible(true)}
            >
              <Ionicons name="create-outline" size={12} color="#F35E6D" />
            </Pressable>
            <Pressable
              style={styles.iconBubble}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Ionicons name="trash-outline" size={12} color="#F35E6D" />
            </Pressable>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Image source={{ uri: recipe.image }} style={styles.heroImage} />
          <View style={styles.heroFooter}>
            <Text style={styles.heroTitle}>{recipe.title}</Text>
            <View style={styles.heroMetaRow}>
              <Text style={styles.heroMeta}>★ {recipe.likes}</Text>
              <Text style={styles.heroMeta}>⏱ {recipe.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.chefRow}>
          <Image source={{ uri: recipe.chefAvatar }} style={styles.chefAvatar} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.chefUser}>{recipe.chefUser}</Text>
            <Text style={styles.chefName}>{recipe.chefName}</Text>
          </View>
          <View style={styles.followBtn}><Text style={styles.followText}>Đang Theo Dõi</Text></View>
          <Ionicons name="ellipsis-vertical" size={14} color="#F35E6D" />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Chi Tiết</Text>
          <Text style={styles.sectionTime}>⏱ {recipe.time}</Text>
        </View>
        <Text style={styles.details}>{recipe.details}</Text>

        <Text style={styles.ingTitle}>Nguyên Liệu</Text>
        {recipe.ingredients.map((ing) => (
          <Text key={ing} style={styles.ingItem}>• {ing}</Text>
        ))}
      </ScrollView>

      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setEditModalVisible(false)}
        >
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHeader}>
              <Pressable onPress={() => setEditModalVisible(false)}>
                <Ionicons name="chevron-back" size={20} color="#F06C79" />
              </Pressable>
              <Text style={styles.sheetTitle}>Chỉnh Sửa Công Thức</Text>
              <View style={{ width: 20 }} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.inputLabel}>Tiêu đề</Text>
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Nhập tiêu đề..."
                placeholderTextColor="#D9959F"
                style={styles.textInput}
              />

              <Text style={[styles.inputLabel, { marginTop: 12 }]}>Mô tả ngắn</Text>
              <TextInput
                placeholder="Nhập mô tả..."
                placeholderTextColor="#D9959F"
                style={styles.textInput}
              />

              <Text style={[styles.inputLabel, { marginTop: 12 }]}>Mô tả công thức</Text>
              <TextInput
                placeholder="Nhập mô tả chi tiết..."
                placeholderTextColor="#D9959F"
                style={[styles.textInput, styles.multilineInput]}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.inputLabel, { marginTop: 12 }]}>Thời gian thực hiện</Text>
              <TextInput
                value={editTime}
                onChangeText={setEditTime}
                placeholder="Nhập thời gian..."
                placeholderTextColor="#D9959F"
                style={styles.textInput}
              />

              <Text style={[styles.inputLabel, { marginTop: 12 }]}>Nguyên liệu</Text>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Xuất bản công thức</Text>
                <Switch
                  value={isPublished}
                  onValueChange={setIsPublished}
                  thumbColor="#FFFFFF"
                  trackColor={{ false: '#F6CCD2', true: '#F56A78' }}
                  ios_backgroundColor="#F6CCD2"
                />
              </View>

              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.btn, styles.btnSecondary]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.btnSecondaryText}>Hủy</Text>
                </Pressable>
                <Pressable
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.btnPrimaryText}>Lưu</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setDeleteModalVisible(false)}
        >
          <Pressable style={styles.deleteSheet} onPress={() => {}}>
            <Text style={styles.deleteTitle}>Xoá Công Thức</Text>
            <Text style={styles.deleteMessage}>Bạn có chắc chắn muốn xoá công thức này?</Text>

            <View style={styles.deleteButtonRow}>
              <Pressable
                style={[styles.btn, styles.btnSecondary]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.btnSecondaryText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.btn, styles.btnDanger]}
                onPress={handleDeleteRecipe}
              >
                <Text style={styles.btnDangerText}>Xoá</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F0F1' },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 110 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { flex: 1, marginHorizontal: 10, color: '#F35E6D', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  headerIcons: { flexDirection: 'row', gap: 6 },
  iconBubble: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FCD7DC', alignItems: 'center', justifyContent: 'center' },
  heroCard: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
  heroImage: { width: '100%', height: 194 },
  heroFooter: { backgroundColor: '#F75E6C', paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
  heroTitle: { flex: 1, color: '#FFFFFF', fontWeight: '700', fontSize: 22 },
  heroMetaRow: { flexDirection: 'row', gap: 8 },
  heroMeta: { color: '#FFE5E8', fontSize: 10 },
  chefRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  chefAvatar: { width: 36, height: 36, borderRadius: 18 },
  chefUser: { color: '#F35E6D', fontWeight: '700', fontSize: 12 },
  chefName: { color: '#666', fontSize: 11 },
  followBtn: { marginRight: 6, backgroundColor: '#F8CBD2', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  followText: { color: '#F06C79', fontWeight: '700', fontSize: 10 },
  sectionRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { color: '#F35E6D', fontWeight: '800', fontSize: 29 },
  sectionTime: { marginLeft: 10, color: '#5A5A5A', fontSize: 11 },
  details: { marginTop: 8, color: '#555', fontSize: 12, lineHeight: 18 },
  ingTitle: { marginTop: 14, color: '#F35E6D', fontWeight: '800', fontSize: 29 },
  ingItem: { color: '#EC6A78', fontSize: 12, lineHeight: 19 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '85%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sheetTitle: {
    color: '#F35E6D',
    fontSize: 16,
    fontWeight: '700',
  },
  formSection: {
    maxHeight: 450,
  },
  inputLabel: {
    color: '#5B5B5B',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    borderRadius: 6,
    backgroundColor: '#F7CAD1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#5B5B5B',
    fontSize: 11,
  },
  multilineInput: {
    minHeight: 62,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: {
    color: '#5B5B5B',
    fontSize: 11,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#F75E6C',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  btnSecondary: {
    backgroundColor: '#F7CAD1',
  },
  btnSecondaryText: {
    color: '#E97A88',
    fontSize: 11,
    fontWeight: '600',
  },
  deleteSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  deleteTitle: {
    color: '#F35E6D',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  deleteMessage: {
    color: '#5B5B5B',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButtonRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  btnDanger: {
    backgroundColor: '#F75E6C',
  },
  btnDangerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
