import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CPSpacePage from '../pages/CPSpacePage';
import { AppContext, AppContextValue } from '../context/AppContext';
import { AppState, CPState, ViewMode, Gender } from '../types';

/**
 * Helper: create a minimal AppState for testing.
 */
function createTestState(overrides: Partial<AppState> = {}): AppState {
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
    cpState: CPState.UNBOUND,
    otherCPState: CPState.UNBOUND,
    cpRelationship: null,
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

/**
 * Helper: wrap component with AppContext.Provider.
 */
function renderWithContext(
  ui: React.ReactElement,
  state: AppState,
  dispatch: AppContextValue['dispatch'] = vi.fn(),
) {
  return render(
    <AppContext.Provider value={{ state, dispatch }}>
      {ui}
    </AppContext.Provider>,
  );
}

// Mock child components to avoid deep rendering
vi.mock('../components/layout/TopBar', () => ({
  default: ({ title }: { title: string }) => <div data-testid="topbar">{title}</div>,
}));

vi.mock('../components/cp-space/BoundView', () => ({
  default: () => <div data-testid="bound-view">BoundView</div>,
}));

vi.mock('../components/cp-space/UnboundView', () => ({
  default: () => <div data-testid="unbound-view">UnboundView</div>,
}));

vi.mock('../components/effects/StarryBackground', () => ({
  default: () => <div data-testid="starry-bg" />,
}));

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ============================================================
// CPSpacePage - View Selection Logic Tests
// ============================================================

describe('CPSpacePage', () => {
  describe('View Selection based on cpState', () => {
    // S1: SELF + UNBOUND → UnboundView
    it('S1: SELF + UNBOUND → renders UnboundView', () => {
      const state = createTestState({
        viewMode: ViewMode.SELF,
        cpState: CPState.UNBOUND,
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('unbound-view')).toBeDefined();
      expect(screen.queryByTestId('bound-view')).toBeNull();
    });

    // S2: SELF + BOUND → BoundView
    it('S2: SELF + BOUND → renders BoundView', () => {
      const state = createTestState({
        viewMode: ViewMode.SELF,
        cpState: CPState.BOUND,
        cpRelationship: {
          id: 'cp-001',
          partner: {
            id: 'user-002',
            name: '小美',
            avatar: '',
            gender: Gender.FEMALE,
            level: 1,
            signature: '',
            gold: 0,
          },
          cpLevel: 5,
          intimacyScore: 5000,
          loveDays: 100,
          boundDate: '2024-01-01',
          is7DayTaskComplete: true,
          badges: [],
          memories: [],
          upgradeRecords: [],
          giftRecords: [],
        },
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('bound-view')).toBeDefined();
      expect(screen.queryByTestId('unbound-view')).toBeNull();
    });

    // O1: OTHER + BOUND + otherCPState=BOUND → BoundView
    it('O1: OTHER + BOUND + otherCPState=BOUND → renders BoundView', () => {
      const state = createTestState({
        viewMode: ViewMode.OTHER,
        cpState: CPState.BOUND,
        otherCPState: CPState.BOUND,
        cpRelationship: {
          id: 'cp-001',
          partner: {
            id: 'user-002',
            name: '小美',
            avatar: '',
            gender: Gender.FEMALE,
            level: 1,
            signature: '',
            gold: 0,
          },
          cpLevel: 5,
          intimacyScore: 5000,
          loveDays: 100,
          boundDate: '2024-01-01',
          is7DayTaskComplete: true,
          badges: [],
          memories: [],
          upgradeRecords: [],
          giftRecords: [],
        },
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('bound-view')).toBeDefined();
      expect(screen.queryByTestId('unbound-view')).toBeNull();
    });

    // O2: OTHER + BOUND + otherCPState=UNBOUND → BoundView
    it('O2: OTHER + BOUND + otherCPState=UNBOUND → renders BoundView', () => {
      const state = createTestState({
        viewMode: ViewMode.OTHER,
        cpState: CPState.BOUND,
        otherCPState: CPState.UNBOUND,
        cpRelationship: {
          id: 'cp-001',
          partner: {
            id: 'user-002',
            name: '小美',
            avatar: '',
            gender: Gender.FEMALE,
            level: 1,
            signature: '',
            gold: 0,
          },
          cpLevel: 5,
          intimacyScore: 5000,
          loveDays: 100,
          boundDate: '2024-01-01',
          is7DayTaskComplete: true,
          badges: [],
          memories: [],
          upgradeRecords: [],
          giftRecords: [],
        },
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('bound-view')).toBeDefined();
      expect(screen.queryByTestId('unbound-view')).toBeNull();
    });

    // O3: OTHER + UNBOUND + otherCPState=BOUND → UnboundView
    it('O3: OTHER + UNBOUND + otherCPState=BOUND → renders UnboundView', () => {
      const state = createTestState({
        viewMode: ViewMode.OTHER,
        cpState: CPState.UNBOUND,
        otherCPState: CPState.BOUND,
        cpRelationship: null,
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('unbound-view')).toBeDefined();
      expect(screen.queryByTestId('bound-view')).toBeNull();
    });

    // O4: OTHER + UNBOUND + otherCPState=UNBOUND → UnboundView
    it('O4: OTHER + UNBOUND + otherCPState=UNBOUND → renders UnboundView', () => {
      const state = createTestState({
        viewMode: ViewMode.OTHER,
        cpState: CPState.UNBOUND,
        otherCPState: CPState.UNBOUND,
        cpRelationship: null,
      });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('unbound-view')).toBeDefined();
      expect(screen.queryByTestId('bound-view')).toBeNull();
    });
  });

  describe('Page structure', () => {
    it('should render TopBar with CP空间 title', () => {
      const state = createTestState({ cpState: CPState.UNBOUND });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('topbar')).toBeDefined();
      expect(screen.getByTestId('topbar').textContent).toContain('CP空间');
    });

    it('should render StarryBackground', () => {
      const state = createTestState({ cpState: CPState.UNBOUND });
      renderWithContext(<CPSpacePage />, state);

      expect(screen.getByTestId('starry-bg')).toBeDefined();
    });
  });
});
