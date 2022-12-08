<template>
  <Layout>
    <section class="single-property mt-70">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <VueSlickCarousel
            ref="c1"
            :asNavFor="c2"
            :focusOnSelect="true">
              <div v-for="(gallery,index) in $page.strapi.areaGuides[0].gallery" :key="index" :gallery="gallery">
                <g-image :src="getStrapiMedia($page.strapi.areaGuides[0].gallery[index].url)" />
              </div>
            </VueSlickCarousel>

            <VueSlickCarousel
            ref="c2"
            :asNavFor="c1"
            :slidesToShow="3"
            :focusOnSelect="true">
              <div v-for="(gallery,index) in $page.strapi.areaGuides[0].gallery" :key="index" :gallery="gallery">
                <g-image :src="getStrapiMedia($page.strapi.areaGuides[0].gallery[index].url)" />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="col-md-6">
            
              <h3 class="card-title" v-html=" $page.strapi.areaGuides[0].title"></h3>
              <p v-html="$page.strapi.areaGuides[0].description"></p>

          </div>
        </div>

        <div class="row mt-70 mb-80">
          <div class="col-md-6">
              <h3>Location Map</h3>
              <g-image src="~/assets/images/Image 1.png"/>
          </div> 
          <div class="col-md-6">
            <div class="contact-form">
              <h2>contact us</h2>
              <hr>
              <!-- <p>Duis pretium gravida enim, vel maximus ligul</p> -->
              <ContactForm @onContactFormSubmit="ContactFormData($event)"/>
              
            </div>
          </div> 
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query($slug: String) {
  strapi {
    areaGuides(where: { slug: $slug }) {
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


import { saveContact } from "~/utils/custom";
import ContactForm from "~/components/ContactForm";
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {email, numeric, required} from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'Enter a valid email'
});
extend('numeric', {
  ...numeric,
  message: 'Enter a valid phone number'
});

export default {
  data() {
    return {
      contact: {full_name: '', email: '', mobile: ''},
      moment: moment,
      c1: undefined,
      c2: undefined,
    };
  },
  mounted() {
    this.c1 = this.$refs.c1;
    this.c2 = this.$refs.c2;
  },
  components: {
    VueSlickCarousel, 
    VueMarkdown,

    ValidationProvider, 
    ValidationObserver, 
    ContactForm,
  },
  methods: {
    getStrapiMedia,
    saveContact,
    ContactFormData(event) {
      this.saveContact(event)
    },
  },
  metaInfo() {
    const { title, description, image } = this.$page.strapi.areaGuides[0];
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const seo = {
      ...defaultSeo,
      metaTitle: title,
      metaDescription: description,
      shareImage: image,
    };

    return {
      title: this.$page.strapi.areaGuides[0].title,
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

