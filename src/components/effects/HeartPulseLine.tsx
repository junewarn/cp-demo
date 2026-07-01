import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface HeartPulseLineProps {
  color?: string;
}

const HeartPulseLine: React.FC<HeartPulseLineProps> = ({ color = '#FF6B9D' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        py: 1,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* 左侧线 */}
      <Box
        sx={{
          flex: 1,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color})`,
        }}
      />
      {/* 脉冲爱心 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Typography sx={{ fontSize: 24, color, filter: `drop-shadow(0 0 4px ${color})` }}>
          💗
        </Typography>
      </motion.div>
      {/* 右侧线 */}
      <Box
        sx={{
          flex: 1,
          height: 2,
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
      <Typography
        sx={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.5)',
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        未完成7日任务
      </Typography>
    </Box>
  );
};

export default HeartPulseLine;
