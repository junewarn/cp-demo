import { AppState, AppAction, CPState, ViewMode } from '../types';
import { SpecialType } from '../types';
import { SPECIAL_DEFAULT_MAX_SLOTS, SPECIAL_EXTENDED_MAX_SLOTS } from '../utils/constants';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CP_STATE':
      return { ...state, cpState: action.payload };

    case 'SET_OTHER_CP_STATE':
      return { ...state, otherCPState: action.payload };

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'SET_VIEWING_USER':
      return { ...state, viewingUser: action.payload };

    case 'COMPLETE_TASK':
      return {
        ...state,
        cpTasks: state.cpTasks.map((task) =>
          task.id === action.payload
            ? { ...task, status: 'completed' as const, completed: true }
            : task,
        ),
      };

    case 'ADD_CHECKIN': {
      const existing = state.checkInRecords.filter((r) => r.date !== action.payload.date);
      return {
        ...state,
        checkInRecords: [...existing, action.payload],
      };
    }

    case 'UNLOCK_SLOT':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          gold: state.currentUser.gold - (state.specialSlotConfigs.find((c) => c.type === action.payload)?.unlockCost ?? 36000),
        },
        specialSlotConfigs: state.specialSlotConfigs.map((config) =>
          config.type === action.payload
            ? { ...config, maxSlots: SPECIAL_EXTENDED_MAX_SLOTS }
            : config,
        ),
      };

    case 'SEND_INVITE': {
      const existingRels = state.specialRelationships.filter((r) => r.id !== action.payload.id);
      const updatedConfigs = state.specialSlotConfigs.map((config) =>
        config.type === action.payload.type
          ? { ...config, usedSlots: config.usedSlots + 1 }
          : config,
      );
      return {
        ...state,
        specialRelationships: [...existingRels, action.payload],
        specialSlotConfigs: updatedConfigs,
      };
    }

    case 'BIND_CP':
      return {
        ...state,
        cpState: CPState.BOUND,
        cpRelationship: action.payload,
      };

    case 'UNBIND_CP':
      return {
        ...state,
        cpState: CPState.UNBOUND,
        cpRelationship: null,
      };

    case 'SET_USER':
      return { ...state, currentUser: action.payload };

    case 'ADD_SPECIAL_RELATIONSHIP':
      return {
        ...state,
        specialRelationships: [...state.specialRelationships, action.payload],
      };

    case 'REMOVE_SPECIAL_RELATIONSHIP':
      return {
        ...state,
        specialRelationships: state.specialRelationships.filter(
          (r) => r.id !== action.payload,
        ),
      };

    case 'DEDUCT_GOLD':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          gold: state.currentUser.gold - action.payload,
        },
      };

    case 'SET_GOLD':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          gold: action.payload,
        },
      };

    case 'UPDATE_INVITATION_STATUS':
      return {
        ...state,
        invitationRecords: state.invitationRecords.map((r) =>
          r.id === action.payload.id
            ? { ...r, status: action.payload.status }
            : r,
        ),
      };

    default:
      return state;
  }
}
