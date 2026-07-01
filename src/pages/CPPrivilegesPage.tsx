import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import { useAppState } from '../hooks/useAppState';
import { CPState } from '../types';

/** CP 等级总数 */
const CP_LEVEL_COUNT = 13;

/** 各等级的名称和副标题 */
const CP_LEVEL_INFO: Record<number, { title: string; subtitle: string }> = {
  0: { title: '初遇之前', subtitle: '绑定CP解锁更多特权' },
  1: { title: '初识之礼', subtitle: '解锁基础 CP 特权' },
  2: { title: '牵手之约', subtitle: '更多亲密互动' },
  3: { title: '守护之星', subtitle: '守护你的 CP' },
  4: { title: '甜蜜之家', subtitle: '共建爱的小窝' },
  5: { title: '闪耀之星', subtitle: '闪耀整个社区' },
  6: { title: '永恒之约', subtitle: '永恒的承诺' },
  7: { title: '彩虹之恋', subtitle: '七彩斑斓的爱' },
  8: { title: '王者之冠', subtitle: '戴上荣耀的桂冠' },
  9: { title: '黄金之恋', subtitle: '黄金级特权解锁' },
  10: { title: '钻石之心', subtitle: '钻石级尊贵体验' },
  11: { title: '彩虹至尊', subtitle: '至尊级稀有特权' },
  12: { title: '星空之巅', subtitle: '巅峰荣耀' },
  13: { title: '极光之恋', subtitle: '最终极的浪漫' },
};

/** 各等级包含的特权项列表 */
const CP_ITEMS: Record<number, { icon: string; name: string; description: string }[]> = {
  0: [
    { icon: '💕', name: 'CP空间', description: '专属情侣互动空间' },
  ],
  1: [
    { icon: '💝', name: '专属CP标识', description: '在你的个人主页展示CP标识' },
    { icon: '🖼️', name: '情侣头像框', description: '基础款情侣头像装饰框' },
    { icon: '💬', name: 'CP聊天背景', description: '专属粉色聊天背景' },
  ],
  2: [
    { icon: '🎨', name: 'CP昵称颜色', description: '昵称变为粉色渐变' },
    { icon: '😍', name: 'CP表情包', description: '解锁8款CP专属表情' },
    { icon: '✌️', name: '每日签到双倍', description: '签到获得双倍亲密度' },
    { icon: '🌸', name: '情侣空间背景', description: '解锁粉色渐变空间背景' },
  ],
  3: [
    { icon: '🛡️', name: '守护徽章', description: '获得守护者专属徽章' },
    { icon: '🎤', name: 'CP语音消息', description: '发送60秒语音消息' },
    { icon: '✨', name: '礼物特效加成', description: '赠送礼物特效时长+3秒' },
    { icon: '🎵', name: '空间音乐播放', description: '在CP空间播放背景音乐' },
  ],
  4: [
    { icon: '🏠', name: '甜蜜小屋', description: '开启CP专属虚拟小屋' },
    { icon: '📸', name: 'CP相册扩容', description: '相册容量增加至500张' },
    { icon: '📔', name: '情侣日记', description: '开启私密情侣日记本' },
    { icon: '🏅', name: '甜蜜称号', description: '获得"甜蜜CP"金色称号' },
    { icon: '🎧', name: '一起听歌', description: '实时同步听歌功能' },
  ],
  5: [
    { icon: '⭐', name: '闪耀徽章', description: '获得闪耀之星专属徽章' },
    { icon: '💫', name: '弹幕特权', description: '发送彩色弹幕消息' },
    { icon: '🎭', name: 'CP专属皮肤', description: '解锁闪耀主题皮肤' },
    { icon: '🎁', name: 'VIP礼物', description: '解锁VIP专属礼物库' },
  ],
  6: [
    { icon: '💍', name: '永恒戒指', description: '虚拟永恒戒指装饰' },
    { icon: '✍️', name: 'CP签名', description: '自定义情侣签名档' },
    { icon: '📊', name: '排行榜展示', description: '在CP榜单中高亮显示' },
    { icon: '🔮', name: '永恒称号', description: '获得"永恒CP"尊贵称号' },
  ],
  7: [
    { icon: '🌈', name: '彩虹徽章', description: '获得彩虹之恋专属徽章' },
    { icon: '🎨', name: '定制礼物', description: '可以定制专属礼物外观' },
    { icon: '🌟', name: '彩虹特效', description: '所有礼物附带彩虹特效' },
    { icon: '🏗️', name: '空间自定义', description: '完全自定义CP空间布局' },
  ],
  8: [
    { icon: '👑', name: '王者徽章', description: '获得王者CP专属徽章' },
    { icon: '🎆', name: '全屏礼物特效', description: '礼物展示全屏特效' },
    { icon: '📺', name: 'CP直播特权', description: '开启CP专属直播间' },
    { icon: '🏆', name: '王者称号', description: '获得"王者CP"至尊称号' },
  ],
  9: [
    { icon: '🥇', name: '黄金徽章', description: '获得黄金CP专属徽章' },
    { icon: '🖼️', name: '黄金头像框', description: '尊贵黄金头像装饰框' },
    { icon: '📌', name: '优先展示', description: '在推荐列表中优先展示' },
    { icon: '✨', name: '黄金昵称', description: '昵称获得黄金色特效' },
  ],
  10: [
    { icon: '💎', name: '钻石徽章', description: '获得钻石CP专属徽章' },
    { icon: '💳', name: '钻石特权卡', description: '获得每月钻石特权卡' },
    { icon: '🎧', name: '专属客服', description: '开启VIP专属客服通道' },
    { icon: '💠', name: '钻石空间', description: '解锁钻石专属空间主题' },
    { icon: '💝', name: '钻石礼物', description: '解锁钻石级别专属礼物' },
  ],
  11: [
    { icon: '🌈', name: '彩虹至尊徽章', description: '获得彩虹至尊专属徽章' },
    { icon: '📢', name: '全服广播', description: '可以向全服发送祝福广播' },
    { icon: '🎁', name: '至尊礼物', description: '解锁至尊级别稀有礼物' },
    { icon: '🎨', name: '彩虹空间', description: '七色渐变专属空间装饰' },
    { icon: '🖼️', name: '至尊头像', description: '动态彩虹至尊头像' },
  ],
  12: [
    { icon: '🌌', name: '星空徽章', description: '获得星空之巅专属徽章' },
    { icon: '✨', name: '星空特效', description: '全屏星空粒子特效' },
    { icon: '✏️', name: '定制称号', description: '自定义专属称号文字' },
    { icon: '🌠', name: '星空礼物', description: '解锁星空系列限定礼物' },
  ],
  13: [
    { icon: '🌌', name: '极光徽章', description: '获得极光之恋至高徽章' },
    { icon: '🌠', name: '极光特效', description: '全屏极光炫彩特效' },
    { icon: '🎁', name: '传说礼物', description: '解锁传说级别限定礼物' },
    { icon: '🏛️', name: '名人堂', description: '进入CP名人堂永久展示' },
    { icon: '👑', name: '至高称号', description: '获得"极光之恋"至高称号' },
  ],
};

