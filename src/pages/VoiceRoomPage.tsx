import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SpecialType } from '../types';
import { SPECIAL_INVITATION_COST } from '../utils/constants';
import { useAppState } from '../hooks/useAppState';
import EntranceEffect from '../components/effects/EntranceEffect';

// ============================================================
// Mock Data
// ============================================================

interface RoomUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  role: 'host' | 'speaker' | 'empty';
  micState: 'on' | 'muted' | 'empty';
}

const ROOM_USERS: RoomUser[] = [
  {
    id: 'host',
    name: '小甜心',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    level: 12,
    role: 'host',
    micState: 'on',
  },
  {
    id: 'u1',
    name: '大笨蛋',
    avatar: 'https://picsum.photos/seed/user2/200/200',
    level: 8,
    role: 'speaker',
    micState: 'on',
  },
  {
    id: 'u2',
    name: '草莓布丁',
    avatar: 'https://picsum.photos/seed/strawberry/200/200',
    level: 8,
    role: 'speaker',
    micState: 'muted',
  },
  {
    id: 'u3',
    name: '奶茶王子',
    avatar: 'https://picsum.photos/seed/milktea/200/200',
    level: 10,
    role: 'speaker',
    micState: 'on',
  },
  {
    id: 'empty1',
    name: '',
    avatar: '',
    level: 0,
    role: 'empty',
    micState: 'empty',
  },
  {
    id: 'empty2',
    name: '',
    avatar: '',
    level: 0,
    role: 'empty',
    micState: 'empty',
  },
];

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  text: string;
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    user: '草莓布丁',
    avatar: 'https://picsum.photos/seed/strawberry/200/200',
    text: '好听的歌声！🎵',
  },
  {
    id: 2,
    user: '奶茶王子',
    avatar: 'https://picsum.photos/seed/milktea/200/200',
    text: '再来一首！',
  },
  {
    id: 3,
    user: '大笨蛋',
    avatar: 'https://picsum.photos/seed/user2/200/200',
    text: '哈哈哈太棒了',
  },
  {
    id: 4,
    user: '小甜心',
    avatar: 'https://picsum.photos/seed/user1/200/200',
    text: '谢谢大家 💕',
  },
];

interface GiftItem {
  icon: string;
  name: string;
  price: number;
  isSpecial?: boolean;
}

const GIFT_LIST: GiftItem[] = [
  { icon: '🌹', name: 'Rose', price: 99 },
  { icon: '💐', name: 'Bouquet', price: 299 },
  { icon: '🎂', name: 'Cake', price: 520 },
  { icon: '📿', name: 'bind Special', price: SPECIAL_INVITATION_COST, isSpecial: true },
  { icon: '👑', name: 'Crown', price: 5200 },
  { icon: '🌟', name: 'Star', price: 9999 },
  { icon: '💍', name: 'bind cp', price: 9999 },
  { icon: '🤜', name: 'Wristband', price: 8888 },
  { icon: '🦄', name: 'Unicorn', price: 13140 },
];

// ============================================================
// Special 关系类型主题（参考 InvitationResponseModal 配色）
// ============================================================

interface SpecialTypeTheme {
  color: string;
  bg: string;
  icon: string;
  label: string;
}

const SPECIAL_TYPE_THEMES: Record<SpecialType, SpecialTypeTheme> = {
  [SpecialType.BESTIE]: {
    color: '#3b82f6',
    bg: '#dbeafe',
    icon: '👯‍♀️',
    label: 'Bestie',
  },
  [SpecialType.SOULMATE]: {
    color: '#8b5cf6',
    bg: '#f3e8ff',
    icon: '💫',
    label: 'Soulmate',
  },
  [SpecialType.HOMIE]: {
    color: '#f59e0b',
    bg: '#ffedd5',
    icon: '🤝',
    label: 'Homie',
  },
};

// ============================================================
// Page Background
// ============================================================

