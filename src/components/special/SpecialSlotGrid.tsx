import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { SpecialRelationship, SpecialType } from '../../types';
import {
  SPECIAL_MAX_SLOTS,
  SPECIAL_TYPE_CONFIG,
} from '../../utils/constants';

interface SpecialSlotGridProps {
  relationships: SpecialRelationship[];
  unlockedSlots: number;
  gold: number;
  onAdd: () => void;
  onUnlock: () => void;
  onRemove: (id: string) => void;
}

const UNLOCK_COST = 36000;

/** 单个已绑定卡片 */
const FilledSlot: React.FC<{
  rel: SpecialRelationship;
  onRemove: (id: string) => void;
  index: number;
}> = ({ rel, onRemove, index }) => {
  const config = SPECIAL_TYPE_CONFIG[rel.type];

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' }}
      sx={{
        aspectRatio: '0.75',
        borderRadius: 2,
        border: `2px solid ${config.border}`,
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'default',
        overflow: 'hidden',
        '&:hover .slot-remove-btn': {
          opacity: 1,
          transform: 'scale(1)',
        },
      }}
    >
      {/* 删除按钮 */}
      <Box
        className="slot-remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(rel.id);
        }}
        sx={{
          position: 'absolute',
          top: 6,
          right: 6,
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: 'rgba(239,68,68,0.15)',
          color: '#ef4444',
          fontSize: 12,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0,
          transform: 'scale(0.7)',
          transition: 'all 0.2s',
          zIndex: 2,
          '&:hover': { bgcolor: 'rgba(239,68,68,0.3)' },
        }}
      >
        ✕
      </Box>

      {/* 头像 */}
      <Box
        component="img"
        src={rel.partner.avatar}
        alt={rel.partner.name}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          objectFit: 'cover',
          border: `2px solid ${config.color}`,
          mb: 0.8,
        }}
      />

      {/* 昵称 */}
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: '#333',
          textAlign: 'center',
          mb: 0.4,
          maxWidth: '90%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {rel.partner.name}
      </Typography>

      {/* 关系类型标签 */}
      <Box
        sx={{
          px: 1.2,
          py: 0.3,
          borderRadius: 10,
          bgcolor: config.bg,
          color: config.color,
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        {config.label}
      </Box>
    </Box>
  );
};

/** 空位卡片（已解锁但未绑定） */
const EmptySlot: React.FC<{ onAdd: () => void; index: number }> = ({
  onAdd,
  index,
}) => (
  <Box
    component={motion.div}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' }}
    onClick={onAdd}
    sx={{
      aspectRatio: '0.75',
      borderRadius: 2,
      border: '2px dashed #d0d0d0',
      bgcolor: 'rgba(0,0,0,0.01)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.25s',
      '&:hover': {
        borderColor: '#a855f7',
        bgcolor: 'rgba(168,85,247,0.05)',
        transform: 'translateY(-2px)',
      },
    }}
  >
    <Typography sx={{ fontSize: 28, color: '#bbb', mb: 0.3, lineHeight: 1 }}>
      +
    </Typography>
    <Typography sx={{ fontSize: 11, color: '#aaa', textAlign: 'center' }}>
      添加 Special
    </Typography>
  </Box>
);

/** 锁定位卡片 */
const LockedSlot: React.FC<{
  onUnlock: () => void;
  gold: number;
  index: number;
}> = ({ onUnlock, gold, index }) => (
  <Box
    component={motion.div}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' }}
    onClick={onUnlock}
    sx={{
      aspectRatio: '0.75',
      borderRadius: 2,
      border: '2px dashed #e0e0e0',
      bgcolor: 'rgba(0,0,0,0.02)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      opacity: 0.55,
      transition: 'all 0.25s',
      '&:hover': {
        opacity: 0.75,
        borderColor: '#a855f7',
        bgcolor: 'rgba(168,85,247,0.04)',
      },
    }}
  >
    <Typography sx={{ fontSize: 22, mb: 0.3, lineHeight: 1 }}>🔒</Typography>
    <Typography
      sx={{
        fontSize: 10,
        color: '#f59e0b',
        fontWeight: 600,
        mb: 0.2,
      }}
    >
      🪙 {UNLOCK_COST.toLocaleString()}
    </Typography>
    <Typography sx={{ fontSize: 10, color: '#bbb' }}>解锁位置</Typography>
  </Box>
);

/** 进度条 */
const SlotProgress: React.FC<{ unlockedSlots: number }> = ({
  unlockedSlots,
}) => (
  <Box sx={{ px: 2, pb: 1.5 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0.8,
      }}
    >
      <Typography sx={{ fontSize: 12, color: '#888' }}>
        已解锁位置
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: '#a855f7',
        }}
      >
        {unlockedSlots} / {SPECIAL_MAX_SLOTS}
      </Typography>
    </Box>
    <Box
      sx={{
        height: 6,
        bgcolor: '#e5e7eb',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${(unlockedSlots / SPECIAL_MAX_SLOTS) * 100}%`,
          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
          borderRadius: 3,
          transition: 'width 0.4s ease',
        }}
      />
    </Box>
  </Box>
);

const SpecialSlotGrid: React.FC<SpecialSlotGridProps> = ({
  relationships,
  unlockedSlots,
  gold,
  onAdd,
  onUnlock,
  onRemove,
}) => {
  const filledCount = relationships.length;
  const emptyCount = Math.max(0, unlockedSlots - filledCount);
  const remainingLocked = SPECIAL_MAX_SLOTS - unlockedSlots;

  // 计算显示多少个锁定位
  let lockedToShow = 0;
  if (filledCount >= unlockedSlots && unlockedSlots < SPECIAL_MAX_SLOTS) {
    lockedToShow = Math.min(3, remainingLocked);
  } else if (filledCount < unlockedSlots && unlockedSlots < SPECIAL_MAX_SLOTS) {
    lockedToShow = Math.min(2, remainingLocked);
  }

  let animationIndex = 0;

  return (
    <Box sx={{ px: 0 }}>
      {/* 进度条 */}
      <SlotProgress unlockedSlots={unlockedSlots} />

      {/* 统一 3 列网格 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.2,
          px: 2,
        }}
      >
        {/* 已绑定 */}
        {relationships.map((rel) => {
          const idx = animationIndex++;
          return (
            <FilledSlot
              key={rel.id}
              rel={rel}
              onRemove={onRemove}
              index={idx}
            />
          );
        })}

        {/* 空位 */}
        {Array.from({ length: emptyCount }).map((_, i) => {
          const idx = animationIndex++;
          return (
            <EmptySlot key={`empty-${i}`} onAdd={onAdd} index={idx} />
          );
        })}

      </Box>

      {unlockedSlots < SPECIAL_MAX_SLOTS && (
        <Box sx={{ px: 2, mt: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.2 }}>
            <LockedSlot onUnlock={onUnlock} gold={gold} index={0} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SpecialSlotGrid;
