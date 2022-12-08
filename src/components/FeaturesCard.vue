<template> 
  <div class="col-md-4" v-if="features.description">
    <div class="card feature-card mb-20" :class="features.cardcolor">
      <div class="row g-0">
        <div class="col-md-3 text-center my-auto ">
          <g-image class="card-img" :src="getStrapiMedia(features.image.url)"/>
        </div>
        <div class="col-md-9  my-auto">
          <div class="card-body p-0">
            <h5 class="card-title" v-html="features.title"></h5>
            <p class="card-text" v-html="features.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4" v-else>
    <div class="card feature-card single-title-card mb-20" :class="features.cardcolor">
      <div class="row g-0">
        <div class="col-md-3 text-center my-auto ">
          <g-image class="card-img" :src="getStrapiMedia(features.image.url)"/>
        </div>
        <div class="col-md-9 my-auto">
          <div class="card-body p-0">
            <h5 class="card-title mb-0">{{ features.title }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { getStrapiMedia } from "~/utils/medias";


export default {
  props: {
    features: Object,
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