const PAGE_BG = 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #4a1942 60%, #6b1d52 100%)';
const TOP_BAR_BG = 'linear-gradient(135deg, #a855f7, #ec4899)';
const GLASS_BG = 'rgba(255,255,255,0.1)';
const GLASS_BLUR = 'blur(10px)';

// ============================================================
// Sub-components
// ============================================================

/** 顶部标题栏 */
const TopBar: React.FC<{ onBack: () => void; gold: number }> = ({ onBack, gold }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
      py: 1.5,
      background: TOP_BAR_BG,
      color: '#fff',
      position: 'relative',
    }}
  >
    {/* 返回按钮 */}
    <Box
      onClick={onBack}
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        bgcolor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
        '&:active': { transform: 'scale(0.95)' },
      }}
    >
      ‹
    </Box>

    {/* 房间名称 */}
    <Typography sx={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>
      💜 CP Love Room
    </Typography>

    {/* 金币显示 */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        px: 1.5,
        py: 0.5,
        mr: 'auto',
        ml: 2,
      }}
    >
      <Typography sx={{ fontSize: 11 }}>🪙</Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>
        {gold.toLocaleString()}
      </Typography>
    </Box>

    {/* 在线人数 */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        px: 1.5,
        py: 0.5,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: '#4ade80',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.4 },
          },
        }}
      />
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>128</Typography>
    </Box>
  </Box>
);

/** 房主信息区 */
const HostInfo: React.FC = () => {
  const host = ROOM_USERS[0];

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 3,
        pb: 2,
        overflow: 'hidden',
      }}
    >
      {/* 装饰背景光晕 */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* 房主头像 —— 带金色翅膀皇冠框效果 */}
      <Box
        sx={{
          position: 'relative',
          mb: 1.5,
        }}
      >
        {/* 金色光晕 */}
        <Box
          sx={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0.1) 60%, transparent 70%)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.08)' },
            },
          }}
        />
        {/* 金色边框 */}
        <Box
          sx={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '3px solid',
            borderColor: '#FFD700',
            boxShadow: '0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.15)',
          }}
        />
        {/* 皇冠装饰 */}
        <Typography
          sx={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 20,
            filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.6))',
            zIndex: 1,
          }}
        >
          👑
        </Typography>
        {/* 翅膀装饰左 */}
        <Typography
          sx={{
            position: 'absolute',
            left: -26,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          ✨
        </Typography>
        {/* 翅膀装饰右 */}
        <Typography
          sx={{
            position: 'absolute',
            right: -26,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          ✨
        </Typography>

        <Avatar
          src={host.avatar}
          sx={{
            width: 80,
            height: 80,
            border: '3px solid #FFD700',
            boxShadow: '0 0 16px rgba(255,215,0,0.3)',
          }}
        />
      </Box>

      {/* 昵称 + 等级 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>
          {host.name}
        </Typography>
        <Box
          sx={{
            px: 1,
            py: 0.2,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            fontSize: 11,
            fontWeight: 700,
            color: '#1a0a2e',
          }}
        >
          Lv.{host.level}
        </Box>
      </Box>

      {/* Host 标签 */}
      <Box
        sx={{
          px: 1.5,
          py: 0.3,
          borderRadius: 10,
          bgcolor: 'rgba(255,255,255,0.15)',
          backdropFilter: GLASS_BLUR,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#FFD700', letterSpacing: 0.5 }}>
          👑 Host
        </Typography>
      </Box>
    </Box>
  );
};

/** 麦位卡片 */
const MicSeatCard: React.FC<{ user: RoomUser; index: number }> = ({ user, index }) => {
  const isEmpty = user.role === 'empty';
  const isHost = user.role === 'host';
  const isSpeaking = user.micState === 'on' && !isEmpty;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        p: 1.5,
        borderRadius: 3,
        bgcolor: GLASS_BG,
        backdropFilter: GLASS_BLUR,
        border: '2px solid',
        borderColor: isHost
          ? '#4ade80'
          : isSpeaking
          ? 'rgba(74,222,128,0.4)'
          : 'rgba(255,255,255,0.1)',
        boxShadow: isHost
          ? '0 0 16px rgba(74,222,128,0.3), 0 0 32px rgba(74,222,128,0.1)'
          : isSpeaking
          ? '0 0 12px rgba(74,222,128,0.15)'
          : 'none',
        transition: 'all 0.3s',
        ...(isSpeaking && {
          animation: 'micGlow 2s ease-in-out infinite',
          '@keyframes micGlow': {
            '0%, 100%': { boxShadow: '0 0 8px rgba(74,222,128,0.2)' },
            '50%': { boxShadow: '0 0 20px rgba(74,222,128,0.4)' },
          },
        }),
      }}
    >
      {/* 装饰星星 */}
      {!isEmpty && (
        <Typography
          sx={{
            position: 'absolute',
            top: 4,
            right: 6,
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          ✨
        </Typography>
      )}

      {/* 音符装饰 */}
      {isSpeaking && (
        <Typography
          sx={{
            position: 'absolute',
            top: 4,
            left: 6,
            fontSize: 10,
            opacity: 0.5,
          }}
        >
          🎵
        </Typography>
      )}

      {isEmpty ? (
        /* 空位状态 */
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: 20, color: 'rgba(255,255,255,0.2)' }}>+</Typography>
        </Box>
      ) : (
        /* 有人状态 */
        <Avatar
          src={user.avatar}
          sx={{
            width: 48,
            height: 48,
            border: isHost ? '2px solid #FFD700' : '2px solid rgba(255,255,255,0.2)',
          }}
        />
      )}

      {/* 昵称 */}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: isEmpty ? 'rgba(255,255,255,0.2)' : '#fff',
          maxWidth: 72,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {isEmpty ? 'Empty' : user.name}
      </Typography>

      {/* 状态标签 */}
      {!isEmpty && (
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 500,
            color: isSpeaking ? '#4ade80' : '#fbbf24',
          }}
        >
          {isSpeaking ? 'On Mic' : 'Muted'}
        </Typography>
      )}
      {isEmpty && (
        <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
          Empty
        </Typography>
      )}
    </Box>
  );
};