/** 圆形装饰组件：渲染解锁/未解锁/未绑定的中央视觉 */
const CentralVisual: React.FC<{ viewLevel: number; isBound: boolean; isUnlocked: boolean }> = ({
  viewLevel,
  isBound,
  isUnlocked,
}) => {
  // 1) 已绑定 + 已解锁 → 金色特效
  if (isBound && isUnlocked) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#FFD700', mb: 0.5 }}>
          👑
        </Typography>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 40, filter: 'drop-shadow(0 2px 6px rgba(255,215,0,0.4))' }}>
            💖
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              fontSize: 24,
              fontWeight: 800,
              color: '#E91E8C',
            }}
          >
            {viewLevel}
          </Typography>
        </Box>
      </Box>
    );
  }

  // 2) 未绑定 + Lv.0 → 特殊提示
  if (!isBound && viewLevel === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          sx={{
            fontSize: 48,
            filter: 'drop-shadow(0 2px 12px rgba(233,30,140,0.3))',
            opacity: 0.6,
          }}
        >
          💖
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#999', mt: 0.5 }}>
          No CP yet
        </Typography>
      </Box>
    );
  }

  // 3) 未绑定 Lv.>0 或 已绑定但未解锁 → 显示等级号
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{
          fontSize: 48,
          filter: 'drop-shadow(0 2px 12px rgba(233,30,140,0.3))',
          opacity: 0.7,
        }}
      >
        💖
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: '#999',
          mt: 0.5,
        }}
      >
        Lv.{viewLevel}
      </Typography>
    </Box>
  );
};

/** 等级徽章 */
const LevelBadge: React.FC<{ level: number; isUnlocked: boolean }> = ({ level, isUnlocked }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.5,
      px: 1.5,
      py: 0.3,
      borderRadius: 12,
      bgcolor: isUnlocked ? 'rgba(233,30,140,0.12)' : 'rgba(0,0,0,0.05)',
      border: `1px solid ${isUnlocked ? 'rgba(233,30,140,0.25)' : 'rgba(0,0,0,0.08)'}`,
    }}
  >
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 700,
        color: isUnlocked ? '#E91E8C' : '#999',
      }}
    >
      Lv.{level}
    </Typography>
  </Box>
);

