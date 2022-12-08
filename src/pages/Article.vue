<template>
  <Layout>
    <section class="banner-section">
      <div class="row">
        <div class="col-md-12">
          <div class="banner">
            <g-image src="~/assets/images/Banners/news.png"/>
            <h1>News & Blogs</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="blog-section mt-55">
      <div class="container">
          <Articles :articles="$page.strapi.articles" />
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
    articles(where: { status: "published" }) {
      slug
      title
      description
      content
      category {
        name
      }
      image {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
}
</page-query>

<script>
import Articles from "~/components/Articles";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
    Articles,
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
