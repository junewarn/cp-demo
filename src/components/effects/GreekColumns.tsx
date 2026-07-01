import React from 'react';
import { Box } from '@mui/material';

const GreekColumns: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 左柱 */}
      <Box
        sx={{
          position: 'absolute',
          left: 6,
          top: 0,
          bottom: 0,
          width: 20,
          background:
            'linear-gradient(180deg, #FFD700 0%, #C9A96E 8%, #A68A4F 25%, #C9A96E 50%, #A68A4F 75%, #C9A96E 92%, #FFD700 100%)',
          opacity: 0.15,
          borderRadius: '10px 10px 0 0',
          boxShadow: '3px 0 10px rgba(201, 169, 110, 0.1)',
        }}
      />
      {/* 左柱柱顶装饰 */}
      <Box
        sx={{
          position: 'absolute',
          left: 2,
          top: 0,
          width: 28,
          height: 12,
          background:
            'linear-gradient(180deg, #FFD700, #C9A96E)',
          opacity: 0.2,
          borderRadius: '4px 4px 0 0',
        }}
      />

      {/* 右柱 */}
      <Box
        sx={{
          position: 'absolute',
          right: 6,
          top: 0,
          bottom: 0,
          width: 20,
          background:
            'linear-gradient(180deg, #FFD700 0%, #C9A96E 8%, #A68A4F 25%, #C9A96E 50%, #A68A4F 75%, #C9A96E 92%, #FFD700 100%)',
          opacity: 0.15,
          borderRadius: '10px 10px 0 0',
          boxShadow: '-3px 0 10px rgba(201, 169, 110, 0.1)',
        }}
      />
      {/* 右柱柱顶装饰 */}
      <Box
        sx={{
          position: 'absolute',
          right: 2,
          top: 0,
          width: 28,
          height: 12,
          background:
            'linear-gradient(180deg, #FFD700, #C9A96E)',
          opacity: 0.2,
          borderRadius: '4px 4px 0 0',
        }}
      />

      {/* 粉色帷幕遮罩 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,182,193,0.12), rgba(255,105,180,0.06), rgba(255,182,193,0.03))',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default GreekColumns;
