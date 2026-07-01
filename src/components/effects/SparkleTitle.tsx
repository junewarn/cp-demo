import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SparkleTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

const SparkleTitle: React.FC<SparkleTitleProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const characters = text.split('');

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}
      className={className}
    >
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + idx * 0.08,
            ease: 'easeOut',
          }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #9B59B6, #4D96FF, #FF8C00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: 'inherit',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Box>
  );
};

export default SparkleTitle;
