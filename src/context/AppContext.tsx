import React, { createContext, useReducer, useEffect, useMemo, useRef } from 'react';
import {
  AppState,
  AppAction,
  ViewMode,
  CPState,
  GiftRecord,
  CPPairingMessage,
} from '../types';
import { appReducer } from './appReducer';
import { mockCurrentUser, mockViewingUser, mockPartnerUser } from '../data/mockUser';
import { mockBoundCP, mockUnboundCP, mockOtherCP } from '../data/mockCP';
import { mockSpecialSlotConfigs, mockInvitationRecords } from '../data/mockSpecial';
import { SpecialRelationship } from '../types';
import { mockRankings } from '../data/mockRanking';
import { mockPrivileges } from '../data/mockPrivileges';
import { mockTasks, mockCheckInRecords } from '../data/mockTasks';
import { getCookie, setCookie, deleteCookie, COOKIE_KEYS } from '../utils/cookies';
import { SPECIAL_DEFAULT_SLOTS } from '../utils/constants';

/** localStorage key for persisted special relationships */
const SPECIAL_RELS_KEY = 'cp_specialRelationships';
/** localStorage key for unlocked special slots count */
const UNLOCKED_SLOTS_KEY = 'cp_unlockedSpecialSlots';

/** 读取持久化的 Special 关系 */
function getPersistedSpecialRelationships(): SpecialRelationship[] | null {
  try {
    const raw = localStorage.getItem(SPECIAL_RELS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as SpecialRelationship[];
  } catch {
    // ignore parse errors
  }
  return null;
}

/** 写入持久化的 Special 关系 */
function setPersistedSpecialRelationships(rels: SpecialRelationship[]): void {
  try {
    localStorage.setItem(SPECIAL_RELS_KEY, JSON.stringify(rels));
  } catch {
    // ignore write errors
  }
}

/** 读取持久化的已解锁 Special 槽位数 */
function getPersistedUnlockedSlots(): number {
  try {
    const raw = localStorage.getItem(UNLOCKED_SLOTS_KEY);
    if (raw !== null) {
      const val = parseInt(raw, 10);
      if (val >= SPECIAL_DEFAULT_SLOTS && val <= 9) return val;
    }
  } catch {
    // ignore
  }
  return SPECIAL_DEFAULT_SLOTS;
}

/** 生成全局礼物记录（全服滚动） */
function generateGlobalGiftRecords(): GiftRecord[] {
  const records: GiftRecord[] = [];
  const giftTypes = [
    { name: '玫瑰花束', icon: '💐', value: 5000 },
    { name: '钻石戒指', icon: '💍', value: 50000 },
    { name: '浪漫跑车', icon: '🏎️', value: 100000 },
    { name: '皇冠', icon: '👑', value: 200000 },
    { name: '爱心', icon: '❤️', value: 1000 },
    { name: '星辰', icon: '⭐', value: 500 },
    { name: '独角兽', icon: '🦄', value: 88000 },
    { name: '城堡', icon: '🏰', value: 1314000 },
  ];

  const names = ['小甜心', '大笨蛋', '星辰', '大海', '阳光', '彩虹', '微风', '细雨', '闪电', '雷鸣'];
  const receivers = ['小美', '阿哲', '大壮', '小芳', '静静'];

  for (let i = 0; i < 25; i++) {
    const gift = giftTypes[i % giftTypes.length];
    const date = new Date();
    date.setDate(date.getDate() - i * 2);
    records.push({
      id: `global-gift-${i}`,
      giftName: gift.name,
      giftIcon: gift.icon,
      value: gift.value,
      senderId: `sender-${i % names.length}`,
      receiverId: `receiver-${i % receivers.length}`,
      date: date.toISOString().split('T')[0],
    });
  }

  return records;
}

/** 生成全局CP结成消息（全服滚动） */
function generateGlobalPairingMessages(): CPPairingMessage[] {
  const messages: CPPairingMessage[] = [];
  const maleNames: string[] = [
    '大笨蛋', '阿哲', '大壮', '闪电', '雷鸣', '追风', '傲天', '星河',
    '独行', '狂战', '冷月', '夜影', '飞鹰', '无双', '霸天',
  ];
  const femaleNames: string[] = [
    '小甜心', '星辰', '阳光', '彩虹', '微风', '细雨', '小美', '小芳',
    '静静', '灵儿', '雪儿', '月儿', '诗涵', '婉清', '若曦',
  ];
  const ringNames: string[] = [
    '永恒之心', '璀璨星辰', '月光恋曲', '玫瑰誓言', '钻石之约',
    '命运羁绊', '星河之恋', '天使之翼', '蓝色幻想', '皇室瑰宝',
  ];

  for (let i = 0; i < 25; i++) {
    const name1 = i % 2 === 0
      ? femaleNames[i % femaleNames.length]
      : maleNames[i % maleNames.length];
    const name2 = i % 2 === 0
      ? maleNames[i % maleNames.length]
      : femaleNames[(i + 7) % femaleNames.length];
    const date = new Date();
    date.setDate(date.getDate() - i * (1 + (i % 3)));
    const cpLevel = (i % 10) + 1;

    messages.push({
      id: `pairing-msg-${i}`,
      user1Name: name1,
      user2Name: name2,
      date: date.toISOString().split('T')[0],
      ringName: ringNames[i % ringNames.length],
      cpLevel,
    });
  }

  return messages;
}

/** 从 URL 参数解析 mode */
function getModeFromURL(): ViewMode {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'other') return ViewMode.OTHER;
  return ViewMode.SELF;
}

