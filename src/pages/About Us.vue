<template>
  <Layout>
    <section class="banner-section">
      <div class="banner">
        <!-- <g-image src="~/assets/images/Banners/about.png"/> -->
        <g-image :src="getStrapiMedia($page.strapi.about.banner_image.url)" /> 
        <!-- <h1>{{ $page.strapi.about.banner_title }}</h1> -->
      </div>
    </section>
    <section class="aboutus-section">
      <div class="container">
        <div class="row">
          <div class="col-md-4 shadow-box">
            <div class="about-image">
                <g-image :src="getStrapiMedia($page.strapi.about.image.url)"/>
            </div>
              <h6>{{ $page.strapi.about.tagline }}</h6>
              <h2>{{ $page.strapi.about.title }}</h2>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-6">
            <div class="company-content mt-2">
              <h4>{{ $page.strapi.about.heading }}</h4>
              <div v-html=" $page.strapi.about.description "></div>
            </div>
          </div>
        </div>
        <div class="row mt-50 device-only">
          <div class="col-md-6">
            <div class="company-content">
              <div v-html="$page.strapi.about.description2"></div>
            </div>
          </div>
          <div class="col-md-6">
            <g-image :src="getStrapiMedia($page.strapi.about.image2.url)"/>
          </div>
        </div>
        <div class="row mt-4 mobile-only">
          <div class="col-12 mb-3">
            <g-image :src="getStrapiMedia($page.strapi.about.image2.url)"/>
          </div>
          <div class="col-12">
            <div class="company-content">
              <div v-html="$page.strapi.about.description2">"</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="meet-our-team">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-center">
              <h4 class="p-0">{{ $page.strapi.about.teamtitle }}</h4>
              <!-- <div v-html="$page.strapi.about.teamdescription"></div> -->
            </div>
          </div>
        </div>
        <div class="row mt-20">
          <!-- <TeamCard v-for="(team,index) in $page.strapi.about.meetourteam" :key="index" :team="team"/> -->
          <g-image src="~/assets/images/Banners/team.png"/>
        </div>
      </div>
    </section>
    
    <section class="mt-50"></section>
    
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
    about {
      id
      banner_image {
        url
      }
      banner_title
      tagline
      title
      image {
        url
      }
      heading
      description
      image2 {
        url
      }
      description2
      teamtitle
      teamdescription
      meetourteam {
        membername
        memberposition
        memberdescription
        memberimage {
          url
        }
        linkedin_profile
        twitter_profile
        facebook_profile
      }
      seo {
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
import TeamCard from "~/components/TeamCard";

export default {
  components: {
    TeamCard,
  },
  methods: {
    getStrapiMedia,

  },
  metaInfo() {
    const { seo } = this.$page.strapi.about;
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
   data(){
    return {
    } 
  },
 async mounted(){

  }
};
</script>
