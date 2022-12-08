<template>
  <Layout>
    <section class="career-section mt-60 mb-30">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="careers-content">
              <h1 class="mb-30" v-if="this.gallery.length > 0" v-html="this.gallery[0].label"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-30" v-for="(image, i) in this.images" :key="i">
            <img :src="image" @click="index = i" class="image"/>
          </div>
          <div id="app">
            <ClientOnly>
              <vue-gallery-slideshow :images="this.images" :index="index" @close="index = null"></vue-gallery-slideshow>
            </ClientOnly>
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
  }
}
</page-query>

<script>
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
  components: {
    VueGallerySlideshow
  },
  data() {
    return { 
      gallery: [],
      index: null,
      images: [],
     }
  },
  methods: {
    getStrapiMedia,
  },
  metaInfo() {
    const { defaultSeo, favicon } = this.$page.strapi.global;

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
  async mounted() {
    const { slug } = this.$route.params;
    console.log(slug, "slug");
    this.gallery = await fetch(process.env.GRIDSOME_STRAPI_URL+
      "/sub-categories?slug=" + slug
    ).then((res) => res.json());
    
    this.gallery = JSON.parse(JSON.stringify(this.gallery));
    setTimeout(()=>{
      
      this.images = this.gallery[0].galleries.map((total,index) => {
        return getStrapiMedia(total.image.url);
      });

    },1000);
    

  }
};
</script>
<style scoped>
img.image {
  object-fit: cover;
  object-position: center;
  min-height: 260px;
  max-height: 260px;
}
</style>