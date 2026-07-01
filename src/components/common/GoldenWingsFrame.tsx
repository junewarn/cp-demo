import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface GoldenWingsFrameProps {
  children: React.ReactNode;
  size?: number;
}

const GoldenWingsFrame: React.FC<GoldenWingsFrameProps> = ({ children, size = 72 }) => {
  const wingSize = size * 0.45;
  const crownSize = size * 0.35;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 左翅膀 */}
      <motion.div
        animate={{ rotate: [0, 3, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: -wingSize,
          top: size * 0.15,
          fontSize: wingSize,
          color: '#FFD700',
          filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.4))',
          zIndex: 0,
        }}
      >
        🕊️
      </motion.div>

      {/* 右翅膀 */}
      <motion.div
        animate={{ rotate: [0, -3, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          right: -wingSize,
          top: size * 0.15,
          fontSize: wingSize,
          color: '#FFD700',
          filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.4))',
          transform: 'scaleX(-1)',
          zIndex: 0,
        }}
      >
        🕊️
      </motion.div>

      {/* 皇冠 */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: -crownSize,
          fontSize: crownSize,
          color: '#FFD700',
          filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))',
          zIndex: 2,
        }}
      >
        👑
      </motion.div>

      {/* 金色光晕 */}
      <Box
        sx={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid rgba(255,215,0,0.25)',
          animation: 'golden-glow 2s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 头像内容 */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

export default GoldenWingsFrame;
