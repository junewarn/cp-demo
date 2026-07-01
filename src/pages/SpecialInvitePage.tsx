import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import { SpecialType, Gender } from '../types';
import { SPECIAL_TYPE_CONFIG } from '../utils/constants';
import { useAppState } from '../hooks/useAppState';

const SpecialInvitePage: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [userId, setUserId] = useState('');
  const [selectedType, setSelectedType] = useState<SpecialType>(SpecialType.BESTIE);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!userId.trim()) {
      setError('请输入好友ID');
      return;
    }

    dispatch({
      type: 'SEND_INVITE',
      payload: {
        id: `sp-new-${Date.now()}`,
        partner: {
          id: userId.trim(),
          name: `用户${userId.trim()}`,
          avatar: `https://picsum.photos/seed/${userId.trim()}/200/200`,
          gender: Gender.FEMALE,
          level: 1,
          signature: '',
          gold: 0,
        },
        type: selectedType,
        establishedDate: new Date().toISOString().split('T')[0],
        level: 1,
        days: 0,
      },
    });

    setMessage(`已成功向 ${userId.trim()} 发送 ${SPECIAL_TYPE_CONFIG[selectedType].label} 邀请！`);
    setUserId('');
    setError('');
  };

  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title="📨 Special邀请" showBack />
      <Box sx={{ px: 2, mt: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* 关系类型选择 */}
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#555', mb: 1.5 }}>
            选择关系类型
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {(
              Object.entries(SPECIAL_TYPE_CONFIG) as [SpecialType, (typeof SPECIAL_TYPE_CONFIG)[SpecialType]][]
            ).map(([type, config]) => (
              <Box
                key={type}
                onClick={() => setSelectedType(type)}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: `2px solid ${selectedType === type ? config.color : '#e0e0e0'}`,
                  bgcolor: selectedType === type ? config.bg : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 0.5 }}>{config.icon}</Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: selectedType === type ? config.color : '#999',
                  }}
                >
                  {config.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* 用户ID输入 */}
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#555', mb: 1.5 }}>
            输入好友ID
          </Typography>
          <TextField
            fullWidth
            placeholder="请输入好友的用户ID"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError('');
              setMessage('');
            }}
            error={!!error}
            helperText={error}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#fff',
              },
            }}
          />

          {message && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {message}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleSend}
            sx={{
              py: 1.5,
              borderRadius: 28,
              fontSize: 15,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #9B59B6, #4D96FF)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7E3FB0, #3570D8)',
              },
            }}
          >
            📨 发送邀请
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SpecialInvitePage;
