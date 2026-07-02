import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import SpecialCircle from '../components/special/SpecialCircle';
import IntimacyPanel from '../components/special/IntimacyPanel';
import SpecialUnlockModal from '../components/special/SpecialUnlockModal';
import ConfirmUnbindModal from '../components/common/ConfirmUnbindModal';
import Toast from '../components/common/Toast';
import Confetti from '../components/effects/Confetti';
import CrystalButton from '../components/common/CrystalButton';
import { useAppState } from '../hooks/useAppState';
import { useNavigate } from 'react-router-dom';
import {
  SPECIAL_UNLOCK_COST,
  SPECIAL_MAX_SLOTS,
  SPECIAL_TYPE_CONFIG,
} from '../utils/constants';

// ============================================================
// 顶部导航：CP/SPECIAL 切换 + Apply/?
// ============================================================

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: 2,
        pb: 1,
        px: 2,
      }}
    >
      {/* CP/SPECIAL 切换 */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          onClick={() => navigate('/cp-space')}
          sx={{
            px: 2.5,
            py: 0.8,
            borderRadius: 2.5,
            bgcolor: 'rgba(255,255,255,0.45)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: '1px solid rgba(255,255,255,0.5)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.65)' },
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#888' }}>
            💕 CP
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2.5,
            py: 0.8,
            borderRadius: 2.5,
            background: 'linear-gradient(135deg, #4D96FF, #7c3aed)',
            boxShadow: '0 4px 16px rgba(77,150,255,0.35)',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>
            ✨ SPECIAL
          </Typography>
        </Box>
      </Box>

      {/* 右侧操作 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          onClick={() => navigate('/special-invite')}
          sx={{
            px: 2,
            py: 0.6,
            borderRadius: 2,
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(147,51,234,0.2)',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 10px rgba(77,150,255,0.25)' },
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#4D96FF' }}>
            Apply
          </Typography>
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(147,51,234,0.2)',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.85)' },
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#7c3aed', fontWeight: 700 }}>
            ?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ============================================================
// 等级特权预览表
// ============================================================

const PRIVILEGE_LEVELS = [
  { level: 1, intimacy: 1, reward: '💖', name: 'Love' },
  { level: 2, intimacy: 2, reward: '🖼️', name: 'Frame' },
  { level: 3, intimacy: 3, reward: '💬', name: 'Bubble' },
  { level: 4, intimacy: 4, reward: '🎀', name: 'Ribbon' },
  { level: 5, intimacy: 5, reward: '🏠', name: 'LOBBY' },
  { level: 6, intimacy: 6, reward: '🚪', name: 'Entrance' },
  { level: 7, intimacy: 7, reward: '🔥', name: 'V-flame' },
];

const PrivilegePreview: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => (
  <Box sx={{ px: 2, mt: 2 }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        👑 Privilege
      </Typography>
      <Box
        onClick={onViewAll}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
          px: 1.2,
          py: 0.4,
          borderRadius: 2,
          bgcolor: 'rgba(147,51,234,0.08)',
          transition: 'all 0.2s',
          '&:hover': { bgcolor: 'rgba(147,51,234,0.15)' },
        }}
      >
        <Typography sx={{ fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>
          View All
        </Typography>
        <Typography sx={{ fontSize: 11, color: '#7c3aed' }}>→</Typography>
      </Box>
    </Box>

    {/* 表头 */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr 120px',
        gap: 0.8,
        px: 1,
        mb: 0.5,
      }}
    >
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#999' }}>
        Level
      </Typography>
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#999' }}>
        Intimacy
      </Typography>
      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#999' }}>
        Reward
      </Typography>
    </Box>

    {/* 行 */}
    {PRIVILEGE_LEVELS.map((pl) => (
      <Box
        key={pl.level}
        sx={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 120px',
          gap: 0.8,
          alignItems: 'center',
          py: 1,
          px: 1,
          borderRadius: 1.5,
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          transition: 'all 0.15s',
          '&:hover': { bgcolor: 'rgba(147,51,234,0.04)' },
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: pl.level <= 7 ? '#7c3aed' : '#ccc',
          }}
        >
          Lv.{pl.level}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              height: 6,
              flex: pl.intimacy / 7,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
            }}
          />
          <Typography sx={{ fontSize: 10, color: '#999' }}>
            {pl.intimacy}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 11,
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
          }}
        >
          {pl.reward} {pl.name}
        </Typography>
      </Box>
    ))}
  </Box>
);

