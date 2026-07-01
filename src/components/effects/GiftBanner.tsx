import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../../utils/helpers';

interface GiftBannerProps {
  visible: boolean;
  giftCount: number;
}

const GiftBanner: React.FC<GiftBannerProps> = ({ visible, giftCount }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B6B)',
              borderRadius: 2,
              p: 1.5,
              mx: 1,
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 闪光粒子 */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                animation: 'shimmer 2s linear infinite',
                backgroundSize: '200% 100%',
              }}
            />
            <Typography sx={{ fontSize: 20, position: 'relative', zIndex: 1 }}>🎁</Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              已收到 {formatNumber(giftCount)} 金币礼物
            </Typography>
            <Typography sx={{ fontSize: 14, position: 'relative', zIndex: 1 }}>✨</Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftBanner;
