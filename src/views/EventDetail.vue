<template>
  <div class="detail">
    <div class="flex detail_flex">
      <img :src="event.image" alt="イベントイメージ画像" class="image" />
      <div>
        <h2 class="title">イベント名</h2>
        <h3 class="event_name">{{ event.name }}</h3>
        <h2 class="title">開催日</h2>
        <div class="flex">
          <div class="box">
            <h3>初日</h3>
            <p>{{ event.event_start_date }}</p>
            <div v-for="weather in start_date" :key="weather.id">
              <p>{{ weather.description }}</p>
              <img
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
            </div>
          </div>
          <div v-if="date(event)">
            <h3>2日目</h3>
            <p>{{ event.event_2_date }}</p>
            <div v-for="weather in second_day" :key="weather.id">
              <p>{{ weather.description }}</p>
              <img
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
            </div>
          </div>
          <div>
            <div v-if="date2(event)">
              <h3>3日目</h3>
              <p>{{ event.event_3_date }}</p>
              <div v-for="weather in third_day" :key="weather.id">
                <p>{{ weather.description }}</p>
                <img
                  :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div v-if="date3(event)">
            <h3>4日目</h3>
            <p>{{ event.event_4_date }}</p>
            <div v-for="weather in four_date" :key="weather.id">
              <p>{{ weather.description }}</p>
              <img
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
            </div>
          </div>
          <div>
            <h3>最終日</h3>
            <p>{{ event.event_last_date }}</p>
            <div v-for="weather in last_date" :key="weather.id">
              <p>{{ weather.description }}</p>
              <img
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
            </div>
          </div>
        </div>
        <p>天気情報</p>
        <p>開催5日前から表示されます</p>
        <h2 class="title">アクセス</h2>
        <p>{{ event.address }}</p>
      </div>
    </div>
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
      start_date: "",
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
                  this.start_date = res.data.list[key].weather;
                } else if (
                  moment(event_2_date).isSame(res.data.list[key].dt_txt, "day")
                ) {
                  this.second_day = res.data.list[key].weather;
                } else if (
                  moment(event_3_date).isSame(res.data.list[key].dt_txt, "day")
                ) {
                  this.third_day = res.data.list[key].weather;
                } else if (
                  moment(event_4_date).isSame(res.data.list[key].dt_txt, "day")
                ) {
                  this.four_date = res.data.list[key].weather;
                } else if (
                  moment(event_last_date).isSame(
                    res.data.list[key].dt_txt,
                    "day"
                  )
                ) {
                  this.last_date = res.data.list[key].weather;
                  console.log(this.last_date);
                } else {
                  console.log("no");
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
.detail {
  width: 70%;
  margin: 50px auto;
}
.image {
  width: 40%;
  margin-right: 20px;
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
.title {
  font-size: 25px;
  width: 50%;
}
.event_name {
  font-size: 25px;
}
.box{
  border: 1px solid #c2c2c2;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
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
}
</style>
