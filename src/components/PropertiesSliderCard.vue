<template>
  <div class="row">

    <div>

    <g-link
      :to="{ path: '/property/' + property.slug }"
      class="uk-link-reset"
      :key="property.id"
    >
      <div class="card properties-card mb-35">
        <div class="procard-img">
          <g-image :src="getStrapiMedia(property.images[0].url)"/>
          <h6 v-if="property.status">{{ property.status }}</h6>
        </div>
        <div class="card-body">
          <h3 class="card-title mb-1">{{ property.title }}</h3>
          <h4 class="card-location">{{ property.address }}, {{ property.location }}</h4>
          <div class="property-meta mb-12">
            <span class="room">
              <g-image src="~/assets/images/bed.png"/>
              {{ property.bedrooms }}
            </span>
            <!-- <span class="room">
              <g-image src="~/assets/images/baby-shower.png"/>
              {{ property.bathroom }}
            </span> -->
            <span class="area" v-if="property.area">
              <g-image src="~/assets/images/Group-3.png"/>
              {{ property.area }} 
            </span>
            <span class="pro-type float-end">
              {{ property.property_type.name.toUpperCase() }}
            </span>
          </div>
          <h5 v-if="property.price"> {{ property.price }}</h5>
        </div>
      </div>
    </g-link> 

</div>

  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  props: {
    property: Object,
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
