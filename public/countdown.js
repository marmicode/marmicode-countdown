import {
  computed,
  defineComponent,
  ref,
} from 'https://unpkg.com/vue@3.0.11/dist/vue.esm-browser.prod.js';
import { useDurationForm, useTimer } from './hooks.js';
import { playRandomMusic } from './utils.js';

export const Countdown = defineComponent({
  setup() {
    const isMusicEnabled = ref(true);

    const { duration, rawDuration } = useDurationForm();

    const { remainingTime, startTimer, ...otherTimerProps } = useTimer();
    const remainingMinutes = computed(() =>
      Math.floor(remainingTime.value / 60)
    );
    const remainingSeconds = computed(() => remainingTime.value % 60);

    return {
      ...otherTimerProps,
      isMusicEnabled,
      rawDuration,
      remainingTime,
      remainingMinutes,
      remainingSeconds,
      start() {
        if (isMusicEnabled.value) {
          playRandomMusic();
        }
        startTimer(duration.value);
      },
    };
  },
  data() {
    return {
      controlPanelStyle: {
        textAlign: 'center',
      },
      logoStyle: {
        maxWidth: '400px',
      },
      timerStyle: {
        color: '#380030',
        textShadow: 'white 0px 0px 6px',
        fontSize: '10em',
        fontWeight: 'bold',
      },
    };
  },
  template: `
      <img :style="logoStyle" src="marmicode-io.png" alt="Marmicode" />
      <div
        v-if="remainingTime != null && remainingTime > 0"
        :style="timerStyle">{{remainingMinutes.toString().padStart(2, '0')}}:{{remainingSeconds.toString().padStart(2, '0')}}</div>
      <div v-if="!isStarted" :style="controlPanelStyle">
        <input v-model="rawDuration" type="time">
        <input v-model="isMusicEnabled" type="checkbox" /><span>Music</span>
        <button @click="start()" type="submit">START</button>
      </div>`,
});
