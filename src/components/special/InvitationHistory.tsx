import React from 'react';
import { Box, Typography } from '@mui/material';
import { SpecialInvitationRecord, SpecialType } from '../../types';
import { SPECIAL_TYPE_CONFIG } from '../../utils/constants';

interface InvitationHistoryProps {
  records: SpecialInvitationRecord[];
  /** 最多显示条数，默认全部 */
  maxItems?: number;
  /** 点击记录回调 */
  onItemClick?: (record: SpecialInvitationRecord) => void;
  /** 是否显示快速绑定按钮 */
  showQuickBind?: boolean;
  /** 快速绑定点击回调 */
  onQuickBind?: () => void;
}

/** 状态标签配置 */
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: '待确认', color: '#f59e0b' },
  accepted: { label: '已接受', color: '#22c55e' },
  rejected: { label: '已拒绝', color: '#ef4444' },
};

/** 单条邀请记录 */
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
        gap: 1.5,
        px: 2,
        py: 1.5,
        bgcolor: '#fff',
        borderRadius: 2,
        border: '1px solid #f0f0f0',
        cursor: isPending ? 'pointer' : 'default',
        transition: 'all 0.2s',
        ...(isPending && {
          '&:hover': {
            borderColor: typeConfig.color,
            boxShadow: `0 2px 8px ${typeConfig.color}20`,
          },
        }),
      }}
    >
      {/* 礼物图标 */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: typeConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {record.giftIcon}
      </Box>

      {/* 内容区 */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {record.fromUser.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#aaa' }}>→</Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {record.toUser.name}
          </Typography>
          <Box
            sx={{
              ml: 0.5,
              px: 0.8,
              py: 0.2,
              borderRadius: 8,
              bgcolor: typeConfig.bg,
              color: typeConfig.color,
              fontSize: 10,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {typeConfig.label}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 11, color: '#999' }}>
            {record.createdAt}
          </Typography>
          <Box
            sx={{
              px: 0.8,
              py: 0.1,
              borderRadius: 8,
              bgcolor: `${statusCfg.color}15`,
              color: statusCfg.color,
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {statusCfg.label}
          </Box>
        </Box>
      </Box>

      {/* 花费 */}
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          color: '#f59e0b',
          flexShrink: 0,
        }}
      >
        🪙 {(record.cost / 1000).toFixed(0)}K
      </Typography>
    </Box>
  );
};

/** 邀请历史记录列表（可复用组件） */
const InvitationHistory: React.FC<InvitationHistoryProps> = ({
  records,
  maxItems,
  onItemClick,
  showQuickBind = false,
  onQuickBind,
}) => {
  const displayRecords = maxItems ? records.slice(0, maxItems) : records;

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: 12, color: '#999', mb: 1 }}>
          邀请更多好友建立专属联结
        </Typography>
        {showQuickBind && (
          <Box
            onClick={onQuickBind}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 4,
              py: 1,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #E91E8C, #FF6B9D)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(233,30,140,0.3)',
              transition: 'all 0.2s',
              '&:hover': { boxShadow: '0 4px 14px rgba(233,30,140,0.45)' },
              '&:active': { transform: 'scale(0.96)' },
            }}
          >
            🔗 快速绑定
          </Box>
        )}
      </Box>

      {/* 邀请记录标题 */}
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#555', mb: 1.5, px: 1 }}>
        📋 邀请记录
      </Typography>

      {displayRecords.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ fontSize: 13, color: '#bbb' }}>
            暂无邀请记录
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
