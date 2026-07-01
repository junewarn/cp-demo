# CP Demo v2 — 产品需求文档 (PRD)

> **文档版本**: v2.0  
> **作者**: 许清楚（产品经理）  
> **日期**: 2025-07-02  
> **状态**: 草案  
> **技术栈**: Vite + React 18 + TypeScript + MUI 5 + Tailwind CSS 3 + React Router 6 + Framer Motion 11

---

## 1. 项目信息

| 项目 | 内容 |
|------|------|
| **项目名称** | `cp-demo` |
| **编程语言** | TypeScript 5.x |
| **UI 框架** | React 18 + MUI 5 + Tailwind CSS 3 |
| **路由** | React Router 6 |
| **动画** | Framer Motion 11 |
| **构建工具** | Vite 6 |
| **演示模式** | URL 参数 `?mode=self\|other\|unbound` |

### 原始需求复述

基于已有基础框架 Demo，全量重写 SPECIAL 和 CP 相关页面。CP 邀请不限制性别，支持 CP 和 Special（Bestie / Soulmate / Homie）两种亲密关系体系。核心交付包括：

- **CP 空间**（未绑定/已绑定两种状态）：粉紫星空渐变 + 希腊柱廊豪华主题，含礼物滚动记录、榜单入口、特权入口、规则、申请记录
- **CP 任务**：7 天任务奖励 + 打卡日历墙（最近 3 个月）
- **CP 特权**：Level 1–13 特权展示，Level 9+ 切换专属背景
- **CP 打卡榜单**：按任务完成天数排名
- **CP 证书**：每个等级独立样式的证书
- **Special 页面**（未绑定/已绑定）：Bestie / Soulmate / Homie 三种关系，每种限绑 3 人，支持付费解锁新关系位
- **个人资料页面**：CP 关系卡 + Special 关系网格（9 位置），支持本人/他人视角
- **房间内送 SPECIAL 礼物弹窗**

---

## 2. 产品定义

### 2.1 产品目标

1. **Demo 展示完整性**：覆盖 CP 和 Special 两种亲密关系体系的全流程——从未绑定到已绑定、从基础功能到高级特权，让观众能在一次演示中体验完整产品逻辑。
2. **视觉冲击力**：通过粉紫星空、金色希腊柱廊、翅膀皇冠头像框、扫光特效、循环动画等豪华视觉元素，传递"高端社交产品"的品牌感。
3. **多状态可切换**：通过 URL 参数一键切换本人视角、他人视角、未绑定状态，方便演示不同场景，无需多次登录或操作。

### 2.2 用户故事

| # | 故事 |
|---|------|
| US1 | As a **新用户（未绑定任何关系）**, I want 浏览 CP 空间页面看到精美的未绑定引导页面，so that 我被吸引去邀请他人建立 CP 关系。 |
| US2 | As a **已绑定 CP 的用户**, I want 在 CP 空间看到双方头像、勋章、送礼记录、特权进度，so that 我感受到亲密关系的成长和成就感。 |
| US3 | As a **Special 关系用户**, I want 自由选择 Bestie/Soulmate/Homie 类型绑定多位好友，so that 我能灵活管理不同类型的好友关系。 |
| US4 | As a **浏览他人资料的用户**, I want 查看他人的 CP 空间和资料，so that 我了解他人的亲密关系状态，但无法看到对方的任务进度。 |
| US5 | As a **演示操作者**, I want 通过 URL 参数快速切换演示模式，so that 无需复杂操作就能展示不同场景。 |

---

## 3. 技术规范

### 3.1 需求池

#### P0 — 必须实现（核心功能）

