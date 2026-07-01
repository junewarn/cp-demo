import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import ConfirmUnbindModal from '../components/common/ConfirmUnbindModal';

// Mock ModalWrapper to avoid MUI Dialog Portal issues.
vi.mock('../components/common/ModalWrapper', () => ({
  default: ({ open, onClose, title, children }: any) =>
    open ? (
      <div data-testid="modal-wrapper">
        <div data-testid="modal-title">{title}</div>
        <button data-testid="modal-close" onClick={onClose}>X</button>
        <div data-testid="modal-content">{children}</div>
      </div>
    ) : null,
}));

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ============================================================
// Helper: get the native input element from MUI TextField
// ============================================================
function getNativeInput(): HTMLInputElement {
  const input = screen.getByPlaceholderText('请输入上方数字');
  return input as HTMLInputElement;
}

// ============================================================
// Helper: render the modal with default props
// ============================================================
function renderModal(overrides: Partial<{
  open: boolean;
  onClose: ReturnType<typeof vi.fn>;
  onConfirm: ReturnType<typeof vi.fn>;
  title: string;
  description: string;
  warningText: string;
}> = {}) {
  const props = {
    open: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: '💔 解除关系',
    description: '确定要解除关系吗？',
    warningText: '⚠️ 此操作不可恢复',
    ...overrides,
  };
  const result = render(<ConfirmUnbindModal {...props} />);
  return { ...result, ...props };
}

// ============================================================
// ConfirmUnbindModal Tests
// ============================================================

