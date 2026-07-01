import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ModalWrapper from '../common/ModalWrapper';
import UserAvatar from '../common/UserAvatar';
import { SpecialRelationship } from '../../types';
import { SPECIAL_TYPE_CONFIG } from '../../utils/constants';

interface SpecialGiftModalProps {
  open: boolean;
  relationship: SpecialRelationship | null;
  onClose: () => void;
}

const GIFT_OPTIONS = [
  { icon: '🌹', name: '玫瑰花', price: 99 },
  { icon: '💐', name: '花束', price: 299 },
  { icon: '🎂', name: '蛋糕', price: 520 },
  { icon: '💎', name: '钻石', price: 1314 },
  { icon: '👑', name: '皇冠', price: 5200 },
  { icon: '🌟', name: '星辰', price: 9999 },
];

const SpecialGiftModal: React.FC<SpecialGiftModalProps> = ({
  open,
  relationship,
  onClose,
}) => {
  if (!relationship) return null;
  const config = SPECIAL_TYPE_CONFIG[relationship.type];

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={`🎁 送礼物给 ${relationship.partner.name}`}
    >
      <Box>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <UserAvatar
            src={relationship.partner.avatar}
            alt={relationship.partner.name}
            size={64}
            frameType={relationship.type as 'bestie' | 'soulmate' | 'homie'}
          />
          <Typography sx={{ mt: 1, fontSize: 14, fontWeight: 600, color: '#333' }}>
            {relationship.partner.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: config.color }}>
            {config.icon} {config.label} · Lv.{relationship.level}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
          {GIFT_OPTIONS.map((gift) => (
            <Box
              key={gift.name}
              sx={{
                textAlign: 'center',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { borderColor: config.color, bgcolor: config.bg },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <Typography sx={{ fontSize: 28, mb: 0.5 }}>{gift.icon}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#333' }}>
                {gift.name}
              </Typography>
              <Typography sx={{ fontSize: 11, color: config.color, fontWeight: 600 }}>
                💰{gift.price}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            borderRadius: 24,
            py: 1,
            background: `linear-gradient(135deg, ${config.color}, ${config.color}dd)`,
            fontWeight: 600,
          }}
        >
          确认赠送
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default SpecialGiftModal;