// ============================================================
// 邀请入口区（未绑定时展示）
// ============================================================

const InvitePromo: React.FC<{ onInvite: () => void }> = ({ onInvite }) => (
  <Box
    sx={{
      mx: 2,
      mt: 3,
      p: 3,
      borderRadius: 3,
      textAlign: 'center',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(219,234,254,0.5))',
      border: '1px solid rgba(147,51,234,0.12)',
      boxShadow: '0 4px 20px rgba(77,150,255,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* 装饰光点 */}
    <Box
      sx={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 80,
        height: 80,
        borderRadius: '50%',
        bgcolor: 'rgba(147,51,234,0.08)',
        filter: 'blur(20px)',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 60,
        height: 60,
        borderRadius: '50%',
        bgcolor: 'rgba(77,150,255,0.1)',
        filter: 'blur(16px)',
      }}
    />

    {/* 装饰头像框 */}
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        mx: 'auto',
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        bgcolor: 'rgba(147,51,234,0.06)',
        border: '2px dashed rgba(147,51,234,0.25)',
        position: 'relative',
      }}
    >
      📿
      <Box
        sx={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: '1px solid rgba(147,51,234,0.15)',
        }}
      />
    </Box>

    <Typography
      sx={{
        fontSize: 15,
        fontWeight: 700,
        color: '#4D96FF',
        mb: 0.8,
        position: 'relative',
      }}
    >
      Send a Special invitation to her with a Bracelet.
    </Typography>
    <Typography
      sx={{
        fontSize: 12,
        color: '#888',
        mb: 2,
        position: 'relative',
      }}
    >
      After the other party accepts the invitation they will become Special
    </Typography>

    <Box
      onClick={onInvite}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.8,
        px: 5,
        py: 1.2,
        borderRadius: 28,
        background: 'linear-gradient(135deg, #4D96FF, #7c3aed)',
        color: '#fff',
        fontSize: 15,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(77,150,255,0.35)',
        transition: 'all 0.2s',
        position: 'relative',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 22px rgba(77,150,255,0.45)' },
        '&:active': { transform: 'scale(0.96)' },
      }}
    >
      Invite Special
      <Typography component="span" sx={{ fontSize: 14 }}>🪙</Typography>
      <Typography component="span" sx={{ fontSize: 15, fontWeight: 800 }}>300K</Typography>
    </Box>

    <Typography
      sx={{
        fontSize: 10,
        color: '#aaa',
        mt: 1.5,
        position: 'relative',
      }}
    >
      Coins will be refunded to you if the invitation is rejected
    </Typography>
  </Box>
);

