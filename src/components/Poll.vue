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
      const prefix = "Today's cringe time: 2h ";
      return this.commands ? prefix + this.commands[this.day].map((a, i) => `answer${i + 1}: ${a}`).join(' ') : 'Fetching poll info...';
    },
  },
};
</script>

<template>
  <div style="text-align: left; margin-left: 30px">
    <input type="radio" id="today" value="today" v-model="day" />
    <label for="today">Today</label>
    <input type="radio" id="tomorrow" value="tomorrow" v-model="day" />
    <label for="tomorrow">Tomorrow</label>
  </div>
  <div class="command">
    <svg-icon v-if="loaded" type="mdi" :path="icon" @click="copy"></svg-icon>
    <span>{{ command }}</span>
  </div>
  <div v-if="loaded">Usage: /timepoll {paste command here}</div>
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
