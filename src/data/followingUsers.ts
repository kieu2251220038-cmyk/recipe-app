export type FollowTab = 'following' | 'followers';

export type FollowingUser = {
  id: string;
  handle: string;
  name: string;
  role?: string;
  avatar: string;
  isFollowing: boolean;
  notificationsEnabled: boolean;
  accountBlocked: boolean;
  postsMuted: boolean;
};

export const followingUsers: FollowingUser[] = [
  {
    id: 'u1',
    handle: '@neil_tran',
    name: 'Neil Trn-Chef',
    role: 'Chef',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: false,
  },
  {
    id: 'u2',
    handle: '@chef_emily',
    name: 'Emily Carter',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: true,
    accountBlocked: false,
    postsMuted: false,
  },
  {
    id: 'u3',
    handle: '@cia_food',
    name: 'Cia Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: true,
  },
  {
    id: 'u4',
    handle: '@josh-ryan',
    name: 'Josh Ryan-Chef',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: false,
  },
  {
    id: 'u5',
    handle: '@torres_meat',
    name: 'Alfredo Torres',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: true,
    accountBlocked: false,
    postsMuted: false,
  },
  {
    id: 'u6',
    handle: '@dakota.mulen',
    name: 'Dakota Mullen',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: true,
  },
  {
    id: 'u7',
    handle: '@smithchef',
    name: 'William Smith',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: false,
  },
  {
    id: 'u8',
    handle: '@flavorswithivan',
    name: 'Ivan Vileich',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80',
    isFollowing: true,
    notificationsEnabled: false,
    accountBlocked: false,
    postsMuted: false,
  },
];