const SpecialPage: React.FC = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const { specialRelationships, currentUser, unlockedSpecialSlots } = state;

  // ----- 本地状态 -----
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(
    null,
  );
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });
  const [showConfetti, setShowConfetti] = useState(false);

  const hasRelationships = specialRelationships.length > 0;

  // ----- 页面背景 -----
  const pageBg = 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 15%, #dbeafe 50%, #eff6ff 100%)';

  // ----- Toast 辅助 -----
  const showToast = useCallback(
    (message: string, type: 'success' | 'error') => {
      setToast({ message, type, visible: true });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // ----- 解锁逻辑 -----
  const handleUnlockClick = useCallback(() => {
    if (unlockedSpecialSlots >= SPECIAL_MAX_SLOTS) {
      showToast('已达到最大关系位数', 'error');
      return;
    }
    setShowUnlockModal(true);
  }, [unlockedSpecialSlots, showToast]);

  const handleUnlockConfirm = useCallback(() => {
    if (currentUser.gold < SPECIAL_UNLOCK_COST) {
      showToast('金币不足！', 'error');
      setShowUnlockModal(false);
      return;
    }
    dispatch({ type: 'DEDUCT_GOLD', payload: SPECIAL_UNLOCK_COST });
    dispatch({ type: 'UNLOCK_SPECIAL_SLOT' });
    setShowUnlockModal(false);
    setShowConfetti(true);
    showToast(
      `解锁成功！现在共有 ${unlockedSpecialSlots + 1} 个关系位 🎉`,
      'success',
    );
  }, [currentUser.gold, unlockedSpecialSlots, dispatch, showToast]);

  // ----- 添加关系 -----
  const handleAddClick = useCallback(() => {
    if (specialRelationships.length >= unlockedSpecialSlots) {
      showToast('请先解锁更多关系位', 'error');
      return;
    }
    navigate('/special-select-friend');
  }, [specialRelationships.length, unlockedSpecialSlots, showToast, navigate]);

  // ----- 删除关系 -----
  const handleRemoveClick = useCallback((id: string) => {
    setShowRemoveConfirm(id);
  }, []);

  const handleRemoveConfirm = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_SPECIAL_RELATIONSHIP', payload: id });
      setShowRemoveConfirm(null);
      showToast('已解除 Special 关系', 'error');
    },
    [dispatch, showToast],
  );

  // ----- 确认弹窗目标关系 -----
  const removingRel = showRemoveConfirm
    ? specialRelationships.find((r) => r.id === showRemoveConfirm)
    : null;

  return (
    <Box sx={{ pb: 10, minHeight: '100dvh', background: pageBg }}>
      {/* 顶部导航 */}
      <Header />

      {/* 用户头像 + 环绕 Special 槽位 */}
      <SpecialCircle
        relationships={specialRelationships}
        unlockedSlots={unlockedSpecialSlots}
        gold={currentUser.gold}
        currentUserAvatar={currentUser.avatar}
        currentUserName={currentUser.name}
        onAdd={handleAddClick}
        onUnlock={handleUnlockClick}
        onRemove={handleRemoveClick}
        onProfileClick={() => navigate('/profile')}
      />

      {/* 金币显示 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
        <Typography sx={{ fontSize: 11, color: '#999' }}>💰</Typography>
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
            fontSize: 11,
            fontWeight: 700,
            color: '#f59e0b',
            bgcolor: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 1,
            px: 0.8,
            py: 0.3,
            textAlign: 'center',
            outline: 'none',
            '&:focus': { borderColor: '#f59e0b', bgcolor: 'rgba(245,158,11,0.15)' },
          }}
        />
      </Box>

      {hasRelationships ? (
        <>
          {/* Intimacy 面板 */}
          <IntimacyPanel
            relationships={specialRelationships}
            onInvite={() => navigate('/special-select-friend')}
            onRemove={handleRemoveClick}
          />

          {/* 等级特权预览 */}
          <PrivilegePreview
            onViewAll={() => navigate('/special-privileges')}
          />
        </>
      ) : (
        <>
          {/* 空状态时的操作入口 */}
          <Box sx={{ px: 2, mt: 2 }}>
            {/* 按钮 */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <CrystalButton
                onClick={() => navigate('/special-ranking')}
                icon="🏆"
                variant="gradient"
              >
                榜单
              </CrystalButton>
              <CrystalButton
                onClick={() => navigate('/special-privileges')}
                icon="👑"
                variant="gradient"
              >
                特权
              </CrystalButton>
            </Box>
          </Box>
        </>
      )}

      {/* 未绑定时：邀请入口 */}
      {!hasRelationships && (
        <InvitePromo onInvite={() => navigate('/special-invite')} />
      )}

      {/* 解锁确认弹窗 */}
      <SpecialUnlockModal
        open={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onConfirm={handleUnlockConfirm}
        cost={SPECIAL_UNLOCK_COST}
        currentGold={currentUser.gold}
      />

      {/* 删除确认弹窗 */}
      <ConfirmUnbindModal
        open={showRemoveConfirm !== null}
        onClose={() => setShowRemoveConfirm(null)}
        onConfirm={() => handleRemoveConfirm(showRemoveConfirm!)}
        title="💔 解除关系"
        description={`确定要解除与 ${removingRel?.partner.name} 的 ${SPECIAL_TYPE_CONFIG[removingRel?.type ?? 'bestie']?.label} 关系吗？`}
        warningText="⚠️ 解除后关系位将释放，但不会退还解锁费用"
      />

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

export default SpecialPage;
