import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import TopBar from '../components/layout/TopBar';

const CPRulesPage: React.FC = () => {
  const rules = [
    { title: '💕 CP绑定', desc: '双方同意后即可绑定成为CP，开启专属情侣空间。绑定后双方头像将展示金色翅膀皇冠装饰。' },
    { title: '📅 每日打卡', desc: '绑定后每日可完成打卡任务，积累亲密度提升CP等级。连续7天完成所有任务将解锁特殊勋章。' },
    { title: '🎁 赠送礼物', desc: '可以为CP赠送礼物，提升亲密值和CP等级。高价值礼物（≥900000金币）将触发顶部横幅特效。' },
    { title: '🏆 等级提升', desc: 'CP共有13个等级。Lv.1-8为基础等级，Lv.9+为特殊等级，解锁专属渐变特效和更多特权。' },
    { title: '⭐ 勋章体系', desc: 'Lv.1-8显示爱心勋章（无数字），Lv.9-12显示金色数字勋章。未完成7日任务时显示爱心脉冲线。' },
    { title: '📜 CP证书', desc: '每个等级对应独立证书设计，包含罗马数字、翅膀和皇冠装饰，以及3×4奖励网格。' },
    { title: '🔒 解除绑定', desc: '双方均可申请解除绑定，解除后有24小时冷却期。解除后将失去所有CP相关数据和特权。' },
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <TopBar title="📖 CP规则说明" showBack />
      <Box sx={{ px: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {rules.map((rule, idx) => (
            <Box key={idx}>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#333', mb: 0.5 }}>
                {rule.title}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
                {rule.desc}
              </Typography>
              {idx < rules.length - 1 && <Divider sx={{ mt: 1.5 }} />}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CPRulesPage;
