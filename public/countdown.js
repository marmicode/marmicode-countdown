import {
  computed,
  defineComponent,
  ref,
} from 'https://unpkg.com/vue@3.0.11/dist/vue.esm-browser.prod.js';
import { useDurationForm, useTimer } from './hooks.js';
import { playRandomMusic } from './utils.js';

export const Timer = defineComponent({
  props: ['remainingTime'],
  setup(props) {
    const remainingTimeString = computed(() => {
      const hours = Math.floor(props.remainingTime / 3600);
      const minutes = Math.floor(props.remainingTime / 60) % 60;
      const seconds = props.remainingTime % 60;
      return `${hours > 0 ? hours + ':' : ''}${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    return {
      remainingTimeString,
      timerStyle: {
        color: '#380030',
        textShadow: 'white 0px 0px 6px',
        fontSize: '10em',
        fontWeight: 'bold',
      },
    };
  },
  template: `<div :style="timerStyle">{{ remainingTimeString }}</div>`,
});

export const Countdown = defineComponent({
  components: { Timer },
  setup() {
    const isMusicEnabled = ref(true);

    const { duration, rawDuration } = useDurationForm();

    const { remainingTime, startTimer, ...otherTimerProps } = useTimer();

    return {
      ...otherTimerProps,
      isMusicEnabled,
      rawDuration,
      remainingTime,
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
    };
  },
  template: `
      <img :style="logoStyle" src="marmicode-io.png" alt="Marmicode" />

      <Timer v-if="remainingTime > 0" :remainingTime="remainingTime"></Timer>

      <div v-if="!isStarted" :style="controlPanelStyle">
        <input v-model="rawDuration" type="number">
        <input v-model="isMusicEnabled" type="checkbox" /><span>Music</span>
        <button @click="start()" type="submit">START</button>
      </div>`,
});
