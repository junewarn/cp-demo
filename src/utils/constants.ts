import { SpecialType } from '../types';

/** 等级阈值 - 每个等级所需亲密度 */
export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 100,
  2: 500,
  3: 1500,
  4: 3000,
  5: 6000,
  6: 10000,
  7: 18000,
  8: 30000,
  9: 50000,
  10: 80000,
  11: 120000,
  12: 180000,
  13: 250000,
};

/** 等级名称 */
export const LEVEL_NAMES: Record<number, string> = {
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
  13: '极光之恋',
};

/** 动画时长 (ms) */
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  giftScroll: 3000,
  upgradeScroll: 4000,
  heartPulse: 1500,
  sparkleChar: 600,
  wingFloat: 2000,
  starTwinkle: 2000,
};

/** 颜色常量 */
export const COLORS = {
  primary: '#E91E8C',
  primaryLight: '#F8BBD0',
  primaryDark: '#AD1457',
  accent: '#FF6B9D',
  gold: '#FFD700',
  platinum: '#C0C0C0',
  rainbow: 'linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #9B59B6)',

  // Special 关系色系 (Bestie=粉, Soulmate=紫, Homie=蓝)
  spBestie: '#ec4899',
  spBestieBg: '#FCE7F3',
  spBestieBorder: '#F9A8D4',
  spSoulmate: '#8b5cf6',
  spSoulmateBg: '#EDE9FE',
  spSoulmateBorder: '#C4B5FD',
  spHomie: '#3b82f6',
  spHomieBg: '#DBEAFE',
  spHomieBorder: '#93C5FD',

  // CP 空间主题
  cpSpaceStarStart: '#1a0a2e',
  cpSpaceStarMid: '#2d1b4e',
  cpSpaceStarMid2: '#4a1942',
  cpSpaceStarEnd: '#6b1d52',
};

/** Special 关系类型配置 */
export const SPECIAL_TYPE_CONFIG: Record<
  SpecialType,
  { color: string; bg: string; border: string; icon: string; label: string }
> = {
  [SpecialType.BESTIE]: {
    color: COLORS.spBestie,
    bg: COLORS.spBestieBg,
    border: COLORS.spBestieBorder,
    icon: '👯‍♀️',
    label: 'Bestie',
  },
  [SpecialType.SOULMATE]: {
    color: COLORS.spSoulmate,
    bg: COLORS.spSoulmateBg,
    border: COLORS.spSoulmateBorder,
    icon: '💫',
    label: 'Soulmate',
  },
  [SpecialType.HOMIE]: {
    color: COLORS.spHomie,
    bg: COLORS.spHomieBg,
    border: COLORS.spHomieBorder,
    icon: '🤝',
    label: 'Homie',
  },
};

/** 等级背景渐变 */
export const LEVEL_BACKGROUNDS: Record<number, string> = {
  1: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  2: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  3: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  4: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  5: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  6: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  7: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  8: 'linear-gradient(135deg, #FFB6C1, #FFC0CB)',
  9: 'linear-gradient(135deg, #1a1a3e, #2c3e6b, #4a90d9)',
  10: 'linear-gradient(135deg, #1a1a2e, #4a3800, #c9a96e)',
  11: 'linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #9B59B6)',
  12: 'linear-gradient(135deg, #1a0033, #4a0e6b, #9b59b6)',
  13: 'linear-gradient(135deg, #FF0080, #FF8C00, #40E0D0, #8B00FF)',
};

/** 勋章1-8级爱心emoji映射 */
export const LEVEL_BADGE_EMOJIS: Record<number, string> = {
  1: '❤️',
  2: '❤️',
  3: '❤️',
  4: '❤️',
  5: '❤️',
  6: '❤️',
  7: '❤️',
  8: '❤️',
};

/** 底部导航配置 */
export const BOTTOM_NAV_ITEMS = [
  { path: '/cp-space', label: 'CP空间', icon: '💕' },
  { path: '/special', label: 'Special', icon: '✨' },
  { path: '/voice-room', label: '语聊', icon: '🎙️' },
] as const;

/** 特殊等级阈值 (L9+) */
export const SPECIAL_LEVEL_MIN = 9;

/** 礼物滚动每页条数 */
export const GIFT_SCROLL_PAGE_SIZE = 3;

/** 日历显示月份范围 */
export const CALENDAR_MONTH_RANGE = 3;

/** 成就每行展示数 */
export const ACHIEVEMENTS_PER_ROW = 5;

/** 记忆每行展示数 (礼物卡片) */
export const MEMORIES_PER_ROW = 4;

/** 高价值礼物阈值 (金币) */
export const HIGH_VALUE_GIFT_THRESHOLD = 900000;

/** Special 解锁成本 */
export const SPECIAL_UNLOCK_COST = 36000;

/** Special 默认最大槽位 */
export const SPECIAL_DEFAULT_MAX_SLOTS = 2;

/** Special 扩展后最大槽位 */
export const SPECIAL_EXTENDED_MAX_SLOTS = 3;

/** Special 关系位系统: 最大位置数 */
export const SPECIAL_MAX_SLOTS = 9;

/** Special 关系位系统: 默认解锁位置数 */
export const SPECIAL_DEFAULT_SLOTS = 3;

/** Special 每种关系类型最大绑定数 */
export const SPECIAL_TYPE_MAX_PER_TYPE = 3;

/** Special 邀请消耗金币 */
export const SPECIAL_INVITATION_COST = 100000;

/** Special 礼物图标映射 */
export const SPECIAL_GIFT_ICONS: Record<SpecialType, string> = {
  [SpecialType.BESTIE]: '💎',
  [SpecialType.SOULMATE]: '💍',
  [SpecialType.HOMIE]: '🤜',
};

/** Special 礼物名称映射 */
export const SPECIAL_GIFT_NAMES: Record<SpecialType, string> = {
  [SpecialType.BESTIE]: 'Bracelet',
  [SpecialType.SOULMATE]: 'Ring',
  [SpecialType.HOMIE]: 'Wristband',
};

/** CP 证书色板 (Lv1-Lv13) */
export const CERTIFICATE_COLORS: Record<number, string> = {
  1: '#FFE0EC',
  2: '#FFD1E0',
  3: '#B3E5FC',
  4: '#F8BBD0',
  5: '#FFE082',
  6: '#CE93D8',
  7: '#EF9A9A',
  8: '#FFCC80',
  9: '#1a1a3e',
  10: '#1a1a2e',
  11: '#FF6B6B',
  12: '#4a0e6b',
  13: '#FF0080',
};
