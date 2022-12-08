<template>
  <Layout>
    <section class="areaGuide-section mt-100 pb-80">
      <div class="container">
        <div class="row">
          <GuideCard v-for="(guide,ind) in $page.strapi.areaGuides" :key="ind" :guide="guide" :ind="ind"></GuideCard>
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
    home {
      areaguide_title
    }
    areaGuides {
      id
      title
      description
      image {
        url
      }
      slug
      gallery {
        url
      }
    }
  }
}
</page-query>

<script>
import GuideCard from "~/components/GuideCard";
import {getMetaTags} from "~/utils/seo";
import {getStrapiMedia} from "~/utils/medias";
import moment from "moment";

export default {
  components: {
    GuideCard,
  },
  data() {
    return {
    };
  },
  methods: {
    getStrapiMedia,
  },
  mounted() {
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