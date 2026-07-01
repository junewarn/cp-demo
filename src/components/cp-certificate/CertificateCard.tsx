import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import GoldenWingsFrame from '../common/GoldenWingsFrame';
import UserAvatar from '../common/UserAvatar';
import { CPCertificate } from '../../types';

interface CertificateCardProps {
  certificate: CPCertificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const { level, romanNumeral, colorTheme } = certificate;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${colorTheme}20, ${colorTheme}40, ${colorTheme}20)`,
          border: `2px solid ${colorTheme}60`,
          boxShadow: `0 4px 20px ${colorTheme}30`,
          position: 'relative',
        }}
      >
        {/* 顶部装饰 */}
        <Box sx={{ textAlign: 'center', pt: 3, pb: 1, position: 'relative' }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Typography sx={{ fontSize: 40, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
              👑
            </Typography>
          </motion.div>

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 900,
              color: colorTheme,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontFamily: 'serif',
            }}
          >
            {romanNumeral}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#666',
              mt: 0.5,
            }}
          >
            Level {level} · CP Certificate
          </Typography>
        </Box>

        {/* 双人虚拟头像 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            mt: 2,
            mb: 2,
          }}
        >
          <GoldenWingsFrame size={48}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB6C1, #FF69B4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 20 }}>💕</Typography>
            </Box>
          </GoldenWingsFrame>
          <Box sx={{ mx: -1 }} />
          <GoldenWingsFrame size={48}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #87CEEB, #4169E1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 20 }}>💕</Typography>
            </Box>
          </GoldenWingsFrame>
        </Box>

        <Box sx={{ textAlign: 'center', pb: 2 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: colorTheme,
              fontStyle: 'italic',
            }}
          >
            Forever & Always
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CertificateCard;
