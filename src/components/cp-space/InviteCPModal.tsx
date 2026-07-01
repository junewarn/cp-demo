import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const INVITE_CP_COST = 599000;

interface InviteCPModalProps {
  open: boolean;
  onClose: () => void;
  blocked?: boolean;
  message?: string;
}

const InviteCPModal: React.FC<InviteCPModalProps> = ({ open, onClose, blocked = false, message = '已结成CP，无法未解除CP前再绑定CP' }) => {
  const [userId, setUserId] = useState('');

  const handleSend = () => {
    if (!userId.trim()) return;
    // Mock: close the modal after sending
    onClose();
    setUserId('');
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
              zIndex: 1400,
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
              bottom: '20%',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '100%',
              maxWidth: 390,
              zIndex: 1401,
              background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            }}
          >
            {/* 拖拽指示条 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
              <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
            </Box>

            {blocked ? (
              <>
                {/* 阻断提示模式 */}
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#fff', textAlign: 'center', mb: 2 }}>
                  ⚠️ 提示
                </Typography>

                <Box sx={{ px: 3, mb: 3 }}>
                  <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 1.6 }}>
                    {message}
                  </Typography>
                </Box>

                {/* 按钮区 — 仅"知道了" */}
                <Box sx={{ px: 3, display: 'flex', mb: 2 }}>
                  <Box
                    onClick={onClose}
                    sx={{
                      flex: 1,
                      py: 1.4,
                      borderRadius: 14,
                      background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 700,
                      boxShadow: '0 4px 20px rgba(168,85,247,0.35)',
                      transition: 'all 0.15s',
                      '&:hover': { boxShadow: '0 6px 28px rgba(168,85,247,0.5)' },
                    }}
                  >
                    知道了
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {/* 标题 */}
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#fff', textAlign: 'center', mb: 3 }}>
                  💝 邀请CP
                </Typography>

                {/* 输入区 */}
                <Box sx={{ px: 3, mb: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', mb: 1 }}>
                    对方用户ID
                  </Typography>
                  <Box
                    component="input"
                    type="text"
                    placeholder="请输入对方用户ID"
                    value={userId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
                    sx={{
                      width: '100%',
                      px: 2,
                      py: 1.5,
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.15)',
                      bgcolor: 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      fontSize: 15,
                      outline: 'none',
                      '&::placeholder': { color: 'rgba(255,255,255,0.3)' },
                      '&:focus': { borderColor: 'rgba(255,215,0,0.5)', bgcolor: 'rgba(255,255,255,0.12)' },
                    }}
                  />
                </Box>

                {/* 金币信息 */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Typography sx={{ fontSize: 20 }}>🪙</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>
                    {INVITE_CP_COST.toLocaleString()} coins needed
                  </Typography>
                </Box>

                {/* 按钮区 */}
                <Box sx={{ px: 3, display: 'flex', gap: 2, mb: 2 }}>
                  {/* 取消 */}
                  <Box
                    onClick={onClose}
                    sx={{
                      flex: 1,
                      py: 1.4,
                      borderRadius: 14,
                      border: '1px solid rgba(255,255,255,0.2)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 15,
                      fontWeight: 600,
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                    }}
                  >
                    取消
                  </Box>

                  {/* 确认发送 */}
                  <Box
                    onClick={handleSend}
                    sx={{
                      flex: 2,
                      py: 1.4,
                      borderRadius: 14,
                      background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 700,
                      boxShadow: '0 4px 20px rgba(168,85,247,0.35)',
                      transition: 'all 0.15s',
                      '&:hover': { boxShadow: '0 6px 28px rgba(168,85,247,0.5)' },
                    }}
                  >
                    确认发送
                  </Box>
                </Box>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InviteCPModal;
