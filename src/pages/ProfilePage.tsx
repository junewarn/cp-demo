import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppState } from '../hooks/useAppState';
import { ViewMode, Gender, SpecialRelationship } from '../types';
import { SPECIAL_TYPE_CONFIG } from '../utils/constants';

// ============================================================
// 子组件
// ============================================================

/** 性别 + 年龄图标 */
const GenderAgeBadge: React.FC<{ gender: Gender; age?: number }> = ({
  gender,
  age,
}) => {
  const isMale = gender === Gender.MALE;
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.2,
        px: 0.6,
        py: 0.1,
        borderRadius: 1,
        bgcolor: isMale ? 'rgba(59,130,246,0.12)' : 'rgba(236,72,153,0.12)',
        color: isMale ? '#3b82f6' : '#ec4899',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      <Typography component="span" sx={{ fontSize: 10 }}>
        {isMale ? '♂' : '♀'}
      </Typography>
      <Typography component="span">{age ?? 26}</Typography>
    </Box>
  );
};

/** 小徽章 */
const TinyBadge: React.FC<{ icon: string; value?: number; color?: string }> = ({
  icon,
  value,
  color = '#f59e0b',
}) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.3,
      px: 0.6,
      py: 0.1,
      borderRadius: 1,
      bgcolor: `${color}15`,
      color,
      fontSize: 10,
      fontWeight: 700,
    }}
  >
    <Typography component="span" sx={{ fontSize: 11 }}>
      {icon}
    </Typography>
    {value !== undefined && <Typography component="span">{value}</Typography>}
  </Box>
);

/** 分区标题 */
const SectionHeader: React.FC<{
  title: string;
  action?: { label: string; onClick: () => void };
}> = ({ title, action }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 1.5,
    }}
  >
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 800,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Typography component="span" sx={{ color: '#f59e0b', fontSize: 14 }}>
        🚩
      </Typography>
      {title}
    </Typography>
    {action && (
      <Box
        onClick={action.onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
          cursor: 'pointer',
        }}
      >
        <Typography sx={{ fontSize: 12, color: '#999' }}>{action.label}</Typography>
        <Typography sx={{ fontSize: 12, color: '#999' }}>›</Typography>
      </Box>
    )}
  </Box>
);

/** CP 信息卡 */
const CPCard: React.FC<{
  user: { avatar: string; name: string };
  partner?: { avatar: string; name: string } | null;
  cpLevel?: number;
  loveDays?: number;
  onClick?: () => void;
}> = ({ user, partner, cpLevel, loveDays, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        background: partner
          ? 'linear-gradient(135deg, #fff0f5, #ffe4ec, #fff8fb)'
          : 'linear-gradient(135deg, #fff8fb, #fff0f5)',
        border: '2px solid #f9d5c0',
        boxShadow: '0 6px 20px rgba(255,107,157,0.12)',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* 顶部等级 */}
      {cpLevel && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            px: 2,
            py: 0.2,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            bgcolor: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          Lv.{cpLevel}
        </Box>
      )}

      {/* 装饰 */}
      <Box sx={{ position: 'absolute', top: 6, left: 6, fontSize: 12, opacity: 0.5 }}>
        🌹
      </Box>
      <Box sx={{ position: 'absolute', top: 6, right: 6, fontSize: 12, opacity: 0.5 }}>
        🌹
      </Box>
      <Box sx={{ position: 'absolute', bottom: 6, left: 6, fontSize: 12, opacity: 0.5 }}>
        🌹
      </Box>
      <Box sx={{ position: 'absolute', bottom: 6, right: 6, fontSize: 12, opacity: 0.5 }}>
        🌹
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          pt: 1.5,
        }}
      >
        {/* 自己 */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={user.avatar}
            alt={user.name}
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #FFD700',
              boxShadow: '0 0 12px rgba(255,215,0,0.3)',
            }}
          />
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#e91e8c', mt: 0.5 }}>
            {user.name}
          </Typography>
        </Box>

        {/* 中间 */}
        <Box sx={{ textAlign: 'center' }}>
          {partner ? (
            <>
              <Typography sx={{ fontSize: 24, lineHeight: 1 }}>💖</Typography>
              <Box
                sx={{
                  px: 1.2,
                  py: 0.2,
                  borderRadius: 10,
                  bgcolor: '#f59e0b',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  mt: 0.5,
                }}
              >
                {loveDays ?? 0} days
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: 24, lineHeight: 1 }}>💗</Typography>
              <Box
                sx={{
                  px: 1.2,
                  py: 0.2,
                  borderRadius: 10,
                  bgcolor: '#f59e0b',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  mt: 0.5,
                }}
              >
                None
              </Box>
            </>
          )}
        </Box>

        {/* 对方 / 空位 */}
        {partner ? (
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={partner.avatar}
              alt={partner.name}
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #FFD700',
                boxShadow: '0 0 12px rgba(255,215,0,0.3)',
              }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#e91e8c', mt: 0.5 }}>
              {partner.name}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '2px dashed #f9a8d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.5)',
              }}
            >
              <Typography sx={{ fontSize: 24, color: '#f9a8d4' }}>+</Typography>
            </Box>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#999', mt: 0.5 }}>
              None
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/** Special 关系小卡 */
const SpecialMiniCard: React.FC<{
  rel?: SpecialRelationship;
  onAdd?: () => void;
}> = ({ rel, onAdd }) => {
  if (!rel) {
    return (
      <Box
        onClick={onAdd}
        sx={{
          aspectRatio: '1 / 1.15',
          borderRadius: 2.5,
          border: '2px dashed #f9d5c0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
        }}
      >
        <Typography sx={{ fontSize: 24, color: '#f9d5c0' }}>+</Typography>
      </Box>
    );
  }

  const config = SPECIAL_TYPE_CONFIG[rel.type];
  return (
    <Box
      sx={{
        aspectRatio: '1 / 1.15',
        borderRadius: 2.5,
        border: '2px solid #f9d5c0',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        bgcolor: 'rgba(255,255,255,0.7)',
        boxShadow: '0 2px 10px rgba(255,107,157,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          px: 0.8,
          py: 0.1,
          borderRadius: 1,
          bgcolor: config.bg,
          color: config.color,
          fontSize: 9,
          fontWeight: 700,
          zIndex: 1,
        }}
      >
        {config.label}
      </Box>
      <Box
        component="img"
        src={rel.partner.avatar}
        alt={rel.partner.name}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          objectFit: 'cover',
          border: `2px solid ${config.color}`,
          mt: 1,
        }}
      />
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: '#333',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {rel.partner.name}
      </Typography>
      <Typography sx={{ fontSize: 10, color: '#888' }}>
        Lv.{rel.level} {rel.days}days
      </Typography>
    </Box>
  );
};

