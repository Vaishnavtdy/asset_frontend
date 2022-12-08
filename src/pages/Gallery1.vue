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
            <div class="card feature-card single-title-card mb-20 justify-content-center align-items-center dark " style="background: #896613" >
              <div class="row g-0">
                <div class="col-md-12 my-auto">
                  <div class="card-body p-0">
                    <g-link :to="{ path: sub.slug }">
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
    career{
      seo {
        metaTitle
        metaDescription
        shareImage{ 
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
      }
    }
  }
}
</page-query>

<script>
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import FeaturesCard from "~/components/FeaturesCard";
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return { 
      moment: moment,
      jobs:{}
     }
  },
  components: {
    FeaturesCard,
  },
  methods: {
    getStrapiMedia,
  },
  metaInfo() {
    const { seo } = this.$page.strapi.career;
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo,
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
    const results = await axios.get(
     getStrapiMedia('/jobs')
    );
    this.jobs = results.data
    //console.log(results)

    } catch (error) {
      console.log(error)
    }
  }
};
</script>
