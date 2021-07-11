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
      <div v-for="weather in last_date" :key="weather.id">
        <p>{{ weather.description }}</p>
        <img
          :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
          alt=""
        />
      </div>
    </div>
    <h2 class="title">アクセス</h2>
    <p class="data">{{ event.address }}</p>
    <button class="button" @click="$router.push('/')">戻る</button>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  props: ["id"],
  data() {
    return {
      event: "",
      first_day: "",
      second_day: "",
      third_day: "",
      four_date: "",
      last_date: "",
    };
  },
  methods: {
    async getEvent() {
      await axios
        .get("https://feslive.herokuapp.com/api/event/" + this.id)
        .then((res) => {
          this.event = res.data.event;
          const event_start_date = res.data.event.event_start_date;
          const event_2_date = res.data.event.event_2_date;
          const event_3_date = res.data.event.event_3_date;
          const event_4_date = res.data.event.event_4_date;
          const event_last_date = res.data.event.event_last_date;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?q=osaka&lang=ja&appid=6fa6f833ba14983210ed688d623a26d4`
            )
            .then((res) => {
              for (var key in res.data.list) {
                if (
                  moment(event_start_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.first_day = res.data.list[key].weather;
                } else if (
                  moment(event_2_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.second_day = res.data.list[key].weather;
                } else if (
                  moment(event_3_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.third_day = res.data.list[key].weather;
                } else if (
                  moment(event_4_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.four_date = res.data.list[key].weather;
                } else if(
                  moment(event_last_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.last_date = res.data.list[key].weather;
                  console.log(this.last_date);
                } else {
                  console.log("no")
                }

              }
            })
            .catch((err) => {
              console.log(err);
            });
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
/* ===============
   イベント詳細
=============== */
.image {
  width: 10%;
}
/* =====================
      レスポンシブ
====================== */
@media screen and (max-width: 768px) {
  .data {
    padding: 0 20px;
  }
  .image {
    width: 100%;
  }
  .button {
    margin: 10px 0 10px 50%;
    color: #fff;
    background-color: rgb(194, 104, 194);
    border: 1px solid rgb(194, 104, 194);
    padding: 5px 10px;
    transform: translate(-50%, 0);
    cursor: pointer;
  }
}
</style>
