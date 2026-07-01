/**
 * Cookie 工具 — 用于持久化全局状态（金币、CP绑定状态等）
 *
 * 所有 cookie 统一前缀 `cp_`，有效期 30 天，path=/
 */

const COOKIE_PREFIX = 'cp_';
const DEFAULT_DAYS = 30;
const PATH = '/';

/** 写入 cookie */
export function setCookie(key: string, value: string, days: number = DEFAULT_DAYS): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${COOKIE_PREFIX}${key}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${PATH}`;
}

/** 读取 cookie，不存在返回 null */
export function getCookie(key: string): string | null {
  const name = `${COOKIE_PREFIX}${key}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.startsWith(name)) {
      return decodeURIComponent(c.substring(name.length));
    }
  }
  return null;
}

/** 删除 cookie */
export function deleteCookie(key: string): void {
  document.cookie = `${COOKIE_PREFIX}${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${PATH}`;
}

// ============================================================
// 业务语义封装
// ============================================================

/** 持久化的全局状态键 */
export const COOKIE_KEYS = {
  GOLD: 'gold',
  CP_STATE: 'cpState',
  CP_LEVEL: 'cpLevel',
} as const;
