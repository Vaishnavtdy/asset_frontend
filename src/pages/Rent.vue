<template>
  <Layout>
    <section class="banner-section">
      <div class="banner">
        <g-image src="~/assets/images/Banners/rent.png"/>
        <!-- <h1>Rent</h1> -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row  mt-50">
          <div class="col-md-12">
            <h1 class="h1Title text-center mb-30">Rent</h1>
          </div>
        </div>
      </div>
    </section>

    
    <!-- <section class="property-section mt-40 mb-70"> -->
    <section class="property-section mt-10 mb-70">
      <div class="container">
        <Properties :properties="$page.properties" type="rent" />
         <!-- <Pager :info="$page.properties.pageInfo"/> -->
        <!-- <div class="row pagination-btn">
          <div class="col-md-6 col-6">
            <button>PREVIOUS</button>
          </div>
          <div class="col-md-6 col-6 text-end">
            <button>NEXT</button>
          </div>
        </div> -->
      
      </div>
    </section>

    
  </Layout>
</template>

<page-query>
query ($page:Int){
   properties: allStrapiProperty(perPage: 3, page: $page,filter:{project_status:{name:{eq:"Ongoing"}}}) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
   edges {
    node{
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
       images {
        url
      }
    }
    }
  }
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
    propertyPage {
      seo{
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
import Properties from "~/components/Properties";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import { Pager } from "gridsome";
export default {
  props: {
    properties: Object,
    type: String,
  },
  components: {
    Properties,
    Pager
  },
  mounted() {
    console.log(this.$page.strapi.global);
  },
  metaInfo() {
    const { seo } = this.$page.strapi.propertyPage;
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
  computed:{
  }
};
</script>










