<template>
  <Layout>
    <section class="banner-section">
      <div class="banner">
        <!-- <g-image src="~/assets/images/Banners/services.png"/> -->
        <g-image :src="getStrapiMedia($page.strapi.service.banner.url)" /> 
        
        <!-- <h1>{{ $page.strapi.service.title }}</h1> -->
      </div>
    </section>
    <section class="services-section">
      <div class="container">
        <div class="row  mt-50 mb-30">
          <div class="col-md-12">
            <h1 class="h1Title text-center mb-30">{{ $page.strapi.service.title }}</h1>
            <div class="services-content">
              <div v-html="$page.strapi.service.description"></div>
                <g-link :to="{ path: '/service/townhouse-for-sale-near-town-square-dubai' }">sdsf</g-link>
       
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="SSection services-card mb-50">
      <div class="container">
        <div class="row">
          <ServiceCard v-for="(service,index) in $page.strapi.service.servicecard" :key="index" :service="service"/>
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
    service{
      id
      title
      description
      banner{
        id
        url
        formats
      }
      servicecard{
        title
        description
        image{
          url
        }
        hoverimage{
          url
        }
      }
      seo{
        metaTitle
        metaDescription
        shareImage{
          url
        }
        id
      }
    }
  }
}
</page-query>

<script>
import Articles from "~/components/Articles";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import ServiceCard from "~/components/ServiceCard";

export default {
  components: {
    Articles,
    ServiceCard,
  },
  methods: {
    getStrapiMedia,
  },
  metaInfo() {
    const { seo } = this.$page.strapi.service;
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
};
</script>
