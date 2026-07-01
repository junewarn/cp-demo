import { CPTask, CheckInRecord } from '../types';

export const mockTasks: CPTask[] = [
  {
    id: 'task-1',
    day: 1,
    title: '初次问候',
    description: '给你的CP发送一条问候消息',
    status: 'completed',
    rewardName: '甜蜜气泡',
    rewardIcon: '💬',
    rewardType: 'bubble',
    rewardDuration: 3,
    completed: true,
  },
  {
    id: 'task-2',
    day: 2,
    title: '语音传情',
    description: '发送一条语音消息给CP',
    status: 'completed',
    rewardName: '甜蜜气泡',
    rewardIcon: '💬',
    rewardType: 'bubble',
    rewardDuration: 3,
    completed: true,
  },
  {
    id: 'task-3',
    day: 3,
    title: '礼物相赠',
    description: '送一个小礼物给你的CP',
    status: 'completed',
    rewardName: '甜蜜气泡',
    rewardIcon: '💬',
    rewardType: 'bubble',
    rewardDuration: 3,
    completed: true,
  },
  {
    id: 'task-4',
    day: 4,
    title: '一起听歌',
    description: '和CP一起听一首歌',
    status: 'completed',
    rewardName: '浪漫座驾',
    rewardIcon: '🚗',
    rewardType: 'vehicle',
    rewardDuration: 5,
    completed: true,
  },
  {
    id: 'task-5',
    day: 5,
    title: '合照留念',
    description: '上传一张你们的合照',
    status: 'completed',
    rewardName: '浪漫座驾',
    rewardIcon: '🚗',
    rewardType: 'vehicle',
    rewardDuration: 5,
    completed: true,
  },
  {
    id: 'task-6',
    day: 6,
    title: '日记共享',
    description: '写一篇CP日记',
    status: 'available',
    rewardName: '专属勋章',
    rewardIcon: '🏅',
    rewardType: 'badge',
    rewardDuration: -1,
    completed: false,
  },
  {
    id: 'task-7',
    day: 7,
    title: '七日之约',
    description: '连续7天完成所有打卡任务',
    status: 'locked',
    rewardName: '专属勋章',
    rewardIcon: '🏅',
    rewardType: 'badge',
    rewardDuration: -1,
    completed: false,
  },
];

const today = new Date();
const formatDate = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const mockCheckInRecords: CheckInRecord[] = (() => {
  const records: CheckInRecord[] = [];
  for (let i = -60; i <= 5; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = formatDate(d);
    const isChecked = i <= -1 && Math.random() > 0.2;
    records.push({
      id: `check-${dateStr}`,
      date: dateStr,
      checked: isChecked,
    });
  }
  return records;
})();
