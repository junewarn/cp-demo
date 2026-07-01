import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import PageContainer from './components/layout/PageContainer';
import BottomNav from './components/layout/BottomNav';

const CPSpacePage = lazy(() => import('./pages/CPSpacePage'));
const CPTasksPage = lazy(() => import('./pages/CPTasksPage'));
const CPPrivilegesPage = lazy(() => import('./pages/CPPrivilegesPage'));
const SpecialPage = lazy(() => import('./pages/SpecialPage'));
const CPRankingPage = lazy(() => import('./pages/CPRankingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CPCertificatePage = lazy(() => import('./pages/CPCertificatePage'));
const CPRulesPage = lazy(() => import('./pages/CPRulesPage'));
const CPApplicationsPage = lazy(() => import('./pages/CPApplicationsPage'));
const SpecialRankingPage = lazy(() => import('./pages/SpecialRankingPage'));
const SpecialPrivilegesPage = lazy(() => import('./pages/SpecialPrivilegesPage'));
const SpecialInvitePage = lazy(() => import('./pages/SpecialInvitePage'));
const SpecialSelectFriendPage = lazy(() => import('./pages/SpecialSelectFriendPage'));
const VoiceRoomPage = lazy(() => import('./pages/VoiceRoomPage'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E8C',
      light: '#F8BBD0',
      dark: '#AD1457',
    },
    secondary: {
      main: '#FF6B9D',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          fontWeight: 600,
        },
      },
    },
  },
});

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-heart-beat text-4xl">💕</div>
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <PageContainer>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/cp-space" replace />} />
                <Route path="/cp-space" element={<CPSpacePage />} />
                <Route path="/cp-tasks" element={<CPTasksPage />} />
                <Route path="/cp-privileges" element={<CPPrivilegesPage />} />
                <Route path="/cp-ranking" element={<CPRankingPage />} />
                <Route path="/cp-rules" element={<CPRulesPage />} />
                <Route path="/cp-applications" element={<CPApplicationsPage />} />
                <Route path="/cp-certificate" element={<CPCertificatePage />} />
                <Route path="/special" element={<SpecialPage />} />
                <Route path="/special-ranking" element={<SpecialRankingPage />} />
                <Route path="/special-privileges" element={<SpecialPrivilegesPage />} />
                <Route path="/special-invite" element={<SpecialInvitePage />} />
                <Route path="/special-select-friend" element={<SpecialSelectFriendPage />} />
                <Route path="/voice-room" element={<VoiceRoomPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/cp-space" replace />} />
              </Routes>
            </Suspense>
            <BottomNav />
          </PageContainer>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
