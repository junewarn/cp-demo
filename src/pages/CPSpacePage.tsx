import React from 'react';
import { Box } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import BoundView from '../components/cp-space/BoundView';
import UnboundView from '../components/cp-space/UnboundView';
import StarryBackground from '../components/effects/StarryBackground';
import { useAppState } from '../hooks/useAppState';
import { CPState } from '../types';

const CPSpacePage: React.FC = () => {
  const { state } = useAppState();
  const { cpState } = state;

  return (
    <Box sx={{ position: 'relative', minHeight: '100dvh' }}>
      <StarryBackground />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <TopBar title="💕 CP空间" transparent />
        {cpState === CPState.UNBOUND ? <UnboundView /> : <BoundView />}
      </Box>
    </Box>
  );
};

export default CPSpacePage;
