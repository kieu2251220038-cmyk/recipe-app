import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ShareProfile'>;

export function ShareProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator contentContainerStyle={styles.container}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.handle}>@dianne_r</Text>
          <View style={styles.qrWrap}>
            <MaterialCommunityIcons name="qrcode" size={180} color="#E9808B" />
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionText}>Chia Sẻ Trang</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionText}>Copy Link</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionText}>Tải Xuống</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F75E6C',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: 20,
    zIndex: 1,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
  },
  handle: {
    textAlign: 'center',
    color: '#E56E7B',
    fontSize: 26,
    fontWeight: '700',
  },
  qrWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FBD4D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#F15F6E',
    fontSize: 12,
    fontWeight: '600',
  },
});