| ID | 需求 | 说明 |
|----|------|------|
| P0-01 | CP 空间 — 未绑定页面 | 粉紫星空渐变 + 金色希腊柱廊 + 粉色帷幕背景；CP/Special 切换标签；金色翅膀皇冠头像框；双方头像（一侧为空位 "+"）；钻戒盒大图；"Invite CP" 按钮（金色边框）；榜单、特权、规则、申请按钮 |
| P0-02 | CP 空间 — 已绑定页面 | 相同豪华背景；双方头像 + CP 等级勋章；Love Days + Intimacy 数据面板；解除关系按钮；底部 Tab（CP Space / Task / Privilege / Ranking）|
| P0-03 | CP 勋章体系 | 1–8 级：基础爱心勋章（无数字）；9–12 级：带数字勋章；未完成 7 日任务：显示爱心线脉冲动画（无论等级） |
| P0-04 | CP 成就勋章行 | 打卡勋章 + 历史等级勋章（累计展示，如 Lv7 展示 Lv1–Lv7 共 7 个）；一排 5 个，超出换行 |
| P0-05 | CP 记忆列表 | 双方互赠礼物记录，按单个礼物价值高到低排序；显示数量（x100）；网格布局每行 4 个 |
| P0-06 | CP 礼物赠送滚动记录 | 3 排展示，3 个月内历史记录，上下循环滚动，3 秒/条 |
| P0-07 | CP 任务 — 打卡日历 | 最近 3 个月日历；当天完成任务点亮爱心；支持切换月份查看 |
| P0-08 | CP 任务 — 7 日奖励 | 3 天气泡、5 天座驾、7 天永久勋章；7 日完成后解锁勋章（勋章替换爱心线） |
| P0-09 | CP 特权页面 | Level 1–13 特权列表；已达成高亮、未达成灰色锁定；装扮无点击事件 |
| P0-10 | CP 打卡榜单 | 按完成任务天数降序排列；同天数按最后完成时间升序；头像无点击事件；不限制连续 |
| P0-11 | CP 证书 | 每个等级独立证书；双人头像 + 罗马数字 + 翅膀 + 皇冠；底部 3×4 奖励网格；Lv3–Lv7 颜色主题（冰蓝/粉/金/紫/红） |
| P0-12 | Special 页面 — 未绑定 | 紫粉渐变背景 + 动态闪光字母标题；默认 3 种关系类型 × 2 位 = 6 个默认位置（每种限绑 3 人）；榜单/特权按钮 |
| P0-13 | Special 页面 — 已绑定 | 关系位用完时显示剩余数 + 解锁按钮；36,000 金币解锁确认弹窗；三种关系均达上限则隐藏入口 |
| P0-14 | Special 邀请/结缘页面 | 输入用户 ID → 选择关系类型（Bestie/Soulmate/Homie） → 发送邀请卡 |
| P0-15 | 个人资料页面 | CP 关系卡（蓝 Bestie / 紫 Soulmate / 金 Homie，含等级+天数）；Special 关系 9 格；双人头像上方显示 7 天内最高价值礼物或默认关系图标 |
| P0-16 | 他人视角 | 个人资料页可查看他人 CP；不展示申请记录按钮；CP 任务页仅展示打卡天数，隐藏进度 |
| P0-17 | CP 邀请不限制性别 | 所有用户均可互相邀请建立 CP 关系 |
| P0-18 | URL 参数演示模式 | `?mode=self` 本人视角、`?mode=other` 他人视角、`?mode=unbound` 未绑定状态 |

#### P1 — 重要但可简化

| ID | 需求 | 说明 |
|----|------|------|
| P1-01 | Level 9–13 专属背景切换 | Lv9 蓝色星空 + 翅膀、Lv10 金色渐变、Lv11 彩虹渐变、Lv12 紫色星空、Lv13 彩虹极光 |
| P1-02 | CP 特权详情 | 成就勋章；动态爱心线联动；双人进场特效（"entered room"）；CP 送礼顶部横幅（≥900K 金币飘横幅）；麦上效果；资料名片卡扫光+亮点 |
| P1-03 | 送 SPECIAL 礼物弹窗 | 聊天页面触发；不同礼物类别和价格选择 |
| P1-04 | CP 解绑逻辑 | 解绑后个人资料去证书、CP 空间回退未绑定、勋章 app 清除但数据库保留、打卡记录清空、榜单清空；复婚恢复等级和勋章 |
| P1-05 | CP 升级记录循环播放 | "双方头像 + Upgraded CP Level X"，左右循环滚动 |
| P1-06 | Special 榜单页面 | 从 Special 页面榜单按钮跳转 |
| P1-07 | Special 特权页面 | 从 Special 页面特权按钮跳转 |

