import React from 'react';
import { Box, Typography } from '@mui/material';

interface CheckInReward {
  id: string;
  days: number; // 3 / 5 / 7
  label: string; // "3 Days" / "5 Days" / "Permanent"
  icon: string; // emoji
  // 虚拟"已打卡天数"数据(0-7)
  progressDays: number;
  isPermanent?: boolean;
}

const rewards: CheckInReward[] = [
  { id: 'r3', days: 3, label: '3 Days', icon: '🎀', progressDays: 0 },
  { id: 'r5', days: 5, label: '5 Days', icon: '💎', progressDays: 0 },
  { id: 'r7', days: 7, label: 'Permanent', icon: '👑', progressDays: 0, isPermanent: true },
];

interface TaskProgressProps {
  /** 当前连续打卡天数(用于驱动 3/5/7 卡片的进度数字) */
  checkInStreak?: number;
}

const TaskProgress: React.FC<TaskProgressProps> = ({ checkInStreak = 0 }) => {
  return (
    <Box sx={{ px: 2, mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 0.5,
            borderRadius: 20,
            background: 'linear-gradient(90deg, #FF6B9D, #E91E8C)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(233, 30, 140, 0.3)',
            letterSpacing: 0.5,
          }}
        >
          ✨ Couple Check-in Rewards ✨
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
        }}
      >
        {rewards.map((r) => {
          const achieved = r.isPermanent
            ? Math.min(checkInStreak, 7)
            : Math.min(checkInStreak, r.days);
          const total = r.isPermanent ? 7 : r.days;
          const progressText = `${achieved}/${total} Days`;
          return (
            <Box
              key={r.id}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 1px 4px rgba(233, 30, 140, 0.12)',
                border: '1px solid rgba(233, 30, 140, 0.15)',
                opacity: achieved >= total ? 1 : 0.85,
              }}
            >
              <Box
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg, #E8D5F5 0%, #C9B6E4 50%, #B19CD9 100%)',
                  position: 'relative',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 36,
                    lineHeight: 1,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                  }}
                >
                  {r.icon}
                </Typography>
              </Box>
              <Box
                sx={{
                  py: 0.5,
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#E91E8C',
                  borderTop: '1px solid rgba(233, 30, 140, 0.1)',
                }}
              >
                {r.label}
              </Box>
              <Box
                sx={{
                  mx: 0.75,
                  mb: 0.75,
                  mt: 0.25,
                  py: 0.25,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #FF6B9D, #E91E8C)',
                }}
              >
                {progressText}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TaskProgress;
