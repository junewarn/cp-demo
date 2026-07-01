import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CPTask } from '../../types';
import { useAppState } from '../../hooks/useAppState';

interface TaskRewardCardProps {
  task: CPTask;
}

const TaskRewardCard: React.FC<TaskRewardCardProps> = ({ task }) => {
  const { dispatch } = useAppState();

  const isLocked = task.status === 'locked';
  const isCompleted = task.status === 'completed';
  const isAvailable = task.status === 'available';

  const handleClaim = () => {
    if (isAvailable) {
      dispatch({ type: 'COMPLETE_TASK', payload: task.id });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          bgcolor: isCompleted ? '#f7f7f7' : '#fff',
          borderRadius: 2,
          px: 1.5,
          py: 1.25,
          border: '1px solid #f0f0f0',
          opacity: isLocked ? 0.5 : 1,
          boxShadow: isAvailable ? '0 1px 4px rgba(233, 30, 140, 0.08)' : 'none',
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {/* 任务文案(单行紧凑,不显示奖励气泡/勋章标签) */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: isCompleted ? '#999' : '#333',
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {task.title}
          </Typography>
        </Box>

        {/* 操作按钮 */}
        {isAvailable && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleClaim}
            sx={{
              borderRadius: 16,
              px: 2,
              minWidth: 56,
              fontSize: 12,
              fontWeight: 600,
              color: '#E91E8C',
              borderColor: 'rgba(233, 30, 140, 0.4)',
              flexShrink: 0,
              '&:hover': {
                borderColor: '#E91E8C',
                bgcolor: 'rgba(233, 30, 140, 0.06)',
              },
            }}
          >
            Go
          </Button>
        )}
        {isCompleted && (
          <Button
            variant="outlined"
            size="small"
            disabled
            sx={{
              borderRadius: 16,
              px: 2,
              minWidth: 56,
              fontSize: 12,
              fontWeight: 600,
              color: '#bbb',
              borderColor: '#e0e0e0',
              flexShrink: 0,
            }}
          >
            Finish
          </Button>
        )}
        {isLocked && (
          <Box
            sx={{
              fontSize: 16,
              flexShrink: 0,
              opacity: 0.4,
            }}
          >
            🔒
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default TaskRewardCard;
