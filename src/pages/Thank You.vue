<template>
    <Layout>
        
        <section class="contact-section pt-98 pb-95">
            <div class="container">
                <div class="row">
                    <div class="offset-md-2 col-md-8 text-center">
                        <h1 style="color: #000; margin-bottom: 15px;">Thank you</h1>
                        <p style="color: #000">We have received your enquiry, our team will get back to you shortly</p>
                    </div>
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

        }
    }
</page-query>

<script>
    import {getMetaTags} from "~/utils/seo";
    import {getStrapiMedia} from "~/utils/medias";
    import {saveContact} from "~/utils/custom";
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
        name: "ContactUs",
        components: {ValidationProvider, ValidationObserver, ContactForm},
        data() {
            return {
                contact: {full_name: '', email: '', mobile: ''},
                dataResponse:undefined
            }
        },
        methods: {
            saveContact,
            async ContactFormData(event) {
                var response = await this.saveContact(event);
                  this.dataResponse=response.message;
                  console.log("response from pages success"+this.dataResponse);  
               return response;
            },
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
         async mounted() {
             var latitude=25.18758831270907;
             var longitude=55.26114334341007
      this.map= new window.google.maps.Map(this.$refs["map"],{
      center:{lat:latitude,lng:longitude},
      zoom:12,
    })
    var Marker =  new window.google.maps.Marker({
       position:{lat:latitude,lng:longitude},
       map:this.map,
       title: "Asset Homez",
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
    };
</script>
 <style scoped>
 #map{
  height: 634px;
  background: grey;
}
 </style>
