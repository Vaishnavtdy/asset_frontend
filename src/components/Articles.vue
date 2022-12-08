<template>
    
  <div class="row">
      <BigCard
          v-for="(article, index) in articles"
          :article="article"
          :key="article.id" v-if="index == 0 && flag != 1"
        />


    <div class="col-md-12 mt-25">
      <div class="row">
        
        <Card
          v-for="(article, index) in articles"
          :article="article"
          :key="article.id" v-if="index != 0"
        />

      </div>
    </div>
  </div>
    


    

  
</template>

<script>
import Card from "~/components/Card";
import BigCard from "~/components/BigCard";

export default {
  props: {
    articles: Array,
    flag: Number,
  },
  components: {
    Card,
    BigCard,
  },
  computed: {
    leftArticlesCount() {
      return Math.ceil(this.articles.length / 5);
    },
    leftArticles() {
      return this.articles.slice(0, this.leftArticlesCount);
    },
    rightArticles() {
      return this.articles.slice(this.leftArticlesCount, this.articles.length);
    },
  },
};
</script>
