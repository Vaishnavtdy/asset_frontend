<template>
    <Layout>
        <section class="banner-section">
            <div class="banner">
                <g-image src="~/assets/images/Banners/contact.png"/>
                <!-- <h1>Contact Us</h1> -->
            </div>
        </section>
        <!-- <section class="contact-section pt-98 pb-95">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 contact-imgCol" >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.468120901023!2d55.25880971500931!3d25.18743118390074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697e176dbccf%3A0x4503feeee042790d!2sAsset%20Homez%20International%20Properties%20LLC!5e0!3m2!1sen!2sin!4v1636102827262!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <div class="col-md-8">
                        <div class="contact-form">
                            <h2>contact us</h2>
                            <hr>
                            <ContactForm :messageData="this.dataResponse"  @onContactFormSubmit="ContactFormData($event)"/>  
                            
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <section class="contact-section contact-property  pt-98 pb-95 damac-contact-property">
            <div class="container">
                <div class="row">
                <div class="col-md-4 pe-0 pNormal">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.468120901023!2d55.25880971500931!3d25.18743118390074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697e176dbccf%3A0x4503feeee042790d!2sAsset%20Homez%20International%20Properties%20LLC!5e0!3m2!1sen!2sin!4v1636102827262!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div class="col-md-8 ps-0 pNormal">
                    <div class="contactUs-prop">
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
    import { saveEnquiry } from "~/utils/custom";
    
    import LandingForm from "~/components/LandingForm";

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
        components: {
            ValidationProvider, 
            ValidationObserver, 
            ContactForm, 
            LandingForm
        },
        data() {
            return {
                contact: {full_name: '', email: '', mobile: ''},
                dataResponse:undefined,
                formTitle: "Contact Us"
            }
        },
        methods: {
            saveEnquiry,
            async EnquiryFormData(event) {
                console.log(event,"eventtttttttttttttttttttttttttttttttt");
                // var response = await this.saveEnquiry(event);
                // this.dataResponse = response.message;
                // console.log("response from pages success" + this.dataResponse);
                // return response;
            },
            // saveContact,
            // async ContactFormData(event) {
            //     var response = await this.saveContact(event);
            //       this.dataResponse=response.message;
            //       console.log("response from pages success"+this.dataResponse);  
            //    return response;
            // },
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
