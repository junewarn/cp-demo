import { CPCertificate, CertificateReward } from '../types';

function makeRewards(level: number): CertificateReward[] {
  const baseRewards: CertificateReward[] = [
    { icon: '💝', name: '专属CP标识', description: '尊贵身份象征' },
    { icon: '🖼️', name: '情侣头像框', description: '专属装饰边框' },
    { icon: '💬', name: 'CP聊天背景', description: '专属聊天主题' },
    { icon: '🎁', name: '升级礼物包', description: '内含珍稀礼物×3' },
    { icon: '✨', name: '亲密度加成', description: `亲密度获取+${level * 10}%` },
    { icon: '🌟', name: '特效加成', description: `等级特效时长+${level * 2}秒` },
    { icon: '🎵', name: '空间音乐', description: '解锁专属BGM' },
    { icon: '📸', name: '相册扩容', description: `相册容量+${level * 100}张` },
    { icon: '🏠', name: '甜蜜小屋装饰', description: '虚拟小屋新装饰' },
    { icon: '👑', name: '称号升级', description: '获得更高级称号' },
    { icon: '📊', name: '榜单高亮', description: '排行榜中特殊标识' },
    { icon: '💎', name: '钻石礼物', description: '解锁钻石级礼物' },
  ];

  return baseRewards.slice(0, Math.min(12, level + 2));
}

export const mockCertificates: CPCertificate[] = [
  { level: 1, romanNumeral: 'I', colorTheme: '#FFE0EC', rewards: makeRewards(1) },
  { level: 2, romanNumeral: 'II', colorTheme: '#FFD1E0', rewards: makeRewards(2) },
  { level: 3, romanNumeral: 'III', colorTheme: '#B3E5FC', rewards: makeRewards(3) },
  { level: 4, romanNumeral: 'IV', colorTheme: '#F8BBD0', rewards: makeRewards(4) },
  { level: 5, romanNumeral: 'V', colorTheme: '#FFE082', rewards: makeRewards(5) },
  { level: 6, romanNumeral: 'VI', colorTheme: '#CE93D8', rewards: makeRewards(6) },
  { level: 7, romanNumeral: 'VII', colorTheme: '#EF9A9A', rewards: makeRewards(7) },
  { level: 8, romanNumeral: 'VIII', colorTheme: '#FFCC80', rewards: makeRewards(8) },
  { level: 9, romanNumeral: 'IX', colorTheme: '#1a1a3e', rewards: makeRewards(9) },
  { level: 10, romanNumeral: 'X', colorTheme: '#c9a96e', rewards: makeRewards(10) },
  { level: 11, romanNumeral: 'XI', colorTheme: '#FF6B6B', rewards: makeRewards(11) },
  { level: 12, romanNumeral: 'XII', colorTheme: '#4a0e6b', rewards: makeRewards(12) },
  { level: 13, romanNumeral: 'XIII', colorTheme: '#FF0080', rewards: makeRewards(13) },
];
