import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  /** 滚动间隔 (ms) */
  interval: number;
  /** 总条目数 */
  totalItems: number;
  /** 每页显示数 */
  pageSize: number;
  /** 是否自动播放 */
  autoPlay?: boolean;
}

/**
 * 循环滚动动画 Hook
 * 用于礼物滚动列表、升级记录等循环播放场景
 */
export function useScrollAnimation({
  interval,
  totalItems,
  pageSize,
  autoPlay = true,
}: UseScrollAnimationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const maxIndex = Math.max(0, totalItems - pageSize);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  }, [maxIndex]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
    }
  }, [autoPlay, interval, next]);

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(next, interval);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval, next]);

  return {
    currentIndex,
    next,
    prev,
    pause,
    resume,
    isPaused: isPausedRef.current,
  };
}
