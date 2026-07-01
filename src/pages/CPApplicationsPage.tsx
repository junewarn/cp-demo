import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import UserAvatar from '../components/common/UserAvatar';
import EmptyState from '../components/common/EmptyState';

interface ApplicationEntry {
  id: string;
  userName: string;
  userAvatar: string;
  level: number;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockApplications: ApplicationEntry[] = [
  {
    id: 'app-1',
    userName: '小星星',
    userAvatar: 'https://picsum.photos/seed/app1/200/200',
    level: 8,
    appliedAt: '2025-07-01',
    status: 'pending',
  },
  {
    id: 'app-2',
    userName: '月光',
    userAvatar: 'https://picsum.photos/seed/app2/200/200',
    level: 6,
    appliedAt: '2025-06-28',
    status: 'approved',
  },
  {
    id: 'app-3',
    userName: '海风',
    userAvatar: 'https://picsum.photos/seed/app3/200/200',
    level: 4,
    appliedAt: '2025-06-25',
    status: 'rejected',
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: '待处理', color: '#FFA726' },
  approved: { label: '已通过', color: '#66BB6A' },
  rejected: { label: '已拒绝', color: '#EF5350' },
};

const CPApplicationsPage: React.FC = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title="📋 CP申请记录" showBack />
      <Box sx={{ px: 2, mt: 2 }}>
        {mockApplications.length === 0 ? (
          <EmptyState icon="📋" title="暂无申请记录" description="还没有人申请成为你的CP" />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {mockApplications.map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 2,
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <UserAvatar src={app.userAvatar} alt={app.userName} size={48} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                      {app.userName}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#999' }}>
                      Lv.{app.level} · {app.appliedAt}
                    </Typography>
                  </Box>
                  <Chip
                    label={statusConfig[app.status].label}
                    size="small"
                    sx={{
                      bgcolor: statusConfig[app.status].color + '20',
                      color: statusConfig[app.status].color,
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CPApplicationsPage;
