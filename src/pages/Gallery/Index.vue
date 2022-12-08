<template>
  <Layout>
    <section class="career-section mt-60 mb-30" v-for="(item,index) in $page.strapi.galleryCategories" :key="index">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="careers-content">
              <h1 v-html="item.label.charAt(0).toUpperCase()+item.label.slice(1)" class="mb-30" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4" v-for="(sub,index) in item.sub_categories" :key="index">
            <VueSlickCarousel v-bind="settingsSlider"  v-if="sub.media.length">
              <div v-for="(image, index) in sub.media" :key="index">
                <g-link :to="{ path:'/gallery/'+sub.slug }">
                  <g-image :src="getStrapiMedia(image.url)"/>
                </g-link>
              </div>
            </VueSlickCarousel>
            <div class="card feature-card single-title-card mb-20 justify-content-center align-items-center dark " style="background: #896613" >
              <div class="row g-0">
                <div class="col-md-12 my-auto">
                  <div class="card-body p-0">
                    <g-link :to="{ path:'/gallery/'+sub.slug }">
                      <h5 class="card-title mb-0">{{ sub.label }}</h5>
                    </g-link>
                  </div>
                </div>
              </div>
            </div>
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
    galleryCategories {
      label
      slug
      sub_categories {
        label
        slug
        media {
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
import axios from "axios";
import moment from "moment";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
   components: {
    VueSlickCarousel,
  },
  data() {
    return {
      moment: moment,
      settingsSlider: {
        autoplay: true,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        infinite: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              dots: false,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
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
};
</script>
<style scoped>
.slick-slide img {
  height: 100%;
  object-fit: cover;
  object-position: center;
  min-height: 260px;
  max-height: 260px;
}
.slick-track {
  display: flex;
}
.slick-slide {
  display: flex;
  height: auto;
}
</style>
