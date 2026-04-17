export type ChefProfile = {
  id: string;
  name: string;
  username: string;
  role: string;
  bio: string;
  popularity: string;
  avatar: string;
  coverRecipes: {
    id: string;
    title: string;
    image: string;
  }[];
  stats: {
    posts: string;
    followers: string;
    following: string;
  };
};

export const topChefs: ChefProfile[] = [
  {
    id: 'neil',
    name: 'Neil Trần - Đầu Bếp',
    username: '@neil_tran',
    role: 'Bếp phó',
    bio: 'Đầu bếp đầy đam mê với ẩm thực sáng tạo và hiện đại.',
    popularity: '6687',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '15',
      followers: '10',
      following: '255,770',
    },
    coverRecipes: [
      {
        id: 'vegan-set',
        title: 'Công thức nấu ăn thuần chay',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=80',
      },
      {
        id: 'sushi-set',
        title: 'Di sản Châu Á',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1100&q=80',
      },
      {
        id: 'dessert-set',
        title: 'Tráng miệng',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
  {
    id: 'jessica',
    name: 'Jessica Davis - Đầu bếp',
    username: '@jessi_davis',
    role: 'Chef',
    bio: 'Chuyên gia món Âu, yêu thích phong cách nấu tối giản.',
    popularity: '5687',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '22',
      followers: '17',
      following: '120,455',
    },
    coverRecipes: [
      {
        id: 'breakfast-set',
        title: 'Bữa sáng năng lượng',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
  {
    id: 'david',
    name: 'Daniel Martinez',
    username: '@dan-chef',
    role: 'Bếp trưởng',
    bio: 'Đam mê chia sẻ công thức chuẩn nhà hàng cho gia đình.',
    popularity: '6687',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '12',
      followers: '8',
      following: '76,990',
    },
    coverRecipes: [
      {
        id: 'italian',
        title: 'Ẩm thực Ý cổ điển',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
  {
    id: 'aria',
    name: 'Aria Chang',
    username: '@arichang-chef',
    role: 'Bếp bánh',
    bio: 'Mê sáng tạo món tráng miệng và đồ uống healthy.',
    popularity: '5687',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '19',
      followers: '26',
      following: '98,405',
    },
    coverRecipes: [
      {
        id: 'sweet-break',
        title: 'Bữa xế nhẹ nhàng',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
  {
    id: 'lily',
    name: 'Lily',
    username: '@lilykitchen',
    role: 'Đầu bếp trẻ',
    bio: 'Chia sẻ công thức nhanh cho người bận rộn.',
    popularity: '4201',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '11',
      followers: '9',
      following: '41,220',
    },
    coverRecipes: [
      {
        id: 'quick-meal',
        title: 'Bữa nhanh 15 phút',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus Bell',
    username: '@marcus_bell',
    role: 'Sous Chef',
    bio: 'Chuyên món nướng và salad giàu dinh dưỡng.',
    popularity: '4398',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=240&q=80',
    stats: {
      posts: '14',
      followers: '11',
      following: '53,101',
    },
    coverRecipes: [
      {
        id: 'grill-week',
        title: 'Thực đơn nướng cuối tuần',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1100&q=80',
      },
    ],
  },
];

export const chefRecipes = [
  {
    id: 'veg-burger',
    title: 'Hamburger nhân đậu',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
  {
    id: 'veg-lasagna',
    title: 'Lasagna bóng cải xanh',
    image: 'https://images.unsplash.com/photo-1619894991209-9f9694be045a?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
  {
    id: 'grilled-veg',
    title: 'Cà tím nướng phô mai',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
  {
    id: 'buckwheat-salad',
    title: 'Salad hạt diêm mạch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
  {
    id: 'mushroom-risotto',
    title: 'Cơm Ý Risotto nấm',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
  {
    id: 'chicken-salad',
    title: 'Salad với đậu gà chiên',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    likes: '4',
    time: '30min',
  },
];
