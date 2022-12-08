<template>
  <Layout>
    <section class="banner-section">
      <div class="banner">
        <g-image src="~/assets/images/Banners/properties.png"/>
        <!-- <h1>Properties</h1> -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row  mt-50">
          <div class="col-md-12">
            <h1 class="h1Title text-center mb-30">Properties</h1>
          </div>
        </div>
      </div>
    </section>
    
    <!-- <section class="property-section mt-40 mb-70"> -->
    <section class="property-section mt-10 mb-70">
      <div class="container">
        <PropertiesPagination :properties="$page.properties" type="property"/>
        <!-- <Pager :info="$page.properties.pageInfo"/> -->
      </div>
    </section>


    
  </Layout>
</template>

<page-query>
query ($page:Int){
   properties: allStrapiProperty(perPage: 15, page: $page) @paginate {
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
import PropertiesPagination from "~/components/PropertiesPagination";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import { Pager } from "gridsome";
export default {
  components: {
    PropertiesPagination,
    Pager
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
  mounted(){
    console.log("data from property",this.$page.properties);
  }
};
</script>
