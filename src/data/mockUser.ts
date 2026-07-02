import { User, Gender } from '../types';

export const mockCurrentUser: User = {
  id: 'user-001',
  name: '小甜心',
  avatar: 'https://picsum.photos/seed/user1/200/200',
  gender: Gender.FEMALE,
  age: 26,
  level: 9,
  signature: '和宝贝在一起的每一天都是甜的 💕',
  gold: 128000,
  region: 'Indonesia',
  flag: '🇮🇩',
  tags: ['🎵 Music', '🎮 Game', '📷 Photo'],
};

export const mockPartnerUser: User = {
  id: 'user-002',
  name: '大笨蛋',
  avatar: 'https://picsum.photos/seed/user2/200/200',
  gender: Gender.MALE,
  level: 9,
  signature: '保护最爱的你 ❤️',
  gold: 256000,
};

export const mockViewingUser: User = {
  id: 'user-003',
  name: '路人甲',
  avatar: 'https://picsum.photos/seed/user3/200/200',
  gender: Gender.MALE,
  level: 5,
  signature: '看看别人的CP...👀',
  gold: 32000,
};

/** 生成特殊关系用路人用户 */
export function makeMockFriend(seed: string, name: string, gender: Gender, level: number): User {
  return {
    id: `friend-${seed}`,
    name,
    avatar: `https://picsum.photos/seed/${seed}/200/200`,
    gender,
    level,
    signature: `我是${name}～`,
    gold: Math.floor(Math.random() * 50000) + 5000,
  };
}
