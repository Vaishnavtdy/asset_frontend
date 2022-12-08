<template> 
  <div class="col-md-4">
    <div class="card text-center mb-30">
      <g-image class="card-img-top mainImage" :src="getStrapiMedia(service.image.url)"/>
      <g-image class="card-img-top hoverImage" :src="getStrapiMedia(service.hoverimage.url)"/>

      <div class="card-body" >
        <h5 class="card-title" v-html="service.title"></h5>
        <div class="card-text" v-html="service.description"></div>
      </div>
    </div>
  </div>
</template> 

<script>
import { getStrapiMedia } from "~/utils/medias";


export default {
  props: {
    service: Object,
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
<style scoped>
  .test{
    color: white!important;
  }
</style>
