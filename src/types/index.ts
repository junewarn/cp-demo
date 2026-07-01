// ============================================================
// 枚举类型
// ============================================================

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum CPState {
  BOUND = 'bound',
  UNBOUND = 'unbound',
}

export enum ViewMode {
  SELF = 'self',
  OTHER = 'other',
}

export enum SpecialType {
  BESTIE = 'bestie',
  SOULMATE = 'soulmate',
  HOMIE = 'homie',
}

export enum BadgeType {
  LEVEL_BADGE = 'level_badge',
  ACHIEVEMENT_BADGE = 'achievement_badge',
  CHECKIN_BADGE = 'checkin_badge',
}

export type TaskStatus = 'locked' | 'available' | 'completed';

export type CheckInStatus = 'checked' | 'missed' | 'future';

export type PrivilegeStatus = 'locked' | 'unlocked';

// ============================================================
// 用户相关
// ============================================================

export interface User {
  id: string;
  name: string;
  avatar: string;
  gender: Gender;
  level: number;
  signature: string;
  gold: number;
}

// ============================================================
// CP 关系相关
// ============================================================

export interface CPBadge {
  id: string;
  type: BadgeType;
  level: number;
  name: string;
  iconUrl: string;
  unlocked: boolean;
}

export interface GiftRecord {
  id: string;
  giftName: string;
  giftIcon: string;
  value: number;
  senderId: string;
  receiverId: string;
  date: string;
}

export interface CPMemory {
  id: string;
  gift: GiftRecord;
  date: string;
  description: string;
}

export interface CPUpgradeRecord {
  id: string;
  fromLevel: number;
  toLevel: number;
  date: string;
}

export interface CPRelationship {
  id: string;
  partner: User;
  cpLevel: number;
  intimacyScore: number;
  loveDays: number;
  boundDate: string;
  is7DayTaskComplete: boolean;
  badges: CPBadge[];
  memories: CPMemory[];
  upgradeRecords: CPUpgradeRecord[];
  giftRecords: GiftRecord[];
}

// ============================================================
// 任务相关
// ============================================================

export interface CPTask {
  id: string;
  day: number;
  rewardName: string;
  rewardIcon: string;
  rewardType: string;
  completed: boolean;
  title: string;
  description: string;
  status: TaskStatus;
  rewardDuration: number;
}

export interface CheckInRecord {
  id: string;
  date: string;
  checked: boolean;
}

// ============================================================
// 特权相关
// ============================================================

export interface PrivilegeItem {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export interface CPPrivilege {
  level: number;
  title: string;
  items: PrivilegeItem[];
  backgroundClass: string;
}

// ============================================================
// 榜单相关
// ============================================================

export interface CPRankingEntry {
  rank: number;
  userId: string;
  userName: string;
  partnerName?: string;
  userAvatar: string;
  partnerAvatar?: string;
  completedDays: number;
  lastCompletedAt: string;
}

// ============================================================
// Special 关系相关
// ============================================================

export interface SpecialRelationship {
  id: string;
  partner: User;
  type: SpecialType;
  establishedDate: string;
  level: number;
  days: number;
}

export interface SpecialSlotConfig {
  type: SpecialType;
  maxSlots: number;
  usedSlots: number;
  unlockCost: number;
}

// ============================================================
// Special 邀请相关
// ============================================================

export interface SpecialInvitationRecord {
  id: string;
  fromUser: { id: string; name: string; avatar: string };
  toUser: { id: string; name: string; avatar: string };
  type: SpecialType;
  giftIcon: string;
  cost: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// ============================================================
// CP 证书相关
// ============================================================

export interface CertificateReward {
  icon: string;
  name: string;
  description: string;
}

export interface CPCertificate {
  level: number;
  romanNumeral: string;
  colorTheme: string;
  rewards: CertificateReward[];
}

// ============================================================
// CP 戒指赠送记录相关
// ============================================================

export interface CPPairingMessage {
  id: string;
  user1Name: string;
  user2Name: string;
  date: string;
  ringName: string; // 赠送的戒指名称
  cpLevel?: number;
}

// ============================================================
// 全局应用状态
// ============================================================

export interface AppState {
  currentUser: User;
  cpState: CPState;
  otherCPState: CPState;
  cpRelationship: CPRelationship | null;
  specialRelationships: SpecialRelationship[];
  specialSlotConfigs: SpecialSlotConfig[];
  cpTasks: CPTask[];
  checkInRecords: CheckInRecord[];
  cpPrivileges: CPPrivilege[];
  rankingEntries: CPRankingEntry[];
  viewMode: ViewMode;
  viewingUser: User | null;
  giftRecords: GiftRecord[];
  pairingMessages: CPPairingMessage[];
  invitationRecords: SpecialInvitationRecord[];
}

// ============================================================
// Reducer Actions
// ============================================================

export type AppAction =
  | { type: 'SET_CP_STATE'; payload: CPState }
  | { type: 'SET_OTHER_CP_STATE'; payload: CPState }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_VIEWING_USER'; payload: User | null }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'ADD_CHECKIN'; payload: CheckInRecord }
  | { type: 'UNLOCK_SLOT'; payload: SpecialType }
  | { type: 'SEND_INVITE'; payload: SpecialRelationship }
  | { type: 'BIND_CP'; payload: CPRelationship }
  | { type: 'UNBIND_CP' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_SPECIAL_RELATIONSHIP'; payload: SpecialRelationship }
  | { type: 'REMOVE_SPECIAL_RELATIONSHIP'; payload: string }
  | { type: 'DEDUCT_GOLD'; payload: number }
  | { type: 'SET_GOLD'; payload: number }
  | { type: 'UPDATE_INVITATION_STATUS'; payload: { id: string; status: 'accepted' | 'rejected' } };
