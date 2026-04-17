export type FavoriteRecipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  likes: number;
  description?: string;
  collectionId?: string;
};

export const favoriteRecipes: FavoriteRecipe[] = [
  {
    id: 'fav1',
    title: 'Bánh Nướng Mật',
    image: 'https://images.unsplash.com/photo-1488477066519-51a73d7ef277?auto=format&fit=crop&w=400&q=80',
    time: '30 phút',
    likes: 234,
    description: 'Món bánh ngọt thơm vị mật',
    collectionId: 'col1',
  },
  {
    id: 'fav2',
    title: 'Bánh Crepe Trái Cây',
    image: 'https://images.unsplash.com/photo-1535920527894-b4bab373e59f?auto=format&fit=crop&w=400&q=80',
    time: '45 phút',
    likes: 189,
    description: 'Bánh crepe mềm với topping trái cây',
    collectionId: 'col1',
  },
  {
    id: 'fav3',
    title: 'Bánh Macaron',
    image: 'https://images.unsplash.com/photo-1569718212424-f22cbb1dc25e?auto=format&fit=crop&w=400&q=80',
    time: '60 phút',
    likes: 567,
    description: 'Bánh Macaron Pháp ngon đắm đuối',
    collectionId: 'col1',
  },
  {
    id: 'fav4',
    title: 'Bánh Cupcake',
    image: 'https://images.unsplash.com/photo-1587080206108-baec26bbbca0?auto=format&fit=crop&w=400&q=80',
    time: '25 phút',
    likes: 345,
    description: 'Cupcake màu sắc xinh xắn dịu nhẹ',
    collectionId: 'col1',
  },
  {
    id: 'fav5',
    title: 'Gà Nướng',
    image: 'https://images.unsplash.com/photo-1551632786-4e5e89f43a20?auto=format&fit=crop&w=400&q=80',
    time: '20 phút',
    likes: 432,
    description: 'Những miếng gà nướng đậm vị',
    collectionId: 'col2',
  },
  {
    id: 'fav6',
    title: 'Salad Diêm Mạch',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
    time: '15 phút',
    likes: 289,
    description: 'Salad thanh nhẹ cho bữa ăn lành mạnh',
    collectionId: 'col2',
  },
  {
    id: 'fav7',
    title: 'Trứng Chiên Cải Vịt',
    image: 'https://images.unsplash.com/photo-1599599810694-b3fc7dd7fff6?auto=format&fit=crop&w=400&q=80',
    time: '50 phút',
    likes: 521,
    description: 'Món trứng chiên mềm cùng rau cải',
    collectionId: 'col2',
  },
  {
    id: 'fav8',
    title: 'Lasagna Súp Lá Xanh',
    image: 'https://images.unsplash.com/photo-1599599810969-d2b11ab33e75?auto=format&fit=crop&w=400&q=80',
    time: '50 phút',
    likes: 412,
    description: 'Lasagna cải xanh với cheese béo ngậy',
    collectionId: 'col2',
  },
];

export type RecipeCollection = {
  id: string;
  name: string;
  description: string;
  recipeCount: number;
  image?: string;
};

export const recipeCollections: RecipeCollection[] = [
  {
    id: 'col1',
    name: 'Món Ngọt',
    description: 'Các công thức ngọt ngào dễ làm',
    recipeCount: 12,
    image: 'https://images.unsplash.com/photo-1488477066519-51a73d7ef277?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'col2',
    name: 'Món Mặn',
    description: 'Các công thức đậm vị cho bữa chính',
    recipeCount: 8,
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80',
  },
];
