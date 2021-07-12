<template>
  <div class="main">
    <!-- メインイメージ -->
    <div class="main_image">
      <h1 class="main_title">-FesLive-</h1>
    </div>
    <div class="flex contents">
      <div>
        <div class="title">
          <h2>Event</h2>
        </div>
        <div class="flex events">
          <div v-for="event in events" :key="event.id" class="flex">
            <div class="event_image">
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
            </div>
          </div>
        </div>
      </div>
      <div class="tweet">
        <div class="title">
          <h2>Tweet</h2>
        </div>
        <div v-for="tweet in tweets" :key="tweet.id" class="flex ">
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
    </div>
  </div>
</template>

<script>
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
.main {
  width: 80%;
  margin: 0 auto;
}
.main_image {
  width: 100%;
  height: 540px;
  background: url("https://albumshare.s3.ap-northeast-3.amazonaws.com/fesimage.jpg")
    no-repeat;
  background-size: cover;
  text-align: center;
}
.main_title {
  font-size: 180px;
  font-family: fantasy;
  color: #fff;
  z-index: 10;
  padding-top: 15%;
  z-index: 999;
}
.img {
  border-radius: 50px;
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
.icon {
  width: 15px;
  height: 15px;
  color: #ccc;
  margin-top: 5px;
}
.events{
  flex-wrap: wrap;
}
.event_image {
  width: 200px;
  height: 200px;
  flex-wrap: wrap;
  cursor: pointer;
}
.contents {
  margin-top: 10px;
  justify-content: space-between;
}
.title h2{
  font-size: 25px;
}
/* =====================
      レスポンシブ
====================== */
@media screen and (max-width: 768px) {
  .main{
    width: 100%;
  }
  .contents,.events{
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  .main_title{
    font-size: 60px;
  }
  .main_image{
    height: 200px;
  }
  .event_image{
    width: 80px;
    height: 80px;
  }
  .tweet{
    width: 90%;
  }
}
</style>
