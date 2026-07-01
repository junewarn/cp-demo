import React from 'react';
import { Box, Typography } from '@mui/material';
import RankingItem from './RankingItem';
import { CPRankingEntry } from '../../types';

interface RankingListProps {
  entries: CPRankingEntry[];
}

const RankingList: React.FC<RankingListProps> = ({ entries }) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          gap: 1.5,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Box sx={{ width: 40, flexShrink: 0 }}>
          <Typography sx={{ fontSize: 11, color: '#999', textAlign: 'center' }}>排名</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 11, color: '#999' }}>CP</Typography>
        </Box>
        <Box sx={{ width: 50, flexShrink: 0 }}>
          <Typography sx={{ fontSize: 11, color: '#999', textAlign: 'center' }}>打卡天数</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1, mt: 1 }}>
        {entries.map((entry, idx) => (
          <RankingItem key={entry.userId} entry={entry} index={idx} />
        ))}
      </Box>
    </Box>
  );
};

export default RankingList;
