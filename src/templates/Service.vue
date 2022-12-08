<template>
  <Layout>
    <section class="services-section">
      <div class="container">
        <div class="row mt-50 mb-30">
          <div class="col-md-12">
            <div class="services-content landing-page-title" v-if="this.posts">
              <div
                v-if="this.posts.length > 0"
                v-html="this.posts[0].area_guide.description"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div v-if="this.posts.length > 0">
              <ClientOnly>
                <VueSlickCarousel v-bind="settingsnew">
                  <div
                    v-for="(property, index) in this.posts"
                    :key="index"
                    :property="property"
                  >
                    <PropertiesSliderCard :property="property" />
                  </div>
                </VueSlickCarousel>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="buy-section mt-60">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">New Launches</h2>
            <p>
              Usher in true convenience by choosing from this fabulous array of
              exceptional newly launched apartments that are crafted with
              enormous conviction. Stationed at pivotal locations, these offer
              phenomenal access to the city's most important segments. Book now
              and lead the life of grandeur.
            </p>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
              <VueSlickCarousel v-bind="settingsnew">
                <div
                  v-for="(property, index) in $page.strapi.properties"
                  :key="index"
                  :property="property"
                  v-if="property.project_status.id == 5"
                >
                  <PropertiesSliderCard :property="property" />
                </div>
              </VueSlickCarousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <section class="buy-section mt-40">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">Off plan Properties</h2>
            <p>
              Off-plan property refers to those properties that are still in the
              ' Work-In-Progress' stage. These projects are typically sold prior
              to the construction with a small deposit requirement. Stationed at
              the sought-after locations in Dubai, these off-plan properties are
              likely to yield high revenue in the future.
            </p>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
              <VueSlickCarousel v-bind="settingsnew">
                <div
                  v-for="(property, index) in $page.strapi.properties"
                  :key="index"
                  :property="property"
                  v-if="property.project_status.id == 3"
                >
                  <PropertiesSliderCard :property="property" />
                </div>
              </VueSlickCarousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
    <section class="buy-section mt-40">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="mb-20">Ready Properties</h2>
            <p>
              Built to absolute perfection, these aesthetically pleasing
              ready-to-occupy apartments and villas will fulfil your
              expectations like no other. Book now and step into the lifestyle
              of convenience and grandeur.
            </p>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3 m-auto">
            <g-link to="/property">
              <button>VIEW MORE</button>
            </g-link>
          </div>
        </div>
      </div>
    </section>
    <section class="slider-section mt-50">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ClientOnly>
              <VueSlickCarousel v-bind="settingsnew">
                <div
                  v-for="(property, index) in $page.strapi.properties"
                  :key="index"
                  :property="property"
                  v-if="property.project_status.id == 4"
                >
                  <PropertiesSliderCard :property="property" />
                </div>
              </VueSlickCarousel>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <section class="services-section">
      <div class="container">
        <div class="row mt-50 mb-30">
          <div class="col-md-12">
            <div class="services-content" v-if="this.posts">
              <div
                v-if="this.posts.length > 0"
                v-html="this.posts[0].area_guide.full_description"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section pt-98 pb-95">
      <div class="container">
        <div class="row">
          <div class="col-md-4 contact-imgCol">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.468120901023!2d55.25880971500931!3d25.18743118390074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697e176dbccf%3A0x4503feeee042790d!2sAsset%20Homez%20International%20Properties%20LLC!5e0!3m2!1sen!2sin!4v1636102827262!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div class="col-md-8">
            <div class="contact-form">
              <h2>contact us</h2>
              <hr />
              <EnquiryForm
                :messageData="this.dataResponse"
                :formTitle="this.formTitle"
                @onEnquiryFormSubmit="EnquiryFormData($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="enquiry-popup">
      <div class="btn-enquiry d-flex justify-content-between align-items-center" @click="openForm()">
        <p class="m-0 font-lg">Enquire Now </p><span>+</span>
      </div>
      <div class="search-results cursor d-none">
        <div class="font-lg text-white py-3 px-3 search-head d-flex justify-content-between align-items-center" >
        <p class="m-0 font-lg">Enquire Now </p><span  @click="openForm()">-</span>
        </div>
          <LandingFormPopup :messageData="this.dataResponse"
          :formTitle="this.formTitle"
            @onEnquiryFormSubmit="EnquiryFormData($event)"
          />
      </div>
    </div>
    <div >
      <!-- <button @click="hmopenModal()" class="knowMore">KNOW MORE</button> -->

      <client-only>
        <modal name="hm" height="auto"
        :resizable="resizable"
        :adaptive="adaptive">
          <div class="search-results">
            <div class="font-lg text-white py-3 px-3 search-head d-flex justify-content-between align-items-center" >
              <p class="m-0 font-lg text-white ">Enquire Now </p><span  @click="hmcloseModal()">-</span>
            </div>
            <!-- <button @click="hmcloseModal()" class="closeBtn">X</button> -->
            <LandingFormPopup :messageData="this.dataResponse"
            :formTitle="this.formTitle"
            @onEnquiryFormSubmit="EnquiryFormData($event)"
          />
          </div>
        </modal>
      </client-only>
    </div>
  </Layout>
