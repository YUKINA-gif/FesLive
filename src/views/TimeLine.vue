<template>
  <div class="time_line">
    <img :src="image" alt="メインイメージ" class="image main_image">
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require("../assets/live.jpg")
    }
  },
}
</script>

<style scoped>
  .main_image{
    width: 100%;
    height: 300px;
  }
</style>