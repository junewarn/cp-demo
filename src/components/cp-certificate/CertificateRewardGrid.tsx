import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { CertificateReward } from '../../types';

interface CertificateRewardGridProps {
  rewards: CertificateReward[];
}

const CertificateRewardGrid: React.FC<CertificateRewardGridProps> = ({ rewards }) => {
  if (rewards.length === 0) return null;

  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#888', mb: 1 }}>
        🎁 等级奖励
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
        }}
      >
        {rewards.slice(0, 12).map((reward, idx) => (
          <motion.div
            key={`${reward.name}-${idx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 1,
                borderRadius: 2,
                bgcolor: '#fff',
                border: '1px solid #f0f0f0',
              }}
            >
              <Typography sx={{ fontSize: 20, mb: 0.25 }}>{reward.icon}</Typography>
              <Typography sx={{ fontSize: 8, fontWeight: 600, color: '#555' }}>
                {reward.name}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default CertificateRewardGrid;
