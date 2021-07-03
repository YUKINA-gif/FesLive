<template>
  <div class="swipe">
    <carousel
    :per-page="4">
      <slide v-for="image in images" :key="image.id">
        <img :src="image.image" alt="イベント画像" class="image swipe_image">
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  data() {
    return {
      images:[
        {id:1,image:"favicon.ico"},
        {id:2,image:"favicon.ico"},
        {id:3,image:"favicon.ico"},
        {id:4,image:"favicon.ico"},
        {id:5,image:"favicon.ico"},
        {id:6,image:"favicon.ico"},
        {id:7,image:"favicon.ico"},
        {id:8,image:"favicon.ico"},
      ],
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style scoped>
.swipe_image{
  width: 90px;
  border: 1px solid #ccc;
  border-radius: 50px;
}
.flex{
  flex-shrink: 0;
}

</style>