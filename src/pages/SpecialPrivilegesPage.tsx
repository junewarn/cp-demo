import React from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/layout/TopBar';
import CrystalButton from '../components/common/CrystalButton';
import { useNavigate } from 'react-router-dom';

const SpecialPrivilegesPage: React.FC = () => {
  const navigate = useNavigate();

  const privileges = [
    { icon: '💎', name: '专属标识', desc: '在个人主页展示Special关系标识' },
    { icon: '🎨', name: '关系主题色', desc: 'Bestie蓝 / Soulmate紫 / Homie金橙' },
    { icon: '🎁', name: '专属礼物', desc: '每种关系类型解锁专属礼物库' },
    { icon: '🏅', name: '关系勋章', desc: '不同等级解锁对应关系勋章' },
    { icon: '📊', name: '榜单优先', desc: '在Special榜单中优先展示' },
    { icon: '✨', name: '特效加成', desc: '赠送礼物附带关系专属特效' },
  ];

  return (
    <Box>
      <TopBar title="👑 Special特权" showBack />
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 600,
            color: '#555',
            mb: 2,
          }}
        >
          每种Special关系都有专属特权等你解锁
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {privileges.map((p) => (
            <Box
              key={p.name}
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
              <Typography sx={{ fontSize: 28 }}>{p.icon}</Typography>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                  {p.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#888' }}>{p.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CrystalButton onClick={() => navigate('/special-invite')} icon="📨">
            邀请好友建立Special关系
          </CrystalButton>
        </Box>

      </Box>
    </Box>
  );
};

export default SpecialPrivilegesPage;
