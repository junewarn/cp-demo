import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

const TOAST_DURATION_MS = 2500;

const Toast: React.FC<ToastProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onClose();
    }, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -10, x: '-50%' }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            top: 70,
            left: '50%',
            zIndex: 9999,
            px: 3,
            py: 1.2,
            borderRadius: 24,
            background:
              type === 'success'
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {type === 'success' ? '✅ ' : '❌ '}
            {message}
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default Toast;
