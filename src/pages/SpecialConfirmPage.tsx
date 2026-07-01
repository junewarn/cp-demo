import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from '../components/common/Toast';
import Confetti from '../components/effects/Confetti';
import { useAppState } from '../hooks/useAppState';
import { SpecialType, SpecialRelationship } from '../types';
import {
  SPECIAL_TYPE_CONFIG,
  SPECIAL_INVITATION_COST,
  SPECIAL_GIFT_ICONS,
  SPECIAL_GIFT_NAMES,
  SPECIAL_TYPE_MAX_PER_TYPE,
} from '../utils/constants';

/** 关系类型选项（用于确认页的类型切换） */
const TYPE_OPTIONS: { type: SpecialType; icon: string }[] = [
  { type: SpecialType.BESTIE, icon: '👯‍♀️' },
  { type: SpecialType.SOULMATE, icon: '💫' },
  { type: SpecialType.HOMIE, icon: '🤝' },
];

/**
 * SpecialConfirmPage - 第二步：确认邀请页面
 *
 * 展示礼物图标、关系类型选择、金币消耗、发送按钮和邀请历史。
 * 从 URL params 读取目标好友信息。
 */
const SpecialConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useAppState();
  const { specialRelationships, currentUser } = state;

  // 从 URL 参数解析好友信息
  const friendId = searchParams.get('friendId') || '';
  const friendName = searchParams.get('friendName') || '好友';
  const friendAvatar = searchParams.get('friendAvatar') || '';
  const friendLevel = parseInt(searchParams.get('friendLevel') || '1', 10);

  const [selectedType, setSelectedType] = useState<SpecialType>(SpecialType.BESTIE);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });
  const [showConfetti, setShowConfetti] = useState(false);

  const typeConfig = SPECIAL_TYPE_CONFIG[selectedType];
  const giftIcon = SPECIAL_GIFT_ICONS[selectedType];
  const giftName = SPECIAL_GIFT_NAMES[selectedType];
  const canAfford = currentUser.gold >= SPECIAL_INVITATION_COST;

  const showToast = useCallback(
    (message: string, type: 'success' | 'error') => {
      setToast({ message, type, visible: true });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  /** 发送邀请 */
  const handleSendInvitation = useCallback(() => {
    // 检查该类型是否已满
    const typeCount = specialRelationships.filter(
      (r) => r.type === selectedType,
    ).length;
    if (typeCount >= SPECIAL_TYPE_MAX_PER_TYPE) {
      showToast(`该关系类型已满（最多 ${SPECIAL_TYPE_MAX_PER_TYPE} 人）`, 'error');
      return;
    }

    // 检查金币
    if (!canAfford) {
      showToast(
        `金币不足！需要 ${SPECIAL_INVITATION_COST.toLocaleString()}，当前 ${currentUser.gold.toLocaleString()}`,
        'error',
      );
      return;
    }

    // 扣金币
    dispatch({ type: 'DEDUCT_GOLD', payload: SPECIAL_INVITATION_COST });

    // 创建新关系
    const newRel: SpecialRelationship = {
      id: `sp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      partner: {
        id: friendId,
        name: friendName,
        avatar: friendAvatar,
        gender: 0 as any,
        level: friendLevel,
        signature: '',
        gold: 0,
      },
      type: selectedType,
      establishedDate: new Date().toISOString().split('T')[0],
      level: 1,
      days: 0,
    };

    dispatch({ type: 'ADD_SPECIAL_RELATIONSHIP', payload: newRel });
    setShowConfetti(true);
    showToast(
      `成功向 ${friendName} 发送 ${typeConfig.label} 邀请！ 🎉`,
      'success',
    );

    // 延迟跳转会 Special 主页
    setTimeout(() => {
      navigate('/special', { replace: true });
    }, 1500);
  }, [
    selectedType,
    specialRelationships,
    canAfford,
    currentUser.gold,
    friendId,
    friendName,
    friendAvatar,
    friendLevel,
    typeConfig.label,
    dispatch,
    showToast,
    navigate,
  ]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={() => navigate(-1)}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: 390,
          bgcolor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out',
          '@keyframes slideUp': {
            from: { transform: 'translateY(100%)' },
            to: { transform: 'translateY(0)' },
          },
        }}
      >
        {/* 关闭拖拽条 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
          <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: '#ddd' }} />
        </Box>

        {/* 主内容区 */}
        <Box sx={{ px: 2, pb: 4 }}>
          {/* 礼物图标 */}
          <Box
            component={motion.div}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            sx={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              bgcolor: typeConfig.bg,
              border: `3px solid ${typeConfig.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              mx: 'auto',
              mb: 2,
            }}
          >
            {giftIcon}
          </Box>

          {/* 标题 */}
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#333',
              textAlign: 'center',
              mb: 0.5,
              lineHeight: 1.5,
            }}
          >
            Send a{' '}
            <Box component="span" sx={{ color: typeConfig.color }}>
              {typeConfig.label}
            </Box>{' '}
            invitation to{' '}
            <Box component="span" sx={{ color: '#f59e0b' }}>
              {friendName}
            </Box>{' '}
            with a {giftName}.
          </Typography>

          {/* 副标题 */}
          <Typography
            sx={{
              fontSize: 12,
              color: '#888',
              textAlign: 'center',
              mb: 2.5,
            }}
          >
            After the other party accepts the invitation they will become{' '}
            <Box component="span" sx={{ color: typeConfig.color, fontWeight: 600 }}>
              {typeConfig.label}
            </Box>
          </Typography>

          {/* 关系类型切换（3 列按钮） */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              mb: 2.5,
            }}
          >
            {TYPE_OPTIONS.map(({ type, icon }) => {
              const cfg = SPECIAL_TYPE_CONFIG[type];
              const isSelected = selectedType === type;
              const typeCount = specialRelationships.filter(
                (r) => r.type === type,
              ).length;
              const isMaxed = typeCount >= SPECIAL_TYPE_MAX_PER_TYPE;

              return (
                <Box
                  key={type}
                  onClick={() => {
                    if (!isMaxed) setSelectedType(type);
                  }}
                  sx={{
                    textAlign: 'center',
                    p: 1.2,
                    borderRadius: 2,
                    cursor: isMaxed ? 'not-allowed' : 'pointer',
                    opacity: isMaxed ? 0.4 : 1,
                    border: `2px solid ${isSelected ? cfg.color : '#e5e7eb'}`,
                    bgcolor: isSelected ? cfg.bg : '#fff',
                    transition: 'all 0.2s',
                    '&:hover': !isMaxed
                      ? {
                          borderColor: cfg.color,
                          bgcolor: cfg.bg,
                        }
                      : {},
                  }}
                >
                  <Typography sx={{ fontSize: 24, mb: 0.3, lineHeight: 1 }}>
                    {icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: cfg.color,
                      mb: 0.2,
                    }}
                  >
                    {cfg.label}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: '#aaa' }}>
                    {typeCount} / {SPECIAL_TYPE_MAX_PER_TYPE} 人
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* 金币信息（可编辑） */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 11, color: '#bbb' }}>
              💰 当前金币:{' '}
            </Typography>
            <Box
              component="input"
              type="number"
              value={currentUser.gold}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 0) dispatch({ type: 'SET_GOLD', payload: v });
              }}
              sx={{
                width: 80,
                fontSize: 12,
                fontWeight: 700,
                color: canAfford ? '#f59e0b' : '#ef4444',
                bgcolor: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: 1,
                px: 0.8,
                py: 0.3,
                textAlign: 'center',
                outline: 'none',
                '&:focus': {
                  borderColor: '#f59e0b',
                  bgcolor: 'rgba(245,158,11,0.15)',
                },
              }}
            />
            <Typography sx={{ fontSize: 13, color: '#ccc' }}>/</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#888' }}>
              {SPECIAL_INVITATION_COST.toLocaleString()}
            </Typography>
          </Box>

          {/* 发送按钮 */}
          <Box sx={{ mb: 1.5 }}>
            <Box
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              onClick={handleSendInvitation}
              disabled={!canAfford}
              sx={{
                width: '100%',
                py: 1.5,
                borderRadius: 28,
                border: 'none',
                background: canAfford
                  ? `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.color}dd)`
                  : '#ddd',
                color: canAfford ? '#fff' : '#999',
                fontSize: 16,
                fontWeight: 700,
                cursor: canAfford ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                transition: 'all 0.2s',
                '&:hover': canAfford
                  ? {
                      opacity: 0.9,
                      transform: 'translateY(-1px)',
                      boxShadow: `0 4px 20px ${typeConfig.color}60`,
                    }
                  : {},
              }}
            >
              <Typography sx={{ fontSize: 18 }}>{giftIcon}</Typography>
              Send Invitation
              <Box
                sx={{
                  px: 1,
                  py: 0.3,
                  borderRadius: 12,
                  bgcolor: 'rgba(255,255,255,0.25)',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                🪙 {Math.round(SPECIAL_INVITATION_COST / 1000)}K
              </Box>
            </Box>
          </Box>

          {/* 提示 */}
          <Typography
            sx={{
              fontSize: 11,
              color: '#aaa',
              textAlign: 'center',
            }}
          >
            💡 Coins will be refunded to you if the invitation is rejected
          </Typography>
        </Box>
      </Box>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />

      {/* 撒花动画 */}
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
    </Box>
  );
};

export default SpecialConfirmPage;