#### P2 — 锦上添花

| ID | 需求 | 说明 |
|----|------|------|
| P2-01 | 动态闪光字母设计 | Special 页面标题区域的动态闪光动画 |
| P2-02 | 心形脉冲线 | 未绑定 CP 页面双方头像间的心形脉冲连线动画 |
| P2-03 | 水晶质感按钮 | 榜单（奖杯图标）和特权（爱心图标）按钮的水晶质感效果 |
| P2-04 | 钻戒盒 3D 效果 | 钻戒盒图片的立体感呈现 |
| P2-05 | 金色翅膀皇冠头像框动画 | 头像框的翅膀轻微浮动动画 |
| P2-06 | 背景渐变过渡 | Level 切换时背景渐变的平滑过渡 |
| P2-07 | 扫光 + 亮点粒子 | 资料名片卡上的金属光泽扫过 + 随机亮点闪烁 |

---

## 4. 页面清单

### 4.1 按模块分组

#### CP 模块

| 页面 | 路由 | 说明 |
|------|------|------|
| CP 空间 | `/cp-space` | 主页面，按 cpState 分发 UnboundView / BoundView |
| CP 任务 | `/cp-tasks` | 7 日任务进度 + 打卡日历墙 |
| CP 特权 | `/cp-privileges` | Level 1–13 特权展示 |
| CP 打卡榜单 | `/cp-ranking` | 按任务天数排名的榜单 |
| CP 规则 | `/cp-rules` | CP 规则说明页（原页面，无改动） |
| CP 申请记录 | `/cp-applications` | 申请记录页（原页面，无改动） |
| CP 证书 | `/cp-certificate` | 当前等级 CP 证书展示 |

#### Special 模块

| 页面 | 路由 | 说明 |
|------|------|------|
| Special 主页 | `/special` | 紫粉渐变标题；未绑定/已绑定状态 |
| Special 榜单 | `/special-ranking` | Bestie 榜单页面 |
| Special 特权 | `/special-privileges` | Special 特权页面 |
| Special 邀请 | `/special-invite` | 输入用户 ID + 选择关系类型 |
| Special 礼物弹窗 | （弹窗组件） | 房间内送礼弹窗 |

#### 个人资料模块

| 页面 | 路由 | 说明 |
|------|------|------|
| 个人资料 | `/profile` | CP 关系卡 + Special 关系网格（9 格）；支持 self/other 模式 |

#### 通用模块

| 组件 | 说明 |
|------|------|
| 底部导航 | CP 空间 / 任务 / 特权 / Special 四个 Tab |
| 页面容器 | 安全区域 padding，max-w-[390px] 居中 |
| 顶部标题栏 | 页面标题 + 返回按钮 |

### 4.2 页面状态矩阵

| 页面 | self + bound | self + unbound | other + bound | other + unbound |
|------|:---:|:---:|:---:|:---:|
| CP 空间 | ✅ 完整 | ✅ 未绑定引导 | ✅ 不展示申请按钮 | ✅ 未绑定引导（无按钮） |
| CP 任务 | ✅ 完整 | — | ✅ 仅打卡天数 | — |
| CP 特权 | ✅ 按等级解锁 | ✅ "暂无 CP" | ✅ 同 self | ✅ "暂无 CP" |
| CP 打卡榜单 | ✅ | ✅ | ✅ | ✅ |
| CP 证书 | ✅ | — | ✅ | — |
| Special 主页 | ✅ 按绑定数 | ✅ 默认 6 位 | ✅ | ✅ |
| 个人资料 | ✅ 完整 | ✅ 空白 CP 卡 | ✅ 他人数据 | ✅ 他人数据 |

