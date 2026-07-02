import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 70,
            left: 0,
            right: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1.5,
              py: 0.8,
              borderRadius: 30,
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb, #1e40af)',
              boxShadow: '0 4px 20px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 闪光装饰 */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                animation: 'shine 2s infinite',
                '@keyframes shine': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
              }}
            />

            {/* 用户头像组 */}
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Box
                component="img"
                src={user1Avatar}
                alt={user1Name}
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #fff',
                  zIndex: 1,
                }}
              />
              <Box
                component="img"
                src={user2Avatar}
                alt={user2Name}
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #fff',
                  ml: -1.2,
                  zIndex: 0,
                }}
              />
            </Box>

            {/* 文字 */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                zIndex: 1,
              }}
            >
              {user1Name} & {user2Name} entered room
            </Typography>

            {/* 等级徽章 */}
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                border: '2px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                zIndex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#1e3a8a',
                }}
              >
                Lv.{level}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceEffect;
