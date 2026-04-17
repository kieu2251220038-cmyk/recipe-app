import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStackParamList } from './MainTabs';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PrivacyPolicy'>;

export function PrivacyPolicyScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={17} color="#F35E6D" />
          </Pressable>
          <Text style={styles.headerTitle}>Chính Sách Bảo Mật</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>"Điều Khoản  Và  Quyền  Riêng  Tư  Của  Người Dùng"</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet. Et odio officia aut voluptate internos est omnis vitae ut architecto sunt
            tenetur fugit ut provident vero. Quo asperiores facere est consectetur force. Est fugiat assumenda aut
            reprehenderit voluptatem sed asperiores facere.
          </Text>
          <Text style={styles.paragraph}>
            Aut quidem accusantium nam eius dolorem num officiis placeat et omnis autem id officiis perspiciatis qui
            corrupti officia eum aliquam provident. Eum voluptatem error sit optio dolorum cum molestiae nobis at aut
            molestiae quo magnam impedit sed fugiat nihil rem nihil.
          </Text>
          <Text style={styles.listItem}>1. Ex voluptates omnis aut suscipit sequi.</Text>
          <Text style={styles.listItem}>2. Est dolore quae in aliquid ducimus et autem repellendus.</Text>
          <Text style={styles.listItem}>3. Aut ipsum quis quae quos ipsa aut minus placeat.</Text>
          <Text style={styles.listItem}>4. Sit consectetur majorio et officia facere.</Text>
          <Text style={styles.paragraph}>
            Et odio officia aut voluptate internos est omnis vitae ut architecto sunt non tenetur fugit ut provident
            vero. Quo asperiores facere est consectetur ipsum et facere commodi est voluptatem sed. Et fugiat
            assumenda aut reprehenderit voluptatem sed.
          </Text>
          <Text style={styles.paragraph}>
            Eos fugiat sequi eum voluptatibus provident. Eos consequuntur voluptas vel amet eaque aut dignissimos
            velit. Vel exercitationem quam vel eligendi rerum.
          </Text>
          <Text style={styles.paragraph}>
            At harum obcaecati est autem beatae? Ea praesentium dolores quia rerum aliquam est perferendis mollitia
            et ipsum ipsa qui enim autem. At corporis sunt. Aut odi quisquam est reprehenderit itaque aut accusantium
            dolor molestiae repellat.
          </Text>
          <Text style={styles.paragraph}>
            Eum voluptas error et optio dolorum cum molestiae nobis at aut molestiae quo magnam impedit sed fugiat
            nihil non nihil vitae.
          </Text>
          <Text style={styles.paragraph}>
            Quo molestiae totam et consectetur ipsum et facere corrupti est asperiores facere. Est fugiat assumenda
            aut reprehenderit voluptatem sed.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F0F1',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
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
  content: {
    paddingTop: 12,
    paddingBottom: 120,
  },
  sectionTitle: {
    color: '#3D3D3D',
    fontSize: 11,
    fontWeight: '700',
  },
  paragraph: {
    marginTop: 8,
    color: '#555555',
    fontSize: 9,
    lineHeight: 14,
  },
  listItem: {
    marginTop: 4,
    color: '#555555',
    fontSize: 9,
    lineHeight: 14,
  },
});
