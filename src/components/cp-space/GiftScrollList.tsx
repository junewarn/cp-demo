import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GiftItem from '../common/GiftItem';
import { useAppState } from '../../hooks/useAppState';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { GIFT_SCROLL_PAGE_SIZE, ANIMATION_DURATION } from '../../utils/constants';
import { GiftRecord } from '../../types';

interface GiftScrollListProps {
  useCPRecords?: boolean;
}

const GiftScrollList: React.FC<GiftScrollListProps> = ({ useCPRecords = false }) => {
  const { state } = useAppState();
  const { giftRecords } = state;
  const cpGiftRecords = state.cpRelationship?.giftRecords ?? [];

  const sourceRecords: GiftRecord[] = useCPRecords ? cpGiftRecords : giftRecords;

  const { currentIndex } = useScrollAnimation({
    interval: ANIMATION_DURATION.giftScroll,
    totalItems: sourceRecords.length,
    pageSize: GIFT_SCROLL_PAGE_SIZE,
    autoPlay: true,
  });

  const visibleItems = useMemo(() => {
    if (sourceRecords.length === 0) return [];
    const items: GiftRecord[] = [];
    for (let i = 0; i < GIFT_SCROLL_PAGE_SIZE; i++) {
      const idx = (currentIndex + i) % sourceRecords.length;
      items.push(sourceRecords[idx]);
    }
    return items;
  }, [sourceRecords, currentIndex]);

  if (sourceRecords.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          暂无礼物记录
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
              <GiftItem
                key={item.id}
                giftIcon={item.giftIcon}
                giftName={item.giftName}
                value={item.value}
                fromName={state.currentUser.id === item.senderId ? state.currentUser.name : (state.cpRelationship?.partner?.name ?? '神秘人')}
                date={item.date}
              />
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
        滚动展示最新礼物赠送记录
      </Typography>
    </Box>
  );
};

export default GiftScrollList;
