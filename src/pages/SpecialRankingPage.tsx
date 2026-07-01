import React from 'react';
import { Box } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import RankingList from '../components/cp-ranking/RankingList';
import EmptyState from '../components/common/EmptyState';
import { useAppState } from '../hooks/useAppState';

const SpecialRankingPage: React.FC = () => {
  const { state } = useAppState();

  return (
    <Box>
      <TopBar title="🏆 Special榜单" showBack />
      <Box sx={{ mt: 1 }}>
        {state.rankingEntries.length > 0 ? (
          <RankingList entries={state.rankingEntries} />
        ) : (
          <EmptyState icon="🏆" title="暂无榜单数据" />
        )}
      </Box>

    </Box>
  );
};

export default SpecialRankingPage;
