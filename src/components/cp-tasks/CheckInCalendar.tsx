import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonth from './CalendarMonth';
import { CheckInRecord } from '../../types';
import { CALENDAR_MONTH_RANGE } from '../../utils/constants';

interface CheckInCalendarProps {
  records: CheckInRecord[];
}

const CheckInCalendar: React.FC<CheckInCalendarProps> = ({ records }) => {
  const today = new Date();
  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [baseYear, setBaseYear] = useState(today.getFullYear());

  const canGoPrev = (): boolean => {
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - CALENDAR_MONTH_RANGE + 1);
    minDate.setDate(1);
    const currentFirst = new Date(baseYear, baseMonth, 1);
    return currentFirst > minDate;
  };

  const canGoNext = (): boolean => {
    const currentFirst = new Date(baseYear, baseMonth, 1);
    const todayFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentFirst < todayFirst;
  };

  const goPrev = () => {
    if (!canGoPrev()) return;
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(baseYear - 1);
    } else {
      setBaseMonth(baseMonth - 1);
    }
  };

  const goNext = () => {
    if (!canGoNext()) return;
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(baseYear + 1);
    } else {
      setBaseMonth(baseMonth + 1);
    }
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      <Box
        sx={{
          background: '#FFF8F0', // 米白色背景
          borderRadius: 3,
          p: 1.5,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          border: '1px solid rgba(233, 30, 140, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <IconButton size="small" onClick={goPrev} disabled={!canGoPrev()}>
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#555' }}>
            📆 打卡日历
          </Typography>
          <IconButton size="small" onClick={goNext} disabled={!canGoNext()}>
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        <CalendarMonth year={baseYear} month={baseMonth} records={records} />
      </Box>
    </Box>
  );
};

export default CheckInCalendar;