/** 从 URL 参数解析 cpState（仅在 cookie 缺失时生效） */
function getCPStateFromURL(): CPState | null {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('cpState');
  if (state === 'unbound') return CPState.UNBOUND;
  if (state === 'bound') return CPState.BOUND;
  return null;
}

/** 从 cookie 读取持久化的 CP 状态 */
function getCPStateFromCookie(): CPState | null {
  const raw = getCookie(COOKIE_KEYS.CP_STATE);
  if (raw === 'bound') return CPState.BOUND;
  if (raw === 'unbound') return CPState.UNBOUND;
  return null;
}

/** 从 cookie 读取持久化的金币数 */
function getGoldFromCookie(): number | null {
  const raw = getCookie(COOKIE_KEYS.GOLD);
  if (raw !== null) {
    const num = Number(raw);
    if (!Number.isNaN(num) && num >= 0) return num;
  }
  return null;
}

/** 从 cookie 读取持久化的 CP 等级 */
function getCPLevelFromCookie(): number | null {
  const raw = getCookie(COOKIE_KEYS.CP_LEVEL);
  if (raw !== null) {
    const num = Number(raw);
    if (!Number.isNaN(num) && num >= 0) return num;
  }
  return null;
}

function createInitialState(): AppState {
  const viewMode = getModeFromURL();

  // ============================================================
  // 金币：cookie > mock 默认值
  // ============================================================
  const cookieGold = getGoldFromCookie();
  const currentUser = cookieGold !== null
    ? { ...mockCurrentUser, gold: cookieGold }
    : mockCurrentUser;

  // ============================================================
  // CP 状态：cookie > URL 参数 > 默认 UNBOUND
  // ============================================================
  const cookieCPState = getCPStateFromCookie();
  const urlCPState = getCPStateFromURL();

  let cpRelationship: AppState['cpRelationship'];
  let cpState: CPState;

  if (cookieCPState !== null) {
    // Cookie 优先 — 恢复持久化状态
    cpState = cookieCPState;
    if (cpState === CPState.BOUND) {
      const cookieLevel = getCPLevelFromCookie();
      cpRelationship = cookieLevel !== null
        ? { ...mockBoundCP, cpLevel: cookieLevel }
        : mockBoundCP;
    } else {
      cpRelationship = null;
    }
  } else if (urlCPState !== null) {
    // URL 参数降级
    cpState = urlCPState;
    cpRelationship = cpState === CPState.BOUND ? mockBoundCP : null;
  } else if (viewMode === ViewMode.OTHER) {
    cpState = CPState.BOUND;
    cpRelationship = mockOtherCP;
  } else {
    cpState = CPState.UNBOUND;
    cpRelationship = null;
  }

  // 任务在 other 模式下隐藏
  const cpTasks = viewMode === ViewMode.OTHER
    ? mockTasks.map((t) => ({
        ...t,
        status: t.status === 'available' ? ('locked' as const) : t.status,
      }))
    : mockTasks;

  const globalPairingMessages = generateGlobalPairingMessages();

  const otherCPState: CPState = viewMode === ViewMode.OTHER ? CPState.BOUND : cpState;

  const persistedSpecialRels = getPersistedSpecialRelationships();

  return {
    currentUser,
    cpState,
    otherCPState,
    cpRelationship,
    specialRelationships: persistedSpecialRels ?? [],
    specialSlotConfigs: mockSpecialSlotConfigs,
    unlockedSpecialSlots: getPersistedUnlockedSlots(),
    cpTasks,
    checkInRecords: mockCheckInRecords,
    cpPrivileges: mockPrivileges,
    rankingEntries: mockRankings,
    viewMode,
    viewingUser: viewMode === ViewMode.OTHER ? mockViewingUser : null,
    giftRecords: [],
    pairingMessages: globalPairingMessages,
    invitationRecords: mockInvitationRecords,
  };
}

export interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = useMemo(() => createInitialState(), []);
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 跟踪是否已完成首次挂载，避免初始化时覆盖 cookie
  const isMounted = useRef(false);

  // ============================================================
  // 金币 → cookie 同步
  // ============================================================
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setCookie(COOKIE_KEYS.GOLD, String(state.currentUser.gold));
  }, [state.currentUser.gold]);

  // ============================================================
  // CP 绑定状态 → cookie 同步
  // ============================================================
  useEffect(() => {
    if (!isMounted.current) return;
    setCookie(COOKIE_KEYS.CP_STATE, state.cpState);

    if (state.cpState === CPState.UNBOUND) {
      // 解除绑定时清除 CP 等级 cookie
      deleteCookie(COOKIE_KEYS.CP_LEVEL);
    }
  }, [state.cpState]);

  // ============================================================
  // Special 关系 → localStorage 同步
  // ============================================================
  useEffect(() => {
    if (!isMounted.current) return;
    setPersistedSpecialRelationships(state.specialRelationships);
  }, [state.specialRelationships]);

  // ============================================================
  // 已解锁 Special 槽位数 → localStorage 同步
  // ============================================================
  useEffect(() => {
    if (!isMounted.current) return;
    try { localStorage.setItem(UNLOCKED_SLOTS_KEY, String(state.unlockedSpecialSlots)); } catch {}
  }, [state.unlockedSpecialSlots]);

  // ============================================================
  // CP 等级 → cookie 同步（仅绑定状态下有意义）
  // ============================================================
  useEffect(() => {
    if (!isMounted.current) return;
    if (state.cpRelationship?.cpLevel !== undefined) {
      setCookie(COOKIE_KEYS.CP_LEVEL, String(state.cpRelationship.cpLevel));
    }
  }, [state.cpRelationship?.cpLevel]);

  const contextValue = useMemo<AppContextValue>(
    () => ({ state, dispatch }),
    [state, dispatch],
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
