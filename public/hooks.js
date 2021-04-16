import {
  computed,
  onUnmounted,
  reactive,
  ref,
  watchEffect,
} from 'https://unpkg.com/vue@3.0.11/dist/vue.esm-browser.prod.js';
import { now } from './utils.js';

export function useDurationForm() {
  /* Raw duration in minutes (can be a float).*/
  const rawDuration = ref(7);

  const duration = computed(() => parseInt(rawDuration.value * 60));

  return {
    duration,
    rawDuration,
  };
}

export function useTimer() {
  let _interval = null;
  const _duration = ref(null);
  const _now = ref(null);
  const _startTime = ref(null);
  const remainingTime = computed(() => {
    if (_startTime.value == null || _now.value == null) {
      return null;
    }

    return _duration.value - (_now.value - _startTime.value);
  });

  const isStarted = computed(() => _startTime.value != null);

  /* Stop timer. */
  watchEffect(() => {
    if (remainingTime.value != null && remainingTime.value <= 0) {
      _stopTimeCounter();
    }
  });

  onUnmounted(() => _stopTimeCounter());

  const _stopTimeCounter = () => clearInterval(_interval);

  return {
    isStarted,
    remainingTime,
    startTimer(duration) {
      _duration.value = duration;
      _startTime.value = now();
      _interval = setInterval(() => (_now.value = now()), 100);
    },
  };
}
