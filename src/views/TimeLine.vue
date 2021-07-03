<template>
  <div class="time_line">
    <!-- メインイメージ -->
    <h1 class="main_title">FesLive</h1>
    <img :src="image" alt="メインイメージ" class="image main_image">
    <!-- イベントスワイプ -->
    <div class="title">
      <h2>イベント一覧</h2>
    </div>
    <Swipe />
    <div class="title">
      <h2>ツイート一覧</h2>
    </div>
    <Timeline :id="tweet_id" sourceType="list" />
  </div>
</template>

<script>
import Swipe from '../components/Swipe.vue';
import { Timeline } from 'vue-tweet-embed';
export default {
  data() {
    return {
      image: require("../assets/fesimage.jpg"),
      tweet_id:"9hp_be"
    }
  },
  components:{
    Swipe,
    Timeline
  }
}
</script>

<style scoped>
/* ===============
      メイン
=============== */
  .main_title{
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 35px;
    font-family: fantasy;
    color: #fff;
    z-index: 999;
  }
  .main_image{
    width: 100%;
    height: 150px;
    opacity: 0.8;
  }
  .title{
    color: gray;
    border-bottom: 2px solid rgb(194, 104, 194);
    border-left: 5px solid rgb(194, 104, 194);
    width: 120px;
    margin: 10px;
    padding: 0 0 2px 2px;
  }
</style>