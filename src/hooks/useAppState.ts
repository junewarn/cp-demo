import { useContext, useMemo } from 'react';
import { AppContext, AppContextValue } from '../context/AppContext';
import { CPState, ViewMode } from '../types';

export function useAppState(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}

/**
 * 便捷Hook：获取CP绑定状态
 */
export function useCPState(): { cpState: CPState; isBound: boolean } {
  const { state } = useAppState();
  return useMemo(
    () => ({
      cpState: state.cpState,
      isBound: state.cpState === CPState.BOUND,
    }),
    [state.cpState],
  );
}

/**
 * 便捷Hook：获取视图模式
 */
export function useViewMode(): { viewMode: ViewMode; isSelf: boolean; isOther: boolean } {
  const { state } = useAppState();
  return useMemo(
    () => ({
      viewMode: state.viewMode,
      isSelf: state.viewMode === ViewMode.SELF,
      isOther: state.viewMode === ViewMode.OTHER,
    }),
    [state.viewMode],
  );
}

/**
 * 便捷Hook：获取当前显示的用户
 */
export function useDisplayUser() {
  const { state } = useAppState();
  return useMemo(() => {
    if (state.viewMode === ViewMode.OTHER && state.viewingUser) {
      return state.viewingUser;
    }
    return state.currentUser;
  }, [state.viewMode, state.viewingUser, state.currentUser]);
}
