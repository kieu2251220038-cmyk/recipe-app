import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'AddRecipe'>;

const sampleImages = [
  'https://images.unsplash.com/photo-1553787499-6f913324e116?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1100&q=80',
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1100&q=80',
];

export function AddRecipeScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('20 phút');
  const [ingredients, setIngredients] = useState<string[]>(['', '']);
  const [steps, setSteps] = useState<string[]>(['', '']);
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const canSave = useMemo(() => {
    return title.trim().length > 0 && ingredients.some((item) => item.trim()) && steps.some((item) => item.trim());
  }, [ingredients, steps, title]);

  const selectedImage = imageIndex === null ? null : sampleImages[imageIndex];

  const updateIngredient = (index: number, value: string) => {
    setIngredients((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== index)));
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, '']);
  };

  const updateStep = (index: number, value: string) => {
    setSteps((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const removeStep = (index: number) => {
    setSteps((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== index)));
  };

  const addStep = () => {
    setSteps((prev) => [...prev, '']);
  };

  const cycleImage = () => {
    if (imageIndex === null) {
      setImageIndex(0);
      return;
    }
    setImageIndex((prev) => ((prev ?? 0) + 1) % sampleImages.length);
  };

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  const handleConfirmSave = () => {
    setSaveModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F15C6A" />
          </Pressable>
          <Text style={styles.headerTitle}>Tạo Công Thức</Text>
          <View style={{ width: 17 }} />
        </View>

        <View style={styles.topActions}>
          <Pressable style={[styles.topPill, styles.topPillSoft]} onPress={() => setSaveModalVisible(true)}>
            <Text style={[styles.topPillText, styles.topPillTextSoft]}>Xuất bản</Text>
          </Pressable>
          <Pressable style={[styles.topPill, styles.topPillDanger]} onPress={() => setDeleteModalVisible(true)}>
            <Text style={[styles.topPillText, styles.topPillTextDanger]}>Xóa</Text>
          </Pressable>
        </View>

        <Pressable style={styles.uploadBox} onPress={cycleImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.uploadImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <View style={styles.playCircle}>
                <Ionicons name="play" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.uploadHint}>Thêm video</Text>
            </View>
          )}
        </Pressable>

        <Text style={styles.fieldLabel}>Tiêu đề</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Mô tả tiêu đề"
          placeholderTextColor="#D48A94"
          style={styles.input}
        />

        <Text style={styles.fieldLabel}>Mô tả</Text>
        <TextInput
          value={shortDesc}
          onChangeText={setShortDesc}
          placeholder="Mô tả ngắn công thức"
          placeholderTextColor="#D48A94"
          style={styles.input}
        />

        <Text style={styles.fieldLabel}>Mô tả chi tiết</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Mô tả công thức"
          placeholderTextColor="#D48A94"
          style={[styles.input, styles.multilineInput]}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.fieldLabel}>Thời gian thực hiện</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          placeholder="20 phút"
          placeholderTextColor="#D48A94"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Nguyên liệu</Text>
        {ingredients.map((item, index) => (
          <View key={`ing-${index}`} style={styles.inlineFieldRow}>
            <TextInput
              value={item}
              onChangeText={(value) => updateIngredient(index, value)}
              placeholder={`${index + 1}. Tên nguyên liệu`}
              placeholderTextColor="#D48A94"
              style={[styles.input, styles.inlineInput]}
            />
            <Pressable style={styles.removeBtn} onPress={() => removeIngredient(index)}>
              <Ionicons name="trash-outline" size={14} color="#F06C79" />
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.addBtn} onPress={addIngredient}>
          <Text style={styles.addBtnText}>Thêm nguyên liệu</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Thêm hướng dẫn</Text>
        {steps.map((item, index) => (
          <View key={`step-${index}`} style={styles.inlineFieldRow}>
            <TextInput
              value={item}
              onChangeText={(value) => updateStep(index, value)}
              placeholder={`${index + 1}. Mô tả bước`}
              placeholderTextColor="#D48A94"
              style={[styles.input, styles.inlineInput]}
            />
            <Pressable style={styles.removeBtn} onPress={() => removeStep(index)}>
              <Ionicons name="trash-outline" size={14} color="#F06C79" />
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.addBtn} onPress={addStep}>
          <Text style={styles.addBtnText}>Thêm hướng dẫn</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={deleteModalVisible} transparent animationType="fade" onRequestClose={() => setDeleteModalVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setDeleteModalVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <Text style={styles.sheetTitleDanger}>Xóa Công Thức</Text>
            <Text style={styles.sheetMessage}>Bạn có chắc chắn muốn xóa công thức</Text>
            <View style={styles.sheetBtnRow}>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnSoft]} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.sheetBtnSoftText}>Hủy</Text>
              </Pressable>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnMain]} onPress={handleConfirmDelete}>
                <Text style={styles.sheetBtnMainText}>Xóa</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={saveModalVisible} transparent animationType="fade" onRequestClose={() => setSaveModalVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setSaveModalVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <Text style={styles.sheetTitle}>Lưu Công Thức</Text>
            <Text style={styles.sheetMessage}>Bạn có chắc chắn muốn lưu công thức</Text>
            <View style={styles.sheetBtnRow}>
              <Pressable style={[styles.sheetBtn, styles.sheetBtnSoft]} onPress={() => setSaveModalVisible(false)}>
                <Text style={styles.sheetBtnSoftText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.sheetBtn, styles.sheetBtnMain, !canSave && styles.sheetBtnDisabled]}
                disabled={!canSave}
                onPress={handleConfirmSave}
              >
                <Text style={styles.sheetBtnMainText}>Lưu</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F0F1',
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
  },
  headerTitle: {
    color: '#F45D6C',
    fontSize: 17,
    fontWeight: '700',
  },
  topActions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  topPill: {
    height: 20,
    borderRadius: 999,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topPillSoft: {
    backgroundColor: '#FAD5DA',
  },
  topPillDanger: {
    backgroundColor: '#F7C5CC',
  },
  topPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  topPillTextSoft: {
    color: '#F06C79',
  },
  topPillTextDanger: {
    color: '#D65E6D',
  },
  uploadBox: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    height: 150,
    backgroundColor: '#F4D1D6',
  },
  uploadImage: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F28C98',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadHint: {
    color: '#9D7A81',
    fontSize: 10,
  },
  fieldLabel: {
    marginTop: 10,
    color: '#5A5A5A',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F8CBD2',
    paddingHorizontal: 10,
    color: '#53464A',
    fontSize: 10,
  },
  multilineInput: {
    height: 62,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  sectionTitle: {
    marginTop: 10,
    color: '#5A5A5A',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  inlineFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  inlineInput: {
    flex: 1,
  },
  removeBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FAD5DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    marginTop: 4,
    alignSelf: 'center',
    height: 26,
    borderRadius: 999,
    backgroundColor: '#F75E6C',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.42)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  sheetTitle: {
    color: '#F35E6D',
    fontSize: 14,
    fontWeight: '700',
  },
  sheetTitleDanger: {
    color: '#F35E6D',
    fontSize: 14,
    fontWeight: '700',
  },
  sheetMessage: {
    marginTop: 6,
    color: '#6A6A6A',
    fontSize: 11,
  },
  sheetBtnRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  sheetBtn: {
    flex: 1,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBtnSoft: {
    backgroundColor: '#FAD5DA',
  },
  sheetBtnSoftText: {
    color: '#DA7A86',
    fontSize: 10,
    fontWeight: '700',
  },
  sheetBtnMain: {
    backgroundColor: '#F75E6C',
  },
  sheetBtnMainText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  sheetBtnDisabled: {
    opacity: 0.5,
  },
});
