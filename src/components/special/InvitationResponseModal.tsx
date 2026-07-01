import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { SpecialInvitationRecord, SpecialType } from '../../types';

// ============================================================
// Props
// ============================================================

export interface InvitationResponseModalProps {
  open: boolean;
  record: SpecialInvitationRecord | null;
  onClose: () => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

// ============================================================
// 各类型主题配置
// ============================================================

interface TypeTheme {
  color: string;
  bgGradient: string;
  buttonBg: string;
  iconBg: string;
  label: string;
  title: string;
}

const TYPE_THEMES: Record<SpecialType, TypeTheme> = {
  [SpecialType.BESTIE]: {
    color: '#3b82f6',
    bgGradient: 'linear-gradient(180deg, #dbeafe, #bfdbfe)',
    buttonBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    iconBg: '#bfdbfe',
    label: 'Bestie',
    title: 'Invitation Bestie',
  },
  [SpecialType.SOULMATE]: {
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(180deg, #f3e8ff, #e9d5ff)',
    buttonBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    iconBg: '#e9d5ff',
    label: 'Soulmate',
    title: 'Invitation Soulmate',
  },
  [SpecialType.HOMIE]: {
    color: '#f59e0b',
    bgGradient: 'linear-gradient(180deg, #ffedd5, #fed7aa)',
    buttonBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    iconBg: '#fed7aa',
    label: 'Homie',
    title: 'Invitation Homie',
  },
};

// ============================================================
// InvitationResponseModal 组件
// ============================================================

const InvitationResponseModal: React.FC<InvitationResponseModalProps> = ({
  open,
  record,
  onClose,
  onAccept,
  onReject,
}) => {
  if (!open || !record) return null;

  const theme = TYPE_THEMES[record.type];

  const handleReject = () => {
    onReject(record.id);
  };

  const handleAccept = () => {
    onAccept(record.id);
  };

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        p: 2,
      }}
    >
      {/* 卡片内容 — 阻止冒泡 */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: 360,
          borderRadius: '20px',
          bgcolor: '#fff',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* 顶部渐变区域 */}
        <Box
          sx={{
            background: theme.bgGradient,
            pt: 4,
            pb: 3,
            px: 3,
            textAlign: 'center',
          }}
        >
          {/* 标题 */}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: theme.color,
              mb: 2.5,
              letterSpacing: 0.5,
            }}
          >
            {theme.title}
          </Typography>

          {/* 双方头像 + 关系图标 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              mb: 2,
            }}
          >
            {/* 发送方头像 */}
            <Avatar
              src={record.fromUser.avatar}
              sx={{
                width: 64,
                height: 64,
                border: `3px solid ${theme.color}`,
                boxShadow: `0 0 0 3px ${theme.iconBg}`,
              }}
            />

            {/* 关系图标 */}
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: theme.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: '#fff',
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {record.giftIcon}
            </Box>

            {/* 接收方头像（自己） */}
            <Avatar
              src={record.toUser.avatar}
              sx={{
                width: 64,
                height: 64,
                border: `3px solid ${theme.color}`,
                boxShadow: `0 0 0 3px ${theme.iconBg}`,
              }}
            />
          </Box>

          {/* 说明文字 */}
          <Typography
            sx={{
              fontSize: 13,
              color: '#555',
              lineHeight: 1.6,
              px: 0.5,
            }}
          >
            <Box component="span" sx={{ fontWeight: 700, color: theme.color }}>
              {record.fromUser.name}
            </Box>{' '}
            send you a {theme.label} invite, would you like to become a{' '}
            {theme.label} with them...
          </Typography>
        </Box>

        {/* 礼物展示 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            bgcolor: '#fafafa',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: theme.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              border: `2px solid ${theme.color}30`,
            }}
          >
            {record.giftIcon}
          </Box>
        </Box>

        {/* 底部按钮 */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 3,
            pb: 3,
            pt: 1,
          }}
        >
          {/* Reject */}
          <Box
            onClick={handleReject}
            sx={{
              flex: 1,
              py: 1.4,
              borderRadius: '24px',
              border: `2px solid ${theme.color}`,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: theme.color,
              bgcolor: '#fff',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: `${theme.color}10`,
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
            }}
          >
            Reject
          </Box>

          {/* Agree */}
          <Box
            onClick={handleAccept}
            sx={{
              flex: 1,
              py: 1.4,
              borderRadius: '24px',
              background: theme.buttonBg,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${theme.color}60`,
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: `0 6px 20px ${theme.color}80`,
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
            }}
          >
            Agree
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvitationResponseModal;
