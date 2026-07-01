import {
  CPRelationship,
  CPBadge,
  CPMemory,
  CPUpgradeRecord,
  GiftRecord,
  BadgeType,
  Gender,
} from '../types';
import { mockPartnerUser } from './mockUser';

/** 生成模拟礼物记录 */
function generateGiftRecords(): GiftRecord[] {
  const records: GiftRecord[] = [];
  const giftTypes = [
    { name: '玫瑰花束', icon: '💐', value: 5000 },
    { name: '钻石戒指', icon: '💍', value: 50000 },
    { name: '浪漫跑车', icon: '🏎️', value: 100000 },
    { name: '皇冠', icon: '👑', value: 200000 },
    { name: '爱心', icon: '❤️', value: 1000 },
    { name: '星辰', icon: '⭐', value: 500 },
    { name: '独角兽', icon: '🦄', value: 88000 },
    { name: '水晶鞋', icon: '👠', value: 66000 },
    { name: '巧克力', icon: '🍫', value: 520 },
    { name: '香水', icon: '💄', value: 3500 },
    { name: '包包', icon: '👜', value: 128000 },
    { name: '手表', icon: '⌚', value: 188000 },
    { name: '飞机', icon: '✈️', value: 520000 },
    { name: '游艇', icon: '🛥️', value: 880000 },
    { name: '城堡', icon: '🏰', value: 1314000 },
  ];

  for (let i = 0; i < 30; i++) {
    const gift = giftTypes[i % giftTypes.length];
    const date = new Date();
    date.setDate(date.getDate() - i * 3);
    const isUser1 = i % 2 === 0;
    records.push({
      id: `gift-${i}`,
      giftName: gift.name,
      giftIcon: gift.icon,
      value: gift.value,
      senderId: isUser1 ? 'user-001' : 'user-002',
      receiverId: isUser1 ? 'user-002' : 'user-001',
      date: date.toISOString().split('T')[0],
    });
  }

  return records;
}

const mockGiftRecords = generateGiftRecords();

/** 生成CP勋章 */
const generateBadges = (upToLevel: number): CPBadge[] => {
  const badgeNames: Record<number, string> = {
    1: '初识',
    2: '牵手',
    3: '守护',
    4: '甜蜜',
    5: '闪耀',
    6: '永恒',
    7: '彩虹',
    8: '王冠',
    9: '黄金',
    10: '钻石',
    11: '彩虹至尊',
    12: '星空之巅',
  };

  const badges: CPBadge[] = [];
  for (let lv = 1; lv <= upToLevel; lv++) {
    badges.push({
      id: `badge-${lv}`,
      type: BadgeType.LEVEL_BADGE,
      level: lv,
      name: badgeNames[lv] || `Lv.${lv}`,
      iconUrl: lv <= 8 ? '❤️' : '⭐',
      unlocked: true,
    });
  }
  return badges;
};

/** 生成CP记忆 (基于礼物记录) */
const generateMemories = (giftRecords: GiftRecord[]): CPMemory[] => {
  const descriptions = [
    '你悄悄准备了这份礼物，看到对方惊喜的表情，一切都值了',
    '那天下着小雨，你撑着伞送出了这份特别的礼物',
    '生日当天，这份礼物让整个房间都亮了起来',
    '纪念日的惊喜，永远不会忘记那个拥抱',
    '一个普通的周末，因为这份礼物变得不普通',
    '你说"顺手买的"，但对方知道你挑了很久',
    '跨年夜的最后一分钟，你递上了这份心意',
    '情人节那天的惊喜，朋友圈都被点赞爆了',
  ];

  return giftRecords.slice(0, 12).map((gift, idx) => ({
    id: `mem-${idx}`,
    gift,
    date: gift.date,
    description: descriptions[idx % descriptions.length],
  }));
};

/** 生成升级记录 */
const generateUpgradeRecords = (): CPUpgradeRecord[] => {
  const baseDate = new Date('2024-01-15');
  const records: CPUpgradeRecord[] = [];

  for (let lv = 1; lv <= 9; lv++) {
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + lv);
    records.push({
      id: `up-${lv}`,
      fromLevel: lv - 1,
      toLevel: lv,
      date: date.toISOString().split('T')[0],
    });
  }
  return records;
};

const cpLevel = 9;
const giftRecords = mockGiftRecords;
const badges = generateBadges(cpLevel);
const memories = generateMemories(giftRecords);
const upgradeRecords = generateUpgradeRecords();

export const mockBoundCP: CPRelationship = {
  id: 'cp-001',
  partner: mockPartnerUser,
  cpLevel,
  intimacyScore: 88888,
  loveDays: 365,
  boundDate: '2024-01-15',
  is7DayTaskComplete: true,
  badges,
  memories,
  upgradeRecords,
  giftRecords,
};

export const mockUnboundCP: CPRelationship | null = null;

/** 用于 other 模式查看他人CP */
export const mockOtherCP: CPRelationship = {
  id: 'cp-999',
  partner: {
    id: 'user-999',
    name: '小星星',
    avatar: 'https://picsum.photos/seed/starfriend/200/200',
    gender: Gender.FEMALE,
    level: 7,
    signature: '✨ Starry love ✨',
    gold: 88000,
  },
  cpLevel: 7,
  intimacyScore: 42000,
  loveDays: 230,
  boundDate: '2024-05-20',
  is7DayTaskComplete: false,
  badges: generateBadges(7),
  memories: memories.slice(0, 6),
  upgradeRecords: generateUpgradeRecords().slice(0, 7),
  giftRecords: giftRecords.slice(0, 15),
};