describe('ConfirmUnbindModal', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    // Math.floor(1000 + 0.5 * 9000) = 5500
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  // ----------------------------------------------------------
  // 1. Code generation on open
  // ----------------------------------------------------------
  describe('code generation', () => {
    it('should generate a new 4-digit code each time open becomes true', () => {
      const { rerender, onClose } = renderModal({ open: false });
      rerender(
        <ConfirmUnbindModal open={true} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />,
      );
      expect(screen.getByText('5500')).toBeDefined();

      rerender(
        <ConfirmUnbindModal open={false} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />,
      );

      vi.spyOn(Math, 'random').mockReturnValue(0.1234);
      rerender(
        <ConfirmUnbindModal open={true} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />,
      );
      expect(screen.getByText('2110')).toBeDefined();
    });

    it('should generate a 4-digit code in range [1000, 9999]', () => {
      renderModal();
      const code = '5500';
      expect(screen.getByText(code)).toBeDefined();
      const num = parseInt(code, 10);
      expect(num).toBeGreaterThanOrEqual(1000);
      expect(num).toBeLessThanOrEqual(9999);
      expect(code.length).toBe(4);
    });
  });

  // ----------------------------------------------------------
  // 2. Display props
  // ----------------------------------------------------------
  describe('display', () => {
    it('should render title and description', () => {
      renderModal({ title: '💔 解除 CP 关系', description: '确定要解除 CP 关系吗？' });
      expect(screen.getByText('💔 解除 CP 关系')).toBeDefined();
      expect(screen.getByText('确定要解除 CP 关系吗？')).toBeDefined();
    });

    it('should render warning text when provided', () => {
      renderModal({ warningText: '⚠️ 此操作不可恢复' });
      expect(screen.getByText('⚠️ 此操作不可恢复')).toBeDefined();
    });

    it('should not render warning text when not provided', () => {
      renderModal({ warningText: undefined });
      expect(screen.queryByText('⚠️')).toBeNull();
    });
  });

  // ----------------------------------------------------------
  // 3. Input filtering
  // ----------------------------------------------------------
  describe('input filtering', () => {
    it('should filter non-numeric characters', () => {
      renderModal();
      const input = getNativeInput();
      act(() => { fireEvent.change(input, { target: { value: 'abc1234' } }); });
      expect(input.value).toBe('1234');
    });

    it('should limit input to 4 characters', () => {
      renderModal();
      const input = getNativeInput();
      act(() => { fireEvent.change(input, { target: { value: '12345678' } }); });
      expect(input.value).toBe('1234');
    });
  });

  // ----------------------------------------------------------
  // 4. Confirm button state
  // ----------------------------------------------------------
  describe('confirm button', () => {
    it('should be disabled when input is empty', () => {
      renderModal();
      const btn = screen.getByText('确认解除').closest('button') as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
    });

    it('should be disabled when input does not match code', () => {
      renderModal();
      act(() => { fireEvent.change(getNativeInput(), { target: { value: '1234' } }); });
      const btn = screen.getByText('确认解除').closest('button') as HTMLButtonElement;
      expect(btn.disabled).toBe(true);
    });

    it('should be enabled when input matches code', () => {
      renderModal();
      act(() => { fireEvent.change(getNativeInput(), { target: { value: '5500' } }); });
      const btn = screen.getByText('确认解除').closest('button') as HTMLButtonElement;
      expect(btn.disabled).toBe(false);
    });

    it('should not trigger onConfirm when disabled', () => {
      const onConfirm = vi.fn();
      renderModal({ onConfirm });
      act(() => { fireEvent.change(getNativeInput(), { target: { value: '0000' } }); });
      fireEvent.click(screen.getByText('确认解除'));
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  // ----------------------------------------------------------
  // 5. Confirm flow
  // ----------------------------------------------------------
  describe('confirm flow', () => {
    it('should call onConfirm when correct code is entered', () => {
      const onConfirm = vi.fn();
      renderModal({ onConfirm });
      act(() => { fireEvent.change(getNativeInput(), { target: { value: '5500' } }); });
      fireEvent.click(screen.getByText('确认解除'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  // ----------------------------------------------------------
  // 6. Cancel / close flow
  // ----------------------------------------------------------
  describe('cancel flow', () => {
    it('should call onClose when cancel is clicked', () => {
      const onClose = vi.fn();
      renderModal({ onClose });
      fireEvent.click(screen.getByText('取消'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when modal close button (X) is clicked', () => {
      const onClose = vi.fn();
      renderModal({ onClose });
      fireEvent.click(screen.getByTestId('modal-close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should NOT call onConfirm when cancel is clicked', () => {
      const onClose = vi.fn();
      const onConfirm = vi.fn();
      renderModal({ onClose, onConfirm });
      fireEvent.click(screen.getByText('取消'));
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  // ----------------------------------------------------------
  // 7. State reset
  // ----------------------------------------------------------
  describe('state reset', () => {
    it('should clear input when modal is closed and reopened', () => {
      const onClose = vi.fn();
      const { rerender } = renderModal({ open: true, onClose });
      act(() => { fireEvent.change(getNativeInput(), { target: { value: '1234' } }); });

      rerender(<ConfirmUnbindModal open={false} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />);
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      rerender(<ConfirmUnbindModal open={true} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />);

      expect(getNativeInput().value).toBe('');
    });

    it('should generate a new code on reopen', () => {
      const onClose = vi.fn();
      const { rerender } = renderModal({ open: false, onClose });
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      rerender(<ConfirmUnbindModal open={true} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />);
      expect(screen.getByText('5500')).toBeDefined();

      rerender(<ConfirmUnbindModal open={false} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />);
      vi.restoreAllMocks();
      vi.spyOn(Math, 'random').mockReturnValue(0.1234);
      rerender(<ConfirmUnbindModal open={true} onClose={onClose} onConfirm={vi.fn()} title="Test" description="Desc" />);
      expect(screen.getByText('2110')).toBeDefined();
    });
  });

  // ----------------------------------------------------------
  // 8. Visibility
  // ----------------------------------------------------------
  describe('visibility', () => {
    it('should not render when open is false', () => {
      renderModal({ open: false });
      expect(screen.queryByTestId('modal-wrapper')).toBeNull();
    });

    it('should render when open is true', () => {
      renderModal({ open: true });
      expect(screen.getByTestId('modal-wrapper')).toBeDefined();
    });
  });
});
