import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ============================================================
// 特权等级数据
// ============================================================

interface PrivilegeLevel {
  level: number;
  intimacy: number;
  rewardIcon: string;
  rewardName: string;
  unlocked: boolean;
}

const PRIVILEGE_LEVELS: PrivilegeLevel[] = [
  { level: 1, intimacy: 1, rewardIcon: '💖', rewardName: 'LOVE', unlocked: true },
  { level: 2, intimacy: 2, rewardIcon: '🖼️', rewardName: 'Frame', unlocked: true },
  { level: 3, intimacy: 3, rewardIcon: '💬', rewardName: 'Bubble', unlocked: true },
  { level: 4, intimacy: 4, rewardIcon: '🎀', rewardName: 'Ribbon', unlocked: false },
  { level: 5, intimacy: 5, rewardIcon: '🏠', rewardName: 'LOBBY', unlocked: false },
  { level: 6, intimacy: 6, rewardIcon: '🚪', rewardName: 'Entrance', unlocked: false },
  { level: 7, intimacy: 7, rewardIcon: '🔥', rewardName: 'V-flame', unlocked: false },
];

// ============================================================
// SpecialPrivilegesPage 组件
// ============================================================

const SpecialPrivilegesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 4, minHeight: '100dvh', background: 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 15%, #dbeafe 50%, #eff6ff 100%)' }}>
      {/* 顶部导航 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          pt: 2,
          pb: 3,
          gap: 1,
        }}
      >
        <Box
          onClick={() => navigate(-1)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'rgba(147,51,234,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 18,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'rgba(147,51,234,0.16)' },
          }}
        >
          ←
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7c3aed, #4D96FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          👑 Special Privilege
        </Typography>
      </Box>

      {/* 表格 */}
      <Box sx={{ px: 2 }}>
        {/* 表头 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 1,
            px: 1.5,
            py: 1.2,
            borderRadius: 2,
            bgcolor: 'rgba(147,51,234,0.06)',
            mb: 1,
          }}
        >
          {['Level', 'Intimacy', 'Reward'].map((h) => (
            <Typography
              key={h}
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: '#7c3aed',
                textAlign: 'center',
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* 数据行 */}
        {PRIVILEGE_LEVELS.map((pl) => (
          <Box
            key={pl.level}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 1,
              alignItems: 'center',
              px: 1.5,
              py: 1.8,
              borderRadius: 2,
              mb: 0.8,
              bgcolor: pl.unlocked
                ? 'rgba(147,51,234,0.04)'
                : '#fff',
              border: pl.unlocked
                ? '1px solid rgba(147,51,234,0.15)'
                : '1px solid rgba(0,0,0,0.05)',
              opacity: pl.unlocked ? 1 : 0.55,
            }}
          >
            {/* Level */}
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: pl.unlocked ? '#7c3aed' : '#bbb',
                textAlign: 'center',
              }}
            >
              Lv.{pl.level}
            </Typography>

            {/* Intimacy */}
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    maxWidth: 80,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#f0f0f0',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(pl.intimacy / 7) * 100}%`,
                      borderRadius: 3,
                      background: pl.unlocked
                        ? 'linear-gradient(90deg, #7c3aed, #a78bfa)'
                        : 'linear-gradient(90deg, #ccc, #ddd)',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: pl.unlocked ? '#7c3aed' : '#ccc',
                    minWidth: 16,
                  }}
                >
                  {pl.intimacy}
                </Typography>
              </Box>
            </Box>

            {/* Reward */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.6,
              }}
            >
              <Typography sx={{ fontSize: 18, lineHeight: 1 }}>
                {pl.rewardIcon}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: pl.unlocked ? '#555' : '#ccc',
                }}
              >
                {pl.rewardName}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 底部说明 */}
      <Box sx={{ px: 2, mt: 4, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 12, color: '#aaa' }}>
          💡 提升 Special 亲密度以解锁更多特权
        </Typography>
      </Box>
    </Box>
  );
};

export default SpecialPrivilegesPage;
