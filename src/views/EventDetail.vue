<template>
  <div class="detail flex">
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
            <img
              :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
              alt="天気アイコン"
            />
            <p class="weather_name">{{ weather.description }}</p>
          </td>
        </tr>
        <tr v-if="date(event)">
          <th>2日目</th>
          <td>{{ event.event_2_date | moment }}</td>
          <td v-for="weather in second_day" :key="weather.id" class="flex">
            <img
              :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
              alt="天気アイコン"
            />
            <p class="weather_name">{{ weather.description }}</p>
          </td>
        </tr>
        <tr v-if="date2(event)">
          <th>3日目</th>
          <td>{{ event.event_3_date | moment }}</td>
          <td v-for="weather in third_day" :key="weather.id" class="flex">
            <img
              :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
              alt="天気アイコン"
            />
            <p class="weather_name">{{ weather.description }}</p>
          </td>
        </tr>
        <tr v-if="date3(event)">
          <th>4日目</th>
          <td>{{ event.event_4_date | moment }}</td>
          <td v-for="weather in four_date" :key="weather.id" class="flex">
            <img
              :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
              alt="天気アイコン"
            />
            <p class="weather_name">{{ weather.description }}</p>
          </td>
        </tr>
        <tr>
          <th>最終日</th>
          <td>{{ event.event_last_date | moment }}</td>
          <td v-for="weather in last_date" :key="weather.id" class="flex">
            <img
              :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
              alt=""
            />
            <p class="weather_name">{{ weather.description }}</p>
          </td>
        </tr>
      </table>

      <h2 class="title">アクセス</h2>
      <p>{{ event.address }}</p>
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
          const city = res.data.event.city_name;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ja&appid=6fa6f833ba14983210ed688d623a26d4`
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
                }
              }
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
  width: 100%;
  margin: 50px auto;
  justify-content: center;
}
.data {
  margin: 20px 0 0 20px;
}
.detail_flex {
  margin-right: 20px;
}
.image {
  width: 100%;
  height: 480px;
}
.title {
  font-size: 25px;
  width: 50%;
}
.event_name {
  font-size: 25px;
}
table {
  text-align: left;
}
tr {
  border-bottom: 1px solid #c2c2c2;
}
th,
td {
  padding: 10px;
  vertical-align: middle;
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
.weather_name {
  margin-top: 15px;
}
/* =====================
      レスポンシブ
====================== */
@media screen and (max-width: 768px) {
  .detail {
    width: 90%;
    margin: 0 auto;
  }
  .image {
    height: auto;
  }
  .flex {
    flex-wrap: wrap;
  }
  .detail_flex {
    width: 100%;
    margin: 0 auto;
  }
  .data {
    margin: 50px 0 0 0;
  }
}
</style>
