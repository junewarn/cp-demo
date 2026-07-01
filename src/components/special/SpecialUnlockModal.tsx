import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ModalWrapper from '../common/ModalWrapper';
import { formatGold } from '../../utils/helpers';

interface SpecialUnlockModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cost: number;
  currentGold: number;
}

const SpecialUnlockModal: React.FC<SpecialUnlockModalProps> = ({
  open,
  onClose,
  onConfirm,
  cost,
  currentGold,
}) => {
  const canAfford = currentGold >= cost;

  return (
    <ModalWrapper open={open} onClose={onClose} title="🔓 解锁关系位">
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: 48, mb: 2 }}>🔓</Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#333', mb: 1 }}>
          确认解锁额外关系位？
        </Typography>
        <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>
          解锁后将增加1个该类型的关系位
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: canAfford ? '#FFF8E1' : '#FFEBEE',
            borderRadius: 2,
            px: 2,
            py: 1,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: 24 }}>💰</Typography>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 800,
              color: canAfford ? '#F57F17' : '#C62828',
            }}
          >
            {formatGold(cost)}
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#888' }}>
            / {formatGold(currentGold)}
          </Typography>
        </Box>

        {!canAfford && (
          <Typography sx={{ fontSize: 12, color: '#EF5350', mb: 2 }}>
            金币不足，无法解锁
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{ borderRadius: 24, borderColor: '#ddd', color: '#666' }}
          >
            取消
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            disabled={!canAfford}
            sx={{
              borderRadius: 24,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFD700, #FFA000)',
              color: '#333',
            }}
          >
            确认解锁
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default SpecialUnlockModal;
