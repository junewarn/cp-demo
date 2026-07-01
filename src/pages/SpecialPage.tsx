import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import SpecialRelationList from '../components/special/SpecialRelationList';
import SpecialSlotGrid from '../components/special/SpecialSlotGrid';
import SpecialUnlockModal from '../components/special/SpecialUnlockModal';
import InvitationResponseModal from '../components/special/InvitationResponseModal';
import ModalWrapper from '../components/common/ModalWrapper';
import Toast from '../components/common/Toast';
import Confetti from '../components/effects/Confetti';
import CrystalButton from '../components/common/CrystalButton';
import EmptyState from '../components/common/EmptyState';
import InvitationHistory from '../components/special/InvitationHistory';
import { useAppState } from '../hooks/useAppState';
import { useNavigate } from 'react-router-dom';
import { SpecialInvitationRecord, Gender } from '../types';
import {
  SPECIAL_UNLOCK_COST,
  SPECIAL_DEFAULT_SLOTS,
  SPECIAL_MAX_SLOTS,
  SPECIAL_TYPE_CONFIG,
} from '../utils/constants';

// ============================================================
// SpecialPage 组件
// ============================================================

const SpecialPage: React.FC = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const { specialRelationships, currentUser, invitationRecords } = state;

  // ----- 本地状态 -----
  const [unlockedSlots, setUnlockedSlots] = useState<number>(
    SPECIAL_DEFAULT_SLOTS,
  );
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
  const [selectedInvitation, setSelectedInvitation] =
    useState<SpecialInvitationRecord | null>(null);

  const hasRelationships = specialRelationships.length > 0;

  // ----- 过滤待确认的邀请（接收方是自己） -----
  const pendingRecords = invitationRecords.filter(
    (r) => r.status === 'pending' && r.toUser.id === currentUser.id,
  );

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
    if (unlockedSlots >= SPECIAL_MAX_SLOTS) {
      showToast('已达到最大关系位数', 'error');
      return;
    }
    setShowUnlockModal(true);
  }, [unlockedSlots, showToast]);

  const handleUnlockConfirm = useCallback(() => {
    if (currentUser.gold < SPECIAL_UNLOCK_COST) {
      showToast('金币不足！', 'error');
      setShowUnlockModal(false);
      return;
    }
    dispatch({ type: 'DEDUCT_GOLD', payload: SPECIAL_UNLOCK_COST });
    setUnlockedSlots((prev) => prev + 1);
    setShowUnlockModal(false);
    setShowConfetti(true);
    showToast(
      `解锁成功！现在共有 ${unlockedSlots + 1} 个关系位 🎉`,
      'success',
    );
  }, [currentUser.gold, unlockedSlots, dispatch, showToast]);

  // ----- 添加关系（点击空位 +）—— 导航到选择好友页面 -----
  const handleAddClick = useCallback(() => {
    if (specialRelationships.length >= unlockedSlots) {
      showToast('请先解锁更多关系位', 'error');
      return;
    }
    navigate('/special-select-friend');
  }, [specialRelationships.length, unlockedSlots, showToast, navigate]);

  // ----- 快速绑定 -----
  const handleQuickBind = useCallback(() => {
    navigate('/special-select-friend');
  }, [navigate]);

  // ----- 删除关系 -----
  const handleRemoveClick = useCallback((id: string) => {
    setShowRemoveConfirm(id);
  }, []);

  const handleRemoveConfirm = useCallback(() => {
    if (showRemoveConfirm) {
      dispatch({
        type: 'REMOVE_SPECIAL_RELATIONSHIP',
        payload: showRemoveConfirm,
      });
      setShowRemoveConfirm(null);
      showToast('已解除 Special 关系', 'error');
    }
  }, [showRemoveConfirm, dispatch, showToast]);

  // ----- 邀请处理 -----
  const handleAcceptInvitation = useCallback(
    (id: string) => {
      // 如果已解锁位置都被占满，拦截并弹出解锁弹窗
      if (specialRelationships.length >= unlockedSlots) {
        if (unlockedSlots >= SPECIAL_MAX_SLOTS) {
          showToast('已达到最大关系位数（9个）', 'error');
          return;
        }
        setSelectedInvitation(null);
        setShowUnlockModal(true);
        return;
      }

      const record = invitationRecords.find((r) => r.id === id);
      if (!record) return;

      // 更新邀请状态为已接受
      dispatch({
        type: 'UPDATE_INVITATION_STATUS',
        payload: { id, status: 'accepted' },
      });

      // 添加 Special 关系
      dispatch({
        type: 'ADD_SPECIAL_RELATIONSHIP',
        payload: {
          id: `sp-${Date.now()}`,
          partner: {
            id: record.fromUser.id,
            name: record.fromUser.name,
            avatar: record.fromUser.avatar,
            gender: Gender.OTHER,
            level: 1,
            signature: '',
            gold: 0,
          },
          type: record.type,
          establishedDate: new Date().toISOString().split('T')[0],
          level: 1,
          days: 1,
        },
      });

      setSelectedInvitation(null);
      setShowConfetti(true);
      showToast('已接受邀请！🎉', 'success');
    },
    [invitationRecords, dispatch, showToast, unlockedSlots, specialRelationships],
  );

  const handleRejectInvitation = useCallback(
    (id: string) => {
      dispatch({
        type: 'UPDATE_INVITATION_STATUS',
        payload: { id, status: 'rejected' },
      });
      setSelectedInvitation(null);
      showToast('已拒绝邀请', 'error');
    },
    [dispatch, showToast],
  );

  // ----- 确认弹窗目标关系 -----
  const removingRel = showRemoveConfirm
    ? specialRelationships.find((r) => r.id === showRemoveConfirm)
    : null;

  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title="✨ Special" />

      {/* 动态闪光标题 */}
      <Box
        sx={{
          textAlign: 'center',
          py: 3,
          background:
            'linear-gradient(180deg, rgba(155,89,182,0.2) 0%, rgba(77,150,255,0.1) 100%)',
          borderBottom: '1px solid rgba(155,89,182,0.15)',
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 800,
            background:
              'linear-gradient(135deg, #9B59B6, #4D96FF, #FF8C00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 0.5,
          }}
        >
          ✨ Special Zone
        </Typography>
        <Typography sx={{ fontSize: 13, color: '#999' }}>
          这里是你和好友们的特别联结
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
          <Typography sx={{ fontSize: 11, color: '#bbb' }}>💰 可用金币: </Typography>
          <Box
            component="input"
            type="number"
            value={currentUser.gold}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v >= 0) dispatch({ type: 'SET_GOLD', payload: v });
            }}
            sx={{
              width: 90,
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
      </Box>

      {hasRelationships || unlockedSlots > 0 ? (
        <>
          {/* 关系位网格 */}
          <Box sx={{ mt: 2 }}>
            <SpecialSlotGrid
              relationships={specialRelationships}
              unlockedSlots={unlockedSlots}
              gold={currentUser.gold}
              onAdd={handleAddClick}
              onUnlock={handleUnlockClick}
              onRemove={handleRemoveClick}
            />
          </Box>

          {/* 关系列表 */}
          {hasRelationships && (
            <SpecialRelationList relationships={specialRelationships} />
          )}

          {/* 操作按钮 */}
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
              Special榜单
            </CrystalButton>
            <CrystalButton
              onClick={() => navigate('/special-privileges')}
              icon="👑"
              variant="gradient"
            >
              Special特权
            </CrystalButton>
          </Box>

          {/* 邀请历史 */}
          <Box sx={{ mt: 2, px: 0 }}>
            <InvitationHistory
              records={pendingRecords}
              maxItems={5}
              showQuickBind
              onQuickBind={handleQuickBind}
              onItemClick={(record) => setSelectedInvitation(record)}
            />
          </Box>
        </>
      ) : (
        <EmptyState
          icon="🔗"
          title="还没有特殊关系"
          description="邀请好友建立专属联结"
          actionLabel="邀请好友"
          onAction={() => navigate('/special-select-friend')}
        />
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
      <ModalWrapper
        open={showRemoveConfirm !== null}
        onClose={() => setShowRemoveConfirm(null)}
        title="💔 解除关系"
      >
        {removingRel && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 48, mb: 1.5 }}>💔</Typography>
            <Typography
              sx={{ fontSize: 15, fontWeight: 600, color: '#333', mb: 1 }}
            >
              解除{' '}
              <Box
                component="span"
                sx={{
                  color:
                    SPECIAL_TYPE_CONFIG[removingRel.type]?.color ?? '#333',
                }}
              >
                {SPECIAL_TYPE_CONFIG[removingRel.type]?.label}
              </Box>{' '}
              关系
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>
              确定要解除与{' '}
              <Box
                component="span"
                sx={{ color: '#f59e0b', fontWeight: 600 }}
              >
                {removingRel.partner.name}
              </Box>{' '}
              的关系吗？
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: '#ef4444',
                mb: 2,
              }}
            >
              ⚠️ 解除后关系位将释放，但不会退还解锁费用
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                onClick={() => setShowRemoveConfirm(null)}
                sx={{
                  flex: 1,
                  py: 1.2,
                  borderRadius: 24,
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#666',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
              >
                取消
              </Box>
              <Box
                onClick={handleRemoveConfirm}
                sx={{
                  flex: 1,
                  py: 1.2,
                  borderRadius: 24,
                  background: '#ef4444',
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#dc2626' },
                }}
              >
                确认解除
              </Box>
            </Box>
          </Box>
        )}
      </ModalWrapper>

      {/* 邀请处理弹窗 */}
      <InvitationResponseModal
        open={selectedInvitation !== null}
        record={selectedInvitation}
        onClose={() => setSelectedInvitation(null)}
        onAccept={handleAcceptInvitation}
        onReject={handleRejectInvitation}
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