// ============================================================
// ProfilePage 主组件
// ============================================================

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const { currentUser, viewingUser, viewMode, cpRelationship, specialRelationships } = state;

  const isSelf = viewMode === ViewMode.SELF;
  const displayUser = isSelf ? currentUser : viewingUser || currentUser;

  const copyId = () => {
    try {
      navigator.clipboard.writeText(displayUser.id);
    } catch {
      // ignore
    }
  };

  return (
    <Box sx={{ pb: 10, minHeight: '100dvh', bgcolor: '#fafafa' }}>
      {/* 顶部封面 */}
      <Box
        sx={{
          position: 'relative',
          height: 200,
          background: 'linear-gradient(135deg, #1a0a2e, #4a1942, #6b1d52)',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={displayUser.avatar}
          alt={displayUser.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            filter: 'blur(1px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />
        {/* 返回按钮 */}
        <Box
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <Typography sx={{ fontSize: 18, color: '#fff' }}>‹</Typography>
        </Box>
      </Box>

      {/* 头像 + 基础信息 */}
      <Box sx={{ px: 2, position: 'relative', mt: -4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 3,
              p: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {/* 头像行 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              {cpRelationship ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #fff',
                      boxShadow: '0 0 16px rgba(0,0,0,0.15)',
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: -1.5,
                      zIndex: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      border: '2px solid #fff',
                    }}
                  >
                    <Typography sx={{ fontSize: 18 }}>🛡️</Typography>
                  </Box>
                  <Box
                    component="img"
                    src={cpRelationship.partner.avatar}
                    alt={cpRelationship.partner.name}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #fff',
                      boxShadow: '0 0 16px rgba(0,0,0,0.15)',
                      zIndex: 1,
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    component="img"
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #fff',
                      boxShadow: '0 0 16px rgba(0,0,0,0.15)',
                    }}
                  />
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '2px dashed #f9a8d4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#fff0f5',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/cp-space')}
                  >
                    <Typography sx={{ fontSize: 20, color: '#f9a8d4' }}>+</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* 名字 + 徽章 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mb: 0.8 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#333' }}>
                {displayUser.name}
              </Typography>
              <GenderAgeBadge gender={displayUser.gender} age={displayUser.age} />
              <TinyBadge icon="🏅" value={1} color="#f59e0b" />
              <TinyBadge icon="⭐" value={0} color="#3b82f6" />
              <TinyBadge icon="💖" value={6} color="#ec4899" />
            </Box>

            {/* ID */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 12, color: '#999' }}>
                ID: {displayUser.id}
              </Typography>
              <Box
                onClick={copyId}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  bgcolor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: 10, color: '#888' }}>📋</Typography>
              </Box>
            </Box>

            {/* Region */}
            <SectionHeader title="Region" />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#f9fafb',
                borderRadius: 2,
                p: 1.5,
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 13, color: '#333' }}>Region</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 14 }}>{displayUser.flag ?? '🏳️'}</Typography>
                <Typography sx={{ fontSize: 13, color: '#666' }}>
                  {displayUser.region ?? 'Other'}
                </Typography>
              </Box>
            </Box>

            {/* Tags */}
            <SectionHeader title="Tags" />
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                bgcolor: '#f9fafb',
                borderRadius: 2,
                p: 1.5,
              }}
            >
              {(displayUser.tags ?? ['✨ Happy', '🎵 Music']).map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.2,
                    py: 0.4,
                    borderRadius: 2,
                    bgcolor: 'rgba(147,51,234,0.08)',
                    color: '#7c3aed',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* CP 区域 */}
      <Box sx={{ px: 2, mt: 2 }}>
        <SectionHeader
          title="CP"
          action={{ label: 'CP Center', onClick: () => navigate('/cp-space') }}
        />
        <CPCard
          user={displayUser}
          partner={cpRelationship?.partner}
          cpLevel={cpRelationship?.cpLevel}
          loveDays={cpRelationship?.loveDays}
          onClick={() => navigate('/cp-space')}
        />
      </Box>

      {/* Special 区域 */}
      <Box sx={{ px: 2, mt: 2 }}>
        <SectionHeader
          title={`Special (${specialRelationships.length}/9)`}
          action={{ label: 'Special Center', onClick: () => navigate('/special') }}
        />
        {specialRelationships.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
            }}
          >
            {specialRelationships.map((rel) => (
              <SpecialMiniCard key={rel.id} rel={rel} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              py: 3,
              borderRadius: 3,
              bgcolor: '#fff',
              textAlign: 'center',
              color: '#999',
              fontSize: 13,
            }}
          >
            No Special relationships yet
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
