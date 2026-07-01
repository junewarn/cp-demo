import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import UserAvatar from './UserAvatar';
import LevelBadge from './LevelBadge';
import SweepLight from '../effects/SweepLight';
import GlowDot from '../effects/GlowDot';
import { User, CPRelationship } from '../../types';
import { getLevelName } from '../../utils/helpers';

interface ProfileCardProps {
  user: User;
  cpRelationship: CPRelationship | null;
  isOwner?: boolean;
  showSweep?: boolean;
}

const CP_RELATION_CARD_COLORS = {
  bestie: { bg: '#E3F2FD', border: '#90CAF9', color: '#4D96FF', icon: '👯‍♀️', label: 'Bestie' },
  soulmate: { bg: '#F3E5F5', border: '#CE93D8', color: '#9B59B6', icon: '💫', label: 'Soulmate' },
  homie: { bg: '#FFF3E0', border: '#FFCC80', color: '#FF8C00', icon: '🤝', label: 'Homie' },
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  cpRelationship,
  isOwner = true,
  showSweep = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #FFF5F9 0%, #FFE0EC 50%, #FFF0F5 100%)',
          border: '1px solid #F8BBD0',
          p: 3,
          boxShadow: '0 4px 20px rgba(233, 30, 140, 0.1)',
        }}
      >
        {showSweep && <SweepLight />}
        <GlowDot top="10%" left="20%" delay={0} />
        <GlowDot top="30%" left="80%" delay={0.5} />
        <GlowDot top="70%" left="15%" delay={1} />
        <GlowDot top="60%" left="85%" delay={1.5} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <UserAvatar
              src={user.avatar}
              alt={user.name}
              size={72}
              frameType="cp"
              showOnline={isOwner}
              online
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#333' }}>
                  {user.name}
                </Typography>
                {user.level >= 9 && <Typography sx={{ fontSize: 14 }}>👑</Typography>}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <LevelBadge level={user.level} size={28} />
                <Typography sx={{ fontSize: 12, color: '#888' }}>
                  {getLevelName(user.level)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 11, color: '#FFD700', mt: 0.25, fontWeight: 600 }}>
                💰 {user.gold.toLocaleString()} 金币
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: 13, color: '#666', mb: 1.5, lineHeight: 1.6 }}>
            {user.signature}
          </Typography>

          {/* CP 关系卡 */}
          {cpRelationship && (
            <Box
              sx={{
                mt: 1.5,
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #FFF5F9, #FFE0EC)',
                border: '1px solid #F8BBD0',
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#E91E8C',
                  mb: 0.5,
                }}
              >
                💕 CP 关系
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <UserAvatar
                  src={cpRelationship.partner.avatar}
                  alt={cpRelationship.partner.name}
                  size={36}
                  frameType="cp"
                />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                    {cpRelationship.partner.name}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: '#999' }}>
                    Lv.{cpRelationship.cpLevel} · {cpRelationship.loveDays} 天 · 绑定于 {cpRelationship.boundDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProfileCard;
