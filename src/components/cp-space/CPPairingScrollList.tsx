import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../hooks/useAppState';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { GIFT_SCROLL_PAGE_SIZE, ANIMATION_DURATION } from '../../utils/constants';
import { CPPairingMessage } from '../../types';

/** 单条CP结成消息卡片 */
const PairingMessageCard: React.FC<{ message: CPPairingMessage }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1.5,
          px: 2,
          bgcolor: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          mx: 1,
          my: 0.5,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box sx={{ fontSize: 28, flexShrink: 0 }}>💕</Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
            {message.user1Name} ❤️ {message.user2Name}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', mt: 0.25 }}>
            {message.date}
          </Typography>
        </Box>
        {message.cpLevel !== undefined && (
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: '#FFD700',
              whiteSpace: 'nowrap',
              bgcolor: 'rgba(255,215,0,0.12)',
              borderRadius: 1.5,
              px: 1.5,
              py: 0.25,
            }}
          >
            Lv.{message.cpLevel}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

const CPPairingScrollList: React.FC = () => {
  const { state } = useAppState();
  const { pairingMessages } = state;

  const { currentIndex } = useScrollAnimation({
    interval: ANIMATION_DURATION.giftScroll,
    totalItems: pairingMessages.length,
    pageSize: GIFT_SCROLL_PAGE_SIZE,
    autoPlay: true,
  });

  const visibleItems = useMemo(() => {
    if (pairingMessages.length === 0) return [];
    const items: CPPairingMessage[] = [];
    for (let i = 0; i < GIFT_SCROLL_PAGE_SIZE; i++) {
      const idx = (currentIndex + i) % pairingMessages.length;
      items.push(pairingMessages[idx]);
    }
    return items;
  }, [pairingMessages, currentIndex]);

  if (pairingMessages.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          暂无CP结成消息
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.08)',
        borderRadius: 3,
        mx: 2,
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box sx={{ position: 'relative', minHeight: 180 }}>
        <AnimatePresence mode="wait">
          <Box key={currentIndex}>
            {visibleItems.map((item) => (
              <PairingMessageCard key={item.id} message={item} />
            ))}
          </Box>
        </AnimatePresence>
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          py: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        实时滚动展示最新CP结成消息
      </Typography>
    </Box>
  );
};

export default CPPairingScrollList;
