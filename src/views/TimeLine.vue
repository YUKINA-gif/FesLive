<template>
  <div class="time_line">
    <!-- メインイメージ -->
    <h1 class="main_title">FesLive</h1>
    <img :src="image" alt="メインイメージ" class="image main_image" />
    <!-- イベントスワイプ -->
    <div class="title">
      <h2>イベント一覧</h2>
    </div>
    <Swipe :events="events" />
    <div class="title">
      <h2>ツイート一覧</h2>
    </div>
    <div v-for="tweet in tweets" :key="tweet.id" class="flex tweet">
      <div>
        <img :src="tweet.image" alt="アイコン" class="img" />
      </div>
      <div class="tweet_text">
        <h3>{{ tweet.name }}</h3>
        <p>{{ tweet.text }}</p>
        <font-awesome-icon icon="tags" class="icon" />
        <a :href="tweet.url">ホームページ</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from "../components/Swipe.vue";
import axios from "axios";
export default {
  data() {
    return {
      image: require("../assets/fesimage.jpg"),
      tweet_id: "9hp_be",
      tweets: [],
      events: [],
    };
  },
  components: {
    Swipe,
  },
  methods: {
    async getTweets() {
      await axios
        .get("https://feslive.herokuapp.com/api/tweet")
        .then((res) => {
          this.tweets = res.data.tweet;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getEvents() {
      await axios
        .get("https://feslive.herokuapp.com/api/event")
        .then((res) => {
          this.events = res.data.events;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getTweets();
    this.getEvents();
  },
};
</script>

<style scoped>
/* ===============
      メイン
=============== */

/* =====================
      レスポンシブ
====================== */
@media screen and (max-width: 768px) {
.main_title {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 35px;
  font-family: fantasy;
  color: #fff;
  z-index: 999;
}
.main_image {
  width: 100%;
  height: 150px;
  opacity: 0.8;
}
.img {
  border-radius: 50px;
}
.icon {
  width: 15px;
  height: 15px;
  color: #ccc;
  margin-top: 5px;
}
.tweet {
  border: 1px solid #c2c2c2;
  padding: 10px;
}
.tweet p {
  font-size: 13px;
  line-height: 1.3;
}
.tweet h3 {
  margin-bottom: 5px;
}
.tweet_text {
  padding: 5px;
}
}
</style>
