import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BoundView from '../components/cp-space/BoundView';
import { AppContext, AppContextValue } from '../context/AppContext';
import { AppState, CPState, ViewMode, Gender } from '../types';
import { mockOtherCP } from '../data/mockCP';

/**
 * Helper: create minimal test state for BoundView.
 */
function createBoundState(overrides: Partial<AppState> = {}): AppState {
  return {
    currentUser: {
      id: 'user-001',
      name: '测试用户',
      avatar: 'https://example.com/avatar.png',
      gender: Gender.MALE,
      level: 5,
      signature: 'test',
      gold: 10000,
    },
    cpState: CPState.BOUND,
    otherCPState: CPState.UNBOUND,
    cpRelationship: {
      id: 'cp-001',
      partner: {
        id: 'user-002',
        name: '小美',
        avatar: 'https://example.com/avatar2.png',
        gender: Gender.FEMALE,
        level: 3,
        signature: 'hello',
        gold: 5000,
      },
      cpLevel: 5,
      intimacyScore: 5000,
      loveDays: 100,
      boundDate: '2024-01-01',
      is7DayTaskComplete: true,
      badges: [],
      memories: [],
      upgradeRecords: [],
      giftRecords: [
        { id: 'g-1', giftName: 'Rose', giftIcon: '🌹', value: 100, senderId: 'user-001', receiverId: 'user-002', date: '2024-06-01' },
        { id: 'g-2', giftName: 'Ring', giftIcon: '💍', value: 200, senderId: 'user-002', receiverId: 'user-001', date: '2024-06-02' },
      ],
    },
    specialRelationships: [],
    specialSlotConfigs: [],
    unlockedSpecialSlots: 3,
    cpTasks: [],
    checkInRecords: [],
    cpPrivileges: [],
    rankingEntries: [],
    viewMode: ViewMode.SELF,
    viewingUser: null,
    giftRecords: [],
    pairingMessages: [],
    invitationRecords: [],
    ...overrides,
  };
}

function renderBoundView(state: AppState, dispatch: AppContextValue['dispatch'] = vi.fn()) {
  return render(
    <AppContext.Provider value={{ state, dispatch }}>
      <BoundView />
    </AppContext.Provider>,
  );
}

