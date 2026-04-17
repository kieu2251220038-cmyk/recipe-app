import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryId } from '../data/categoryRecipes';
import { CategoryRecipeDetailScreen } from './CategoryRecipeDetailScreen';
import { CategoriesScreen } from './CategoriesScreen';
import { AddRecipeScreen } from './AddRecipeScreen';
import { EditProfileScreen } from './EditProfileScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { FollowingScreen } from './FollowingScreen';
import { HelpCenterScreen } from './HelpCenterScreen';
import { HomeScreen } from './HomeScreen';
import { LanguageScreen } from './LanguageScreen';
import { NotificationScreen } from './NotificationScreen';
import { NotificationSettingsScreen } from './NotificationSettingsScreen';
import { PrivacyPolicyScreen } from './PrivacyPolicyScreen';
import { ProfileScreen } from './ProfileScreen';
import { RecipeReviewsScreen } from './RecipeReviewsScreen';
import { RecipeSearchScreen } from './RecipeSearchScreen';
import { CommunityScreen } from './SearchScreen';
import { SettingsScreen } from './SettingsScreen';
import { ShareProfileScreen } from './ShareProfileScreen';
import { TopChefProfileScreen } from './TopChefProfileScreen';
import { TopChefRecipesScreen } from './TopChefRecipesScreen';
import { TopChefScreen } from './TopChefScreen';
import { TrendingRecipeDetailScreen } from './TrendingRecipeDetailScreen';
import { TrendingRecipesScreen } from './TrendingRecipesScreen';
import { WriteReviewScreen } from './WriteReviewScreen';
import { YourRecipeDetailScreen } from './YourRecipeDetailScreen';
import { YourRecipesScreen } from './YourRecipesScreen';

export type HomeStackParamList = {
  HomeLanding: undefined;
  RecipeSearch: undefined;
  TrendingRecipes: undefined;
  TrendingRecipeDetail: { recipeId: string };
  RecipeReviews: { recipeId: string };
  WriteReview: { recipeId: string };
};

export type ProfileStackParamList = {
  ProfileLanding: undefined;
  AddRecipe: undefined;
  Following: { initialTab?: 'following' | 'followers' };
  EditProfile: undefined;
  ShareProfile: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  HelpCenter: undefined;
  PrivacyPolicy: undefined;
  Language: undefined;
  CategoriesLanding: { initialCategory?: CategoryId };
  CategoryRecipeDetail: { categoryId: CategoryId; recipeId: string };
  TopChef: undefined;
  TopChefProfile: { chefId: string };
  TopChefRecipes: { chefId: string };
  YourRecipes: undefined;
  YourRecipeDetail: { recipeId: string };
  Favorites: { collectionId?: string; collectionName?: string } | undefined;
};

type MainTabParamList = {
  HomeTab: undefined;
  CommunityTab: undefined;
  NotificationTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function HomeTabStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <HomeStack.Screen name="HomeLanding" component={HomeScreen} />
      <HomeStack.Screen name="RecipeSearch" component={RecipeSearchScreen} />
      <HomeStack.Screen name="TrendingRecipes" component={TrendingRecipesScreen} />
      <HomeStack.Screen name="TrendingRecipeDetail" component={TrendingRecipeDetailScreen} />
      <HomeStack.Screen name="RecipeReviews" component={RecipeReviewsScreen} />
      <HomeStack.Screen name="WriteReview" component={WriteReviewScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileTabStack() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <ProfileStack.Screen name="ProfileLanding" component={ProfileScreen} />
      <ProfileStack.Screen name="AddRecipe" component={AddRecipeScreen} />
      <ProfileStack.Screen name="Following" component={FollowingScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="ShareProfile" component={ShareProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <ProfileStack.Screen name="Language" component={LanguageScreen} />
      <ProfileStack.Screen name="CategoriesLanding" component={CategoriesScreen} />
      <ProfileStack.Screen name="CategoryRecipeDetail" component={CategoryRecipeDetailScreen} />
      <ProfileStack.Screen name="TopChef" component={TopChefScreen} />
      <ProfileStack.Screen name="TopChefProfile" component={TopChefProfileScreen} />
      <ProfileStack.Screen name="TopChefRecipes" component={TopChefRecipesScreen} />
      <ProfileStack.Screen name="YourRecipes" component={YourRecipesScreen} />
      <ProfileStack.Screen name="YourRecipeDetail" component={YourRecipeDetailScreen} />
      <ProfileStack.Screen name="Favorites" component={FavoritesScreen} />
    </ProfileStack.Navigator>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 34,
          right: 34,
          bottom: 16,
          height: 50,
          borderRadius: 26,
          backgroundColor: '#F75E6C',
          borderTopWidth: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFDDE1',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTabStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="layers-outline" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTabStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
