import React from 'react';
import { Box } from '@mui/material';

interface GlowDotProps {
  top?: string;
  left?: string;
  size?: number;
  color?: string;
  delay?: number;
}

const GlowDot: React.FC<GlowDotProps> = ({
  top = '50%',
  left = '50%',
  size = 6,
  color = '#FF6B9D',
  delay = 0,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0,
        animation: `glow-pulse 2s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

export default GlowDot;
