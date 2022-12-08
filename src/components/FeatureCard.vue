<template> 
  <div class="col-md-4">
    <div class="d-flex flex-row align-items-center">
      <div class="d-flex">
        <g-image :src="getStrapiMedia(feature.feature_image.url)"/> 
      </div> 
      <div class="d-flex flex-column px-3">
        <h4>{{ feature.featureTile }}</h4>
        <p>{{ feature.feature_description }}</p>
      </div> 
    </div>
  </div>
</template> 

<script>
import { getStrapiMedia } from "~/utils/medias";


export default {
  props: {
    feature: Object,
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
