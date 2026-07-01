import React from 'react';
import { Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface CrystalButtonProps {
  onClick: () => void;
  icon?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'glass' | 'gradient';
}

const CrystalButton: React.FC<CrystalButtonProps> = ({
  onClick,
  icon,
  children,
  size = 'medium',
  variant = 'glass',
}) => {
  const isSmall = size === 'small';

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
      <Button
        onClick={onClick}
        sx={{
          borderRadius: 24,
          px: isSmall ? 2 : 3,
          py: isSmall ? 0.75 : 1.25,
          fontSize: isSmall ? 12 : 14,
          fontWeight: 700,
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
          ...(variant === 'gradient' ? {
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            border: 'none',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(168,85,247,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #9333ea, #db2777)',
              boxShadow: '0 6px 20px rgba(168,85,247,0.5)',
            },
          } : {
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 16px rgba(255,255,255,0.15)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
            },
          }),
        }}
      >
        {icon && (
          <Box component="span" sx={{ fontSize: isSmall ? 16 : 18 }}>
            {icon}
          </Box>
        )}
        {children}
      </Button>
    </motion.div>
  );
};

export default CrystalButton;
