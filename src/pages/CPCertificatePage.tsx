import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import CertificateCard from '../components/cp-certificate/CertificateCard';
import CertificateRewardGrid from '../components/cp-certificate/CertificateRewardGrid';
import EmptyState from '../components/common/EmptyState';
import { useAppState } from '../hooks/useAppState';
import { mockCertificates } from '../data/mockCertificates';
import { CPState } from '../types';

const CPCertificatePage: React.FC = () => {
  const { state } = useAppState();
  const { cpState, cpRelationship } = state;

  if (cpState === CPState.UNBOUND) {
    return (
      <Box>
        <TopBar title="📜 CP证书" showBack />
        <EmptyState
          icon="📜"
          title="暂无证书"
          description="绑定CP后解锁专属证书"
        />
      </Box>
    );
  }

  const currentLevel = cpRelationship?.cpLevel ?? 1;

  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title="📜 CP证书" showBack />
      <Box sx={{ px: 2, mt: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 600,
              color: '#555',
              mb: 1,
            }}
          >
            当前CP等级: Lv.{currentLevel}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 12,
              color: '#999',
              mb: 2,
            }}
          >
            可查看 Lv.1 ~ Lv.{currentLevel} 的证书
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mockCertificates
            .filter((cert) => cert.level <= currentLevel)
            .map((cert) => (
              <Box key={cert.level}>
                <CertificateCard certificate={cert} />
                <CertificateRewardGrid rewards={cert.rewards} />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CPCertificatePage;
