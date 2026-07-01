import React from 'react';
import { Box, Typography } from '@mui/material';
import { getLevelBackground, isSpecialLevel } from '../../utils/helpers';
import { LEVEL_BADGE_EMOJIS } from '../../utils/constants';

interface LevelBadgeProps {
  level: number;
  mode?: 'basic' | 'number';
  size?: number;
  unlocked?: boolean;
  showPulse?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  mode = 'basic',
  size = 40,
  unlocked = true,
  showPulse = false,
}) => {
  const bg = getLevelBackground(level);
  const isSpecial = isSpecialLevel(level);
  const actualMode = isSpecial ? 'number' : mode === 'number' ? 'number' : 'basic';

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: unlocked ? bg : '#555',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: unlocked
          ? `0 2px 12px rgba(233, 30, 140, 0.35)`
          : 'none',
        opacity: unlocked ? 1 : 0.5,
        border: unlocked && isSpecial ? '2px solid rgba(255,255,255,0.5)' : 'none',
        position: 'relative',
      }}
    >
      {actualMode === 'number' ? (
        <Typography
          sx={{
            fontSize: size * 0.4,
            fontWeight: 800,
            color: unlocked ? '#fff' : '#999',
            textShadow: unlocked ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {level}
        </Typography>
      ) : (
        <Typography sx={{ fontSize: size * 0.45 }}>
          {LEVEL_BADGE_EMOJIS[level] || '❤️'}
        </Typography>
      )}

      {/* 脉冲环 */}
      {showPulse && (
        <Box
          sx={{
            position: 'absolute',
            inset: -3,
            borderRadius: '50%',
            border: '2px solid #FF6B9D',
            animation: 'heart-pulse 1.5s ease-in-out infinite',
          }}
        />
      )}

      {/* 特殊等级光环 */}
      {isSpecial && unlocked && !showPulse && (
        <Box
          sx={{
            position: 'absolute',
            inset: -3,
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.3)',
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}
        />
      )}
    </Box>
  );
};

export default LevelBadge;
