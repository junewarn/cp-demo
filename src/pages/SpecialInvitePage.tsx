import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../types';
import { useAppState } from '../hooks/useAppState';
import InvitationHistory from '../components/special/InvitationHistory';
import InvitationResponseModal from '../components/special/InvitationResponseModal';
import Toast from '../components/common/Toast';
import Confetti from '../components/effects/Confetti';

const SpecialInvitePage: React.FC = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const [selectedInvitation, setSelectedInvitation] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const { currentUser, invitationRecords } = state;

  // 只显示待我确认的邀请
  const pendingToMe = invitationRecords.filter(
    (r) => r.status === 'pending' && r.toUser.id === currentUser.id,
  );

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, visible: true });
  };

  const handleAccept = (id: string) => {
    const record = invitationRecords.find((r) => r.id === id);
    if (!record) return;

    dispatch({
      type: 'UPDATE_INVITATION_STATUS',
      payload: { id, status: 'accepted' },
    });

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

    // 自动跳转回 Special 主页查看新关系
    setTimeout(() => {
      navigate('/special', { replace: true });
    }, 1500);
  };

  const handleReject = (id: string) => {
    dispatch({
      type: 'UPDATE_INVITATION_STATUS',
      payload: { id, status: 'rejected' },
    });
    setSelectedInvitation(null);
    showToast('已拒绝邀请', 'error');
  };

  const selectedRecord = selectedInvitation
    ? (invitationRecords.find((r) => r.id === selectedInvitation) ?? null)
    : null;

  return (
    <Box
      sx={{
        pb: 10,
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 15%, #dbeafe 50%, #eff6ff 100%)',
      }}
    >
      {/* 顶部 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          pt: 2,
          pb: 2,
          gap: 1,
        }}
      >
        <Box
          onClick={() => navigate(-1)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'rgba(147,51,234,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 18,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'rgba(147,51,234,0.16)' },
          }}
        >
          ←
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7c3aed, #4D96FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Apply
        </Typography>
      </Box>

      {/* Pending Confirmations */}
      <Box sx={{ mt: 2 }}>
        <InvitationHistory
          records={pendingToMe}
          title="Pending Confirmations"
          onItemClick={(record) => setSelectedInvitation(record.id)}
        />
      </Box>

      {/* 邀请处理弹窗 */}
      <InvitationResponseModal
        open={selectedInvitation !== null}
        record={selectedRecord}
        onClose={() => setSelectedInvitation(null)}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      {/* 撒花动画 */}
      <Confetti
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
    </Box>
  );
};

export default SpecialInvitePage;
