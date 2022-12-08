<template>
  <Layout>
    <section class="banner-section">
      <div class="banner">
        <g-image src="~/assets/images/Banners/buy.png"/>
        <!-- <h1>Buy</h1> -->
      </div>
    </section>
    <!-- <section>
      <div class="container">
        <div class="row  mt-50">
          <div class="col-md-12">
            <h1 class="h1Title text-center mb-30">Buy</h1>
          </div>
        </div>
      </div>
    </section> -->
    <!-- <section class="buy-section"> -->
    <section class="buy-section mt-60">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">New Launches</h2>
            <p>
              Usher in true convenience by choosing from this fabulous array of exceptional newly launched apartments that are crafted with enormous conviction. Stationed at pivotal locations, these offer phenomenal access to the city's most important segments. Book now and lead the life of grandeur.
            </p>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
            <VueSlickCarousel  v-bind="settingsnew">
              <div  v-for="(property,index) in $page.strapi.properties" :key="index" :property="property" v-if="property.project_status.id==5">
                <PropertiesSliderCard :property="property"/> 
              </div>
            </VueSlickCarousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
    <section class="buy-section mt-40">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">Off plan Properties</h2>
            <p>
              Off-plan property refers to those properties that are still in the ' Work-In-Progress' stage. These projects are typically sold prior to the construction with a small deposit requirement. Stationed at the sought-after locations in Dubai, these off-plan properties are likely to yield high revenue in the future.
            </p>
          </div>
          <div class="col-md-3">
          </div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
            <VueSlickCarousel  v-bind="settingsnew">
              <div  v-for="(property,index) in $page.strapi.properties" :key="index" :property="property" v-if="property.project_status.id==3">
                <PropertiesSliderCard :property="property"/> 
              </div>
            </VueSlickCarousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
    <section class="buy-section mt-40">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">Ready Properties</h2>
            <p>Built to absolute perfection, these aesthetically pleasing ready-to-occupy apartments and villas will fulfil your expectations like no other. Book now and step into the lifestyle of convenience and grandeur.
          </p>
          </div>
          <div class="col-md-3">
          </div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
              <VueSlickCarousel  v-bind="settingsnew">
                <div  v-for="(property,index) in $page.strapi.properties" :key="index" :property="property" v-if="property.project_status.id==4">
                  <PropertiesSliderCard :property="property"/> 
                </div>
              </VueSlickCarousel>
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
    homepage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
      }
    }
    properties(sort: "id:desc") {
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
        id
        name
        slug
      }
      property_type {
        id
        name
        slug
      }
      property_status {
        id
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
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import axios from "axios";
import PropertiesSliderCard from "~/components/PropertiesSliderCard";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return { 
      settingsnew: {
        centerMode: false,
        autoplay      : true,
        arrows        : true,
        dots          : false,
        slidesToShow  : 4,
        slidesToScroll: 1,
        infinite      : true,
        responsive    : [{
          breakpoint: 991,
          settings  : {
            slidesToShow  : 3,
             slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings  : {
            dots          : false,
            arrows        : true,
            slidesToShow  : 1,
            slidesToScroll: 1
          }
        }]
      },
      properties:{},
     }
  },
  components: {
    VueSlickCarousel: () =>
      import("vue-slick-carousel")
        .then((m) => {
          return m;
        })
        .catch(),
    PropertiesSliderCard,
  },
  metaInfo() {
    //const { seo } = this.$page.strapi.propertyPage;
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      //...seo,
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
    try {
      const results = await axios.get(getStrapiMedia("/properties"));
      this.properties = results.data;
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
