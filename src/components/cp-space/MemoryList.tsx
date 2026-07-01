import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { CPMemory } from '../../types';
import { formatDateCN } from '../../utils/helpers';
import { MEMORIES_PER_ROW } from '../../utils/constants';

interface MemoryListProps {
  memories: CPMemory[];
}

const MemoryList: React.FC<MemoryListProps> = ({ memories }) => {
  const sorted = [...memories].sort((a, b) => b.gift.value - a.gift.value);

  if (sorted.length === 0) return null;

  return (
    <Box sx={{ px: 2, mt: 2, position: 'relative', zIndex: 1 }}>
      <Typography
        sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', mb: 1.5 }}
      >
        💌 CP记忆
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MEMORIES_PER_ROW}, 1fr)`,
          gap: 1,
        }}
      >
        {sorted.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                p: 1,
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(4px)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Typography sx={{ fontSize: 28, mb: 0.5 }}>{mem.gift.giftIcon}</Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#fff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {mem.gift.giftName}
              </Typography>
              <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', mt: 0.25 }}>
                {formatDateCN(mem.date)}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#FFD700',
                  mt: 0.25,
                }}
              >
                x{mem.gift.value >= 1000 ? `${(mem.gift.value / 1000).toFixed(1)}K` : mem.gift.value}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default MemoryList;
