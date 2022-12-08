<template>
  <Layout>
    <section class="career-section mt-60 mb-30">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="careers-content">
              <h1 v-html="$page.strapi.career.title" class="mb-30" />
              <p>{{ $page.strapi.career.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-card mb-50">
      <div class="container">
        <div class="row">
          <FeaturesCard v-for="(features,index) in $page.strapi.career.featurescard" :key="index" :features="features"/>
        </div>
      </div>
    </section>

    <section class="career-section mb-30">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="careers-content">
              <h1 v-html="$page.strapi.career.benefitstitle" class="mb-30" />
              <div v-html="$page.strapi.career.benefitsdescription"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-card mb-50">
      <div class="container">
        <div class="row">
          <FeaturesCard v-for="(features,index) in $page.strapi.career.benefitscard" :key="index" :features="features"/>
        </div>
      </div>
    </section>
    
    <section class="career-section mb-30">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="careers-content">
              <h1 class="mb-30">Open Positions</h1>
            </div>
            <div class="careers-card mb-20" v-for="(jobs,index) in this.jobs" :key="index" :jobs="jobs">
              <div class="row">
                <div class="col-md-9">
                  <h5 class="mb-0">{{ jobs.title }}</h5>
                  <h6>{{ jobs.location }}, {{ jobs.job_type }}</h6>
                  <p>{{ jobs.description }}</p>
                  <h6><small>Posted on {{
                    moment(jobs.posted_on).format(
                      "DD-MM-YYYY"
                    )
                  }}
                  </small></h6>
                </div>
                <div class="col-md-3 m-auto">
                  <div class="apply-btn text-center">
                    <g-link to="/careers-apply"><button>Apply</button></g-link>
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
    	id
      title
      description
      featurescard {
        title
        description
        image {
          url
        }
        cardcolor
      }
      benefitstitle
      benefitsdescription
      benefitscard {
        title
         description
         image{
          url
        }
        cardcolor
      }
      seo {
        metaTitle
        metaDescription
        shareImage{ 
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
    console.log(results)

    } catch (error) {
      console.log(error)
    }
  }
};
</script>
