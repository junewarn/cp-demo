import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CoupleAvatarGroup from './CoupleAvatarGroup';
import AchievementRow from './AchievementRow';
import MemoryList from './MemoryList';
import GiftBanner from '../effects/GiftBanner';
import EntranceEffect from '../effects/EntranceEffect';
import GreekColumns from '../effects/GreekColumns';
import HeartPulseLine from '../effects/HeartPulseLine';
import CPTasksPage from '../../pages/CPTasksPage';
import CPPrivilegesPage from '../../pages/CPPrivilegesPage';
import CPRankingPage from '../../pages/CPRankingPage';
import ConfirmUnbindModal from '../common/ConfirmUnbindModal';
import { useAppState } from '../../hooks/useAppState';
import { formatNumber } from '../../utils/helpers';
import { HIGH_VALUE_GIFT_THRESHOLD } from '../../utils/constants';
import { ViewMode, CPState } from '../../types';
import { mockOtherCP } from '../../data/mockCP';

const BoundView: React.FC = () => {
  const { state, dispatch } = useAppState();
  const { cpRelationship, viewMode, otherCPState } = state;
  const [showEntrance, setShowEntrance] = useState(false);
  const [showUnbindConfirm, setShowUnbindConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'space' | 'tasks' | 'privileges' | 'ranking'>('space');

  const effectiveRelationship = (viewMode === ViewMode.OTHER && !cpRelationship)
    ? mockOtherCP
    : cpRelationship;

  if (!effectiveRelationship) return null;

  const isOtherView = viewMode === ViewMode.OTHER;
  const totalGiftValue = effectiveRelationship.giftRecords.reduce((sum, g) => sum + g.value, 0);
  const showGiftBanner = totalGiftValue >= HIGH_VALUE_GIFT_THRESHOLD;

  return (
    <Box sx={{ pb: 10, position: 'relative' }}>
      <GreekColumns />

      <GiftBanner visible={showGiftBanner} giftCount={totalGiftValue} />

      <EntranceEffect
        user1Name={state.currentUser.name}
        user1Avatar={state.currentUser.avatar}
        user2Name={effectiveRelationship.partner.name}
        user2Avatar={effectiveRelationship.partner.avatar}
        level={effectiveRelationship.cpLevel}
        trigger={showEntrance}
        onComplete={() => setShowEntrance(false)}
      />

      {/* 顶部信息卡 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          pb: 2,
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(180deg, rgba(26,10,46,0.6) 0%, rgba(45,27,78,0.3) 100%)',
            backdropFilter: 'blur(8px)',
            pb: 2,
            pt: 1,
          }}
        >
          <CoupleAvatarGroup
            user1={state.currentUser}
            user2={effectiveRelationship.partner}
            level={effectiveRelationship.cpLevel}
            is7DayTaskComplete={effectiveRelationship.is7DayTaskComplete}
          />

          {/* 脉冲爱心线 */}
          {!effectiveRelationship.is7DayTaskComplete && <HeartPulseLine />}

          {/* 统计数据 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 1,
              px: 2,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#FFD700' }}>
                {effectiveRelationship.loveDays}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Love Days</Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: 'rgba(255,255,255,0.15)' }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#FF6B9D' }}>
                {formatNumber(effectiveRelationship.intimacyScore)}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Intimacy</Typography>
            </Box>
            <Box sx={{ width: 1, bgcolor: 'rgba(255,255,255,0.15)' }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#FFD700' }}>
                {formatNumber(totalGiftValue)}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Gift Gold</Typography>
            </Box>
          </Box>

          {/* 入场特效按钮 */}
          {!isOtherView && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowEntrance(true)}
                sx={{
                  borderRadius: 16,
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 12,
                  px: 2,
                }}
              >
                ✨ 播放入场特效
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Tab 栏 */}
      <Box
        sx={{
          display: 'flex',
          px: 2,
          mt: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 20,
            p: 0.5,
            gap: 0.5,
          }}
        >
          {[
            { key: 'space', icon: '🏠', label: 'CP空间' },
            { key: 'tasks', icon: '📋', label: '任务' },
            { key: 'privileges', icon: '👑', label: '特权' },
            { key: 'ranking', icon: '🏆', label: '榜单' },
          ].map((tab) => (
            <Box
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              sx={{
                flex: 1,
                textAlign: 'center',
                py: 1.2,
                px: 1,
                borderRadius: 20,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: activeTab === tab.key ? 700 : 500,
                color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.55)',
                background: activeTab === tab.key
                  ? 'linear-gradient(135deg, #E91E8C, #FF6B9D)'
                  : 'transparent',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                '&:active': { transform: 'scale(0.96)' },
              }}
            >
              <Box component="span" sx={{ fontSize: 14 }}>{tab.icon}</Box>
              {tab.label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* 内容区 */}
      {activeTab === 'space' && (
        <>
          {/* 成就勋章行 */}
          <AchievementRow badges={effectiveRelationship.badges} />

          {/* CP记忆列表 */}
          <MemoryList memories={effectiveRelationship.memories} />

        </>
      )}

      {activeTab === 'tasks' && <CPTasksPage hideTopBar />}
      {activeTab === 'privileges' && <CPPrivilegesPage hideTopBar />}
      {activeTab === 'ranking' && <CPRankingPage hideTopBar />}

      {/* 绑定日期 */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          💝 绑定于 {effectiveRelationship.boundDate}
        </Typography>
      </Box>

      {/* 底部操作区 */}
      <Box sx={{ textAlign: 'center', mt: 2, pb: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => dispatch({
                type: 'SET_VIEW_MODE',
                payload: viewMode === ViewMode.SELF ? ViewMode.OTHER : ViewMode.SELF,
              })}
              sx={{
                borderRadius: 28,
                px: 5,
                py: 1.2,
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: 'rgba(255,255,255,0.8)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              {viewMode === ViewMode.SELF ? '👁️ 第三方视角' : '👁️ 自己视角'}
            </Button>
          </motion.div>

          {viewMode === ViewMode.OTHER && (
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                onClick={() => dispatch({ type: 'SET_OTHER_CP_STATE', payload: otherCPState === CPState.BOUND ? CPState.UNBOUND : CPState.BOUND })}
                sx={{
                  borderRadius: 28,
                  px: 5,
                  py: 1.2,
                  fontSize: 13,
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: 'rgba(255,255,255,0.8)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                {otherCPState === CPState.BOUND ? '🔓 切换第三方未绑定' : '🔗 切换第三方已绑定'}
              </Button>
            </motion.div>
          )}

          {!isOtherView && (
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => setShowUnbindConfirm(true)}
              sx={{
                borderRadius: 28,
                px: 5,
                py: 1.2,
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: 'rgba(255,255,255,0.8)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              🔄 切换未绑定
            </Button>
          </motion.div>
          )}
        </Box>
      </Box>

      {/* 解除 CP 确认弹窗 */}
      <ConfirmUnbindModal
        open={showUnbindConfirm}
        onClose={() => setShowUnbindConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'UNBIND_CP' });
          setShowUnbindConfirm(false);
        }}
        title="💔 解除 CP 关系"
        description="确定要解除 CP 关系吗？"
        warningText="⚠️ 解除后 CP 等级、亲密度及所有相关数据将被清除，不可恢复"
      />
    </Box>
  );
};

export default BoundView;
