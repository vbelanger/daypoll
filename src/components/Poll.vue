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
      loaded: true,
      command: 'Fetching poll info...',
      icon: mdiContentCopy,
    };
  },
  async created() {
    const response = await axios.get('/api/poll');
    this.command = response.data;
    this.loaded = true;
  },
};
</script>

<template>
  <div class="command">
    <svg-icon v-if="loaded" type="mdi" :path="icon" @click="navigator.clipboard.writeText(command)"></svg-icon>
    <span>{{ command }}</span>
  </div>
  <div v-if="loaded">Usage: /timepoll {paste command here}</div>
</template>

<style scoped>
.command {
  padding: 4px 0;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin-bottom: 10px;
}
span {
  margin-right: 10px;
}

svg {
  cursor: pointer;
  height: 14px;
  color: lightskyblue;
}
</style>
