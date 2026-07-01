import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CheckInRecord } from '../../types';
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '../../utils/helpers';

interface CalendarMonthProps {
  year: number;
  month: number;
  records: CheckInRecord[];
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const CalendarMonth: React.FC<CalendarMonthProps> = ({ year, month, records }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const today = new Date();
  const todayStr = formatDate(today);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#555', mb: 1 }}>
        {monthLabel}
      </Typography>

      <Grid container columns={7} sx={{ mb: 0.5 }}>
        {WEEKDAYS.map((day) => (
          <Grid item xs={1} key={day}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 11,
                color: day === '日' || day === '六' ? '#FF6B9D' : '#999',
                fontWeight: 500,
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container columns={7} spacing={0.3}>
        {cells.map((day, idx) => {
          if (day === null) {
            return (
              <Grid item xs={1} key={`empty-${idx}`}>
                <Box sx={{ aspectRatio: '1', p: 0.5 }} />
              </Grid>
            );
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const record = records.find((r) => r.date === dateStr);
          const isToday = dateStr === todayStr;
          const isChecked = record?.checked === true;
          const isFuture = !record || (record && new Date(dateStr) > today);

          return (
            <Grid item xs={1} key={dateStr}>
              <Box
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  position: 'relative',
                  bgcolor: isToday ? 'rgba(233, 30, 140, 0.08)' : 'transparent',
                  border: isToday ? '2px solid #E91E8C' : '2px solid transparent',
                }}
              >
                {isChecked ? (
                  <Box
                    sx={{
                      fontSize: 16,
                      color: '#E91E8C',
                      animation: 'heart-beat 1.5s ease-in-out infinite',
                    }}
                  >
                    💕
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: isToday ? 700 : 400,
                      color: isFuture ? '#ccc' : '#555',
                    }}
                  >
                    {day}
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CalendarMonth;
