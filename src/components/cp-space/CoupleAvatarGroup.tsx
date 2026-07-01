import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import UserAvatar from '../common/UserAvatar';
import LevelBadge from '../common/LevelBadge';
import GoldenWingsFrame from '../common/GoldenWingsFrame';
import { User } from '../../types';
import { getBadgeMode } from '../../utils/helpers';

interface CoupleAvatarGroupProps {
  user1: User;
  user2: User;
  level: number;
  is7DayTaskComplete: boolean;
}

const CoupleAvatarGroup: React.FC<CoupleAvatarGroupProps> = ({
  user1,
  user2,
  level,
  is7DayTaskComplete,
}) => {
  const badgeMode = getBadgeMode(level);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        py: 3,
        position: 'relative',
      }}
    >
      {/* 左头像 */}
      <Box sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GoldenWingsFrame>
            <UserAvatar src={user1.avatar} alt={user1.name} size={72} frameType="cp" />
          </GoldenWingsFrame>
        </motion.div>
        <Typography
          sx={{ mt: 1, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}
        >
          {user1.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          Lv.{user1.level}
        </Typography>
      </Box>

      {/* 中间勋章区域 */}
      <Box
        sx={{
          mx: -1,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* 爱心连线 */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: -24,
            right: -24,
            height: 2,
            background:
              'linear-gradient(90deg, transparent, rgba(255,107,157,0.6), rgba(233,30,140,0.8), rgba(255,107,157,0.6), transparent)',
            zIndex: 0,
          }}
        />
        <motion.div
          animate={
            !is7DayTaskComplete
              ? { scale: [1, 1.2, 1] }
              : { scale: [1, 1.1, 1] }
          }
          transition={
            !is7DayTaskComplete
              ? { duration: 1.5, repeat: Infinity }
              : { duration: 2, repeat: Infinity }
          }
        >
          <LevelBadge
            level={level}
            mode={badgeMode}
            size={56}
            unlocked
            showPulse={!is7DayTaskComplete}
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: '#FFD700',
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            💕 Lv.{level}
          </Typography>
        </motion.div>
      </Box>

      {/* 右头像 */}
      <Box sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GoldenWingsFrame>
            <UserAvatar src={user2.avatar} alt={user2.name} size={72} frameType="cp" />
          </GoldenWingsFrame>
        </motion.div>
        <Typography
          sx={{ mt: 1, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}
        >
          {user2.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          Lv.{user2.level}
        </Typography>
      </Box>
    </Box>
  );
};

export default CoupleAvatarGroup;
