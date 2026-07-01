import { CPPrivilege, PrivilegeItem } from '../types';

function makeItems(
  level: number,
  items: { name: string; description: string; icon: string }[],
): PrivilegeItem[] {
  const unlocked = level <= 9;
  return items.map((item, i) => ({
    ...item,
    unlocked: unlocked || (level === 9 && i === 0),
  }));
}

export const mockPrivileges: CPPrivilege[] = [
  {
    level: 1,
    title: '初识之礼',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(1, [
      { name: '专属CP标识', description: '在你的个人主页展示CP标识', icon: '💝' },
      { name: '情侣头像框', description: '基础款情侣头像装饰框', icon: '🖼️' },
      { name: 'CP聊天背景', description: '专属粉色聊天背景', icon: '💬' },
    ]),
  },
  {
    level: 2,
    title: '牵手之约',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(2, [
      { name: 'CP昵称颜色', description: '昵称变为粉色渐变', icon: '🎨' },
      { name: 'CP表情包', description: '解锁8款CP专属表情', icon: '😍' },
      { name: '每日签到双倍', description: '签到获得双倍亲密度', icon: '✌️' },
      { name: '情侣空间背景', description: '解锁粉色渐变空间背景', icon: '🌸' },
    ]),
  },
  {
    level: 3,
    title: '守护之星',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(3, [
      { name: '守护徽章', description: '获得守护者专属徽章', icon: '🛡️' },
      { name: 'CP语音消息', description: '发送60秒语音消息', icon: '🎤' },
      { name: '礼物特效加成', description: '赠送礼物特效时长+3秒', icon: '✨' },
      { name: '空间音乐播放', description: '在CP空间播放背景音乐', icon: '🎵' },
    ]),
  },
  {
    level: 4,
    title: '甜蜜之家',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(4, [
      { name: '甜蜜小屋', description: '开启CP专属虚拟小屋', icon: '🏠' },
      { name: 'CP相册扩容', description: '相册容量增加至500张', icon: '📸' },
      { name: '情侣日记', description: '开启私密情侣日记本', icon: '📔' },
      { name: '甜蜜称号', description: '获得"甜蜜CP"金色称号', icon: '🏅' },
      { name: '一起听歌', description: '实时同步听歌功能', icon: '🎧' },
    ]),
  },
  {
    level: 5,
    title: '闪耀之星',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(5, [
      { name: '闪耀徽章', description: '获得闪耀之星专属徽章', icon: '⭐' },
      { name: '弹幕特权', description: '发送彩色弹幕消息', icon: '💫' },
      { name: 'CP专属皮肤', description: '解锁闪耀主题皮肤', icon: '🎭' },
      { name: 'VIP礼物', description: '解锁VIP专属礼物库', icon: '🎁' },
    ]),
  },
  {
    level: 6,
    title: '永恒之约',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(6, [
      { name: '永恒戒指', description: '虚拟永恒戒指装饰', icon: '💍' },
      { name: 'CP签名', description: '自定义情侣签名档', icon: '✍️' },
      { name: '排行榜展示', description: '在CP榜单中高亮显示', icon: '📊' },
      { name: '永恒称号', description: '获得"永恒CP"尊贵称号', icon: '🔮' },
    ]),
  },
  {
    level: 7,
    title: '彩虹之恋',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(7, [
      { name: '彩虹徽章', description: '获得彩虹之恋专属徽章', icon: '🌈' },
      { name: '定制礼物', description: '可以定制专属礼物外观', icon: '🎨' },
      { name: '彩虹特效', description: '所有礼物附带彩虹特效', icon: '🌟' },
      { name: '空间自定义', description: '完全自定义CP空间布局', icon: '🏗️' },
    ]),
  },
  {
    level: 8,
    title: '王者之冠',
    backgroundClass: 'bg-lv1-8',
    items: makeItems(8, [
      { name: '王者徽章', description: '获得王者CP专属徽章', icon: '👑' },
      { name: '全屏礼物特效', description: '礼物展示全屏特效', icon: '🎆' },
      { name: 'CP直播特权', description: '开启CP专属直播间', icon: '📺' },
      { name: '王者称号', description: '获得"王者CP"至尊称号', icon: '🏆' },
    ]),
  },
  {
    level: 9,
    title: '黄金之恋',
    backgroundClass: 'cp-lv9-bg',
    items: makeItems(9, [
      { name: '黄金徽章', description: '获得黄金CP专属徽章', icon: '🥇' },
      { name: '黄金头像框', description: '尊贵黄金头像装饰框', icon: '🖼️' },
      { name: '优先展示', description: '在推荐列表中优先展示', icon: '📌' },
      { name: '黄金昵称', description: '昵称获得黄金色特效', icon: '✨' },
    ]),
  },
  {
    level: 10,
    title: '钻石之心',
    backgroundClass: 'cp-lv10-bg',
    items: [
      { name: '钻石徽章', icon: '💎', description: '获得钻石CP专属徽章', unlocked: false },
      { name: '钻石特权卡', icon: '💳', description: '获得每月钻石特权卡', unlocked: false },
      { name: '专属客服', icon: '🎧', description: '开启VIP专属客服通道', unlocked: false },
      { name: '钻石空间', icon: '💠', description: '解锁钻石专属空间主题', unlocked: false },
      { name: '钻石礼物', icon: '💝', description: '解锁钻石级别专属礼物', unlocked: false },
    ],
  },
  {
    level: 11,
    title: '彩虹至尊',
    backgroundClass: 'cp-lv11-bg',
    items: [
      { name: '彩虹至尊徽章', icon: '🌈', description: '获得彩虹至尊专属徽章', unlocked: false },
      { name: '全服广播', icon: '📢', description: '可以向全服发送祝福广播', unlocked: false },
      { name: '至尊礼物', icon: '🎁', description: '解锁至尊级别稀有礼物', unlocked: false },
      { name: '彩虹空间', icon: '🎨', description: '七色渐变专属空间装饰', unlocked: false },
      { name: '至尊头像', icon: '🖼️', description: '动态彩虹至尊头像', unlocked: false },
    ],
  },
  {
    level: 12,
    title: '星空之巅',
    backgroundClass: 'cp-lv12-bg',
    items: [
      { name: '星空徽章', icon: '🌌', description: '获得星空之巅专属徽章', unlocked: false },
      { name: '星空特效', icon: '✨', description: '全屏星空粒子特效', unlocked: false },
      { name: '定制称号', icon: '✏️', description: '自定义专属称号文字', unlocked: false },
      { name: '星空礼物', icon: '🌠', description: '解锁星空系列限定礼物', unlocked: false },
    ],
  },
  {
    level: 13,
    title: '极光之恋',
    backgroundClass: 'cp-lv13-bg',
    items: [
      { name: '极光徽章', icon: '🌌', description: '获得极光之恋至高徽章', unlocked: false },
      { name: '极光特效', icon: '🌠', description: '全屏极光炫彩特效', unlocked: false },
      { name: '传说礼物', icon: '🎁', description: '解锁传说级别限定礼物', unlocked: false },
      { name: '名人堂', icon: '🏛️', description: '进入CP名人堂永久展示', unlocked: false },
      { name: '至高称号', icon: '👑', description: '获得"极光之恋"至高称号', unlocked: false },
    ],
  },
];
