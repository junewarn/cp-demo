import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ModalWrapper from '../common/ModalWrapper';

interface CPRulesModalProps {
  open: boolean;
  onClose: () => void;
}

const CPRulesModal: React.FC<CPRulesModalProps> = ({ open, onClose }) => {
  const rules = [
    { title: '💕 CP绑定', desc: '双方同意后即可绑定成为CP，开启专属情侣空间' },
    { title: '📅 每日打卡', desc: '绑定后每日可完成打卡任务，积累亲密度提升CP等级' },
    { title: '🎁 赠送礼物', desc: '可以为CP赠送礼物，提升亲密值和CP等级' },
    { title: '🏆 等级提升', desc: 'CP共有13个等级，等级越高解锁越多特权和专属特效' },
    { title: '⭐ 特殊等级', desc: '达到Lv.9及以上进入特殊等级区间，解锁专属渐变特效' },
    { title: '🛡️ 解除绑定', desc: '双方均可申请解除绑定，解除后有24小时冷却期' },
  ];

  return (
    <ModalWrapper open={open} onClose={onClose} title="📖 CP规则说明">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rules.map((rule, idx) => (
          <Box key={idx}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#333', mb: 0.5 }}>
              {rule.title}
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#777', lineHeight: 1.6 }}>
              {rule.desc}
            </Typography>
            {idx < rules.length - 1 && <Divider sx={{ mt: 1.5 }} />}
          </Box>
        ))}
      </Box>
    </ModalWrapper>
  );
};

export default CPRulesModal;
