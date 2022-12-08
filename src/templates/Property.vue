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
              <div v-for="(images,index) in $page.strapi.properties[0].images" :key="index" :images="images">
                <g-image :src="getStrapiMedia($page.strapi.properties[0].images[index].url)" />
              </div>
            </VueSlickCarousel>
            <div class="tempProSlide">
            <VueSlickCarousel
            ref="c2"
            :asNavFor="c1"
            :slidesToShow="3"
            :focusOnSelect="true">
              <div v-for="(images,index) in $page.strapi.properties[0].images" :key="index" :images="images" >
                <g-image :src="getStrapiMedia($page.strapi.properties[0].images[index].url)" />
              </div>
            </VueSlickCarousel>
            </div>
          </div>
          <div class="col-md-6">
            <h3 class="card-title">{{ $page.strapi.properties[0].title }}</h3>
            <h4 class="card-location"> {{ $page.strapi.properties[0].location }}</h4>
            <h4  v-if="$page.strapi.properties[0].property_type.name"><span>{{ $page.strapi.properties[0].property_type.name.toUpperCase() }}</span></h4>
            <div class="property-meta mb-12">
              <span class="room">
                <g-image src="~/assets/images/bed.png"/>
                {{ $page.strapi.properties[0].bedrooms }}
              </span>
              <!-- <span class="room">
                <g-image src="~/assets/images/baby-shower.png"/>
                {{ $page.strapi.properties[0].bathroom }}
              </span> -->
              <span class="area">
                <g-image src="~/assets/images/Group-3.png"/>
                {{ $page.strapi.properties[0].area }} 
              </span>
            </div>
            <h4 v-if="$page.strapi.properties[0].developerName"><span>Developer Name: {{ $page.strapi.properties[0].developerName.toUpperCase() }} </span></h4>
            <h5 class="mb-15" v-if="$page.strapi.properties[0].price"> {{ $page.strapi.properties[0].price }}</h5>
            <div v-html="$page.strapi.properties[0].description"></div>
          </div>
        </div>

        <div class="row mt-70 mb-80">
          <div class="col-md-6">
            <h3>Location Map</h3>
               <!-- <a href="https://www.latlong.net/convert-address-to-lat-long.html">Do you Want to Know your Latitude and Longitude click Here!!!</a>  use window.open for open new tab-->
          <!-- <div id="app"> -->
            <!-- used for google  map -->
        <div id="map" ref="map"></div>
           <!-- </div> -->
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

    <section class="similar-properties">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <hr>
            <h3 class="my-25">Similar Properties</h3>
          </div>
          <div class="col-md-12">
            <VueSlickCarousel v-bind="settingsnew" v-if="PropertyData.length">
              <div v-for="(property, index) in PropertyData" :key="index" >
                <PropertiesSliderCard :property="property" />
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query($slug: String!) {
  strapi {
    properties(where: { slug: $slug }) {
      title
      slug
      latitude
      longitude
      address
      location
      status
      bedrooms
      bathroom
      price
      description
      area
      developerName
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
      
      Seo {
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import ServiceCard from "~/components/ServiceCard";
import axios from "axios";
import PropertiesSliderCard from "~/components/PropertiesSliderCard";


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
      PropertyData:[], 
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
        mapData:{lat:'',lng:''}
    };
  },
  components: {
    VueSlickCarousel, 
    VueMarkdown,
    ServiceCard,

    PropertiesSliderCard,
    ValidationProvider, 
    ValidationObserver, 
    ContactForm,
    // map
  },
  methods: {
    getStrapiMedia,

    saveContact,
    ContactFormData(event) {
      this.saveContact(event)
    },

    async getPropertiesData(slug) {
      try {
          const results = await axios.get(
            getStrapiMedia('/properties?property_status='+slug+'&_limit=6')
          );
          //console.log("res for all",results.data[0].latitude+"dataaaa",results.data[0].longitude);
          return results.data;
      } catch (error) {

          console.log(error);
          return [];
      }
    },
  },
  async mounted() {
    this.c1 = this.$refs.c1;
    this.c2 = this.$refs.c2;

    console.log(this.$page.strapi.properties[0]);

    this.PropertyData = await this.getPropertiesData(this.$page.strapi.properties[0].property_status.id);
    this.mapData.lat=this.$page.strapi.properties[0].latitude;
    this.mapData.lng=this.$page.strapi.properties[0].longitude;
      this.map= new window.google.maps.Map(this.$refs["map"],{
       center:{lat:this.mapData.lat,lng:this.mapData.lng},
      zoom:12
    })
     var Marker =  new window.google.maps.Marker({
       position:{lat:this.mapData.lat,lng:this.mapData.lng},
       map:this.map,
       title: this.$page.strapi.properties[0].title,
    })
     this.$page.strapi.properties[0].address
     var infowindow = new google.maps.InfoWindow();
    Marker.addListener('mouseover', function() {
    infowindow.setContent("Office 1506,  Prism Tower Business Bay Dubai")
    infowindow.open(map, this);
});
Marker.addListener('mouseout', function() {
    infowindow.close();
});
  },
  metaInfo() {
    //const { title, description, image } = this.$page.strapi.properties[0];
    const { Seo } = this.$page.strapi.properties[0];
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...Seo,
    };
    // const fullSeo = {
    //   ...defaultSeo,
    //   metaTitle: title,
    //   metaDescription: description,
    //   shareImage: image,
    // };
    // return {
    //   title: this.$page.strapi.properties[0].title,
    //   meta: getMetaTags(fullSeo),
    //   link: [
    //     {
    //       rel: "favicon",
    //       href: getStrapiMedia(favicon.url),
    //     },
    //   ],
    // };

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
  height: 634px;
  background: grey;
}
 </style>