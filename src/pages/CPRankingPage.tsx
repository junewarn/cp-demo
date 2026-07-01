import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import GoldenWingsFrame from '../components/common/GoldenWingsFrame';
import { useAppState } from '../hooks/useAppState';
import { CPRankingEntry } from '../types';

/** 排名配色表 */
const RANK_COLORS: Record<number, { bg: string; border: string; badgeBg: string; badgeColor: string }> = {
  1: { bg: 'rgba(255,215,0,0.08)', border: '#FFD700', badgeBg: '#FFD700', badgeColor: '#6b4c00' },
  2: { bg: 'rgba(59,130,246,0.08)', border: '#3b82f6', badgeBg: '#3b82f6', badgeColor: '#fff' },
  3: { bg: 'rgba(245,158,11,0.08)', border: '#f59e0b', badgeBg: '#f59e0b', badgeColor: '#fff' },
};

/** Top1-3 大卡片 */
const TopRankCard: React.FC<{ entry: CPRankingEntry; isLarge?: boolean }> = ({ entry, isLarge }) => {
  const colors = RANK_COLORS[entry.rank] || RANK_COLORS[3];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: isLarge ? 3 : 2,
        py: isLarge ? 2.5 : 2,
        borderRadius: 4,
        bgcolor: colors.bg,
        border: `2px solid ${colors.border}20`,
        position: 'relative',
        ...(isLarge && {
          boxShadow: `0 0 30px ${colors.border}30, 0 0 60px ${colors.border}10`,
        }),
      }}
    >
      {/* Top1 额外皇冠 */}
      {isLarge && (
        <Typography sx={{ fontSize: 24, mb: -1, filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.6))' }}>
          👑
        </Typography>
      )}

      {/* 双方头像（GoldenWingsFrame 自带翅膀 + 皇冠动画，无 color prop） */}
      <GoldenWingsFrame size={isLarge ? 72 : 56}>
        <Box sx={{ display: 'flex', gap: -1 }}>
          <Avatar
            src={entry.userAvatar}
            sx={{ width: isLarge ? 40 : 32, height: isLarge ? 40 : 32, border: `2px solid ${colors.border}` }}
          />
          <Avatar
            src={entry.partnerAvatar}
            sx={{ width: isLarge ? 40 : 32, height: isLarge ? 40 : 32, border: `2px solid ${colors.border}` }}
          />
        </Box>
      </GoldenWingsFrame>

      {/* 双方名字 */}
      <Typography sx={{ mt: 1, fontSize: isLarge ? 14 : 12, fontWeight: 700, color: '#fff' }}>
        {entry.userName} {entry.partnerName}
      </Typography>

      {/* 天数徽章 */}
      <Box
        sx={{
          mt: 0.8,
          px: 1.5,
          py: 0.3,
          borderRadius: 10,
          bgcolor: colors.badgeBg,
          color: colors.badgeColor,
          fontSize: isLarge ? 13 : 11,
          fontWeight: 700,
        }}
      >
        {entry.completedDays} Days
      </Box>
    </Box>
  );
};

/** Top4+ 列表行 */
const RankRow: React.FC<{ entry: CPRankingEntry }> = ({ entry }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      px: 2,
      py: 1.5,
      gap: 1.5,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {/* 排名数字 */}
    <Typography sx={{ width: 28, fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
      {entry.rank}
    </Typography>

    {/* 双方小头像 */}
    <Box sx={{ display: 'flex' }}>
      <Avatar src={entry.userAvatar} sx={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.2)' }} />
      <Avatar
        src={entry.partnerAvatar}
        sx={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.2)', ml: -0.8 }}
      />
    </Box>

    {/* 双方名字 */}
    <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#fff' }}>
      {entry.userName} & {entry.partnerName}
    </Typography>

    {/* 天数 */}
    <Box sx={{ px: 1.5, py: 0.3, borderRadius: 10, bgcolor: 'rgba(233,30,140,0.2)' }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#f472b6' }}>
        {entry.completedDays} Days
      </Typography>
    </Box>
  </Box>
);

/** CP 打卡榜单页面 */
const CPRankingPage: React.FC<{ hideTopBar?: boolean }> = ({ hideTopBar }) => {
  const { state } = useAppState();
  const { rankingEntries } = state;

  // 无论 cpState 为何都展示榜单
  const top1 = rankingEntries[0];
  const top2 = rankingEntries[1];
  const top3 = rankingEntries[2];
  const rest = rankingEntries.slice(3);

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #ffeff2 0%, #fce4ec 30%, #f8bbd0 100%)',
      }}
    >
      {!hideTopBar && <TopBar title="CP Check-in Ranking" showBack />}

      <Box sx={{ px: 2, pb: 6 }}>
        {/* 标题水晶按钮 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Box
            sx={{
              px: 3,
              py: 1,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              boxShadow: '0 2px 12px rgba(168,85,247,0.3)',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
              💜 CP Check-in Ranking
            </Typography>
          </Box>
        </Box>

        {/* Top1 冠军 */}
        {top1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <TopRankCard entry={top1} isLarge />
          </Box>
        )}

        {/* Top2 + Top3 并排 */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>{top2 && <TopRankCard entry={top2} />}</Box>
          <Box sx={{ flex: 1 }}>{top3 && <TopRankCard entry={top3} />}</Box>
        </Box>

        {/* 4-N 排名列表 */}
        {rest.length > 0 && (
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              borderRadius: 4,
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
            }}
          >
            {rest.map((entry) => (
              <RankRow key={entry.userId} entry={entry} />
            ))}
          </Box>
        )}

        {/* 底部爱心 */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography sx={{ fontSize: 24, opacity: 0.3 }}>💕</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CPRankingPage;
