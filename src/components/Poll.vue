<script>
import axios from 'axios';

export default {
  data() {
    return {
      command: 'Fetching poll info...',
    };
  },
  async created() {
    const response = await axios.get('/api/poll');
    this.command = response.data;
  },
};
</script>

<template>
  <pre>{{ command }}</pre>
</template>

<style scoped></style>
