import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UnboundView from '../components/cp-space/UnboundView';
import { AppContext, AppContextValue } from '../context/AppContext';
import { AppState, CPState, ViewMode, Gender } from '../types';
import { mockBoundCP, mockOtherCP } from '../data/mockCP';

/**
 * Helper: create minimal test state for UnboundView.
 */
function createUnboundState(overrides: Partial<AppState> = {}): AppState {
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

function renderUnboundView(
  state: AppState,
  dispatch: AppContextValue['dispatch'] = vi.fn(),
) {
  return render(
    <MemoryRouter>
      <AppContext.Provider value={{ state, dispatch }}>
        <UnboundView />
      </AppContext.Provider>
    </MemoryRouter>,
  );
}

// Mock sub-components (paths relative to src/__tests__/)
vi.mock('../components/cp-space/CPPairingScrollList', () => ({
  default: () => <div data-testid="pairing-scroll" />,
}));
vi.mock('../components/cp-space/CPRulesModal', () => ({
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? <div data-testid="rules-modal" onClick={onClose}>Rules Modal</div> : null,
}));

// Use a spy-based mock for InviteCPModal
const mockInviteCPModalFn = vi.fn();
vi.mock('../components/cp-space/InviteCPModal', () => ({
  default: (props: any) => {
    mockInviteCPModalFn(props);
    if (!props.open) return null;
    const testId = props.blocked ? 'invite-modal-blocked' : 'invite-modal';
    return <div data-testid={testId}>{props.message || 'Invite'}</div>;
  },
}));

vi.mock('../components/effects/GreekColumns', () => ({
  default: () => <div data-testid="greek-columns" />,
}));
vi.mock('../components/common/CrystalButton', () => ({
  default: ({ children, onClick, icon }: any) => (
    <button data-testid={`crystal-${icon}`} onClick={onClick}>{icon} {children}</button>
  ),
}));
vi.mock('../components/common/GoldenWingsFrame', () => ({
  default: ({ children }: any) => <div data-testid="golden-wings">{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ============================================================
// UnboundView Tests
// ============================================================

describe('UnboundView', () => {
  beforeEach(() => {
    mockInviteCPModalFn.mockClear();
  });

  // ----------------------------------------------------------
  // Blocking logic: Invite CP
  // ----------------------------------------------------------
  describe('Invite CP blocking', () => {
    it('should block Invite CP when OTHER + otherCPState=BOUND (O3)', () => {
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.BOUND,
      });
      renderUnboundView(state);

      const inviteBtn = screen.getByText(/Invite CP/);
      act(() => { inviteBtn.click(); });

      const lastCall = mockInviteCPModalFn.mock.calls.at(-1);
      expect(lastCall).toBeDefined();
      expect(lastCall![0].open).toBe(true);
      expect(lastCall![0].blocked).toBe(true);
    });

    it('should NOT block Invite CP when OTHER + otherCPState=UNBOUND (O4)', () => {
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.UNBOUND,
      });
      renderUnboundView(state);

      const inviteBtn = screen.getByText(/Invite CP/);
      act(() => { inviteBtn.click(); });

      // Find any InviteCPModal call with open=true (non-blocked)
      const openCall = mockInviteCPModalFn.mock.calls.find(
        (call: any) => call[0].open === true && !call[0].blocked,
      );
      expect(openCall).toBeDefined();
    });

    it('should NOT block Invite CP in SELF mode regardless of otherCPState', () => {
      const state = createUnboundState({
        viewMode: ViewMode.SELF,
        otherCPState: CPState.BOUND,
      });
      renderUnboundView(state);

      const inviteBtn = screen.getByText(/Invite CP/);
      act(() => { inviteBtn.click(); });

      const openCall = mockInviteCPModalFn.mock.calls.find(
        (call: any) => call[0].open === true && !call[0].blocked,
      );
      expect(openCall).toBeDefined();
    });
  });

  // ----------------------------------------------------------
  // Blocking logic: 一键绑定CP
  // ----------------------------------------------------------
  describe('一键绑定CP blocking', () => {
    it('should block 一键绑定CP when OTHER + otherCPState=BOUND (O3)', () => {
      const dispatch = vi.fn();
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.BOUND,
      });
      renderUnboundView(state, dispatch);

      const bindBtn = screen.getByText('✨ 一键绑定CP');
      act(() => { bindBtn.click(); });

      // Should NOT dispatch BIND_CP
      expect(dispatch).not.toHaveBeenCalled();

      // Should show blocked modal
      const lastCall = mockInviteCPModalFn.mock.calls.at(-1);
      expect(lastCall).toBeDefined();
      expect(lastCall![0].open).toBe(true);
      expect(lastCall![0].blocked).toBe(true);
    });

    it('should dispatch BIND_CP when NOT blocked (SELF mode)', () => {
      const dispatch = vi.fn();
      const state = createUnboundState({
        viewMode: ViewMode.SELF,
      });
      renderUnboundView(state, dispatch);

      const bindBtn = screen.getByText('✨ 一键绑定CP');
      act(() => { bindBtn.click(); });

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'BIND_CP' }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'BIND_CP', payload: mockBoundCP }),
      );
    });

    it('should dispatch BIND_CP with mockOtherCP when OTHER + otherCPState=UNBOUND', () => {
      const dispatch = vi.fn();
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.UNBOUND,
      });
      renderUnboundView(state, dispatch);

      const bindBtn = screen.getByText('✨ 一键绑定CP');
      act(() => { bindBtn.click(); });

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'BIND_CP', payload: mockOtherCP }),
      );
    });
  });

  // ----------------------------------------------------------
  // Blocking logic: CP伙伴空位 (slot click)
  // ----------------------------------------------------------
  describe('CP伙伴空位 blocking', () => {
    it('should block slot click when OTHER + otherCPState=BOUND (O3)', () => {
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.BOUND,
      });
      renderUnboundView(state);

      const slotLabel = screen.getByText('CP伙伴');
      act(() => { slotLabel.click(); });

      const lastCall = mockInviteCPModalFn.mock.calls.at(-1);
      expect(lastCall).toBeDefined();
      expect(lastCall![0].open).toBe(true);
      expect(lastCall![0].blocked).toBe(true);
    });

    it('should open InviteCPModal on slot click when not blocked', () => {
      const state = createUnboundState({
        viewMode: ViewMode.SELF,
      });
      renderUnboundView(state);

      const slotLabel = screen.getByText('CP伙伴');
      act(() => { slotLabel.click(); });

      const openCall = mockInviteCPModalFn.mock.calls.find(
        (call: any) => call[0].open === true && !call[0].blocked,
      );
      expect(openCall).toBeDefined();
    });
  });

  // ----------------------------------------------------------
  // View toggle
  // ----------------------------------------------------------
  describe('view toggle', () => {
    it('should show 第三方视角 button in SELF mode', () => {
      const state = createUnboundState({ viewMode: ViewMode.SELF });
      renderUnboundView(state);

      expect(screen.getByText('👁️ 第三方视角')).toBeDefined();
    });

    it('should show 自己视角 button in OTHER mode', () => {
      const state = createUnboundState({ viewMode: ViewMode.OTHER });
      renderUnboundView(state);

      expect(screen.getByText('👁️ 自己视角')).toBeDefined();
    });

    it('should dispatch SET_VIEW_MODE on toggle click', () => {
      const dispatch = vi.fn();
      const state = createUnboundState({ viewMode: ViewMode.SELF });
      renderUnboundView(state, dispatch);

      screen.getByText('👁️ 第三方视角').click();
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_VIEW_MODE',
        payload: ViewMode.OTHER,
      });
    });
  });

  // ----------------------------------------------------------
  // Third-party state toggle in UnboundView
  // ----------------------------------------------------------
  describe('third-party state toggle (UnboundView)', () => {
    it('should show third-party toggle in OTHER mode', () => {
      const state = createUnboundState({
        viewMode: ViewMode.OTHER,
        otherCPState: CPState.UNBOUND,
      });
      renderUnboundView(state);

      expect(screen.getByText('🔗 切换第三方已绑定')).toBeDefined();
    });

    it('should NOT show third-party toggle in SELF mode', () => {
      const state = createUnboundState({ viewMode: ViewMode.SELF });
      renderUnboundView(state);

      expect(screen.queryByText('🔗 切换第三方已绑定')).toBeNull();
      expect(screen.queryByText('🔓 切换第三方未绑定')).toBeNull();
    });
  });

  // ----------------------------------------------------------
  // Basic rendering
  // ----------------------------------------------------------
  describe('basic rendering', () => {
    it('should render the main heading', () => {
      const state = createUnboundState();
      renderUnboundView(state);

      expect(screen.getByText('寻找你的CP')).toBeDefined();
    });

    it('should render 查看榜单 and 查看特权 buttons', () => {
      const state = createUnboundState();
      renderUnboundView(state);

      expect(screen.getByTestId('crystal-🏆')).toBeDefined();
      expect(screen.getByTestId('crystal-👑')).toBeDefined();
    });

    it('should render 规则 and 申请记录 buttons', () => {
      const state = createUnboundState();
      renderUnboundView(state);

      expect(screen.getByText('❓ 规则')).toBeDefined();
      expect(screen.getByText('📋 申请记录')).toBeDefined();
    });

    it('should include Invite CP price display', () => {
      const state = createUnboundState();
      renderUnboundView(state);

      expect(screen.getByText(/599K/)).toBeDefined();
    });
  });
});
