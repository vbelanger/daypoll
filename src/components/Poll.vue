<script>
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiContentCopy } from '@mdi/js';

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      day: 'today',
      loaded: true,
      commands: null,
      icon: mdiContentCopy,
    };
  },
  created() {
    axios.get('/api/poll').then((response) => {
      this.commands = response.data;
      this.loaded = true;
    });
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.command);
    },
  },
  computed: {
    command() {
      const prefix = "Today's cringe time: 2h ";
      return prefix + this.commands[this.day].holidays.map((a, i) => `answer${i + 1}: ${a}`).join(' ');
    },
  },
};
</script>

<template>
  <div v-if="loaded">
    <div style="text-align: left; margin-left: 30px">
      <input type="radio" id="today" value="today" v-model="day" />
      <label for="today">Today ({{ commands.today.day }})</label>
      <input type="radio" id="tomorrow" value="tomorrow" v-model="day" />
      <label for="tomorrow">Tomorrow ({{ commands.tomorrow.day }})</label>
    </div>
    <div class="command">
      <svg-icon type="mdi" :path="icon" @click="copy"></svg-icon>
      <span>{{ command }}</span>
    </div>
    <div>Usage: /timepoll {paste command here}</div>
  </div>
  <div v-else>Fetching poll info...</div>
</template>

<style scoped>
.command {
  padding: 6px 0;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin: 10px 30px;
}

svg {
  cursor: pointer;
  height: 14px;
  color: lightskyblue;
  margin-right: 6px;
}
</style>
