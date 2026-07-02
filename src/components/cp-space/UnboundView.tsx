import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CPRulesModal from './CPRulesModal';
import InviteCPModal from './InviteCPModal';
import GoldenWingsFrame from '../common/GoldenWingsFrame';
import { useAppState } from '../../hooks/useAppState';
import { mockBoundCP, mockOtherCP } from '../../data/mockCP';
import { ViewMode, CPState } from '../../types';

// ============================================================
// Mock 数据
// ============================================================

interface CPInvitationRecord {
  id: string;
  senderName: string;
  senderAvatar: string;
  recipientName: string;
  recipientAvatar: string;
  ringIcon: string;
}

const MOCK_SENT_INVITATIONS: CPInvitationRecord[] = [
  {
    id: '1',
    senderName: 'Rina',
    senderAvatar: 'https://picsum.photos/seed/user1/200/200',
    recipientName: 'Leo',
    recipientAvatar: 'https://picsum.photos/seed/user2/200/200',
    ringIcon: '💍',
  },
  {
    id: '2',
    senderName: 'Rina',
    senderAvatar: 'https://picsum.photos/seed/user1/200/200',
    recipientName: 'Alex',
    recipientAvatar: 'https://picsum.photos/seed/alex/200/200',
    ringIcon: '💍',
  },
  {
    id: '3',
    senderName: 'Rina',
    senderAvatar: 'https://picsum.photos/seed/user1/200/200',
    recipientName: 'Noah',
    recipientAvatar: 'https://picsum.photos/seed/noah/200/200',
    ringIcon: '💍',
  },
];

// ============================================================
// 子组件
// ============================================================

/** 装饰性顶部标签页 */
const CPTabs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        pt: 2,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          px: 5,
          py: 1,
          borderRadius: 4,
          background: 'linear-gradient(180deg, #ff9ecd 0%, #ff6b9d 100%)',
          border: '2px solid #FFD700',
          boxShadow: '0 4px 16px rgba(255,107,157,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 800,
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          💕 CP
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 12,
          }}
        >
          💎
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: '#FFD700',
            boxShadow: '0 0 6px #FFD700',
          }}
        />
      </Box>

      <Box
        onClick={() => navigate('/special')}
        sx={{
          px: 4,
          py: 0.8,
          borderRadius: 4,
          background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)',
          border: '2px solid rgba(255,215,0,0.5)',
          boxShadow: '0 2px 10px rgba(255,107,157,0.2)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: '#db2777',
          }}
        >
          ✨ Special
        </Typography>
      </Box>
    </Box>
  );
};

/** 右侧操作按钮 (? / Apply) */
const HeaderActions: React.FC<{ onRules: () => void }> = ({ onRules }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        zIndex: 3,
      }}
    >
      <Box
        onClick={onRules}
        sx={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: '#db2777',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
      >
        ?
      </Box>
      <Box
        onClick={() => navigate('/cp-applications')}
        sx={{
          px: 1.2,
          py: 0.4,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.9)',
          color: '#db2777',
          fontSize: 11,
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
      >
        Apply
      </Box>
    </Box>
  );
};

/** 华丽头像框（带皇冠、翅膀、爱心、玫瑰） */
const OrnateAvatarFrame: React.FC<{
  src?: string;
  alt: string;
  empty?: boolean;
  onClick?: () => void;
}> = ({ src, alt, empty, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* 皇冠 */}
        <Typography
          sx={{
            position: 'absolute',
            top: -18,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 22,
            filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.6))',
            zIndex: 3,
          }}
        >
          👑
        </Typography>

        {/* 翅膀左 */}
        <Typography
          sx={{
            position: 'absolute',
            left: -22,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 34,
            color: '#FFD700',
            filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))',
            zIndex: 0,
          }}
        >
          🕊️
        </Typography>

        {/* 翅膀右 */}
        <Typography
          sx={{
            position: 'absolute',
            right: -22,
            top: '50%',
            transform: 'translateY(-50%) scaleX(-1)',
            fontSize: 34,
            color: '#FFD700',
            filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))',
            zIndex: 0,
          }}
        >
          🕊️
        </Typography>

        {/* 底部玫瑰左 */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: -6,
            left: -6,
            fontSize: 14,
            zIndex: 3,
          }}
        >
          🌹
        </Typography>

        {/* 底部玫瑰右 */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: -6,
            right: -6,
            fontSize: 14,
            zIndex: 3,
          }}
        >
          🌹
        </Typography>

        {/* 头像容器 */}
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            border: '3px solid #FFD700',
            boxShadow: '0 0 0 4px rgba(255,215,0,0.25), 0 0 20px rgba(255,107,157,0.4)',
            overflow: 'hidden',
            bgcolor: empty ? 'rgba(255,255,255,0.9)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {empty ? (
            <Typography sx={{ fontSize: 36, color: '#f9a8d4' }}>+</Typography>
          ) : (
            <Box
              component="img"
              src={src}
              alt={alt}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </Box>

        {/* 底部爱心装饰 */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 16,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
            zIndex: 3,
          }}
        >
          💖
        </Typography>
      </Box>

      <Typography
        sx={{
          mt: 1.5,
          fontSize: 13,
          fontWeight: 700,
          color: '#fff',
          textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      >
        {alt}
      </Typography>
    </Box>
  );
};

