import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CPPairingScrollList from './CPPairingScrollList';
import CPRulesModal from './CPRulesModal';
import GreekColumns from '../effects/GreekColumns';
import CrystalButton from '../common/CrystalButton';
import GoldenWingsFrame from '../common/GoldenWingsFrame';
import InviteCPModal from './InviteCPModal';
import { useAppState } from '../../hooks/useAppState';
import { mockBoundCP, mockOtherCP } from '../../data/mockCP';
import { ViewMode, CPState } from '../../types';

const UnboundView: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { currentUser, viewMode, otherCPState } = state;
  const [rulesOpen, setRulesOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteBlockedOpen, setInviteBlockedOpen] = React.useState(false);

  return (
    <Box sx={{ pb: 10, position: 'relative' }}>
      <GreekColumns />

      {/* === 双方头像区 === */}
      <Box sx={{ textAlign: 'center', pt: 3, pb: 1, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, mb: 1.5 }}>
          {/* 当前用户头像 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <GoldenWingsFrame>
              <Box
                component="img"
                src={currentUser.avatar}
                sx={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #FFD700' }}
              />
            </GoldenWingsFrame>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
              {currentUser.name}
            </Typography>
          </Box>

          {/* 心形连线装饰 */}
          <Typography sx={{ fontSize: 24, color: 'rgba(255,255,255,0.3)' }}>💕</Typography>

          {/* CP伙伴空位 — 点击触发 Invite CP */}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
            onClick={() => {
              if (viewMode === ViewMode.OTHER && otherCPState === CPState.BOUND) {
                setInviteBlockedOpen(true);
              } else {
                setInviteOpen(true);
              }
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '2px dashed rgba(255,215,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.05)',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'rgba(255,215,0,0.75)',
                  boxShadow: '0 0 16px rgba(255,215,0,0.25)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Typography sx={{ fontSize: 24, color: 'rgba(255,215,0,0.4)' }}>+</Typography>
            </Box>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
              CP伙伴
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* === 钻戒盒 === */}
      <Box sx={{ textAlign: 'center', py: 2, position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Typography sx={{ fontSize: 56, filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.4))' }}>
            💍
          </Typography>
        </motion.div>
      </Box>

      {/* === 文字 === */}
      <Box sx={{ textAlign: 'center', px: 2, position: 'relative', zIndex: 1 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#fff', mb: 0.5, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          寻找你的CP
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', mb: 3, maxWidth: 260, mx: 'auto', lineHeight: 1.6 }}>
          绑定CP，开启你们专属的情侣空间，一起记录甜蜜时刻
        </Typography>
      </Box>

      {/* === 榜单 + 特权 === */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 2, position: 'relative', zIndex: 1 }}>
        <CrystalButton onClick={() => navigate('/cp-ranking')} icon="🏆">
          查看榜单
        </CrystalButton>
        <CrystalButton onClick={() => navigate('/cp-privileges')} icon="👑">
          查看特权
        </CrystalButton>
      </Box>

      {/* === 规则 + 申请记录 === */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Button variant="text" onClick={() => setRulesOpen(true)} sx={{ borderRadius: 24, px: 2, color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 13 }}>
          ❓ 规则
        </Button>
        <Button variant="text" onClick={() => navigate('/cp-applications')} sx={{ borderRadius: 24, px: 2, color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 13 }}>
          📋 申请记录
        </Button>
      </Box>

      {/* === Invite CP 按钮 === */}
      <Box sx={{ textAlign: 'center', mt: 3, position: 'relative', zIndex: 1 }}>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (viewMode === ViewMode.OTHER && otherCPState === CPState.BOUND) {
                setInviteBlockedOpen(true);
              } else {
                setInviteOpen(true);
              }
            }}
            sx={{
              borderRadius: 28,
              px: 5,
              py: 1.5,
              fontSize: 16,
              fontWeight: 700,
              border: '2px solid #FFD700',
              color: '#FFD700',
              background: 'rgba(255,215,0,0.08)',
              animation: 'golden-glow 2s ease-in-out infinite',
              '@keyframes golden-glow': {
                '0%, 100%': { boxShadow: '0 0 20px rgba(255,215,0,0.3)' },
                '50%': { boxShadow: '0 0 35px rgba(255,215,0,0.5)' },
              },
              '&:hover': { background: 'rgba(255,215,0,0.18)', boxShadow: '0 0 25px rgba(255,215,0,0.4)' },
            }}
          >
            💝 Invite CP &nbsp;<span style={{ fontSize: 13, opacity: 0.7 }}>(599K)</span>
          </Button>
        </motion.div>
      </Box>

      {/* === 全服CP结成消息滚动 === */}
      <Box sx={{ mt: 3, position: 'relative', zIndex: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', px: 2, mb: 1 }}>
          💕 全服CP结成消息
        </Typography>
        <CPPairingScrollList />
      </Box>

      {/* === 底部操作区 === */}
      <Box sx={{ textAlign: 'center', mt: 2, pb: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => dispatch({
                type: 'SET_VIEW_MODE',
                payload: viewMode === ViewMode.SELF ? ViewMode.OTHER : ViewMode.SELF,
              })}
              sx={{
                borderRadius: 28,
                px: 5,
                py: 1.2,
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: 'rgba(255,255,255,0.8)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              {viewMode === ViewMode.SELF ? '👁️ 第三方视角' : '👁️ 自己视角'}
            </Button>
          </motion.div>

          {viewMode === ViewMode.OTHER && (
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                onClick={() => dispatch({
                  type: 'SET_OTHER_CP_STATE',
                  payload: otherCPState === CPState.BOUND ? CPState.UNBOUND : CPState.BOUND,
                })}
                sx={{
                  borderRadius: 28,
                  px: 5,
                  py: 1.2,
                  fontSize: 13,
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: 'rgba(255,255,255,0.8)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                {otherCPState === CPState.BOUND ? '🔓 切换第三方未绑定' : '🔗 切换第三方已绑定'}
              </Button>
            </motion.div>
          )}

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={() => {
                if (viewMode === ViewMode.OTHER && otherCPState === CPState.BOUND) {
                  setInviteBlockedOpen(true);
                } else {
                  dispatch({ type: 'BIND_CP', payload: viewMode === ViewMode.OTHER ? mockOtherCP : mockBoundCP });
                }
              }}
              sx={{
                borderRadius: 28,
                px: 6,
                py: 1.2,
                fontSize: 14,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(168,85,247,0.35)',
                '&:hover': { boxShadow: '0 6px 28px rgba(168,85,247,0.5)' },
              }}
            >
              ✨ 一键绑定CP
            </Button>
          </motion.div>
        </Box>
      </Box>

      <CPRulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
      <InviteCPModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <InviteCPModal
        open={inviteBlockedOpen}
        onClose={() => setInviteBlockedOpen(false)}
        blocked
        message="已结成CP，无法未解除CP前再绑定CP"
      />
    </Box>
  );
};

export default UnboundView;
