import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SpecialRelationship, SpecialType, User } from '../../types';
import {
  SPECIAL_TYPE_CONFIG,
  SPECIAL_TYPE_MAX_PER_TYPE,
} from '../../utils/constants';

interface SpecialInviteCardProps {
  relationships: SpecialRelationship[];
  friends: User[];
  onBind: (friend: User, type: SpecialType) => void;
  onClose: () => void;
}

/** 关系类型选项定义 */
const TYPE_OPTIONS: { type: SpecialType; icon: string }[] = [
  { type: SpecialType.BESTIE, icon: '💖' },
  { type: SpecialType.SOULMATE, icon: '💜' },
  { type: SpecialType.HOMIE, icon: '🤜' },
];

const SpecialInviteCard: React.FC<SpecialInviteCardProps> = ({
  relationships,
  friends,
  onBind,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<SpecialType>(
    SpecialType.BESTIE,
  );
  const [searchQuery, setSearchQuery] = useState('');

  /** 计算每种类型的已绑定数量 */
  const typeCounts = useMemo(() => {
    const counts: Record<SpecialType, number> = {
      [SpecialType.BESTIE]: 0,
      [SpecialType.SOULMATE]: 0,
      [SpecialType.HOMIE]: 0,
    };
    relationships.forEach((r) => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
    return counts;
  }, [relationships]);

  /** 已绑定好友的 ID 集合（用于过滤） */
  const boundFriendIds = useMemo(
    () => new Set(relationships.map((r) => r.partner.id)),
    [relationships],
  );

  /** 可选好友（未绑定） */
  const availableFriends = useMemo(
    () => friends.filter((f) => !boundFriendIds.has(f.id)),
    [friends, boundFriendIds],
  );

  /** 搜索过滤 */
  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return availableFriends;
    const q = searchQuery.toLowerCase();
    return availableFriends.filter((f) =>
      f.name.toLowerCase().includes(q),
    );
  }, [availableFriends, searchQuery]);

  const handleSelectFriend = (friend: User) => {
    const count = typeCounts[selectedType];
    if (count >= SPECIAL_TYPE_MAX_PER_TYPE) {
      return; // 已满，理论上不会进入此分支
    }
    onBind(friend, selectedType);
  };

  return (
    <Box>
      {/* 标题 */}
      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          textAlign: 'center',
          color: '#333',
          mb: 0.5,
        }}
      >
        选择关系类型
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: '#888',
          textAlign: 'center',
          mb: 2,
        }}
      >
        每种关系最多可绑定{' '}
        <Box component="span" sx={{ color: '#f59e0b', fontWeight: 600 }}>
          {SPECIAL_TYPE_MAX_PER_TYPE} 人
        </Box>
      </Typography>

      {/* 关系类型 3 列选择器 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.2,
          mb: 2,
        }}
      >
        {TYPE_OPTIONS.map(({ type, icon }) => {
          const config = SPECIAL_TYPE_CONFIG[type];
          const count = typeCounts[type];
          const isMaxed = count >= SPECIAL_TYPE_MAX_PER_TYPE;
          const isSelected = selectedType === type;

          return (
            <Box
              key={type}
              onClick={() => {
                if (!isMaxed) setSelectedType(type);
              }}
              sx={{
                textAlign: 'center',
                p: 1.5,
                borderRadius: 2,
                cursor: isMaxed ? 'not-allowed' : 'pointer',
                opacity: isMaxed ? 0.4 : 1,
                border: `2px solid ${
                  isSelected ? config.color : '#e0e0e0'
                }`,
                bgcolor: isSelected ? config.bg : '#fff',
                transition: 'all 0.2s',
                '&:hover': !isMaxed
                  ? {
                      borderColor: config.color,
                      bgcolor: config.bg,
                    }
                  : {},
              }}
            >
              <Typography sx={{ fontSize: 32, mb: 0.5, lineHeight: 1 }}>
                {icon}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: config.color,
                  mb: 0.3,
                }}
              >
                {config.label}
              </Typography>
              <Typography sx={{ fontSize: 10, color: '#999' }}>
                {count} / {SPECIAL_TYPE_MAX_PER_TYPE} 人
              </Typography>
              {isMaxed && (
                <Typography
                  sx={{ fontSize: 10, color: '#ef4444', mt: 0.2 }}
                >
                  已满
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* 搜索框 */}
      <TextField
        fullWidth
        size="small"
        placeholder="搜索好友名称..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#bbb', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 1.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontSize: 14,
            bgcolor: '#f9fafb',
          },
        }}
      />

      {/* 好友列表 */}
      <Box
        sx={{
          maxHeight: 240,
          overflowY: 'auto',
          borderRadius: 2,
          bgcolor: '#fafafa',
        }}
      >
        {filteredFriends.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography sx={{ fontSize: 13, color: '#bbb' }}>
              {searchQuery.trim()
                ? '没有匹配的好友'
                : '暂无可选好友'}
            </Typography>
          </Box>
        ) : (
          filteredFriends.map((friend) => (
            <Box
              key={friend.id}
              onClick={() => handleSelectFriend(friend)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.2,
                cursor: 'pointer',
                transition: 'background 0.15s',
                '&:hover': { bgcolor: 'rgba(168,85,247,0.06)' },
                '&:not(:last-child)': {
                  borderBottom: '1px solid #f0f0f0',
                },
              }}
            >
              <Box
                component="img"
                src={friend.avatar}
                alt={friend.name}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#333',
                  }}
                >
                  {friend.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#aaa',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Lv.{friend.level}
                  {friend.signature ? ` · ${friend.signature}` : ''}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: SPECIAL_TYPE_CONFIG[selectedType].bg,
                  color: SPECIAL_TYPE_CONFIG[selectedType].color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                +
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SpecialInviteCard;
