<template>
  <div class="swipe">
    <carousel :per-page="5">
      <slide v-for="event in events" :key="event.id">
        <img
          :src="event.image"
          alt="イベント画像"
          class="image swipe_image"
          @click="
            $router.push({
              path: '/event/' + event.id,
              params: { id: event.id },
            })
          "
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  props: ["events"],
  data() {
    return {};
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style scoped>
/* ===============
   イベント一覧
=============== */
.swipe_image {
  width: 70px;
  border: 1px solid #ccc;
  border-radius: 50px;
}
.flex {
  flex-shrink: 0;
}
</style>
