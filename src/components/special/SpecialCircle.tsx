import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { SpecialRelationship } from '../../types';
import { SPECIAL_MAX_SLOTS } from '../../utils/constants';

interface SpecialCircleProps {
  relationships: SpecialRelationship[];
  unlockedSlots: number;
  gold: number;
  currentUserAvatar: string;
  currentUserName: string;
  onAdd: () => void;
  onUnlock: () => void;
  onRemove: (id: string) => void;
  onProfileClick?: () => void;
}

const UNLOCK_COST = 3600;
const CIRCLE_SIZE = 320; // 容器尺寸
const CENTER = CIRCLE_SIZE / 2;
const RADIUS = 118; // 轨道半径

/** 计算槽位角度：初始 4 个时为上/右/下/左 */
function calculateAngles(totalSlots: number): number[] {
  if (totalSlots <= 4) {
    // 上、右、下、左 (-90°, 0°, 90°, 180°)
    return [-90, 0, 90, 180].slice(0, totalSlots);
  }
  // 5 个及以上：均匀分布，从顶部开始
  const angles: number[] = [];
  const step = 360 / totalSlots;
  for (let i = 0; i < totalSlots; i++) {
    angles.push(-90 + i * step);
  }
  return angles;
}

/** 已绑定的槽位 */
const FilledCircleSlot: React.FC<{
  rel: SpecialRelationship;
  onRemove: (id: string) => void;
}> = ({ rel, onRemove }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ position: 'absolute' }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '2px solid #a78bfa',
          cursor: 'pointer',
          overflow: 'visible',
          position: 'relative',
          boxShadow: '0 0 16px rgba(167,139,250,0.35)',
        }}
      >
        <Box
          component="img"
          src={rel.partner.avatar}
          alt={rel.partner.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        {/* 常驻删除按钮 */}
        <Box
          onClick={(e) => {
            e.stopPropagation();
            onRemove(rel.id);
          }}
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: '50%',
            bgcolor: '#ef4444',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 800,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            border: '1.5px solid #fff',
            zIndex: 2,
          }}
        >
          ✕
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: 10,
          color: '#7c3aed',
          fontWeight: 700,
          textAlign: 'center',
          mt: 0.4,
          maxWidth: 64,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {rel.partner.name}
      </Typography>
    </motion.div>
  );
};

/** 空槽位 */
const EmptyCircleSlot: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    style={{ position: 'absolute' }}
  >
    <Box
      onClick={onAdd}
      sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: '2px dashed rgba(147,51,234,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        bgcolor: 'rgba(147,51,234,0.06)',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: '#a855f7',
          bgcolor: 'rgba(147,51,234,0.14)',
          transform: 'scale(1.08)',
        },
      }}
    >
      <Typography sx={{ fontSize: 24, color: '#a78bfa', lineHeight: 1, fontWeight: 300 }}>
        +
      </Typography>
    </Box>
  </motion.div>
);

/** 锁定位 */
const LockedCircleSlot: React.FC<{
  onUnlock: () => void;
}> = ({ onUnlock }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    style={{ position: 'absolute' }}
  >
    <Box
      onClick={onUnlock}
      sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: '2px dashed rgba(100,100,120,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        bgcolor: 'rgba(100,100,120,0.06)',
        opacity: 0.7,
        transition: 'all 0.2s',
        '&:hover': { opacity: 1, borderColor: '#a78bfa' },
      }}
    >
      <Typography sx={{ fontSize: 18, lineHeight: 1 }}>🔒</Typography>
    </Box>
    <Typography
      sx={{
        fontSize: 9,
        color: '#f59e0b',
        fontWeight: 600,
        textAlign: 'center',
        mt: 0.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.3,
      }}
    >
      Tap <Typography component="span" sx={{ fontSize: 9 }}>🪙</Typography> {UNLOCK_COST.toLocaleString()}
    </Typography>
  </motion.div>
);

const SpecialCircle: React.FC<SpecialCircleProps> = ({
  relationships,
  unlockedSlots,
  gold,
  currentUserAvatar,
  currentUserName,
  onAdd,
  onUnlock,
  onRemove,
  onProfileClick,
}) => {
  const filledCount = relationships.length;
  const emptyCount = Math.max(0, unlockedSlots - filledCount);
  const showLocked = unlockedSlots < SPECIAL_MAX_SLOTS;
  const totalSlots = filledCount + emptyCount + (showLocked ? 1 : 0);
  const displayTotal = Math.max(4, totalSlots);
  const angles = calculateAngles(displayTotal);

  // 构建槽位列表
  const slots: Array<
    | { type: 'filled'; rel: SpecialRelationship }
    | { type: 'empty' }
    | { type: 'locked' }
  > = [
    ...relationships.map((rel) => ({ type: 'filled' as const, rel })),
    ...Array.from({ length: emptyCount }, () => ({ type: 'empty' as const })),
  ];

  if (showLocked && slots.length < displayTotal) {
    slots.push({ type: 'locked' });
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        mx: 'auto',
        my: 2,
      }}
    >
      {/* 外圈轨道线 */}
      <Box
        sx={{
          position: 'absolute',
          top: CENTER - RADIUS,
          left: CENTER - RADIUS,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: '50%',
          border: '1px dashed rgba(147,51,234,0.2)',
        }}
      />

      {/* 槽位 */}
      {slots.map((slot, i) => {
        const angleDeg = angles[i] ?? 0;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = CENTER + RADIUS * Math.cos(angleRad) - 28; // 28 = slot width / 2
        const y = CENTER + RADIUS * Math.sin(angleRad) - 28;

        return (
          <Box
            key={
              slot.type === 'filled'
                ? slot.rel.id
                : slot.type === 'empty'
                ? `empty-${i}`
                : 'locked-slot'
            }
            sx={{ position: 'absolute', left: x, top: y }}
          >
            {slot.type === 'filled' && (
              <FilledCircleSlot rel={slot.rel} onRemove={onRemove} />
            )}
            {slot.type === 'empty' && <EmptyCircleSlot onAdd={onAdd} />}
            {slot.type === 'locked' && <LockedCircleSlot onUnlock={onUnlock} />}
          </Box>
        );
      })}

      {/* 中心用户头像 */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: CENTER - 56,
          top: CENTER - 56,
        }}
      >
        <Box
          onClick={onProfileClick}
          sx={{ textAlign: 'center', cursor: 'pointer' }}
        >
          {/* 光环效果 */}
          <Box
            sx={{
              position: 'relative',
              width: 112,
              height: 112,
              mx: 'auto',
            }}
          >
            {/* 外圈光晕 */}
            <Box
              sx={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, #4D96FF, #9B59B6, #FF6B9D, #4D96FF)',
                filter: 'blur(6px)',
                opacity: 0.4,
                animation: 'number-badge-rotate 6s linear infinite',
              }}
            />
            {/* 中层圆环 */}
            <Box
              sx={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '3px solid transparent',
                borderImage:
                  'linear-gradient(135deg, #4D96FF, #9B59B6, #FF6B9D) 1',
              }}
            />
            {/* 头像 */}
            <Box
              component="img"
              src={currentUserAvatar}
              alt={currentUserName}
              sx={{
                width: 112,
                height: 112,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fff',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 20px rgba(147,51,234,0.3)',
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7c3aed, #4D96FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mt: 1,
              textAlign: 'center',
            }}
          >
            {currentUserName}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default SpecialCircle;
