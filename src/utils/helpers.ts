import {
  LEVEL_NAMES,
  LEVEL_BACKGROUNDS,
  SPECIAL_TYPE_CONFIG,
  ANIMATION_DURATION,
} from './constants';
import { SpecialType } from '../types';

/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * 格式化日期为中文显示
 */
export function formatDateCN(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * 获取等级对应的背景渐变
 */
export function getLevelBackground(level: number): string {
  return LEVEL_BACKGROUNDS[level] || LEVEL_BACKGROUNDS[1];
}

/**
 * 获取等级名称
 */
export function getLevelName(level: number): string {
  return LEVEL_NAMES[level] || `Lv.${level}`;
}

/**
 * 判断是否为特殊等级 (L9+)
 */
export function isSpecialLevel(level: number): boolean {
  return level >= 9;
}

/**
 * 获取等级徽章展示模式：基础(1-8)或数字(9-12)
 */
export function getBadgeMode(level: number): 'basic' | 'number' {
  return level >= 1 && level <= 8 ? 'basic' : 'number';
}

/**
 * 格式化数字（大于9999显示为万）
 */
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num.toLocaleString();
}

/**
 * 格式化金币：≥1000 显示 X.XK，≥1000000 显示 X.XM
 */
export function formatGold(gold: number): string {
  if (gold >= 1000000) {
    return `${(gold / 1000000).toFixed(1)}M`;
  }
  if (gold >= 1000) {
    return `${(gold / 1000).toFixed(1)}K`;
  }
  return gold.toString();
}

/**
 * 数字转罗马数字 (1→I, 2→II, ..., 13→XIII)
 */
export function toRomanNumeral(num: number): string {
  const romanNumerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];

  let result = '';
  let remaining = num;
  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

/**
 * 获取 Special 关系类型颜色
 */
export function getSpecialTypeColor(type: SpecialType): string {
  return SPECIAL_TYPE_CONFIG[type]?.color ?? '#999';
}

/**
 * 获取 Special 关系类型背景色
 */
export function getSpecialTypeBg(type: SpecialType): string {
  return SPECIAL_TYPE_CONFIG[type]?.bg ?? '#f5f5f5';
}

/**
 * 获取 Special 关系类型配置
 */
export function getSpecialTypeConfig(type: SpecialType) {
  return SPECIAL_TYPE_CONFIG[type];
}

/**
 * 获取排名变化箭头文字
 */
export function getRankChangeText(change: number): string {
  if (change > 0) return `↑${change}`;
  if (change < 0) return `↓${Math.abs(change)}`;
  return '-';
}

/**
 * 截断文字
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 获取礼物的 Emoji 表示
 */
export function getGiftEmoji(value: number): string {
  if (value >= 100000) return '💎';
  if (value >= 10000) return '👑';
  if (value >= 5000) return '🌹';
  if (value >= 1000) return '💐';
  if (value >= 500) return '🌸';
  return '🌷';
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 获取当月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 获取当月第一天是星期几 (0=日, 1=一, ..., 6=六)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * 获取相对时间描述
 */
export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * 获取动画时长（毫秒）
 */
export function getAnimationDuration(key: keyof typeof ANIMATION_DURATION): number {
  return ANIMATION_DURATION[key];
}