/** 邀请记录条目 */
const InvitationRecordItem: React.FC<{ record: CPInvitationRecord }> = ({
  record,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      px: 2,
      py: 1.2,
      borderBottom: '1px solid rgba(219,39,119,0.08)',
      '&:last-child': { borderBottom: 'none' },
    }}
  >
    <Box
      component="img"
      src={record.senderAvatar}
      alt={record.senderName}
      sx={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
    />
    <Typography sx={{ fontSize: 12, color: '#666' }}>
      sent a CP invitation to
    </Typography>
    <Box
      component="img"
      src={record.recipientAvatar}
      alt={record.recipientName}
      sx={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
    />
    <Box sx={{ flex: 1 }} />
    <Typography sx={{ fontSize: 22 }}>{record.ringIcon}</Typography>
  </Box>
);

// ============================================================
// 主组件
// ============================================================

const UnboundView: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { currentUser, viewMode, otherCPState } = state;
  const [rulesOpen, setRulesOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteBlockedOpen, setInviteBlockedOpen] = React.useState(false);

  const handleInviteClick = () => {
    if (viewMode === ViewMode.OTHER && otherCPState === CPState.BOUND) {
      setInviteBlockedOpen(true);
    } else {
      setInviteOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        pb: 10,
        position: 'relative',
        background:
          'linear-gradient(180deg, #fff0f5 0%, #ffe4ec 25%, #fff8fb 55%, #fff0f5 100%)',
        overflow: 'hidden',
      }}
    >
      {/* 粉色幕布装饰 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
          background:
            'linear-gradient(180deg, rgba(255,182,193,0.45) 0%, rgba(255,182,193,0.15) 60%, transparent 100%)',
          borderBottomLeftRadius: '50% 30%',
          borderBottomRightRadius: '50% 30%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 120,
          height: 180,
          background:
            'radial-gradient(ellipse at left top, rgba(255,107,157,0.25) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 180,
          background:
            'radial-gradient(ellipse at right top, rgba(255,107,157,0.25) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <HeaderActions onRules={() => setRulesOpen(true)} />
      <CPTabs />

      {/* 双方头像区 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          mt: 3,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <OrnateAvatarFrame src={currentUser.avatar} alt={currentUser.name} />

        <Typography sx={{ fontSize: 28, filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.8))' }}>
          💕
        </Typography>

        <OrnateAvatarFrame
          empty
          alt="None yet"
          onClick={handleInviteClick}
        />
      </Box>

      {/* Ranking + Privilege */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 3,
          px: 4,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          onClick={() => navigate('/cp-ranking')}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            py: 1.2,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.85)',
            border: '2px solid #f9d5c0',
            boxShadow: '0 4px 12px rgba(255,107,157,0.12)',
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontSize: 28 }}>🏆</Typography>
          <Typography
            sx={{
              px: 1.5,
              py: 0.2,
              borderRadius: 2,
              bgcolor: '#ff6b9d',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Ranking
          </Typography>
        </Box>

        <Box
          onClick={() => navigate('/cp-privileges')}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            py: 1.2,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.85)',
            border: '2px solid #f9d5c0',
            boxShadow: '0 4px 12px rgba(255,107,157,0.12)',
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontSize: 28 }}>💖</Typography>
          <Typography
            sx={{
              px: 1.5,
              py: 0.2,
              borderRadius: 2,
              bgcolor: '#ff6b9d',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Privilege
          </Typography>
        </Box>
      </Box>

      {/* 邀请卡片 */}
      <Box sx={{ px: 3, mt: 3, position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.9)',
            border: '3px solid #f9d5c0',
            boxShadow: '0 6px 24px rgba(255,107,157,0.15)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* 顶部爱心装饰 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 0.8,
              borderBottom: '1px solid rgba(249,213,192,0.5)',
            }}
          >
            <Typography sx={{ fontSize: 18 }}>💖 🕊️ 💖</Typography>
          </Box>

          <Box sx={{ p: 3, textAlign: 'center' }}>
            {/* 戒指盒 */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Typography sx={{ fontSize: 64, lineHeight: 1, mb: 1 }}>💍</Typography>
            </motion.div>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: '#333',
                mb: 0.8,
              }}
            >
              Send a CP invitation to her with a Ring.
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: '#ff6b9d',
                mb: 2,
                maxWidth: 260,
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              After the other party accepts the invitation, they will become in a Lover relationship.
            </Typography>

            <motion.div whileTap={{ scale: 0.96 }}>
              <Button
                onClick={handleInviteClick}
                sx={{
                  width: '100%',
                  maxWidth: 240,
                  py: 1.2,
                  borderRadius: 24,
                  background: 'linear-gradient(90deg, #ff6b9d, #ff8fb3)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 800,
                  boxShadow: '0 4px 16px rgba(255,107,157,0.4)',
                  border: '2px solid #FFD700',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #ff5a8f, #ff7ea8)',
                  },
                }}
              >
                Invite CP &nbsp;🪙&nbsp; 599K
              </Button>
            </motion.div>

            <Typography
              sx={{
                fontSize: 11,
                color: '#999',
                mt: 1.5,
                mb: 1.5,
              }}
            >
              These coins will be refunded to you after the invitation is rejected.
            </Typography>

            {/* 滚动邀请记录 */}
            <Box
              sx={{
                position: 'relative',
                height: 120,
                overflow: 'hidden',
                borderRadius: 2,
                bgcolor: 'rgba(255,240,245,0.6)',
                border: '1px solid rgba(249,213,192,0.6)',
                mx: -1,
              }}
            >
              <Box
                sx={{
                  animation: 'scroll-records 8s linear infinite',
                  '@keyframes scroll-records': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                  },
                }}
              >
                {[...MOCK_SENT_INVITATIONS, ...MOCK_SENT_INVITATIONS].map((record, idx) => (
                  <InvitationRecordItem key={`${record.id}-${idx}`} record={record} />
                ))}
              </Box>
            </Box>
          </Box>

          {/* 底部玫瑰装饰 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
              pb: 0.5,
            }}
          >
            <Typography sx={{ fontSize: 16 }}>🌹</Typography>
            <Typography sx={{ fontSize: 18 }}>💖</Typography>
            <Typography sx={{ fontSize: 16 }}>🌹</Typography>
          </Box>
        </Box>
      </Box>

      {/* 调试操作区 */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          mt: 3,
          px: 2,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            dispatch({
              type: 'SET_VIEW_MODE',
              payload: viewMode === ViewMode.SELF ? ViewMode.OTHER : ViewMode.SELF,
            })
          }
          sx={{ borderRadius: 24, color: '#db2777', borderColor: '#f9a8d4' }}
        >
          {viewMode === ViewMode.SELF ? '👁️ 第三方视角' : '👁️ 自己视角'}
        </Button>

        {viewMode === ViewMode.OTHER && (
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              dispatch({
                type: 'SET_OTHER_CP_STATE',
                payload: otherCPState === CPState.BOUND ? CPState.UNBOUND : CPState.BOUND,
              })
            }
            sx={{ borderRadius: 24, color: '#db2777', borderColor: '#f9a8d4' }}
          >
            {otherCPState === CPState.BOUND ? '🔓 切换第三方未绑定' : '🔗 切换第三方已绑定'}
          </Button>
        )}

        <Button
          variant="contained"
          size="small"
          onClick={() => {
            if (viewMode === ViewMode.OTHER && otherCPState === CPState.BOUND) {
              setInviteBlockedOpen(true);
            } else {
              dispatch({
                type: 'BIND_CP',
                payload: viewMode === ViewMode.OTHER ? mockOtherCP : mockBoundCP,
              });
            }
          }}
          sx={{
            borderRadius: 24,
            background: 'linear-gradient(135deg, #ff6b9d, #ec4899)',
            color: '#fff',
          }}
        >
          ✨ 一键绑定CP
        </Button>
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
