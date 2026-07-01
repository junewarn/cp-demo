import React from 'react';
import { Box, Typography } from '@mui/material';
import AchievementBadge from '../common/AchievementBadge';
import { CPBadge } from '../../types';
import { ACHIEVEMENTS_PER_ROW } from '../../utils/constants';

interface AchievementRowProps {
  badges: CPBadge[];
}

const AchievementRow: React.FC<AchievementRowProps> = ({ badges }) => {
  if (badges.length === 0) return null;

  return (
    <Box sx={{ px: 2, mt: 2, position: 'relative', zIndex: 1 }}>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.9)',
          mb: 1.5,
        }}
      >
        🏅 成就勋章
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${ACHIEVEMENTS_PER_ROW}, 1fr)`,
          gap: 1.5,
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        {badges.map((badge) => (
          <AchievementBadge
            key={badge.id}
            name={badge.name}
            icon={badge.iconUrl}
            unlockedAt=""
            description={badge.name}
          />
        ))}
      </Box>
      {badges.length < ACHIEVEMENTS_PER_ROW && (
        <Box
          sx={{
            mt: 1,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            继续升级以解锁更多勋章
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AchievementRow;
