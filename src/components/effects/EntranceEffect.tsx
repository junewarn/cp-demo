import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from '../common/UserAvatar';
import LevelBadge from '../common/LevelBadge';

interface EntranceEffectProps {
  user1Name: string;
  user1Avatar: string;
  user2Name: string;
  user2Avatar: string;
  level: number;
  trigger?: boolean;
  onComplete?: () => void;
}

const EntranceEffect: React.FC<EntranceEffectProps> = ({
  user1Name,
  user1Avatar,
  user2Name,
  user2Avatar,
  level,
  trigger = false,
  onComplete,
}) => {
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={() => {
            setShow(false);
            onComplete?.();
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mb: 3 }}>
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              >
                <UserAvatar src={user1Avatar} alt={user1Name} size={80} frameType="cp" />
                <Typography sx={{ mt: 1, color: '#fff', fontSize: 14, fontWeight: 600 }}>
                  {user1Name}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Typography sx={{ fontSize: 40 }}>💕</Typography>
              </motion.div>

              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              >
                <UserAvatar src={user2Avatar} alt={user2Name} size={80} frameType="cp" />
                <Typography sx={{ mt: 1, color: '#fff', fontSize: 14, fontWeight: 600 }}>
                  {user2Name}
                </Typography>
              </motion.div>
            </Box>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LevelBadge level={level} size={40} mode="number" />
                <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
                  Level {level} CP
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceEffect;
