import React from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { BOTTOM_NAV_ITEMS } from '../../utils/constants';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 语音房页面有自己的底部操作栏，隐藏全局导航
  if (location.pathname === '/voice-room') return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 390,
        bgcolor: 'rgba(26,10,46,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        py: 1,
        pb: 'calc(8px + env(safe-area-inset-bottom, 0px))',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
      }}
    >
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Box
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.25,
              cursor: 'pointer',
              py: 0.5,
              px: 2,
              borderRadius: 3,
              transition: 'all 0.2s ease',
              ...(isActive && {
                bgcolor: 'rgba(233, 30, 140, 0.2)',
              }),
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Box sx={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</Box>
            <Box
              sx={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFD700' : 'rgba(255,255,255,0.5)',
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default BottomNav;
