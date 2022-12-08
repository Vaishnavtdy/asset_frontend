<template>
  <Layout>

    <section class="mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="slider-search newsearch-Form">
              <PropertySearch class="mobile-hide" @onSearchResult="updateProperty($event)" :page="currentPage"/>
              <PropertySearchMobile class="mobile-only" @onSearchResult="updateProperty($event)" :page="currentPage"/>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="property-section mt-40 mb-70">
      <div class="container">
         <Properties :properties="properties" v-if="properties && properties.length"/>
        <div class="p-5" v-if="properties.length===0">
          <p style="text-align: center;margin-bottom: 50px" >No result found</p>
        </div>
        <div class="row pagination-btn">
           <div class="col-md-6 col-6">
            <button @click="changePage(pagination.prev_page)" :class="pagination.prev_page<=0? 'inactive':'' ">PREVIOUS</button>
          </div>
          <div class="col-md-6 col-6 text-end">
            <button  @click="changePage(pagination.next_page)" :class="(pagination.next_page == 0) ? 'inactive':'' ">NEXT</button>

          </div>
        </div>
       </div>
    </section>


  </Layout>
</template>

<page-query>
query {
strapi {
global {
siteName
favicon {
url
}
defaultSeo {
metaTitle
metaDescription
shareImage {
url
}
}
}
properties {
title
slug
address
location
status
bedrooms
bathroom
price
description
area
project_status {
name
slug
}
property_type {
name
slug
}
property_status {
name
slug
}
images {
url
}
}
}
}
</page-query>

<script>
import Properties from "~/components/Properties";
import {getMetaTags} from "~/utils/seo";
import {getStrapiMedia} from "~/utils/medias";
import PropertySearch from "~/components/PropertySearch";
import PropertySearchMobile from "~/components/PropertySearchMobile";

export default {
  components: {
    Properties,
    PropertySearch,
    PropertySearchMobile,
  },
  data() {
    return {
      active: 'active',
      inactive: '',
      properties: [],
      currentPage: 1,
      pagination: {last_page: 1, next_page: 1, prev_page: 0}
    };
  },
  methods: {
    getStrapiMedia,
    updateProperty(data) {
      this.properties = data.data;
      this.pagination = data.pagination ? data.pagination : {last_page: 0, next_page: 1, prev_page: 0};
      console.log('this.pagination=', this.pagination)
    },
    changePage(page) {
      console.log('page <= this.pagination.last_page =',page )
      if (page > 0 && page <= this.pagination.last_page)
        this.currentPage = page;
    }
  },
  metaInfo() {
    const {defaultSeo, favicon} = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
    };

    return {
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "favicon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
};
</script>
<style scoped>
.pagination-btn .inactive {
  background: #efc991;
  cursor: not-allowed;
}
.slider-search.newsearch-Form {
  position: relative;
  bottom: 0;
  left: 0;
}
</style>