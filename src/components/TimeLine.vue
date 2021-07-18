<template>
  <div class="tweet">
    <div class="title">
      <h2>Tweet</h2>
    </div>
    <div v-for="tweet in getTweet" :key="tweet.id" class="flex ">
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
    <!-- ページネーション機能 -->
    <paginate
      :page-count="getPageCount"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
    >
    </paginate>
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      tweets: [],
      parPage: 8,
      currentPage: 1,
    };
  },
  components: {
    Paginate,
  },
  computed: {
    getTweet: function() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.tweets.slice(start, current);
    },
    getPageCount: function() {
      return Math.ceil(this.tweets.length / this.parPage);
    },
  },
  methods: {
    clickCallback: function(pageNum) {
      this.currentPage = Number(pageNum);
    },
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
  },
  created() {
    this.getTweets();
  },
};
</script>

<style scoped>
/* ===============
      Tweets
=============== */
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
/* ===============
    Pagenation
=============== */
.pagination {
  width: 150px;
  list-style: none;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-around;
  font-size: 22px;
}
</style>
