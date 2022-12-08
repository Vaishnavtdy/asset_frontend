<template>
  <Layout>
    <section class="single-blog">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mt-40 mb-50">
            <g-image :src="getStrapiMedia($page.strapi.articles[0].image.url)" />
          </div>
          <div class="col-md-12 mb-60">
            <h2>{{ $page.strapi.articles[0].title }}</h2>
            <h6>
              {{ $page.strapi.articles[0].category.name.charAt(0).toUpperCase() + $page.strapi.articles[0].category.name.slice(1) }}
              <span>{{
                moment($page.strapi.articles[0].publishedAt).format(
                  "DD MMM YY"
                )}}, {{ moment($page.strapi.articles[0].publishedAt).format(
                  "h:m a"
                )
              }}</span>
            </h6> 
            <p v-html="$page.strapi.articles[0].content"></p>
            <br/>
            <h6>Written By <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{ $page.strapi.articles[0].author.name }}</h6>

          </div>
          <div class="col-md-12 mb-60 text-center">
            <a href="/contact-us"><button class="enqBtn">Enquire Now</button></a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query($slug: String!) {
  strapi {
    articles(where: { slug: $slug }) {
      title
      description
      content
      publishedAt
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
      seo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
      }
    }
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
  }
}
</page-query>

<script>
import VueMarkdown from "vue-markdown";
import { getStrapiMedia } from "~/utils/medias";
import { getMetaTags } from "~/utils/seo";
import moment from "moment";

export default {
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    VueMarkdown,
  },
  methods: {
    getStrapiMedia,
  },
  metaInfo() {
    //const { title, description, image } = this.$page.strapi.articles[0];
    const { defaultSeo, favicon } = this.$page.strapi.global;
    const { Seo } = this.$page.strapi.articles[0];

    // Merge default and article-specific SEO data
    const seo = {
      ...defaultSeo,
      // metaTitle: title,
      // metaDescription: description,
      // shareImage: image,
      ...Seo,
    };

    return {
      title: this.$page.strapi.articles[0].title,
      meta: getMetaTags(seo),
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
