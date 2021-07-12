<template>
  <div class="detail">
    <div class="flex">
      <div class="detail_flex">
        <font-awesome-icon
          icon="arrow-left"
          class="icon"
          @click="$router.push('/')"
        />
        <img :src="event.image" alt="イベントイメージ画像" class="image" />
      </div>
      <div class="data">
        <h2 class="title">イベント名</h2>
        <h3 class="event_name">{{ event.name }}</h3>
        <h2 class="title">開催日</h2>
        <table>
          <tr>
            <th></th>
            <th>開催日</th>
            <th>天気情報<br />(5日前から表示)</th>
          </tr>
          <tr>
            <th>初日</th>
            <td>{{ event.event_start_date | moment }}</td>
            <td v-for="weather in start_date" :key="weather.id" class="flex">
              <p v-if="first_weather">{{ weather.description }}</p>
              <img v-if="first_weather"
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
              <p v-else>なし</p>
            </td>
          </tr>
          <tr v-if="date(event)">
            <th>2日目</th>
            <td>{{ event.event_2_date | moment }}</td>
            <td v-for="weather in second_day" :key="weather.id" class="flex">
              <p v-if="second_weather">{{ weather.description }}</p>
              <img
                v-if="second_weather"
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
              <p v-else>なし</p>
            </td>
          </tr>
          <tr v-if="date2(event)">
            <th>3日目</th>
            <td>{{ event.event_3_date | moment }}</td>
            <td v-for="weather in third_day" :key="weather.id" class="flex">
              <p v-if="third_weather">{{ weather.description }}</p>
              <img
                v-if="third_weather"
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
              <p v-else>なし</p>
            </td>
          </tr>
          <tr v-if="date3(event)">
            <th>4日目</th>
            <td>{{ event.event_4_date | moment }}</td>
            <td v-for="weather in four_date" :key="weather.id" class="flex">
              <p v-if="four_weather">{{ weather.description }}</p>
              <img
                v-if="four_weather"
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
              <p v-else>なし</p>
            </td>
          </tr>
          <tr>
            <th>最終日</th>
            <td>{{ event.event_last_date | moment }}</td>
            <td v-for="weather in last_date" :key="weather.id" class="flex">
              <p v-if="last_weather">{{ weather.description }}</p>
              <img
                v-if="last_weather"
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                alt=""
              />
              <p v-else>なし</p>
            </td>
          </tr>
        </table>

        <h2 class="title">アクセス</h2>
        <p>{{ event.address }}</p>
      </div>
    </div>
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
      third_weather: false,
      last_weather: false,
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY年MM月DD日");
    },
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
  width: 80%;
  margin: 50px auto;
}
.image {
  width: 100%;
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
.box {
  border: 1px solid #c2c2c2;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  padding: 10px;
}
table {
  text-align: left;
}
tr {
  border-bottom: 1px solid #c2c2c2;
}
th {
  width: 20%;
  padding: 15px 5px;
}
td {
  width: 40%;
  padding: 15px 5px;
}
.data {
  width: 90%;
  margin: 20px 0 0 20px;
}
.title {
  margin: 20px 0;
}
.icon {
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  width: 30px;
  height: 30px;
  padding: 3px 10px;
  color: #c2c2c2;
}
.detail_flex {
  width: 80%;
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
