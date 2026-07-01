import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md';
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={maxWidth}
          fullWidth
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, y: 50, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 50, scale: 0.95 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: 3,
              overflow: 'hidden',
              mx: 2,
              bgcolor: '#fff',
            },
          }}
        >
          {title && (
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 1,
                fontWeight: 700,
                fontSize: 18,
                color: '#333',
                background: 'linear-gradient(135deg, #FFF5F9, #FFE0EC)',
              }}
            >
              {title}
              <IconButton onClick={onClose} size="small" sx={{ color: '#999' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
          )}
          <DialogContent sx={{ pt: title ? 0 : 2, pb: 3 }}>{children}</DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
