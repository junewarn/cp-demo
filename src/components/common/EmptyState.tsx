import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'cp-unbound';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '💔',
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}) => {
  const bg = variant === 'cp-unbound'
    ? 'rgba(255,255,255,0.05)'
    : 'transparent';
  const textColor = variant === 'cp-unbound'
    ? 'rgba(255,255,255,0.7)'
    : '#555';
  const descColor = variant === 'cp-unbound'
    ? 'rgba(255,255,255,0.4)'
    : '#999';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 3,
          textAlign: 'center',
          bgcolor: bg,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Typography sx={{ fontSize: 64, mb: 2 }}>{icon}</Typography>
        </motion.div>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: textColor, mb: 1 }}>
          {title}
        </Typography>
        {description && (
          <Typography sx={{ fontSize: 13, color: descColor, mb: 3, maxWidth: 240 }}>
            {description}
          </Typography>
        )}
        {actionLabel && onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            sx={{
              borderRadius: 24,
              px: 3,
              background: 'linear-gradient(135deg, #E91E8C, #FF6B9D)',
              '&:hover': {
                background: 'linear-gradient(135deg, #C2185B, #E91E8C)',
              },
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </motion.div>
  );
};

export default EmptyState;
