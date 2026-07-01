import React from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import ProfileCard from '../components/common/ProfileCard';
import SpecialTypeCard from '../components/special/SpecialTypeCard';
import { useAppState } from '../hooks/useAppState';
import { ViewMode } from '../types';

const ProfilePage: React.FC = () => {
  const { state } = useAppState();
  const { currentUser, viewingUser, viewMode, cpRelationship, specialRelationships } = state;

  const isSelf = viewMode === ViewMode.SELF;
  const displayUser = isSelf ? currentUser : viewingUser || currentUser;

  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title={isSelf ? '👤 我的资料' : '👤 用户资料'} showBack />

      <Box sx={{ px: 2, mt: 2 }}>
        <ProfileCard
          user={displayUser}
          cpRelationship={cpRelationship}
          isOwner={isSelf}
          showSweep={!isSelf}
        />
      </Box>

      {/* Special 9格网格 */}
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#555', mb: 1.5 }}>
          ✨ Special 关系
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1.5,
          }}
        >
          {Array.from({ length: 9 }).map((_, idx) => {
            const rel = specialRelationships[idx];
            if (rel) {
              return (
                <SpecialTypeCard
                  key={rel.id}
                  relationship={rel}
                  compact
                />
              );
            }
            return (
              <Box
                key={`empty-${idx}`}
                sx={{
                  aspectRatio: '1',
                  borderRadius: 2,
                  border: '1.5px dashed #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#fafafa',
                }}
              >
                <Typography sx={{ fontSize: 20, color: '#ccc' }}>+</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
