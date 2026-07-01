import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { CPPrivilege } from '../../types';
import { getLevelBackground, isSpecialLevel } from '../../utils/helpers';
import LevelBadge from '../common/LevelBadge';

interface PrivilegeCardProps {
  privilege: CPPrivilege;
  currentLevel: number;
}

const PrivilegeCard: React.FC<PrivilegeCardProps> = ({ privilege, currentLevel }) => {
  const isUnlocked = privilege.level <= currentLevel;
  const isSpecial = isSpecialLevel(privilege.level);
  const bg = isSpecial ? getLevelBackground(privilege.level) : 'linear-gradient(135deg, #FFB6C1, #FFC0CB)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: isUnlocked
            ? '0 4px 15px rgba(233, 30, 140, 0.12)'
            : '0 1px 3px rgba(0,0,0,0.05)',
          opacity: isUnlocked ? 1 : 0.65,
          border: '1px solid #f0f0f0',
        }}
      >
        {/* 等级头部 */}
        <Box
          sx={{
            background: bg,
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <LevelBadge
            level={privilege.level}
            mode={isSpecial ? 'number' : 'basic'}
            size={36}
            unlocked={isUnlocked}
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: isSpecial ? '#fff' : '#333' }}>
              Lv.{privilege.level} {privilege.title}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: isSpecial ? 'rgba(255,255,255,0.8)' : '#888',
              }}
            >
              {privilege.backgroundClass}
            </Typography>
          </Box>
          <Chip
            label={isUnlocked ? '已解锁' : '未解锁'}
            size="small"
            sx={{
              bgcolor: isUnlocked ? 'rgba(76, 175, 80, 0.9)' : 'rgba(0,0,0,0.15)',
              color: isUnlocked ? '#fff' : '#666',
              fontSize: 10,
              fontWeight: 600,
              height: 22,
            }}
          />
        </Box>

        {/* 特权项列表 */}
        <Box sx={{ bgcolor: '#fff', p: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {privilege.items.map((item) => (
              <Box
                key={item.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 0.5,
                }}
              >
                <Typography sx={{ fontSize: 18, opacity: item.unlocked ? 1 : 0.4 }}>
                  {item.icon}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: item.unlocked ? '#333' : '#bbb',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: '#999' }}>
                    {item.description}
                  </Typography>
                </Box>
                {!item.unlocked && (
                  <Typography sx={{ fontSize: 16, opacity: 0.3 }}>🔒</Typography>
                )}
                {item.unlocked && (
                  <Typography sx={{ fontSize: 14 }}>✅</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PrivilegeCard;
