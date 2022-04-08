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
      loaded: false,
      commands: null,
      icon: mdiContentCopy,
    };
  },
  async created() {
    const response = await axios.get('/api/poll');
    this.commands = response.data;
    this.loaded = true;
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.command);
    },
  },
  computed: {
    command() {
      const prefix = "/timepoll question: Today's cringe time: 2h ";
      const answers = this.commands[this.day].holidays.map((a, i) => `answer${i + 1}: ${a}`);
      answers.push(`answer${answers.length + 1}: No post today fuck you`);
      return prefix + answers.join(' ');
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
    <div>Usage: Copy and paste command into discord, the bot should pick it up</div>
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
