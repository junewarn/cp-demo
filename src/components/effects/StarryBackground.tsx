import React, { useMemo } from 'react';
import { Box } from '@mui/material';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
}

interface StarryBackgroundProps {
  starCount?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ starCount = 50 }) => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, [starCount]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background:
          'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #4a1942 60%, #6b1d52 100%)',
        zIndex: 0,
      }}
    >
      {/* 星星粒子 */}
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            bgcolor: '#fff',
            opacity: star.opacity,
            animation: `star-twinkle 2s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* 粉色帷幕渐变覆盖 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,182,193,0.08), rgba(255,105,180,0.04), transparent)',
          animation: 'curtain-wave 4s ease-in-out infinite',
        }}
      />
    </Box>
  );
};

export default StarryBackground;
