import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ============================================================
// Mock 榜单数据
// ============================================================

interface RankingEntry {
  rank: number;
  userAvatar: string;
  partnerAvatar: string;
  userName: string;
  partnerName: string;
  score: number;
}

const MOCK_RANKINGS: RankingEntry[] = [
  {
    rank: 1,
    userAvatar: 'https://picsum.photos/seed/elizabeth/200/200',
    partnerAvatar: 'https://picsum.photos/seed/david/200/200',
    userName: 'Elizabeth',
    partnerName: 'David',
    score: 9999,
  },
  {
    rank: 2,
    userAvatar: 'https://picsum.photos/seed/snow/200/200',
    partnerAvatar: 'https://picsum.photos/seed/frost/200/200',
    userName: 'Snow',
    partnerName: 'Frost',
    score: 8542,
  },
  {
    rank: 3,
    userAvatar: 'https://picsum.photos/seed/luna/200/200',
    partnerAvatar: 'https://picsum.photos/seed/orion/200/200',
    userName: 'Luna',
    partnerName: 'Orion',
    score: 7200,
  },
  {
    rank: 4,
    userAvatar: 'https://picsum.photos/seed/aurora/200/200',
    partnerAvatar: 'https://picsum.photos/seed/nova/200/200',
    userName: 'Aurora',
    partnerName: 'Nova',
    score: 6800,
  },
  {
    rank: 5,
    userAvatar: 'https://picsum.photos/seed/stella/200/200',
    partnerAvatar: 'https://picsum.photos/seed/leo/200/200',
    userName: 'Stella',
    partnerName: 'Leo',
    score: 6100,
  },
  {
    rank: 6,
    userAvatar: 'https://picsum.photos/seed/ruby/200/200',
    partnerAvatar: 'https://picsum.photos/seed/jade/200/200',
    userName: 'Ruby',
    partnerName: 'Jade',
    score: 5500,
  },
  {
    rank: 7,
    userAvatar: 'https://picsum.photos/seed/ivy/200/200',
    partnerAvatar: 'https://picsum.photos/seed/ash/200/200',
    userName: 'Ivy',
    partnerName: 'Ash',
    score: 4800,
  },
  {
    rank: 8,
    userAvatar: 'https://picsum.photos/seed/willow/200/200',
    partnerAvatar: 'https://picsum.photos/seed/oak/200/200',
    userName: 'Willow',
    partnerName: 'Oak',
    score: 4200,
  },
];

const MY_RANK: RankingEntry = {
  rank: 2,
  userAvatar: 'https://picsum.photos/seed/snow/200/200',
  partnerAvatar: 'https://picsum.photos/seed/frost/200/200',
  userName: 'Snow',
  partnerName: 'Frost',
  score: 8542,
};

const PERIODS = ['Daily', 'Weekly', 'Monthly'] as const;
type Period = (typeof PERIODS)[number];

const RELATION_TYPES = [
  { key: 'bestie', label: 'BESTIE', color: '#4D96FF' },
  { key: 'soulmate', label: 'Soulmate', color: '#a855f7' },
] as const;

// ============================================================
// 组件
// ============================================================

/* 心形 Top3 展示 */
const TopThree: React.FC<{ entries: RankingEntry[] }> = ({ entries }) => {
  // 1st (center), 2nd (left), 3rd (right)
  const first = entries.find((e) => e.rank === 1);
  const second = entries.find((e) => e.rank === 2);
  const third = entries.find((e) => e.rank === 3);

  if (!first || !second || !third) return null;

  const HeartCard: React.FC<{
    entry: RankingEntry;
    size: number;
    rankColor: string;
    ribbon: string;
  }> = ({ entry, size, rankColor, ribbon }) => (
    <Box sx={{ textAlign: 'center' }}>
      {/* 心形容器 */}
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          mx: 'auto',
        }}
      >
        {/* 心形背景（CSS模拟） */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              width: '50%',
              height: '80%',
              borderRadius: '50% 50% 0 0',
              background: `linear-gradient(180deg, ${rankColor}44, ${rankColor}22)`,
            },
            '&::before': {
              left: 0,
              transform: 'rotate(-45deg)',
              transformOrigin: 'bottom right',
            },
            '&::after': {
              right: 0,
              transform: 'rotate(45deg)',
              transformOrigin: 'bottom left',
            },
          }}
        />
        {/* 简化的心形: 用菱形替代 */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${rankColor}33, ${rankColor}11)`,
            clipPath:
              'polygon(50% 100%, 0% 35%, 25% 0%, 50% 25%, 75% 0%, 100% 35%)',
          }}
        />
        {/* 头像 */}
        <Box
          component="img"
          src={entry.userAvatar}
          alt={entry.userName}
          sx={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: size * 0.45,
            height: size * 0.45,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${rankColor}`,
            boxShadow: `0 0 12px ${rankColor}44`,
            zIndex: 1,
          }}
        />
        {/* 排名徽章 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            bgcolor: rankColor,
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: `0 2px 8px ${rankColor}55`,
          }}
        >
          {entry.rank}
        </Box>
      </Box>

      {/* 名字 */}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: '#555',
          mt: 0.5,
        }}
      >
        {entry.userName}
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          color: '#999',
        }}
      >
        {entry.score.toLocaleString()}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 3,
        py: 3,
        px: 2,
      }}
    >
      {/* 2nd (左) */}
      <HeartCard entry={second} size={80} rankColor="#C0C0C0" ribbon="🥈" />

      {/* 1st (中, 大) */}
      <HeartCard entry={first} size={100} rankColor="#FFD700" ribbon="🥇" />

      {/* 3rd (右) */}
      <HeartCard entry={third} size={80} rankColor="#CD7F32" ribbon="🥉" />
    </Box>
  );
};

