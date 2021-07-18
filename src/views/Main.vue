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
      <Tweet />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Tweet from "../components/TimeLine.vue";
export default {
  data() {
    return {
      image: require("../assets/fesimage.jpg"),
      events: [],
    };
  },
  components: {
    Tweet,
  },
  methods: {
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
  font-family: fantasy, sans-serif;
  color: #fff;
  z-index: 10;
  padding-top: 15%;
  z-index: 999;
}
.events {
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
.title h2 {
  font-size: 25px;
}
/* =====================
      レスポンシブ
====================== */
@media screen and (max-width: 768px) {
  .main {
    width: 100%;
  }
  .contents,
  .events {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  .main_title {
    font-size: 60px;
  }
  .main_image {
    height: 200px;
  }
  .event_image {
    width: 80px;
    height: 80px;
  }
  .tweet {
    width: 90%;
  }
}
</style>
