import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { CPRankingEntry } from '../../types';
import UserAvatar from '../common/UserAvatar';

interface RankingItemProps {
  entry: CPRankingEntry;
  index: number;
}

const getRankMedal = (rank: number): string => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

const RankingItem: React.FC<RankingItemProps> = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1.5,
          px: 2,
          bgcolor: entry.rank <= 3 ? 'rgba(255, 215, 0, 0.05)' : '#fff',
          borderRadius: 2,
          mb: 1,
          border: entry.rank <= 3 ? '1px solid rgba(255, 215, 0, 0.2)' : '1px solid #f5f5f5',
        }}
      >
        <Box sx={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
          <Typography
            sx={{
              fontSize: entry.rank <= 3 ? 20 : 14,
              fontWeight: entry.rank <= 3 ? 700 : 500,
              color: entry.rank <= 3 ? '#333' : '#999',
            }}
          >
            {getRankMedal(entry.rank)}
          </Typography>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <UserAvatar src={entry.userAvatar} alt={entry.userName} size={36} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
            {entry.userName}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', flexShrink: 0, width: 50 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#E91E8C' }}>
            {entry.completedDays}
          </Typography>
          <Typography sx={{ fontSize: 10, color: '#999' }}>天</Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default RankingItem;
