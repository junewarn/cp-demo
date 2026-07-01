import React from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import TaskProgress from '../components/cp-tasks/TaskProgress';
import TaskRewardCard from '../components/cp-tasks/TaskRewardCard';
import CheckInCalendar from '../components/cp-tasks/CheckInCalendar';
import EmptyState from '../components/common/EmptyState';
import { useAppState } from '../hooks/useAppState';
import { CPState, ViewMode } from '../types';

const CPTasksPage: React.FC<{ hideTopBar?: boolean }> = ({ hideTopBar }) => {
  const { state } = useAppState();
  const { cpTasks, checkInRecords, cpRelationship, viewMode, cpState } = state;

  const isOtherView = viewMode === ViewMode.OTHER;
  const isUnbound = cpState === CPState.UNBOUND;

  if (isUnbound) {
    return (
      <Box>
        {!hideTopBar && <TopBar title="📋 CP任务" />}
        <EmptyState
          icon="📋"
          title="暂无任务"
          description="绑定CP后即可开启专属任务"
        />
      </Box>
    );
  }

  // 计算当前连续打卡天数,用于驱动 3/5/7 奖励卡片进度
  const checkedCount = checkInRecords.filter((r) => r.checked).length;
  const checkInStreak = Math.min(7, checkedCount);

  return (
    <Box>
      {!hideTopBar && <TopBar title="📋 CP任务" />}
      <Box sx={{ pb: 10 }}>
        {!isOtherView && (
          <>
            <TaskProgress checkInStreak={checkInStreak} />

            <Box sx={{ px: 2, mt: 3 }}>
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
                  💕 Couple Tasks 💕
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {cpTasks.map((task) => (
                  <TaskRewardCard key={task.id} task={task} />
                ))}
              </Box>
            </Box>
          </>
        )}

        <CheckInCalendar records={checkInRecords} />
      </Box>
    </Box>
  );
};

export default CPTasksPage;