---

## 5. UI 设计规范

### 5.1 色彩体系

#### 主色调

```
粉紫主色（CP 主题）：
  --cp-primary: #E91E8C         主色
  --cp-primary-light: #F8BBD0   浅粉
  --cp-primary-dark: #AD1457    深粉
  --cp-accent: #FF6B9D          强调色
  --cp-gold: #FFD700            金色

Special 关系配色：
  Bestie:   蓝色系 (#4D96FF 主色, #E3F2FD 背景)
  Soulmate: 紫色系 (#9B59B6 主色, #F3E5F5 背景)
  Homie:    金/橙色系 (#FF8C00 主色, #FFF3E0 背景)
```

#### 等级背景（Level 9+）

| 等级 | 背景描述 | CSS 渐变方向 |
|------|----------|-------------|
| Lv1–8 | 默认粉紫星空 | 基础背景 |
| Lv9 | 蓝色星空渐变 + 翅膀装饰 | `linear-gradient(135deg, #1a1a3e, #2c3e6b, #4a90d9)` |
| Lv10 | 金色渐变 | `linear-gradient(135deg, #1a1a2e, #4a3800, #c9a96e)` |
| Lv11 | 彩虹渐变 | `linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #9B59B6)` |
| Lv12 | 紫色星空渐变 | `linear-gradient(135deg, #1a0033, #4a0e6b, #9b59b6)` |
| Lv13 | 彩虹极光渐变 | `linear-gradient(135deg, #FF0080, #FF8C00, #40E0D0, #8B00FF)` |

### 5.2 背景风格

| 场景 | 背景 |
|------|------|
| CP 空间（所有状态） | 粉紫星空渐变 + 金色希腊柱廊装饰 + 粉色帷幕 |
| Special 页面 | 紫粉渐变 + 动态闪光字母标题 |
| 个人资料 | CP 关系卡按关系类型着色（蓝/紫/金），Special 网格统一白色卡片底 |

### 5.3 头像框

- **CP 头像框**：金色翅膀 + 皇冠，带轻微浮动动画
- **Special 头像框**：按类型区分边框颜色（蓝/紫/金），无翅膀皇冠

### 5.4 按钮样式

| 类型 | 样式 |
|------|------|
| 主按钮（Invite CP） | 金色边框 `border-[#FFD700]`，圆角 12px，文字金色 |
| 水晶质感按钮（Ranking / Privilege） | 半透明玻璃质感，`backdrop-blur`，内嵌图标 |
| 解锁按钮（Special） | 渐变粉紫背景，白色文字 |
| Tab 切换标签 | 圆角按钮对，激活态粉色渐变，默认态半透明 |

### 5.5 卡片样式

- **CP 关系卡**：圆角 16px，金色细边框 `border-[#FFD700]/30`，玫瑰装饰角
- **Special 关系卡**：圆角 12px，按类型着色边框，头像 + 昵称 + 等级 + 天数
- **特权卡**：圆角 12px，已解锁亮色背景，未解锁灰色背景

### 5.6 动效参数

| 动效 | 时长 | 说明 |
|------|------|------|
| 礼物滚动 | 3 秒/条 | 上下无缝循环 |
| 升级记录滚动 | 左右循环 | 自动播放 |
| 心形脉冲 | 1.5 秒/周期 | 脉冲缩放 |
| 扫光 | 3 秒/周期 | 左→右线性扫过 |
| 亮点粒子 | 随机 1–4 秒 | Framer Motion scale(0→1→0) |
| 背景渐变切换 | 0.5 秒 | CSS transition |
| 翅膀浮动 | 2 秒/周期 | 轻微上下浮动 |

---

## 6. 数据模型

### 6.1 核心实体

