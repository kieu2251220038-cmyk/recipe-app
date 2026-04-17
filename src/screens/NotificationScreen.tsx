import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const groups = [
  {
    day: 'Hôm Nay',
    items: [
      { title: 'Công Thức Mới Hằng Tuần', desc: 'Khám phá những công thức mới có mỗi tuần này!', time: '2 phút trước' },
      { title: 'Nhắc Nhở Bữa Ăn', desc: 'Đến lúc nấu bữa ăn lành mạnh cho ngày hôm nay rồi.', time: '35 phút trước' },
    ],
  },
  {
    day: 'Thứ Tư',
    items: [
      { title: 'Có Bản Cập Nhật Mới', desc: 'Cải thiện hiệu năng và sửa lỗi.', time: '25 April 2024' },
      { title: 'Nhắc Nhở', desc: 'Hãy quay lại hoàn thiện hồ sơ để nhận truy cập đầy đủ các tính năng.', time: '25 April 2024' },
      { title: 'Thông Báo Quan Trọng', desc: 'Hãy nhận thay đổi mới nhất thường xuyên để giữ an toàn cho tài khoản.', time: '25 April 2024' },
    ],
  },
];

export function NotificationScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerRow}>
        <Ionicons name="arrow-back" size={18} color="#F35E6D" />
        <Text style={styles.header}>Thông Báo</Text>
        <View style={styles.headerGhost} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {groups.map((group) => (
          <View key={group.day}>
            <Text style={styles.dayLabel}>{group.day}</Text>
            {group.items.map((item) => (
              <View key={`${group.day}-${item.title}`} style={styles.noticeCard}>
                <View style={styles.noticeIconWrap}>
                  <Ionicons name="flame" size={14} color="#F06572" />
                </View>
                <View style={styles.noticeBody}>
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                  <Text style={styles.noticeDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.noticeTime}>{item.time}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={styles.dayLabel}>Thứ Hai</Text>
        <View style={styles.noticeCard}>
          <View style={styles.noticeIconWrap}>
            <Ionicons name="flame" size={14} color="#F06572" />
          </View>
          <View style={styles.noticeBody}>
            <Text style={styles.noticeTitle}>Có Bản Cập Nhật Mới</Text>
            <Text style={styles.noticeDesc}>Cải thiện hiệu suất và sửa lỗi.</Text>
          </View>
          <Text style={styles.noticeTime}>24 April 2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F2F3',
    paddingHorizontal: 16,
  },
  headerRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: '#F35E6D',
    fontSize: 18,
    fontWeight: '700',
  },
  headerGhost: {
    width: 18,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 110,
  },
  dayLabel: {
    color: '#4A4A4A',
    marginBottom: 8,
    marginTop: 6,
    fontWeight: '600',
  },
  noticeCard: {
    backgroundColor: '#FCD5DB',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 9,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noticeIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  noticeBody: {
    flex: 1,
    paddingRight: 8,
  },
  noticeTitle: {
    color: '#E75464',
    fontWeight: '700',
    fontSize: 12,
  },
  noticeDesc: {
    color: '#8C7277',
    fontSize: 10,
    marginTop: 2,
  },
  noticeTime: {
    color: '#8F7A7E',
    fontSize: 9,
    marginTop: 1,
  },
});
