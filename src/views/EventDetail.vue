<template>
  <div class="detail">
    <img :src="event.image" alt="イベントイメージ画像" class="image" />
    <h2 class="title">イベント名</h2>
    <h3 class="data">{{ event.name }}</h3>
    <h2 class="title">開催日</h2>
    <h3 class="data">初日</h3>
    <p class="data">{{ event.event_start_date }}</p>
    <div v-if="date(event)">
      <h3 class="data">2日目</h3>
      <p class="data">{{ event.event_2_date }}</p>
    </div>
    <div v-if="date2(event)">
      <h3 class="data">3日目</h3>
      <p class="data">{{ event.event_3_date }}</p>
    </div>
    <div v-if="date3(event)">
      <h3 class="data">4日目</h3>
      <p class="data">{{ event.event_4_date }}</p>
    </div>
    <div>
      <h3 class="data">最終日</h3>
      <p class="data">{{ event.event_last_date }}</p>
    </div>
    <h2 class="title">アクセス</h2>
    <p class="data">{{ event.address }}</p>

    <button @click="$router.push('/')">戻る</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      event: "",
    };
  },
  methods: {
    async getEvent() {
      await axios
        .get("https://feslive.herokuapp.com/api/event/" + this.id)
        .then((res) => {
          this.event = res.data.event;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    date(event) {
      if (event.event_2_date === null) {
        return false;
      } else {
        return true;
      }
    },
    date2(event) {
      if (event.event_3_date === null) {
        return false;
      } else {
        return true;
      }
    },
    date3(event) {
      if (event.event_4_date === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.getEvent();
  },
};
</script>

<style scoped>
.data {
  padding: 0 20px;
}
.image {
  width: 100%;
}
</style>
