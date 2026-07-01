import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { formatNumber, formatGold } from '../../utils/helpers';

interface GiftItemProps {
  giftIcon: string;
  giftName: string;
  value: number;
  fromName: string;
  date: string;
}

const GiftItem: React.FC<GiftItemProps> = ({
  giftIcon,
  giftName,
  value,
  fromName,
  date,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1.5,
          px: 2,
          bgcolor: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          mx: 1,
          my: 0.5,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box sx={{ fontSize: 28 }}>{giftIcon}</Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
            {fromName} 送出 {giftName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', mt: 0.25 }}>
            {date}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: '#FFD700',
            whiteSpace: 'nowrap',
          }}
        >
          💰{formatGold(value)}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default GiftItem;