/* 排行列表项 */
const RankRow: React.FC<{
  entry: RankingEntry;
  isMy: boolean;
}> = ({ entry, isMy }) => {
  const isTop3 = entry.rank <= 3;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
        px: 2,
        py: 1.5,
        bgcolor: isMy ? 'rgba(77,150,255,0.06)' : 'transparent',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* 排名 */}
      <Typography
        sx={{
          width: 28,
          fontSize: 14,
          fontWeight: 800,
          color: isTop3 ? '#7c3aed' : '#999',
          textAlign: 'center',
        }}
      >
        {isTop3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
      </Typography>

      {/* 双人头像 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={entry.userAvatar}
          alt={entry.userName}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #fff',
            position: 'relative',
            zIndex: 2,
          }}
        />
        <Box
          component="img"
          src={entry.partnerAvatar}
          alt={entry.partnerName}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #fff',
            ml: -1.2,
            position: 'relative',
            zIndex: 1,
          }}
        />
      </Box>

      {/* 名字 */}
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
          {entry.userName} & {entry.partnerName}
        </Typography>
      </Box>

      {/* 分数 */}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: '#7c3aed',
        }}
      >
        {entry.score.toLocaleString()}
      </Typography>
    </Box>
  );
};

// ============================================================
// SpecialRankingPage
// ============================================================

const SpecialRankingPage: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>('Weekly');
  const [activeType, setActiveType] = useState<'bestie' | 'soulmate'>('bestie');

  return (
    <Box sx={{ pb: 10, minHeight: '100dvh', background: 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 15%, #dbeafe 50%, #eff6ff 100%)' }}>
      {/* 顶部 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          pt: 2,
          pb: 1,
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
          🏆 Rank
        </Typography>
      </Box>

      {/* Daily/Weekly/Monthly 切换 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
          px: 2,
          py: 1.5,
          bgcolor: 'rgba(147,51,234,0.03)',
          mx: 2,
          borderRadius: 2.5,
          mb: 2,
        }}
      >
        {PERIODS.map((p) => {
          const active = p === period;
          return (
            <Box
              key={p}
              onClick={() => setPeriod(p)}
              sx={{
                flex: 1,
                py: 0.8,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: active ? '#fff' : 'transparent',
                boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: active ? 800 : 500,
                  color: active ? '#7c3aed' : '#999',
                }}
              >
                {p}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* 关系类型侧标签 */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: 2,
          mb: 1,
        }}
      >
        {RELATION_TYPES.map((rt) => {
          const active = activeType === rt.key;
          return (
            <Box
              key={rt.key}
              onClick={() => setActiveType(rt.key)}
              sx={{
                px: 2,
                py: 0.6,
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: active ? `${rt.color}22` : 'rgba(0,0,0,0.03)',
                border: `1px solid ${active ? rt.color + '55' : 'transparent'}`,
                transition: 'all 0.2s',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? rt.color : '#999',
                }}
              >
                {rt.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Top 3 心形展示 */}
      <TopThree entries={MOCK_RANKINGS} />

      {/* 排名列表 */}
      <Box sx={{ px: 0 }}>
        {MOCK_RANKINGS.map((entry) => (
          <RankRow
            key={entry.rank}
            entry={entry}
            isMy={entry.rank === MY_RANK.rank}
          />
        ))}
      </Box>

      {/* My Rank */}
      <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Box sx={{ px: 2, mb: 0.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#999' }}>
            My Rank
          </Typography>
        </Box>
        <RankRow entry={MY_RANK} isMy={true} />
      </Box>
    </Box>
  );
};

export default SpecialRankingPage;
