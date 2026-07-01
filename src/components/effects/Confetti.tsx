import React, { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';

interface ConfettiPiece {
  id: number;
  left: number;
  top: number;
  color: string;
  borderRadius: string;
  animationDelay: number;
  animationDuration: number;
  size: number;
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

const COLORS: string[] = [
  '#a855f7', '#ec4899', '#f59e0b', '#8b5cf6',
  '#3b82f6', '#22c55e', '#f472b6', '#c084fc',
];

const PIECE_COUNT = 50;
const CLEANUP_MS = 3000;

const Confetti: React.FC<ConfettiProps> = ({ active, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const generatePieces = useCallback((): ConfettiPiece[] => {
    return Array.from({ length: PIECE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -(Math.random() * 120),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      borderRadius: Math.random() > 0.5 ? '50%' : '3px',
      animationDelay: Math.random() * 0.5,
      animationDuration: 1 + Math.random() * 2,
      size: 8 + Math.random() * 8,
    }));
  }, []);

  useEffect(() => {
    if (active) {
      setPieces(generatePieces());
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, CLEANUP_MS);
      return () => clearTimeout(timer);
    } else {
      setPieces([]);
    }
  }, [active, generatePieces, onComplete]);

  if (!active && pieces.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'hidden',
      }}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.id}
          sx={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: `${piece.top}px`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.borderRadius,
            animation: `confettiFall ${piece.animationDuration}s ease-out ${piece.animationDelay}s forwards`,
            '@keyframes confettiFall': {
              '0%': {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1,
              },
              '100%': {
                transform: `translateY(100vh) rotate(${720 + Math.random() * 360}deg)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default Confetti;
