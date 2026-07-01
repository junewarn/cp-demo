import React from 'react';
import { Box } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 390,
        mx: 'auto',
        minHeight: '100dvh',
        bgcolor: '#fafafa',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: {
          xs: 'none',
          sm: '0 0 40px rgba(0,0,0,0.08)',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
