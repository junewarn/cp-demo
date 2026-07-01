import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  name: string;
  icon: string;
  unlockedAt: string;
  description: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  name,
  icon,
  unlockedAt,
  description,
}) => {
  return (
    <Tooltip title={`${description}\n解锁于: ${unlockedAt}`} arrow placement="top">
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF5F5, #FFE0EC)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #F8BBD0',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(233, 30, 140, 0.15)',
            gap: 0,
          }}
        >
          <Typography sx={{ fontSize: 22, lineHeight: 1 }}>{icon}</Typography>
          <Typography
            sx={{
              fontSize: 8,
              color: '#AD1457',
              fontWeight: 600,
              lineHeight: 1,
              maxWidth: 48,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
        </Box>
      </motion.div>
    </Tooltip>
  );
};

export default AchievementBadge;