```typescript
// 枚举
enum SpecialType { BESTIE, SOULMATE, HOMIE }
enum CPState { UNBOUND, BOUND }
enum ViewMode { SELF, OTHER }
enum BadgeType { LEVEL_BADGE, ACHIEVEMENT_BADGE, CHECKIN_BADGE }
enum Gender { MALE, FEMALE, OTHER }

// 用户
interface User {
  id: string;
  name: string;
  avatar: string;
  gender: Gender;
  level: number;
  signature: string;
  gold: number;                    // 金币数量（用于 Special 解锁）
}

// CP 关系
interface CPRelationship {
  id: string;
  partner: User;
  cpLevel: number;                 // 1–13
  intimacyScore: number;           // 亲密度数值
  loveDays: number;                // 相爱天数
  boundDate: string;               // ISO 8601
  is7DayTaskComplete: boolean;     // 是否完成 7 日任务
  badges: CPBadge[];
  memories: CPMemory[];
  upgradeRecords: CPUpgradeRecord[];
  giftRecords: GiftRecord[];
}

// CP 勋章
interface CPBadge {
  id: string;
  type: BadgeType;
  level: number;                   // 等级勋章对应等级
  name: string;
  iconUrl: string;
  unlocked: boolean;
}

// CP 记忆
interface CPMemory {
  id: string;
  gift: GiftRecord;
  date: string;
  description: string;
}

// 升级记录
interface CPUpgradeRecord {
  id: string;
  fromLevel: number;
  toLevel: number;
  date: string;
}

// 礼物记录
interface GiftRecord {
  id: string;
  giftName: string;
  giftIcon: string;
  value: number;
  senderId: string;
  receiverId: string;
  date: string;
}

// CP 任务
interface CPTask {
  id: string;
  day: number;                     // 1–7
  rewardName: string;
  rewardIcon: string;
  rewardType: 'bubble' | 'vehicle' | 'badge';
  completed: boolean;
}

// 打卡记录
interface CheckInRecord {
  id: string;
  date: string;                    // YYYY-MM-DD
  checked: boolean;
}

// CP 特权
interface CPPrivilege {
  level: number;                   // 1–13
  title: string;
  items: PrivilegeItem[];
  backgroundClass: string;         // 背景 CSS class
}

interface PrivilegeItem {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

// 榜单条目
interface CPRankingEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar: string;
  completedDays: number;
  lastCompletedAt: string;         // ISO 8601
}

// Special 关系
interface SpecialRelationship {
  id: string;
  partner: User;
  type: SpecialType;
  establishedDate: string;
  level: number;
  days: number;
}

// Special 关系位配置
interface SpecialSlotConfig {
  type: SpecialType;
  maxSlots: number;                // 每种类型最大 3 人
  usedSlots: number;
  unlockCost: number;              // 36,000 金币
}

// 应用全局状态
interface AppState {
  currentUser: User;
  cpState: CPState;
  cpRelationship: CPRelationship | null;
  specialRelationships: SpecialRelationship[];
  specialSlotConfigs: SpecialSlotConfig[];
  cpTasks: CPTask[];
  checkInRecords: CheckInRecord[];
  cpPrivileges: CPPrivilege[];
  rankingEntries: CPRankingEntry[];
  viewMode: ViewMode;
  viewingUser: User | null;        // 他人视角时被查看的用户
}
```

### 6.2 关系约束

- **CP 关系**：一个用户最多 1 个 CP（1 对 1）
- **Special 关系**：Bestie / Soulmate / Homie 各限绑 3 人，共计 9 个位置
- **默认关系位**：每种类型默认 2 个位置（共 6 个），额外 1 个需付费解锁（36,000 金币）
- **CP + Special 总共 9 个位置**：1 个 CP + 最多 9 个 Special = 个人资料展示 10 个位置

---

## 7. 交互说明

### 7.1 CP 空间 — 未绑定 → 邀请流程

```
用户进入 /cp-space（cpState=UNBOUND）
  → 看到未绑定 CP 页面（豪华主题）
  → 可点击：榜单 / 特权 / 规则(?) / 申请记录(Apply) / Invite CP
  → 点击 Invite CP：
      → 弹出邀请弹窗：输入用户 ID
      → 确认发送 CP 邀请（消耗 599K 金币）
      → Mock：直接切换到 cpState=BOUND
```