</template>

<page-query>
query ($slug: String!){
  strapi {
    tags(where: { slug: $slug })  {
      label
      slug
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
    properties(sort: "id:desc") {
      id
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
        id
        name
        slug
      }
      property_type {
        id
        name
        slug
      }
      property_status {
        id
        name
        slug
      }
      images {
        url
      }
    }
  }
}
</page-query>

<script>
import axios from "axios";
import { getStrapiMedia } from "~/utils/medias";
import PropertiesSliderCard from "~/components/PropertiesSliderCard";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { getMetaTags } from "~/utils/seo";

import { saveEnquiry } from "~/utils/custom";
import EnquiryForm from "~/components/EnquiryForm";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, numeric, required } from "vee-validate/dist/rules";
import LandingFormPopup from "~/components/LandingFormPopup";

extend("required", {
  ...required,
  message: "This field is required",
});
extend("email", {
  ...email,
  message: "Enter a valid email",
});
extend("numeric", {
  ...numeric,
  message: "Enter a valid phone number",
});
export default {
  name: "LandingPage",
  data() {
    return {
      settingsnew: {
        centerMode: false,
        autoplay: true,
        arrows: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              dots: false,
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      
      resizable: true,
      adaptive: true,
      draggable: true,
      posts: [],
      properties: {},
      contact: { full_name: "", email: "", mobile: "" },
      dataResponse: undefined,
      toggle: "open",
      formTitle: "Enquiry"
    };
  },
  components: {
    VueSlickCarousel: () =>
      import("vue-slick-carousel")
        .then((m) => {
          return m;
        })
        .catch(),
    PropertiesSliderCard,
    ValidationProvider,
    ValidationObserver,
    EnquiryForm,
    LandingFormPopup
  },
  methods: {
    getStrapiMedia,
    saveEnquiry,
    async EnquiryFormData(event) {
      var response = await this.saveEnquiry(event);
      this.dataResponse = response.message;
      console.log("response from pages success" + this.dataResponse);
      return response;
    },
    openForm() {
      if(this.toggle=="close") {
        $(".search-results").hide();
        $(".btn-enquiry").show();
        this.toggle="open"
      }
      else {
        $(".btn-enquiry").hide();
        $(".search-results").show();
        $(".search-results").removeClass("d-none");

        this.toggle="close"
      }
    },

    
    hmopenModal() {
      this.$modal.show("hm");
    },
    hmcloseModal() {
      this.$modal.hide("hm");
    },
    
    async getAllData(slug) {
      try {
           const results = await axios.get(
              getStrapiMedia('/properties?tags.label_contains='+slug)
          );
          return results.data;
      } catch (error) {

          console.log(error);
          return [];
      }
    },
  },
  async mounted() {
    const slug = this.$page.strapi.tags[0].slug;
    this.posts = await this.getAllData(slug);
      //this.hmopenModal();
    //this.testFunction();
    setTimeout(()=>{this.hmopenModal()},5000);
    console.log(this.$page.strapi.tags[0].seo,"seooooo");
  },
  metaInfo() {
    //const { title, description, image } = this.$page.strapi.articles[0];
    const { defaultSeo, favicon } = this.$page.strapi.global;
    const { seo } = this.$page.strapi.tags[0];

    // Merge default and article-specific SEO data
    const Seo = {
      ...defaultSeo,
      ...seo,
    };

    return {
      title: this.$page.strapi.tags[0].seo.metaTitle,
      meta: getMetaTags(Seo),
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
