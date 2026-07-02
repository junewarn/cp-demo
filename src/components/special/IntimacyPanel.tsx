import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { SpecialRelationship } from '../../types';
import { SPECIAL_TYPE_CONFIG } from '../../utils/constants';

interface IntimacyPanelProps {
  relationships: SpecialRelationship[];
  onInvite?: () => void;
  onRemove?: (id: string) => void;
}

/** 单个 Intimacy 卡片（紧凑版，避免 3 列溢出） */
const IntimacyCard: React.FC<{
  rel: SpecialRelationship;
  index: number;
  onRemove?: (id: string) => void;
}> = ({ rel, index, onRemove }) => {
  const config = SPECIAL_TYPE_CONFIG[rel.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
          p: 1,
          borderRadius: 2,
          border: `1px solid ${config.border}33`,
          background: `linear-gradient(135deg, ${config.bg}66, #fff)`,
          minWidth: 0,
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {onRemove && (
          <Box
            onClick={(e) => {
              e.stopPropagation();
              onRemove(rel.id);
            }}
            sx={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 18,
              height: 18,
              borderRadius: '50%',
              bgcolor: '#ef4444',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              border: '1.5px solid #fff',
              zIndex: 2,
            }}
          >
            ✕
          </Box>
        )}
        <Box
          component="img"
          src={rel.partner.avatar}
          alt={rel.partner.name}
          sx={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${config.color}`,
            boxShadow: `0 2px 6px ${config.color}33`,
            flexShrink: 0,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
            }}
          >
            {rel.partner.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: config.color,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {rel.days} Intimacy
          </Typography>
          <Box
            sx={{
              display: 'inline-block',
              px: 0.6,
              py: 0.1,
              borderRadius: 1,
              bgcolor: config.bg,
              color: config.color,
              fontSize: 9,
              fontWeight: 700,
              mt: 0.2,
            }}
          >
            {config.label}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

const IntimacyPanel: React.FC<IntimacyPanelProps> = ({
  relationships,
  onRemove,
}) => {
  if (relationships.length === 0) return null;

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      {/* 标题栏 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 800,
            background:
              'linear-gradient(135deg, #7c3aed, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          💜 Intimacy
        </Typography>
      </Box>

      {/* 卡片网格 - 3 列，minmax 防止溢出 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 1,
        }}
      >
        {relationships.map((rel, i) => (
          <IntimacyCard key={rel.id} rel={rel} index={i} onRemove={onRemove} />
        ))}
      </Box>
    </Box>
  );
};

export default IntimacyPanel;
