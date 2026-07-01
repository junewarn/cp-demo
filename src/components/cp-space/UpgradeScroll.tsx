import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import UserAvatar from '../common/UserAvatar';
import { CPUpgradeRecord } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ANIMATION_DURATION } from '../../utils/constants';
import { formatDateCN } from '../../utils/helpers';

interface UpgradeScrollProps {
  user1Name: string;
  user1Avatar: string;
  user2Name: string;
  user2Avatar: string;
  records: CPUpgradeRecord[];
}

const UpgradeScroll: React.FC<UpgradeScrollProps> = ({
  user1Name,
  user1Avatar,
  user2Name,
  user2Avatar,
  records,
}) => {
  const { currentIndex } = useScrollAnimation({
    interval: ANIMATION_DURATION.upgradeScroll,
    totalItems: records.length,
    pageSize: 1,
    autoPlay: true,
  });

  if (records.length === 0) return null;

  const current = records[currentIndex];

  return (
    <Box sx={{ px: 2, mt: 2, position: 'relative', zIndex: 1 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', mb: 1.5 }}>
        🆙 升级记录
      </Typography>
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          p: 2,
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <UserAvatar src={user1Avatar} alt={user1Name} size={36} />
                <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                  {user1Name}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 12, color: '#FFD700', fontWeight: 700 }}>
                  ⬆️ Upgraded
                </Typography>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Level {current.toLevel}
                </Typography>
                <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                  {formatDateCN(current.date)}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <UserAvatar src={user2Avatar} alt={user2Name} size={36} />
                <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                  {user2Name}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default UpgradeScroll;
