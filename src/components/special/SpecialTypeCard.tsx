import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import UserAvatar from '../common/UserAvatar';
import { SpecialRelationship, SpecialType } from '../../types';
import { SPECIAL_TYPE_CONFIG } from '../../utils/constants';

interface SpecialTypeCardProps {
  relationship: SpecialRelationship;
  onGift?: (rel: SpecialRelationship) => void;
  compact?: boolean;
}

const SpecialTypeCard: React.FC<SpecialTypeCardProps> = ({
  relationship,
  onGift,
  compact = false,
}) => {
  const config = SPECIAL_TYPE_CONFIG[relationship.type];
  const frameType = relationship.type as 'bestie' | 'soulmate' | 'homie';

  if (compact) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          p: 1,
          borderRadius: 2,
          bgcolor: config.bg,
          border: `1px solid ${config.border}`,
        }}
      >
        <UserAvatar
          src={relationship.partner.avatar}
          alt={relationship.partner.name}
          size={36}
          frameType={frameType}
        />
        <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#333', mt: 0.5 }}>
          {relationship.partner.name}
        </Typography>
        <Typography sx={{ fontSize: 9, color: config.color }}>
          {config.icon} {relationship.days}天
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
          border: `1px solid ${config.border}`,
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${config.bg}, ${config.bg}dd)`,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 28 }}>{config.icon}</Typography>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: config.color }}>
              {config.label}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#888' }}>
              Lv.{relationship.level} · {relationship.days}天
            </Typography>
          </Box>
        </Box>

        <Box sx={{ bgcolor: '#fff', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <UserAvatar
              src={relationship.partner.avatar}
              alt={relationship.partner.name}
              size={40}
              frameType={frameType}
            />
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                {relationship.partner.name}
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#999' }}>
                建立于 {relationship.establishedDate}
              </Typography>
            </Box>
          </Box>

          {onGift && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => onGift(relationship)}
                sx={{
                  borderRadius: 16,
                  px: 2,
                  fontSize: 12,
                  background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                  flex: 1,
                }}
              >
                🎁 送礼
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 16,
                  px: 2,
                  fontSize: 12,
                  borderColor: config.border,
                  color: config.color,
                }}
              >
                💬 聊天
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default SpecialTypeCard;
