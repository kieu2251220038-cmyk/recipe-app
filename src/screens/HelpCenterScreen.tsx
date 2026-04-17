import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'HelpCenter'>;
type HelpTab = 'faq' | 'contact';

const categories = ['Chung', 'Tài Khoản', 'Dịch Vụ'];

const faqItems = [
  'Làm thế nào để đổi mật khẩu?',
  'Tôi có thể đăng nhập bằng Google không?',
  'Làm sao để cập nhật ảnh đại diện?',
  'Làm sao để lưu công thức của người khác?',
  'Chế độ tối hoạt động như thế nào?',
  'Tôi có thể chia sẻ công thức qua Facebook không?',
  'Làm cách nào để đăng công thức của riêng mình?',
  'Tại sao video của tôi không tải lên được?',
  'Tôi có thể chỉnh sửa công thức đã đăng không?',
];

const contactItems = [
  { label: 'Trang Web', icon: 'globe-outline' as const },
  { label: 'Facebook', icon: 'logo-facebook' as const },
  { label: 'Liên Hệ', icon: 'call-outline' as const },
  { label: 'Instagram', icon: 'logo-instagram' as const },
];

export function HelpCenterScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<HelpTab>('faq');
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');

  const displayedFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return faqItems;
    return faqItems.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Trung Tâm Trợ Giúp</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tabBtn, activeTab === 'faq' && styles.tabBtnActive]}
            onPress={() => setActiveTab('faq')}
          >
            <Text style={[styles.tabText, activeTab === 'faq' && styles.tabTextActive]}>Câu Hỏi Thường Gặp</Text>
          </Pressable>
          <Pressable
            style={[styles.tabBtn, activeTab === 'contact' && styles.tabBtnActive]}
            onPress={() => setActiveTab('contact')}
          >
            <Text style={[styles.tabText, activeTab === 'contact' && styles.tabTextActive]}>Liên Hệ Với Chúng Tôi</Text>
          </Pressable>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <Pressable
                key={category}
                style={[styles.categoryChip, active && styles.categoryChipActive]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.searchBox}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm kiếm"
            placeholderTextColor="#D9959F"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.listWrap}>
          {activeTab === 'faq'
            ? displayedFaqs.map((item) => (
                <Pressable key={item} style={styles.listItem}>
                  <Text style={styles.itemLabel}>{item}</Text>
                  <Ionicons name="chevron-forward" size={14} color="#F46D79" />
                </Pressable>
              ))
            : contactItems.map((item) => (
                <Pressable key={item.label} style={styles.listItem}>
                  <View style={styles.contactLeft}>
                    <View style={styles.contactIconWrap}>
                      <Ionicons name={item.icon} size={11} color="#FFFFFF" />
                    </View>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={14} color="#F46D79" />
                </Pressable>
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F0F1',
  },
  container: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F35E6D',
    fontSize: 15,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 17,
  },
  tabRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 6,
  },
  tabBtn: {
    flex: 1,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#F8CDD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#F75E6C',
  },
  tabText: {
    color: '#F07E8A',
    fontSize: 8,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  categoryRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  categoryChip: {
    flex: 1,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#FAD9DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#F7C5CC',
  },
  categoryText: {
    color: '#E48A95',
    fontSize: 9,
  },
  categoryTextActive: {
    color: '#D96573',
    fontWeight: '600',
  },
  searchBox: {
    marginTop: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8CCD3',
    justifyContent: 'center',
    paddingHorizontal: 11,
  },
  searchInput: {
    color: '#D86D7B',
    fontSize: 10,
    paddingVertical: 0,
  },
  listWrap: {
    marginTop: 10,
  },
  listItem: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F5E1E5',
  },
  itemLabel: {
    color: '#444444',
    fontSize: 11,
    flex: 1,
    paddingRight: 8,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F75E6C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
