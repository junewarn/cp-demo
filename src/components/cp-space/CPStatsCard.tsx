import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { formatNumber } from '../../utils/helpers';

interface CPStatsCardProps {
  loveDays: number;
  cpLevel: number;
  intimacyScore: number;
  boundDate: string;
  onTerminate?: () => void;
}

const CPStatsCard: React.FC<CPStatsCardProps> = ({
  loveDays,
  cpLevel,
  intimacyScore,
  boundDate,
  onTerminate,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Box
        sx={{
          mx: 2,
          mt: 2,
          p: 2.5,
          borderRadius: 4,
          background: 'linear-gradient(180deg, #fff0f5 0%, #ffe4ec 50%, #fff8fb 100%)',
          border: '2px solid #f9d5c0',
          boxShadow: '0 8px 28px rgba(255,107,157,0.18), inset 0 0 20px rgba(255,255,255,0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 四角装饰 */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, fontSize: 14, opacity: 0.6 }}>
          🌹
        </Box>
        <Box sx={{ position: 'absolute', top: 8, right: 8, fontSize: 14, opacity: 0.6 }}>
          🌹
        </Box>
        <Box sx={{ position: 'absolute', bottom: 8, left: 8, fontSize: 14, opacity: 0.6 }}>
          🌹
        </Box>
        <Box sx={{ position: 'absolute', bottom: 8, right: 8, fontSize: 14, opacity: 0.6 }}>
          🌹
        </Box>

        {/* 顶部标题 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#e91e8c',
            }}
          >
            Love Days
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#e91e8c',
            }}
          >
            Intimacy
          </Typography>
        </Box>

        {/* 两列内容 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Love Days 列 */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                background: 'radial-gradient(circle at 30% 30%, #ffb6c1, #ff69b4)',
                boxShadow: '0 4px 14px rgba(255,105,180,0.35), inset 0 -2px 8px rgba(255,255,255,0.4)',
                position: 'relative',
              }}
            >
              💖
              <Typography
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {loveDays}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 11, color: '#888', mt: 0.8 }}>
              Since {boundDate}
            </Typography>
          </Box>

          {/* 分隔线 */}
          <Box
            sx={{
              width: '1px',
              height: 80,
              bgcolor: 'rgba(233,30,140,0.15)',
              mx: 2,
            }}
          />

          {/* Intimacy 列 */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                background: 'radial-gradient(circle at 30% 30%, #ffb6c1, #ff69b4)',
                boxShadow: '0 4px 14px rgba(255,105,180,0.35), inset 0 -2px 8px rgba(255,255,255,0.4)',
                position: 'relative',
              }}
            >
              💖
              <Typography
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                Lv{cpLevel}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 11, color: '#888', mt: 0.8 }}>
              Intimacy level {formatNumber(intimacyScore)}
            </Typography>
          </Box>
        </Box>

        {/* 底部解除按钮 */}
        {onTerminate && (
          <Box sx={{ textAlign: 'center', mt: 1.5 }}>
            <Typography
              onClick={onTerminate}
              sx={{
                fontSize: 12,
                color: '#999',
                cursor: 'pointer',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(153,153,153,0.4)',
                '&:hover': { color: '#e91e8c' },
              }}
            >
              Terminate the CP relationship
            </Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default CPStatsCard;
