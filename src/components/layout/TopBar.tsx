import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  transparent?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  showBack = false,
  onBack,
  transparent = false,
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: transparent ? 'transparent' : 'rgba(255,255,255,0.95)',
        backdropFilter: transparent ? 'none' : 'blur(8px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(0,0,0,0.06)',
        color: transparent ? '#fff' : '#333',
      }}
    >
      <Toolbar sx={{ minHeight: 48, px: 2 }}>
        {showBack && (
          <IconButton
            edge="start"
            onClick={onBack || (() => window.history.back())}
            sx={{ color: transparent ? '#fff' : '#333', mr: 1 }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        <Typography
          sx={{
            flex: 1,
            fontSize: 17,
            fontWeight: 700,
            textAlign: showBack ? 'center' : 'left',
          }}
        >
          {title}
        </Typography>
        {showBack && <Box sx={{ width: 40 }} />}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
