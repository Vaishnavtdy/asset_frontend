<template>
  <div class="row">
    <PropertiesCard
      v-for="(property, index) in properties.edges"
      :property="property.node"
      :key="index"
    />
       <section>
      <!-- <div class="container prev_next_insight mt-5 mb-5"> -->
        <div class="row pagination-btn">
          <div class="col-md-6 col-6">
            <g-link class="pagination-btn for-prev"
              v-if="$page.properties.pageInfo && $page.properties.pageInfo.currentPage != 1"
              :to="prevLink"
              >Previous</g-link
            >
          </div>
          <div class="col-md-6 col-6 text-end">
            <g-link
              v-if=" $page.properties.pageInfo && 
                $page.properties.pageInfo.currentPage != $page.properties.pageInfo.totalPages
              "
              :to="nextLink"
              class="pagination-btn for-next"
              

              >Next</g-link
            >
            
          </div>
        </div>
      <!-- </div> -->
    </section>
  </div>
</template>

<script>
import PropertiesCard from "~/components/PropertiesCard";
import { Pager } from "gridsome";

export default {
  props: {
    properties: Object,
    type: String,
  },
  components: {
    PropertiesCard,
    Pager,
  },
  mounted() {
    console.log("this.articles=",this.$page.properties.pageInfo);
  },
  computed:{
       nextLink() {
      let pageInfo = this.properties.pageInfo;

      return pageInfo.currentPage < pageInfo.totalPages
        ? this.type + "/" + (parseInt(pageInfo.currentPage) + 1)
        : "";
    },
    prevLink() {
      let pageInfo = this.properties.pageInfo;
      return pageInfo.currentPage > 2
        ? this.type + "/" + (parseInt(pageInfo.currentPage) - 1)
        : "/" + this.type;
    },
  }
};
</script>
<style scoped>
.pagination-btn a {
    width: 119px !important;
    height: 37px !important;
    background: #C8A962 !important;
    outline: 0 !important;
    border: 0 !important;
    color: #FFFFFF !important; 
    font-weight: 500 !important;   
}
.for-next{
  padding: 8px 47px;
}
.for-prev{
   padding: 8px 37px;
}
</style>
