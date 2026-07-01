import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ModalWrapper from './ModalWrapper';

// ============================================================
// ConfirmUnbindModal — 解除绑定数字验证确认弹窗
// 每次打开时生成 4 位随机数字，用户需正确输入后方可确认
// ============================================================

interface ConfirmUnbindModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  warningText?: string;
}

const ConfirmUnbindModal: React.FC<ConfirmUnbindModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  warningText,
}) => {
  const [randomCode, setRandomCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  // 每次弹窗打开时生成新的 4 位随机数字并清空输入
  useEffect(() => {
    if (open) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setRandomCode(code);
      setUserInput('');
    }
  }, [open]);

  const isMatch = userInput === randomCode && randomCode !== '';

  // 关闭弹窗，重置所有状态
  const handleClose = useCallback(() => {
    setUserInput('');
    setRandomCode('');
    onClose();
  }, [onClose]);

  // 确认操作（仅当数字匹配时可触发）
  const handleConfirm = useCallback(() => {
    if (isMatch) {
      onConfirm();
      setUserInput('');
      setRandomCode('');
    }
  }, [isMatch, onConfirm]);

  return (
    <ModalWrapper open={open} onClose={handleClose} title={title}>
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#333', mb: 1 }}>
          {description}
        </Typography>

        {warningText && (
          <Typography sx={{ fontSize: 12, color: '#ef4444', mb: 2 }}>
            {warningText}
          </Typography>
        )}

        {/* 提示文案 */}
        <Typography sx={{ fontSize: 12, color: '#999', mt: 2, mb: 1 }}>
          请输入下方数字以确认解除
        </Typography>

        {/* 随机数字卡片 */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #FFF5F9, #FFE0EC)',
            borderRadius: 3,
            py: 2,
            px: 4,
            mb: 2,
            display: 'inline-block',
            minWidth: 160,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: '#E91E8C',
              letterSpacing: 8,
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {randomCode}
          </Typography>
        </Box>

        {/* 数字输入框 */}
        <TextField
          value={userInput}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
            setUserInput(val);
          }}
          placeholder="请输入上方数字"
          inputProps={{
            maxLength: 4,
            inputMode: 'numeric',
            style: { textAlign: 'center', fontSize: 20, letterSpacing: 4 },
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              '& fieldset': { borderColor: '#e0e0e0' },
              '&:hover fieldset': { borderColor: '#bbb' },
              '&.Mui-focused fieldset': { borderColor: '#E91E8C' },
            },
          }}
        />

        {/* 操作按钮 */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 2.5 }}>
          <Button
            onClick={handleClose}
            fullWidth
            sx={{
              borderRadius: 24,
              py: 1.2,
              fontSize: 14,
              fontWeight: 600,
              color: '#666',
              border: '1px solid #ddd',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            取消
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isMatch}
            fullWidth
            sx={{
              borderRadius: 24,
              py: 1.2,
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              bgcolor: isMatch ? '#ef4444' : '#ccc',
              '&:hover': {
                bgcolor: isMatch ? '#dc2626' : '#ccc',
              },
            }}
          >
            确认解除
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default ConfirmUnbindModal;
