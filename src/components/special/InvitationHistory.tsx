import React from 'react';
import { Box, Typography } from '@mui/material';
import { SpecialInvitationRecord } from '../../types';
import { SPECIAL_TYPE_CONFIG } from '../../utils/constants';

interface InvitationHistoryProps {
  records: SpecialInvitationRecord[];
  /** 最多显示条数，默认全部 */
  maxItems?: number;
  /** 点击记录回调 */
  onItemClick?: (record: SpecialInvitationRecord) => void;
  /** 自定义标题 */
  title?: string;
}

/** 状态标签配置 */
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: '#f59e0b' },
  accepted: { label: 'Accepted', color: '#22c55e' },
  rejected: { label: 'Rejected', color: '#ef4444' },
};

/** 单条邀请记录（匹配截图：头像 → 文字 → 头像 → 礼物） */
const HistoryItem: React.FC<{
  record: SpecialInvitationRecord;
  onClick?: (record: SpecialInvitationRecord) => void;
}> = ({ record, onClick }) => {
  const statusCfg = STATUS_CONFIG[record.status];
  const typeConfig = SPECIAL_TYPE_CONFIG[record.type];
  const isPending = record.status === 'pending';

  return (
    <Box
      onClick={() => isPending && onClick?.(record)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
        px: 1.5,
        py: 1.2,
        bgcolor: 'rgba(255,255,255,0.6)',
        borderRadius: 2.5,
        border: '1px solid rgba(147,51,234,0.1)',
        cursor: isPending ? 'pointer' : 'default',
        transition: 'all 0.2s',
        ...(isPending && {
          '&:hover': {
            borderColor: typeConfig.color,
            boxShadow: `0 2px 8px ${typeConfig.color}20`,
            bgcolor: 'rgba(255,255,255,0.85)',
          },
        }),
      }}
    >
      {/* 发送者头像 */}
      <Box
        component="img"
        src={record.fromUser.avatar}
        alt={record.fromUser.name}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
      />

      {/* 文案 */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>
          sent a{' '}
          <Typography
            component="span"
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: typeConfig.color,
            }}
          >
            Special
          </Typography>{' '}
          invitation to
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
          {/* 接收者头像 */}
          <Box
            component="img"
            src={record.toUser.avatar}
            alt={record.toUser.name}
            sx={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #fff',
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#555',
            }}
          >
            {record.toUser.name}
          </Typography>
          <Box
            sx={{
              px: 0.8,
              py: 0.1,
              borderRadius: 1,
              bgcolor: `${statusCfg.color}15`,
              color: statusCfg.color,
              fontSize: 10,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {statusCfg.label}
          </Box>
        </Box>
      </Box>

      {/* 礼物图标 */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: typeConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
          border: `1px solid ${typeConfig.border}`,
        }}
      >
        {record.giftIcon}
      </Box>
    </Box>
  );
};

/** 邀请历史记录列表（可复用组件） */
const InvitationHistory: React.FC<InvitationHistoryProps> = ({
  records,
  maxItems,
  onItemClick,
  title = 'Invitation History',
}) => {
  const displayRecords = maxItems ? records.slice(0, maxItems) : records;

  return (
    <Box sx={{ px: 2 }}>
      {/* 邀请记录标题 */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #7c3aed, #4D96FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      {displayRecords.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 2 }}>
          <Typography sx={{ fontSize: 13, color: '#bbb' }}>
            No invitation records yet
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {displayRecords.map((record) => (
            <HistoryItem
              key={record.id}
              record={record}
              onClick={onItemClick}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default InvitationHistory;
