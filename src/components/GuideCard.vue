<template> 
  <div class="col-md-4" :class="ind+'_cls'">
    <span  v-if="ind=='0'">
      <h2>{{ $page.strapi.home.areaguide_title }}</h2>
      <div class="mt-100">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <div class="margin-left:-42px;"  v-html="guide.description.slice(0, 100)"></div>
        </g-link> 
      </div>
    </span>

    <span  v-else-if="ind=='1'">
      <div class="mt-95">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <div class="margin-left:-42px;" v-html="guide.description.slice(0, 100)"></div>
        </g-link> 
      </div>
    </span>

    <span v-else-if="ind=='2'">
      <div class="mt-0">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <div  class="margin-left:-42px;" v-html="guide.description.slice(0, 100)"></div>
        </g-link> 
      </div>
    </span>

<!-- for forth and fifth element view -->
    <span v-else-if="ind=='3'">
      <div class="mt-100">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <div class="margin-left:-42px;" v-html="guide.description.slice(0, 100)"></div>
        </g-link> 
      </div>
    </span>

    <span v-else-if="ind=='4'">
      <div class="mt-0">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <div  class="margin-left:-42px;" v-html="guide.description.slice(0, 100)"></div>
        </g-link> 
      </div>
    </span>

    <!-- close -->

    <span  v-else>
      <div class="mt-15">
        <g-link
          :to="{ path: '/area-guide/' + guide.slug }"
          class="uk-link-reset"
          :key="guide.id"
        >
          <div class="img-hover-zoom mb-40">
            <g-image :src="getStrapiMedia(guide.image.url)"/>
          </div>
          <h3 class="mb-25">{{ guide.title }}</h3>
          <p>{{guide.description.slice(0, 100)}}</p>
        </g-link> 
      </div>
    </span>
    
  </div>

</template> 


<page-query>
query {
  strapi {
    home {
      areaguide_title
    }
    areaGuides {
      id
      title
      description
      image {
        url
      }
      slug
      gallery {
        url
      }
    }
  }
}
</page-query>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  props: [
    'guide',
    'ind',
  ],
  methods: {
    getStrapiMedia,
  }
};
</script>