const CPPrivilegesPage: React.FC<{ hideTopBar?: boolean }> = ({ hideTopBar }) => {
  const { state } = useAppState();
  const { cpRelationship, cpState } = state;
  const isBound = cpState === CPState.BOUND;
  const currentLevel = cpRelationship?.cpLevel ?? 1;

  // 已绑定时默认显示当前等级，未绑定时从 Lv.0 开始浏览
  const [viewLevel, setViewLevel] = useState(isBound ? currentLevel : 0);

  const info = CP_LEVEL_INFO[viewLevel] ?? { title: '', subtitle: '' };
  const items = CP_ITEMS[viewLevel] ?? [];
  const isUnlocked = isBound && viewLevel > 0 && viewLevel <= currentLevel;

  const minLevel = isBound ? 1 : 0;
  const handlePrev = () => {
    setViewLevel((prev) => Math.max(minLevel, prev - 1));
  };

  const handleNext = () => {
    setViewLevel((prev) => Math.min(CP_LEVEL_COUNT, prev + 1));
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!hideTopBar && <TopBar title="CP Privilege" showBack transparent />}

      <Box sx={{ px: 2, pb: 6, position: 'relative', zIndex: 1 }}>
        {/* ===== 顶部标题区 ===== */}
        <Box sx={{ textAlign: 'center', pt: 2, mb: 2 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 0.6,
              borderRadius: 20,
              bgcolor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#E91E8C' }}>
              👑 CP 特权
            </Typography>
          </Box>
        </Box>

        {/* ===== 中央主视觉区 ===== */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            mb: 2,
          }}
        >
          {/* 浅色卡片容器 替代原来的金色光晕 */}
          <Box
            sx={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: '#FFF8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(233,30,140,0.1)',
              border: '2px solid rgba(233,30,140,0.1)',
              position: 'relative',
            }}
          >
            {/* 内部金色细边框圆 */}
            <Box
              sx={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                border: '2px solid rgba(233,30,140,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isBound && isUnlocked
                  ? 'rgba(255,215,0,0.06)'
                  : 'rgba(255,255,255,0.6)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewLevel}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CentralVisual viewLevel={viewLevel} isBound={isBound} isUnlocked={isUnlocked} />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>

        {/* ===== 等级徽章 + 切换栏 ===== */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <IconButton
            onClick={handlePrev}
            disabled={viewLevel <= minLevel}
            sx={{
              width: 36,
              height: 36,
              bgcolor: viewLevel > minLevel ? 'rgba(233,30,140,0.12)' : 'rgba(0,0,0,0.04)',
              color: viewLevel > minLevel ? '#E91E8C' : '#ccc',
              '&:hover': { bgcolor: 'rgba(233,30,140,0.2)' },
            }}
          >
            ‹
          </IconButton>

          <Box sx={{ textAlign: 'center', minWidth: 140 }}>
            <LevelBadge level={viewLevel} isUnlocked={isUnlocked} />
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#333', mt: 0.5 }}>
              {info.title}
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#999' }}>
              {info.subtitle}
            </Typography>
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={viewLevel >= CP_LEVEL_COUNT}
            sx={{
              width: 36,
              height: 36,
              bgcolor: viewLevel < CP_LEVEL_COUNT ? 'rgba(233,30,140,0.12)' : 'rgba(0,0,0,0.04)',
              color: viewLevel < CP_LEVEL_COUNT ? '#E91E8C' : '#ccc',
              '&:hover': { bgcolor: 'rgba(233,30,140,0.2)' },
            }}
          >
            ›
          </IconButton>
        </Box>

        {/* ===== 特权卡片 - 米白色不透明背景 ===== */}
        <Box
          sx={{
            bgcolor: '#FFF8F0',
            borderRadius: 4,
            border: '1px solid rgba(233,30,140,0.1)',
            p: 2.5,
            boxShadow: '0 4px 16px rgba(233,30,140,0.08)',
          }}
        >
          {/* 卡片标题 */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: '#E91E8C',
              textAlign: 'center',
              mb: 2,
            }}
          >
            ✨ 特权详情 ✨
          </Typography>

          {/* 特权网格 (3列) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
            }}
          >
            {items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: isBound && isUnlocked
                    ? 'rgba(233,30,140,0.04)'
                    : 'rgba(0,0,0,0.02)',
                  border: isBound && isUnlocked
                    ? '1px solid rgba(233,30,140,0.12)'
                    : '1px solid rgba(0,0,0,0.06)',
                  opacity: isBound && isUnlocked ? 1 : 0.7,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontSize: 26, mb: 0.5 }}>
                  {item.icon}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#333',
                    mb: 0.2,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: '#999',
                    lineHeight: 1.3,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 底部爱心装饰 */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography sx={{ fontSize: 20, opacity: 0.25 }}>💕</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CPPrivilegesPage;
