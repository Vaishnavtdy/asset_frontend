<template>
  <Layout>
    <section class="homeSlider-section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <div class="SliderContent mobile-hide">
              <h1 class="mb-30">{{ $page.strapi.home.slidertitle }}</h1>
              <p>{{ $page.strapi.home.sliderdescription }}</p>
            </div>
          </div>
          <div class="col-md-8">
            <div class="sliderImage">
              <!-- <g-image :src="getStrapiMedia($page.strapi.home.sliderimage.url)"/> -->
              
              <VueSlickCarousel v-bind="settingsSlider"> 
                <div><g-image src="~/assets/images/homebanner.png"/></div>
                <div><g-image src="~/assets/images/homebanner2.png"/></div>
                <!-- <div><g-image src="~/assets/images/01.jpg"/></div> -->
              </VueSlickCarousel>
            </div>
          </div>
        </div>
      </div>

      <div class="slider-search">
        <PropertySearch class="mobile-hide" />
        <div class="container mobile-only">
          <div class="row">
            <div class="col-md-12 mt-4 mb-3">
              <div class="slider-search">
                <h1 class="mb-30">{{ $page.strapi.home.slidertitle }}</h1>
                <p>{{ $page.strapi.home.sliderdescription }}</p>
              </div>
            </div>
          </div>
        </div>
        <PropertySearchMobile class="mobile-only" />
      </div>

      <div class="slider-sidebar">
        <div>
          <label>{{ $page.strapi.home.phone }}
            <span>{{ $page.strapi.home.email }}</span>
          </label>
        </div>
      </div>
    </section>

    <div class="icon-bar">
      <div class="sh-icons">
        <g-link to="tel:+9710524563366" class="call">
          <g-image src="~/assets/images/Home/call.png" />
        </g-link>
        <g-link to="mailto:info@assethomez.com" class="message">
          <g-image src="~/assets/images/Home/message.png" />
        </g-link>
        <g-link to="https://www.facebook.com/assethomez/" class="fb">
          <g-image src="~/assets/images/Home/fb.png" />
        </g-link>
        <g-link to="https://wa.me/+971524563366" class="whatsapp">
          <g-image src="~/assets/images/Home/whatsapp.png" />
        </g-link>
      </div>
      <a href="#" class="closeIcon" @click="socialIconToggle()">
        <g-image :src="socialIconImage" />
      </a>
    </div>

    <section class="areaGuide-section mt-100 pb-80">
      <div class="container">
        <div class="row">
          <GuideCard
            v-for="(guide, ind) in $page.strapi.areaGuides"
            :key="ind"
            :guide="guide"
            :ind="ind"

          ></GuideCard>
          <!-- <div class="col-md-6" style="margin-left: 83%;">
          <button  :disabled="isDisablePrev" @click="prevButton()"><img src="../assets/images/ServicesIcons/Component 2 – 24 (1).png"/></button>
           <button :disabled="isDisableNext" @click="nextButton()"><img src="../assets/images/ServicesIcons/Component 2 – 23.png"/></button>
          </div> -->
        </div>
      </div>
    </section>

    <section class="homeAbout-section">
      <div class="container-fluid px-0">
        <div class="row">
          <div class="col-md-6">
            <div class="img-hover-zoom">
              <g-image
                :src="getStrapiMedia($page.strapi.home.about_image.url)"
              />
            </div>
          </div>
          <div class="col-md-6 mt-95 px-72">
            <h2 class="mb-35">{{ $page.strapi.home.about_title }}</h2>
            <div class="width600">
              <div v-html="$page.strapi.home.about_description"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnDiv">
        <g-link :to="{ path: $page.strapi.home.aboutBtn_link }">
          <button>{{ $page.strapi.home.aboutBtn_title }}</button>
        </g-link>
      </div>
      <div class="ImgDiv">
        <g-image src="~/assets/images/Home/Dubai.png" />
      </div>
    </section>

    <section class="homeService-section">
      <div class="container mb-65">
        <div class="row">
          <div class="col-md-6">
            <h2>{{ $page.strapi.home.service_title }}</h2>
          </div>
          <div class="col-md-6 text-end m-auto">
            <g-link :to="{ path: $page.strapi.home.servicesBtn_link }">
              <button class="viewMore">
                {{ $page.strapi.home.servicesBtn_title }}
              </button>
            </g-link>
          </div>
        </div>
      </div>
      <div class="container-fluid" >
        <div class="row">
          <div class="col-md-12 services-card">
            <VueSlickCarousel v-bind="settings">
              <div
                v-for="(service, index) in $page.strapi.service.servicecard"
                :key="index"
                :service="service"
              >
                <div class="card text-center mb-30 test-data">
                  <g-image
                    class="card-img-top mainImage"
                    :src="getStrapiMedia(service.image.url)"
                  />
                  <g-image
                    class="card-img-top hoverImage"
                    :src="getStrapiMedia(service.hoverimage.url)"
                  />

                  <div class="card-body" >
                    <h5 class="card-title" v-html="service.title"></h5>
                    <div class="card-text" v-html="trimString(service.description)"></div>

                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>

    <section class="homeProperty-section mt-100">
      <div class="container">
        <div class="row mb-50">
          <div class="col-md-6">
            <h2 class="mb-20">{{ $page.strapi.home.propertysale_tltle }}</h2>
            <p>{{ $page.strapi.home.propertysale_description }}</p>
          </div>
          <div class="col-md-6 m-auto text-end">
            <g-link :to="{ path: $page.strapi.home.propertysaleBtn_link }">
              <button class="viewMore">
                {{ $page.strapi.home.propertysaleBtn_title }}
              </button>
            </g-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <VueSlickCarousel v-bind="settingsnew"  v-if="PropertyBuyData.length">
              <div v-for="(property, index) in PropertyBuyData" :key="index">
                <PropertiesSliderCard :property="property"/>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
      <!-- <div class="container mt-35">
        <div class="row mb-50">
          <div class="col-md-6">
            <h2 class="mb-20">{{ $page.strapi.home.propertyrent_title }}</h2>
            <p>{{ $page.strapi.home.propertyrent_description }}</p>
          </div>
          <div class="col-md-6 m-auto text-end">
            <g-link :to="{ path: $page.strapi.home.propertyrentBtn_link }">
              <button class="viewMore">
                {{ $page.strapi.home.propertyrentBtn_title }}
              </button>
            </g-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <VueSlickCarousel v-bind="settingsnew" v-if="PropertyRentData.length">
              <div v-for="(property, index) in PropertyRentData" :key="index" >
                <PropertiesSliderCard :property="property" />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div> -->
    </section>

    <section class="testimonial-section mt-100">
      <div class="container">
        <h2>{{ $page.strapi.home.testimonial_title }}</h2>
      </div>
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
          <li
            data-bs-target="#myCarousel"
            v-for="(test, index) in $page.strapi.home.testimonial"
            :class="activeTestimonial === index ? 'active' : ''"
            @click="activeItem(index)"
            :data-bs-slide-to="index"
            :key="index"
          ></li>
        </ol>
        <div class="carousel-inner">
          <!-- <div
            class="carousel-item"
            v-for="(testimonial, index) in $page.strapi.home.testimonial"
            :key="index"
            :testimonial="testimonial"
            :class="activeTestimonial === index ? 'active' : ''"
          > -->
          <div
            class="carousel-item"
            v-for="(testimonial, index) in $page.strapi.home.testimonial"
            :key="index"
            :testimonial="testimonial"
            :class="active"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-3 z-index1">
                  <g-image
                    :src="getStrapiMedia(testimonial.testimonial_image.url)"
                  />
                </div>
                <div class="col-md-9 mt-60">
                  <div class="testimonial-content">
                    <div v-html="testimonial.testimonial_description"></div>

                    <div
                      class="d-flex flex-row align-items-center TProfile mt-90"
                    >
                      <div class="d-flex">
                        <g-image
                          :src="getStrapiMedia(testimonial.client_image.url)"
                        />
                      </div>
                      <div class="d-flex flex-column px-3">
                        <h4>{{ testimonial.client_name }}</h4>
                        <h5>{{ testimonial.testimonial_caption }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 

    <!-- <section class="homeBlog-section mt-95">
      <div class="container">
        <div class="row mb-20">
          <div class="col-md-12 text-center">
            <h2>{{ $page.strapi.home.newstitle }}</h2>
            <div class="text-end mt-N45">
              <g-link :to="{ path: $page.strapi.home.newsBtn_link }">
                <button class="viewMore">
                  {{ $page.strapi.home.newsBtn_title }}
                </button>
              </g-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <Articles :articles="$page.strapi.articles" :flag="1" />
      </div>
    </section> -->

    <section class="formPopup-section mt-60">
      <div class="container">
        <div class="row">
          <div class="col-md-3 text-center">
            <g-image
              :src="getStrapiMedia($page.strapi.home.mortgageimage.url)"
            />
            <div class="fp-head">
              <h2>{{ $page.strapi.home.mortgage_title }}</h2>
            </div>

            <button @click="hmopenModal()" class="knowMore">KNOW MORE</button>

<client-only>
            <modal name="hm" height="auto"
            :resizable="resizable"
            :adaptive="adaptive">
              <div class="contact-form formPopup-form">
                <button @click="hmcloseModal()" class="closeBtn">X</button>
                <h3>House Mortgage</h3>
                <hr>
                <ContactFormPopup @onContactFormSubmit="ContactFormData($event)" formKey="in1200"/>
              </div>
            </modal>
            </client-only>
          </div>
          <div class="col-md-3 text-center">
            <g-image
              :src="getStrapiMedia($page.strapi.home.consultation_image.url)"
            />
            <div class="fp-head">
              <h2>{{ $page.strapi.home.consultation_title }}</h2>
            </div>

            <button @click="fcopenModal()" class="knowMore">KNOW MORE</button>
<client-only>
            <modal name="fc" height="auto"
            :resizable="resizable"
            :adaptive="adaptive">
              <div class="contact-form formPopup-form">
                <button @click="fccloseModal()" class="closeBtn">X</button>
                <h3>free consultation</h3>
                <hr />
                <ContactFormPopup :messageData="this.dataResponse"
                  @onContactFormSubmit="ContactFormData($event)"
                                  formKey="in1201"
                />
              </div>
            </modal>
            </client-only>
          </div>
          <div class="col-md-3 text-center">
            <g-image :src="getStrapiMedia($page.strapi.home.offer_image.url)" />
            <div class="fp-head">
              <h2>{{ $page.strapi.home.offer_title }}</h2>
            </div>

            <button @click="ioopenModal()" class="knowMore">KNOW MORE</button>
<client-only>
            <modal name="io" height="auto"
            :resizable="resizable"
            :adaptive="adaptive">
              <div class="contact-form formPopup-form">
                <button @click="iocloseModal()" class="closeBtn">X</button>
                <h3>instant offer</h3>
                <hr />
                <ContactFormPopup :messageData="this.dataResponse"
                  @onContactFormSubmit="ContactFormData($event)" formKey="in1202"
                />
              </div>
            </modal>
            </client-only>
          </div>
          <div class="col-md-3 text-center">
            <g-image
              :src="getStrapiMedia($page.strapi.home.currency_image.url)"
            />
            <div class="fp-head">
              <h2>{{ $page.strapi.home.currency_title }}</h2>
            </div>

            <button @click="ctopenModal()" class="knowMore">KNOW MORE</button>
            <client-only>
            <modal name="ct" height="auto"
            :resizable="resizable"
            :adaptive="adaptive">
              <div class="contact-form formPopup-form">
                <button @click="ctcloseModal()" class="closeBtn">X</button>
                <h3>Currency transfers</h3>
                <hr />
                <ContactFormPopup :messageData="this.dataResponse"
                  @onContactFormSubmit="ContactFormData($event)"
                                  formKey="in1204"
                />
              </div>
            </modal>
            </client-only>
          </div>
        </div>
      </div>
    </section>

    <section class="icon-section">
      <div class="container">
        <div class="row">
          <FeatureCard
            v-for="(feature, index) in $page.strapi.home.feature_block"
            :key="index"
            :feature="feature"
          />
        </div>
      </div>
    </section>

    <!-- <section class="contact-section pt-98 pb-95  damac-contact-property">
      <div class="container">
        <div class="row">
          <div class="col-md-4 m-auto contact-imgCol" id="map" ref="map">
          </div>
          <div class="col-md-8">
            <div class="contact-form">
              <h2>contact us</h2>
              <hr />
              <ContactForm :messageData="this.dataResponse" @onContactFormSubmit="ContactFormData($event)" /> 
              
            
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="contact-section contact-property  pt-98 pb-95 damac-contact-property">
      <div class="container">
        <div class="row">
          <div class="col-md-4 pe-0 pNormal" id="map" ref="map">
            <!-- <g-image src="~/assets/images/contact.png" /> -->
          </div>
          <div class="col-md-8 ps-0 pNormal">
            <div class="contactUs-prop h-100">
            <h3 class="mb-30">Contact Us</h3>
            <LandingForm
                :messageData="this.dataResponse"
                :formTitle="this.formTitle"
                @onEnquiryFormSubmit="EnquiryFormData($event)"
            />
            
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="partners-section pb-15">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center mt-40 mb-2">
            <h2>{{ $page.strapi.home.partners_title }}</h2>
          </div>
        </div>
      </div>
      <div class="container-fluid partners-block mt-4">
        <div class="row">
          <div class="col-md-12">
            <VueSlickCarousel v-bind="settings">
              <div
                v-for="(partners_logo, index) in $page.strapi.home
                  .partners_logo"
                :key="index"
                :partners_logo="partners_logo"
              >
                <g-image

                  :src="
                    getStrapiMedia($page.strapi.home.partners_logo[index].url)
                  "
                />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>
    <div>
    </div>
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
        slidertitle
        sliderdescription
        sliderimage{
          url
        }
        email
        phone
        areaguide_title
        about_title
        about_description
        aboutBtn_title
        aboutBtn_link
        about_image {
          url
        }
        service_title
        servicesBtn_title
        servicesBtn_link
        propertysale_tltle
        propertysale_description
        propertysaleBtn_title
        propertysaleBtn_link
        propertyrent_title
        propertyrent_description
        propertyrentBtn_title
        propertyrentBtn_link
        testimonial_title
        testimonial {
          client_name
          testimonial_caption
          testimonial_description
          testimonial_image {
            url
          }
          client_image{
            url
          }
        }
        newstitle
        newsBtn_title
        newsBtn_link
        mortgage_title
        mortgageimage{
          url
        }
        consultation_title
        consultation_image {
          url
        }
        offer_title
        offer_image{
          url
        }
        currency_title
        currency_image{
          url
        }
        feature_block{
          featureTile
          feature_description
          feature_image {
            url
          }
        }
        partners_title
        partners_logo {
          url
        }
        seo {
          metaTitle
          metaDescription
          shareImage {
            url
          }
        }
      }
      properties {
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
        property_status {
          id
          name
          slug
        }
        images {
          url
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
      }
      articles(limit: 4, where: { status: "published" }) {
        slug
        title
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
      areaGuides(limit: 3) {
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
import Articles from "~/components/Articles";
import FeatureCard from "~/components/FeatureCard";
import PropertySearch from "~/components/PropertySearch";
import PropertySearchMobile from "~/components/PropertySearchMobile";
import GuideCard from "~/components/GuideCard";
import PropertiesSliderCard from "~/components/PropertiesSliderCard";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import moment from "moment";
import axios from "axios";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import { saveContact } from "~/utils/custom";
import ContactForm from "~/components/ContactForm";
import ContactFormPopup from "~/components/ContactFormPopup";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, numeric, required } from "vee-validate/dist/rules";
import { saveEnquiry } from "~/utils/custom";
import LandingForm from "~/components/LandingForm";

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
  components: {
    Articles,
    FeatureCard,

    PropertySearch,
    PropertySearchMobile,
    PropertiesSliderCard,

    GuideCard,
    VueSlickCarousel,

    ValidationProvider,
    ValidationObserver,
    ContactForm,
    ContactFormPopup,
    LandingForm
  },
  data() {
    return {
      contact: { full_name: "", email: "", mobile: "", message: "" },
      settings: {
        centerMode: true,
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 3,
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
      settingsSlider: {
        autoplay: true,
        arrows: false,
        dots: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              dots: false,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      socialIconImage: "",
      toggle: "close",
      active: "active",
      inactive: "",
      activeTestimonial: 1,
      resizable: true,
      adaptive: true,
      draggable: true,
      BuyFlag: 1,
      PropertyBuyData:[],
      PropertyRentData:[],
      dataResponse:undefined,
      formTitle: "Contact Us"
      // nextCount:'2',
      // isDisableNext:false,
      // isDisablePrev:false
    };
  },
  methods: {
    getStrapiMedia,
    trimString(str) {
   return str && str.length > 100 ? str.slice(0, 340)+"..." : str;
   },
    titletrim(titlestr) {
     return titlestr && titlestr.length > 30 ? titlestr.slice(0, 30)+"..." : titlestr;
    },
    //    nextButton(){
    //   console.log("before clicked next",this.$page.strapi.areaGuides.length);
    //  this.nextCount++;
    //  console.log(" after clicked next",this.nextCount);
    //  if(this.nextCount==4){
    //    this.isDisableNext=true;
    //    this.isDisablePrev=false;
    //  }
    // },
    // prevButton(){
    //  console.log("before clicked prev",this.nextCount);
    //  this.nextCount--;
    //  console.log(" after clicked next",this.nextCount);
    //  if(this.nextCount==2){
    //    this.isDisablePrev=true;
    //    this.isDisableNext=false;
    //  }
    // },
    socialIconToggle() {
      if(this.toggle=="close") {
        $(".msgIcon").show();
        $( ".sh-icons" ).hide( "slow" );
        this.toggle="open"
        this.socialIconImage=this.getStrapiMedia('/uploads/msg_de8e34a4a2.png')
      }
      else {
        $(".closeIcon").show();
        $( ".sh-icons" ).show( "slow" );
        this.toggle="close"
        this.socialIconImage=this.getStrapiMedia('/uploads/close_Icon_aba8897f92.png')
      }
    },
    activeItem(val) {
      this.activeTestimonial = val;
    },
    searchToggle() {
      console.log(this.active);
      if (this.active == "active") {
        this.active = "";
        this.inactive = "active";
      } else {
        this.inactive = "";
        this.active = "active";
      }
    },

    hmopenModal() {
      this.$modal.show("hm");
    },
    hmcloseModal() {
      // alert(123);
      this.$modal.hide("hm");
    },
    fcopenModal() {
      this.$modal.show("fc");
    },
    fccloseModal() {
      this.$modal.hide("fc");
    },
    ioopenModal() {
      this.$modal.show("io");
    },
    iocloseModal() {
      this.$modal.hide("io");
    },
    ctopenModal() {
      this.$modal.show("ct");
    },
    ctcloseModal() {
      this.$modal.hide("ct");
    },

    saveContact,
   async ContactFormData(event) {
     var response=await this.saveContact(event);
    this.dataResponse=response.message;
         return event.send({success: false, message: this.dataResponse}, 400);
    },
    async getProperties(slug) {
      try {
          const results = await axios.get(
              getStrapiMedia('/properties?property_status='+slug+'&_limit=6')
          );
          // console.log(results.data);
          //this.propertyData[slug] = results.data;
          return results.data;
      } catch (error) {

          console.log(error);
          return [];
      }
    },
    getMap(){
      var latitude=25.18758831270907;
      var longitude=55.26114334341007
      this.map= new window.google.maps.Map(this.$refs["map"],{
        center:{lat:latitude,lng:longitude},
        zoom:12
      })
      var Marker= new window.google.maps.Marker({
        position:{lat:latitude,lng:longitude},
        map:this.map,
        title:"Asset Homes"
      })
      var infowindow = new google.maps.InfoWindow();
        Marker.addListener('mouseover', function() {
        infowindow.setContent("Prism Tower Business Bay Dubai")
        infowindow.open(map, this);
      });
      Marker.addListener('mouseout', function() {
        infowindow.close();
      });
    },
  },
  async mounted() {
    this.socialIconImage = this.getStrapiMedia(
      "/uploads/close_Icon_aba8897f92.png"
    );
    //console.log(this.socialIconImage);
    this.PropertyBuyData = await this.getProperties('1');
    this.PropertyRentData = await this.getProperties('2');
    this.getMap();
  },
  metaInfo() {
    const { seo } = this.$page.strapi.home;
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
<style scoped>
#map{
  height: 628px;
  background: grey;
}

.partners-block img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>
