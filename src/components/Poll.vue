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
  <div>
    <span>{{ command }}</span>
    <svg-icon v-if="loaded" type="mdi" :path="icon" @click="navigator.clipboard.writeText(command)"></svg-icon>
  </div>
</template>

<style scoped>
svg {
  cursor: pointer;
}
</style>