/** 麦位网格 */
const MicGrid: React.FC = () => (
  <Box sx={{ px: 2, mb: 2 }}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1.5,
      }}
    >
      {ROOM_USERS.map((user, idx) => (
        <MicSeatCard key={user.id} user={user} index={idx} />
      ))}
    </Box>
  </Box>
);

/** 聊天消息区 */
const ChatArea: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <Box
        ref={scrollRef}
        sx={{
          maxHeight: 160,
          overflowY: 'auto',
          bgcolor: 'rgba(255,255,255,0.08)',
          backdropFilter: GLASS_BLUR,
          borderRadius: 3,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
          },
        }}
      >
        {MOCK_MESSAGES.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Avatar
              src={msg.avatar}
              sx={{ width: 28, height: 28, flexShrink: 0 }}
            />
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.12)',
                borderRadius: '0 14px 14px 14px',
                px: 1.5,
                py: 0.8,
                maxWidth: '80%',
              }}
            >
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#f9a8d4', mb: 0.2 }}>
                {msg.user}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

/** 底部操作栏 */
const BottomActionBar: React.FC<{
  isMuted: boolean;
  onMicToggle: () => void;
  onGiftClick: () => void;
  onLikeClick: () => void;
  likeAnim: boolean;
}> = ({ isMuted, onMicToggle, onGiftClick, onLikeClick, likeAnim }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      px: 2,
      py: 1.5,
      bgcolor: 'rgba(0,0,0,0.3)',
      backdropFilter: GLASS_BLUR,
    }}
  >
    {/* 麦克风 */}
    <Box
      onClick={onMicToggle}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.3,
        cursor: 'pointer',
        transition: 'all 0.15s',
        '&:active': { transform: 'scale(0.9)' },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: isMuted ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.2)',
          backdropFilter: GLASS_BLUR,
          border: `2px solid ${isMuted ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        {isMuted ? '🔇' : '🎤'}
      </Box>
      <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
        {isMuted ? '静音' : '开麦'}
      </Typography>
    </Box>

    {/* 消息 */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.3,
        opacity: 0.5,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
          backdropFilter: GLASS_BLUR,
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        💬
      </Box>
      <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
        消息
      </Typography>
    </Box>

    {/* 礼物 */}
    <Box
      onClick={onGiftClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.3,
        cursor: 'pointer',
        transition: 'all 0.15s',
        '&:active': { transform: 'scale(0.9)' },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
          backdropFilter: GLASS_BLUR,
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        🎁
      </Box>
      <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
        礼物
      </Typography>
    </Box>

    {/* 点赞 */}
    <Box
      onClick={onLikeClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.3,
        cursor: 'pointer',
        transition: 'all 0.15s',
        '&:active': { transform: 'scale(0.9)' },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
          backdropFilter: GLASS_BLUR,
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}
      >
        ❤️
      </Box>
      <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
        点赞
      </Typography>
      {/* 点赞动画浮字 */}
      <AnimatePresence>
        {likeAnim && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: -10,
              fontSize: 24,
              pointerEvents: 'none',
            }}
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  </Box>
);

/** Toast 提示 */
const ToastMessage: React.FC<{ message: string; visible: boolean }> = ({
  message,
  visible,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          background: 'rgba(30,30,30,0.92)',
          backdropFilter: 'blur(12px)',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 24,
          fontSize: 14,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          maxWidth: '90vw',
          textAlign: 'center',
        }}
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

/** 礼物列表面板 (Bottom Sheet) */
const GiftPanel: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelectGift: (gift: GiftItem) => void;
  selectedRecipient: RoomUser | null;
  onSelectRecipient: (user: RoomUser) => void;
}> = ({ open, onClose, onSelectGift, selectedRecipient, onSelectRecipient }) => (
  <AnimatePresence>
    {open && (
      <>
        {/* 遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            background: 'rgba(0,0,0,0.5)',
          }}
        />

        {/* 底部面板 */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: '100%',
            maxWidth: 390,
            zIndex: 1401,
            background: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '75vh',
            overflowY: 'auto',
            paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* 拖拽指示条 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 4,
                borderRadius: 2,
                bgcolor: '#ddd',
              }}
            />
          </Box>

          {/* 标题 */}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: '#333',
              textAlign: 'center',
              mb: 2,
            }}
          >
            🎁 Send Gift
          </Typography>

          {/* 收礼人选择 */}
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#888', mb: 1 }}>
              送给谁？
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5 }}>
              {ROOM_USERS.filter(u => u.role !== 'empty').map((user) => {
                const isSelected = selectedRecipient?.id === user.id;
                return (
                  <Box
                    key={user.id}
                    onClick={() => onSelectRecipient(user)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 20,
                      bgcolor: isSelected ? user.role === 'host' ? '#fef3c7' : '#e8f4fd' : '#f3f4f6',
                      border: isSelected
                        ? `2px solid ${user.role === 'host' ? '#fbbf24' : '#3b82f6'}`
                        : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Avatar src={user.avatar} sx={{ width: 28, height: 28 }} />
                    <Typography sx={{ fontSize: 13, fontWeight: isSelected ? 700 : 500, color: '#333' }}>
                      {user.name}
                    </Typography>
                    {user.role === 'host' && (
                      <Typography sx={{ fontSize: 10, color: '#f59e0b' }}>👑</Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* 礼物网格 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
              px: 2,
            }}
          >
            {GIFT_LIST.map((gift) => (
              <motion.div
                key={gift.name}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  onSelectGift(gift);
                  if (!gift.isSpecial) onClose();
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: gift.isSpecial ? '#fef3c7' : '#f9fafb',
                    border: gift.isSpecial
                      ? '2px solid #fbbf24'
                      : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: gift.isSpecial ? '#fef9c3' : '#f3f4f6',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 36, lineHeight: 1 }}>
                    {gift.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#333',
                      textAlign: 'center',
                    }}
                  >
                    {gift.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                    }}
                  >
                    <Typography sx={{ fontSize: 9, color: '#f59e0b' }}>🪙</Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: gift.isSpecial ? '#f59e0b' : '#888',
                      }}
                    >
                      {gift.price.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/** Special 关系类型选择弹窗 (Bottom Sheet) */
const SpecialModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelectType: (type: SpecialType) => void;
  recipientName: string;
}> = ({ open, onClose, onSelectType, recipientName }) => {
  const [selectedType, setSelectedType] = useState<SpecialType>(SpecialType.SOULMATE);

  const typeEntries = Object.entries(SPECIAL_TYPE_THEMES) as [
    SpecialType,
    SpecialTypeTheme,
  ][];

  const handleSend = () => {
    onSelectType(selectedType);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1500,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* 底部面板 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '100%',
              maxWidth: 390,
              zIndex: 1501,
              background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            }}
          >
            {/* 拖拽指示条 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.3)',
                }}
              />
            </Box>

            {/* 标题栏 */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                pb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                成为 Special 的关系
              </Typography>

              {/* 关闭按钮 */}
              <Box
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.25)', color: '#fff' },
                }}
              >
                ✕
              </Box>
            </Box>

            {/* 手链展示 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 2,
                position: 'relative',
              }}
            >
              {/* 光晕 */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                }}
              />
              <Typography
                sx={{
                  fontSize: 64,
                  lineHeight: 1,
                  filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                💎
              </Typography>
            </Box>

            {/* 提示文字 */}
            <Box sx={{ px: 3, textAlign: 'center', mb: 2.5 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  mb: 0.5,
                }}
              >
                💕 你将送出【星月手链】
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                *{Math.round(SPECIAL_INVITATION_COST / 1000)}K金币发起申请
              </Typography>
            </Box>

            {/* 关系选择 */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                mb: 1.5,
              }}
            >
              选择关系
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1.5,
                px: 2,
                mb: 3,
              }}
            >
              {typeEntries.map(([type, theme]) => {
                const isSelected = selectedType === type;
                return (
                  <Box
                    key={type}
                    onClick={() => setSelectedType(type)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 2,
                      py: 1.2,
                      borderRadius: 20,
                      bgcolor: isSelected ? `${theme.color}25` : 'rgba(255,255,255,0.08)',
                      border: isSelected
                        ? `2px solid ${theme.color}`
                        : '1px solid rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: isSelected ? `${theme.color}30` : 'rgba(255,255,255,0.15)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 18 }}>{theme.icon}</Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? theme.color : 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {theme.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* 发送按钮 */}
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleSend}
                sx={{
                  width: '100%',
                  py: 1.6,
                  borderRadius: 14,
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(168,85,247,0.35)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 6px 28px rgba(168,85,247,0.5)',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: 0.5,
                  }}
                >
                  ✨ 发送邀请
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// VoiceRoomPage 主组件
// ============================================================

const VoiceRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { currentUser, cpRelationship } = state;

  // 状态
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeAnim, setLikeAnim] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState<RoomUser>(ROOM_USERS[0]); // 默认房主

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 显示 Toast */
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  }, []);

  /** 返回 */
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/cp-space', { replace: true });
    }
  }, [navigate]);

  /** 麦克风切换 */
  const handleMicToggle = useCallback(() => {
    setIsMuted((prev) => !prev);
    showToast(isMuted ? '🎤 麦克风已打开' : '🔇 麦克风已静音');
  }, [isMuted, showToast]);

  /** 点赞 */
  const handleLike = useCallback(() => {
    setLikes((prev) => prev + 1);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 800);
  }, []);

  /** 选择礼物 */
  const handleSelectGift = useCallback(
    (gift: GiftItem) => {
      if (gift.isSpecial) {
        // 关闭礼物面板，打开 Special 关系弹窗
        setShowGiftPanel(false);
        setTimeout(() => {
          setShowSpecialModal(true);
        }, 300);
      } else {
        if (state.currentUser.gold < gift.price) {
          showToast('金币不足！');
          return;
        }
        dispatch({ type: 'DEDUCT_GOLD', payload: gift.price });
        showToast(`Sent ${gift.name} to ${giftRecipient.name}! (-${gift.price.toLocaleString()} coins)`);
      }
    },
    [showToast, giftRecipient, dispatch, state.currentUser.gold],
  );

  /** 选择 Special 关系类型 */
  const handleSelectSpecialType = useCallback(
    (type: SpecialType) => {
      const theme = SPECIAL_TYPE_THEMES[type];
      if (state.currentUser.gold < SPECIAL_INVITATION_COST) {
        showToast('金币不足！');
        return;
      }
      dispatch({ type: 'DEDUCT_GOLD', payload: SPECIAL_INVITATION_COST });
      setShowSpecialModal(false);
      showToast(`💎 Bracelet sent to ${giftRecipient.name}! You are now ${theme.label}! ✨`);
    },
    [showToast, giftRecipient, dispatch, state.currentUser.gold],
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 390,
        mx: 'auto',
        minHeight: '100dvh',
        background: PAGE_BG,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* A. 顶部标题栏 */}
      <TopBar onBack={handleBack} gold={currentUser.gold} />

      {/* CP 入场特效 */}
      <EntranceEffect
        user1Name={currentUser.name}
        user1Avatar={currentUser.avatar}
        user2Name={cpRelationship?.partner.name ?? ROOM_USERS[1].name}
        user2Avatar={cpRelationship?.partner.avatar ?? ROOM_USERS[1].avatar}
        level={cpRelationship?.cpLevel ?? 1}
        trigger={showEntrance}
        onComplete={() => setShowEntrance(false)}
      />

      {/* B. 房主信息区 */}
      <HostInfo />

      {/* 播放入场特效按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1, mb: 1.5 }}>
        <Box
          onClick={() => setShowEntrance(true)}
          sx={{
            px: 4,
            py: 0.8,
            borderRadius: 24,
            bgcolor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.18)',
              borderColor: 'rgba(255,255,255,0.4)',
            },
            '&:active': { transform: 'scale(0.96)' },
          }}
        >
          ✨ 播放入场特效
        </Box>
      </Box>

      {/* C. 麦位区 */}
      <MicGrid />

      {/* D. 聊天消息区 */}
      <ChatArea />

      {/* 点赞计数显示 */}
      {likes > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            ❤️ {likes} 次点赞
          </Typography>
        </Box>
      )}

      {/* 弹性空间 */}
      <Box sx={{ flex: 1 }} />

      {/* E. 底部操作栏 */}
      <Box sx={{ position: 'sticky', bottom: 0, zIndex: 10 }}>
        <BottomActionBar
          isMuted={isMuted}
          onMicToggle={handleMicToggle}
          onGiftClick={() => setShowGiftPanel(true)}
          onLikeClick={handleLike}
          likeAnim={likeAnim}
        />
      </Box>

      {/* Toast */}
      <ToastMessage message={toastMsg} visible={toastVisible} />

      {/* F. 礼物列表面板 */}
      <GiftPanel
        open={showGiftPanel}
        onClose={() => setShowGiftPanel(false)}
        onSelectGift={handleSelectGift}
        selectedRecipient={giftRecipient}
        onSelectRecipient={setGiftRecipient}
      />

      {/* G. Special 关系类型选择弹窗 */}
      <SpecialModal
        open={showSpecialModal}
        onClose={() => setShowSpecialModal(false)}
        onSelectType={handleSelectSpecialType}
        recipientName={giftRecipient.name}
      />
    </Box>
  );
};

export default VoiceRoomPage;
