import React from 'react';
import { Box } from '@mui/material';

interface SweepLightProps {
  /** 扫光颜色 */
  color?: string;
  /** 动画时长 (秒) */
  duration?: number;
}

const SweepLight: React.FC<SweepLightProps> = ({
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 3,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '40%',
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${color} 50%,
            transparent 100%
          )`,
          transform: 'skewX(-15deg)',
          animation: `sweep ${duration}s ease-in-out infinite`,
        }}
      />
    </Box>
  );
};

export default SweepLight;