### 7.2 CP 勋章展示逻辑

```
if (cpRelationship.is7DayTaskComplete) {
  if (cpLevel >= 9) → 显示带数字的勋章（"9"）
  else → 显示基础爱心勋章（无数字）
} else {
  显示爱心线 + 脉冲动画（即使等级 ≥9）
}
```

### 7.3 Special 关系位解锁

```
用户进入 /special（已绑定状态）
  → 检查每个 SpecialType 的 usedSlots：
    if usedSlots < maxSlots (3) → 显示剩余位置 + "解锁"按钮
    if usedSlots === maxSlots for ALL types → 隐藏解锁入口
  → 点击解锁：
      → 弹窗："是否花费 36,000 金币解锁一个新的 Special 关系位？"
      → 确认 → 扣除金币 → 对应类型 maxSlots +1
```

### 7.4 Special 邀请流程

```
用户进入 /special → 点击【邀请】
  → 进入邀请页面 /special-invite
  → 输入用户 ID → 点击【邀请】
  → 弹出关系选择弹窗：Bestie / Soulmate / Homie
  → 选择类型 → 发送邀请卡到对方
  → 对方收到邀请卡通知
```

### 7.5 解绑 CP 流程

```
用户点击 "Terminate the CP relationship"
  → 确认弹窗 → 确认解绑
  → App 侧：清除 CP 证书、回到未绑定页面、打卡记录清空、榜单清空
  → 数据库侧：保留等级、勋章、历史数据
  → 若复婚：恢复等级和勋章，7 日任务无需重做
```

### 7.6 演示模式切换

```
URL 参数：
  ?mode=self      → 当前用户视角，cpState 由 Mock 数据决定
  ?mode=other     → 他人视角，viewingUser 设为 Mock 他人数据
  ?mode=unbound   → cpState=UNBOUND，强制未绑定状态

优先级：mode 参数 > Mock 默认数据
```

---

## 8. 待确认问题

| # | 问题 | 当前假设 | 影响范围 |
|---|------|----------|----------|
| Q1 | CP 等级升级规则（从 Lv1 到 Lv13 需要多少亲密度？） | Demo Mock 固定值，不做真实升级逻辑 | CP 特权、勋章 |
| Q2 | 等级 9–13 的 CP 证书具体视觉差异 | 沿用 Lv3–Lv7 颜色模板，增加复杂度装饰（待设计确认） | CP 证书页面 |
| Q3 | 双人进场特效的触发方式 | 模拟"进入房间"按钮手动触发 | CP 特权 |
| Q4 | CP 送礼顶部横幅的触发阈值 900K 是否需要调整 | 按需求设定 900,000 金币 | GiftBanner 组件 |
| Q5 | Special 关系是否也有等级和勋章体系 | 需求未明确提及，当前 Demo 暂不实现 | Special 模块 |
| Q6 | CP 规则页和申请记录页的 UI 是否重做 | 需求说"原页面，无改动"，当前 Mock 展示 | CP 规则/申请 |
| Q7 | 个人资料页 Special 网格 9 个位置的排列顺序 | 按 Bestie → Soulmate → Homie 类型分组排列 | ProfilePage |
| Q8 | 打卡日历是否支持补打卡 | 需求未提及，Demo 不支持 | CP 任务 |
| Q9 | 房间内送 SPECIAL 礼物弹窗的具体礼物列表 | Mock 数据：不同类别（鲜花/首饰/座驾等）和价格区间 | SpecialGiftModal |
| Q10 | CP 证书的奖励网格 3×4 具体展示哪些奖励 | 头像框、气泡、座驾、戒指等，具体列表待确认 | CP 证书 |

---

> **附录**: 本文档对应的系统设计文档见 [system_design.md](./system_design.md)，组件文件清单和架构细节以该文档为准。