// Mock sub-components (paths relative to src/__tests__/)
vi.mock('../components/cp-space/CoupleAvatarGroup', () => ({
  default: () => <div data-testid="couple-avatar" />,
}));
vi.mock('../components/cp-space/AchievementRow', () => ({
  default: () => <div data-testid="achievement-row" />,
}));
vi.mock('../components/cp-space/MemoryList', () => ({
  default: () => <div data-testid="memory-list" />,
}));
vi.mock('../components/effects/GiftBanner', () => ({
  default: ({ visible }: { visible: boolean }) => visible ? <div data-testid="gift-banner" /> : null,
}));
vi.mock('../components/effects/EntranceEffect', () => ({
  default: ({ trigger }: { trigger: boolean }) => trigger ? <div data-testid="entrance-effect" /> : null,
}));
vi.mock('../components/effects/GreekColumns', () => ({
  default: () => <div data-testid="greek-columns" />,
}));
vi.mock('../components/effects/HeartPulseLine', () => ({
  default: () => <div data-testid="heart-pulse" />,
}));
vi.mock('../pages/CPTasksPage', () => ({
  default: () => <div data-testid="cp-tasks" />,
}));
vi.mock('../pages/CPPrivilegesPage', () => ({
  default: () => <div data-testid="cp-privileges" />,
}));
vi.mock('../pages/CPRankingPage', () => ({
  default: () => <div data-testid="cp-ranking" />,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ============================================================
// BoundView Tests
// ============================================================

describe('BoundView', () => {
  // ----------------------------------------------------------
  // effectiveRelationship fallback
  // ----------------------------------------------------------
  describe('effectiveRelationship', () => {
    it('should render with real cpRelationship in SELF mode', () => {
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state);

      // The component should render, partner name should be from cpRelationship
      expect(screen.getByTestId('couple-avatar')).toBeDefined();
    });

    it('should render with mockOtherCP when OTHER + cpRelationship is null', () => {
      const state = createBoundState({
        viewMode: ViewMode.OTHER,
        cpRelationship: null,
      });
      renderBoundView(state);

      // The fallback should make the component render successfully
      // (mockOtherCP provides the data)
      expect(screen.getByTestId('couple-avatar')).toBeDefined();
    });
  });

  // ----------------------------------------------------------
  // UI Element Visibility in OTHER mode
  // ----------------------------------------------------------
  describe('UI visibility - OTHER mode', () => {
    it('should hide 🔄 切换未绑定 button in OTHER mode', () => {
      const state = createBoundState({ viewMode: ViewMode.OTHER });
      renderBoundView(state);

      const unbindBtn = screen.queryByText('🔄 切换未绑定');
      expect(unbindBtn).toBeNull();
    });

    it('should show 🔄 切换未绑定 button in SELF mode', () => {
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state);

      const unbindBtn = screen.getByText('🔄 切换未绑定');
      expect(unbindBtn).toBeDefined();
    });

    it('should show 切换第三方状态 button in OTHER mode', () => {
      const state = createBoundState({ viewMode: ViewMode.OTHER });
      renderBoundView(state);

      // Button text depends on otherCPState (UNBOUND → '🔗 切换第三方已绑定')
      const toggleBtn = screen.getByText('🔗 切换第三方已绑定');
      expect(toggleBtn).toBeDefined();
    });

    it('should NOT show 切换第三方状态 button in SELF mode', () => {
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state);

      // Neither variant should exist
      expect(screen.queryByText('🔗 切换第三方已绑定')).toBeNull();
      expect(screen.queryByText('🔓 切换第三方未绑定')).toBeNull();
    });
  });

  // ----------------------------------------------------------
  // View toggle button
  // ----------------------------------------------------------
  describe('view toggle button', () => {
    it('should show 第三方视角 in SELF mode', () => {
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state);

      expect(screen.getByText('👁️ 第三方视角')).toBeDefined();
    });

    it('should show 自己视角 in OTHER mode', () => {
      const state = createBoundState({ viewMode: ViewMode.OTHER });
      renderBoundView(state);

      expect(screen.getByText('👁️ 自己视角')).toBeDefined();
    });

    it('should dispatch SET_VIEW_MODE when clicked', () => {
      const dispatch = vi.fn();
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state, dispatch);

      screen.getByText('👁️ 第三方视角').click();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_VIEW_MODE',
        payload: ViewMode.OTHER,
      });
    });
  });

  // ----------------------------------------------------------
  // Third-party state toggle
  // ----------------------------------------------------------
  describe('third-party state toggle', () => {
    it('should show 切换第三方已绑定 when otherCPState is UNBOUND in OTHER mode', () => {
      const state = createBoundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.UNBOUND,
      });
      renderBoundView(state);

      expect(screen.getByText('🔗 切换第三方已绑定')).toBeDefined();
    });

    it('should show 切换第三方未绑定 when otherCPState is BOUND in OTHER mode', () => {
      const state = createBoundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.BOUND,
      });
      renderBoundView(state);

      expect(screen.getByText('🔓 切换第三方未绑定')).toBeDefined();
    });

    it('should dispatch SET_OTHER_CP_STATE when toggled', () => {
      const dispatch = vi.fn();
      const state = createBoundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.UNBOUND,
      });
      renderBoundView(state, dispatch);

      screen.getByText('🔗 切换第三方已绑定').click();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_OTHER_CP_STATE',
        payload: CPState.BOUND,
      });
    });

    it('should toggle from BOUND to UNBOUND', () => {
      const dispatch = vi.fn();
      const state = createBoundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.BOUND,
      });
      renderBoundView(state, dispatch);

      screen.getByText('🔓 切换第三方未绑定').click();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_OTHER_CP_STATE',
        payload: CPState.UNBOUND,
      });
    });
  });

  // ----------------------------------------------------------
  // UNBIND confirmation modal flow
  // ----------------------------------------------------------
  describe('unbind action', () => {
    // With ConfirmUnbindModal now intercepting, clicking the button
    // opens the modal. UNBIND_CP is only dispatched after code verification.
    it('should NOT directly dispatch UNBIND_CP when 🔄 切换未绑定 is clicked (modal intercepts)', () => {
      const dispatch = vi.fn();
      const state = createBoundState({ viewMode: ViewMode.SELF });
      renderBoundView(state, dispatch);

      screen.getByText('🔄 切换未绑定').click();
      // The button now opens ConfirmUnbindModal instead of dispatching directly
      expect(dispatch).not.toHaveBeenCalledWith({ type: 'UNBIND_CP' });
    });
  });

  // ----------------------------------------------------------
  // Tab navigation
  // ----------------------------------------------------------
  describe('tab navigation', () => {
    it('should render all tab buttons', () => {
      const state = createBoundState();
      renderBoundView(state);

      expect(screen.getByText('CP空间')).toBeDefined();
      expect(screen.getByText('任务')).toBeDefined();
      expect(screen.getByText('特权')).toBeDefined();
      expect(screen.getByText('榜单')).toBeDefined();
    });
  });
});
