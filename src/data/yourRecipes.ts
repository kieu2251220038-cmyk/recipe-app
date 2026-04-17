export type MyRecipe = {
  id: string;
  title: string;
  image: string;
  likes: string;
  time: string;
  chefUser: string;
  chefName: string;
  chefAvatar: string;
  details: string;
  ingredients: string[];
};

export const myRecipes: MyRecipe[] = [
  {
    id: 'burger',
    title: 'Burger gà',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=80',
    likes: '5',
    time: '15 phút',
    chefUser: '@Andrew-Mar',
    chefName: 'Đầu bếp Andrew Martinez',
    chefAvatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=240&q=80',
    details:
      'Món burger gà giòn mềm, kết hợp rau tươi và sốt nhẹ, phù hợp bữa trưa nhanh nhưng vẫn đầy đủ dinh dưỡng.',
    ingredients: ['2 ức gà', '2 vỏ bánh burger', 'Xà lách', 'Cà chua', 'Sốt mayo'],
  },
  {
    id: 'tiramisu',
    title: 'Tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1100&q=80',
    likes: '5',
    time: '28 phút',
    chefUser: '@Mia-Le',
    chefName: 'Đầu bếp Mia Le',
    chefAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80',
    details:
      'Tiramisu là món tráng miệng Ý cổ điển với nhiều lớp ladyfinger thấm espresso, kem mascarpone mịn và lớp cacao phủ mặt tạo nên hương vị cân bằng tuyệt vời.',
    ingredients: [
      '6 lòng đỏ trứng gà lớn',
      '3/4 cốc đường cát (khoảng 150g)',
      '1 cốc phô mai mascarpone (khoảng 225g)',
      '1 1/2 cốc kem tươi heavy cream (khoảng 360ml)',
      '2 cốc cà phê espresso',
      '24 bánh ladyfinger',
      '1/4 cốc bột cacao nguyên chất để rắc mặt',
    ],
  },
  {
    id: 'bechamel',
    title: 'Mỳ Ý sốt Béchamel',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1100&q=80',
    likes: '4',
    time: '30 phút',
    chefUser: '@Lucas-M',
    chefName: 'Đầu bếp Lucas Minh',
    chefAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
    details: 'Mỳ Ý sốt kem mịn, vị béo nhẹ và thơm bơ, phù hợp cho bữa tối gia đình.',
    ingredients: ['Mỳ Ý', 'Sữa tươi', 'Bơ', 'Bột mì'],
  },
  {
    id: 'bbq',
    title: 'Xiên nướng',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1100&q=80',
    likes: '4',
    time: '30 phút',
    chefUser: '@Noah-R',
    chefName: 'Đầu bếp Noah Ryan',
    chefAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    details: 'Xiên thịt nướng thơm, phù hợp tiệc gia đình.',
    ingredients: ['Thịt heo', 'Ớt chuông', 'Gia vị nướng'],
  },
  {
    id: 'brownie',
    title: 'Bánh Brownie hạt',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1100&q=80',
    likes: '4',
    time: '30 phút',
    chefUser: '@Ella-Tran',
    chefName: 'Đầu bếp Ella Tran',
    chefAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    details: 'Brownie chocolate đậm vị cùng hạt giòn.',
    ingredients: ['Bột cacao', 'Bột mì', 'Trứng', 'Bơ'],
  },
  {
    id: 'pancake',
    title: 'Bánh kếp yến mạch',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1100&q=80',
    likes: '4',
    time: '30 phút',
    chefUser: '@Linh-Pham',
    chefName: 'Đầu bếp Linh Phạm',
    chefAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80',
    details: 'Pancake yến mạch ăn cùng dâu tây và mật ong.',
    ingredients: ['Yến mạch', 'Sữa', 'Trứng', 'Mật ong'],
  },
];
