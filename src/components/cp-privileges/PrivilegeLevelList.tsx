import React, { useState } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PrivilegeCard from './PrivilegeCard';
import { CPPrivilege } from '../../types';

interface PrivilegeLevelListProps {
  privileges: CPPrivilege[];
  currentLevel: number;
}

const PrivilegeLevelList: React.FC<PrivilegeLevelListProps> = ({
  privileges,
  currentLevel,
}) => {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(() => {
    const s = new Set<number>();
    s.add(currentLevel);
    return s;
  });

  const toggleLevel = (level: number) => {
    setExpandedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, px: 2, pb: 10 }}>
      {privileges.map((priv) => {
        const isExpanded = expandedLevels.has(priv.level);
        return (
          <Box key={priv.level}>
            <Box
              onClick={() => toggleLevel(priv.level)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                py: 0.5,
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#555' }}>
                Lv.{priv.level} · {priv.title}
              </Typography>
              <IconButton size="small">
                {isExpanded ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
            <Collapse in={isExpanded} timeout={300}>
              <Box sx={{ mt: 0.5 }}>
                <PrivilegeCard privilege={priv} currentLevel={currentLevel} />
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
};

export default PrivilegeLevelList;
