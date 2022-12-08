<template>
  <Layout>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      loader="dots"
      color="rgb(42, 46, 67)"
      :is-full-page="true"
    ></loading>

    <section class="banner-section">
      <div class="banner">
        <g-image src="~/assets/images/Banners/property.png" />
        <!-- <h1>List your property</h1> -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row  mt-50">
          <div class="col-md-12">
            <h1 class="h1Title text-center mb-30">List your property</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="listproperty-section">
      <div class="container">
        <div class="row mb-55">
        <!-- <div class="row mt-35 mb-55"> -->
          <div class="col-md-12 text-center">
            <div class="property-content">
              <!-- <h3 class="mb-20">List your property</h3> -->
              <p>
                Do you own a prestigious property that has to its credit an
                array of spectacular benefits?<br />
                Then we can help you reach out to a larger segment of the
                audience courtesy our<br />
                exemplary services that will be extremely useful to you.
              </p>
              <br />
              <p>
                We can give your project the exposure that it really and truly
                deserves. It will help you<br />
                draw the attention of the target customers with tremendous ease.
                So, enlist your<br />
                property right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="propertyform-section pb-80">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="property-form">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form action="" @submit.prevent="handleSubmit(saveproperty)">
                  <h2>property details</h2>
                  <hr />
                  <div class="row mt-35">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="required" v-slot="{ errors }">
                        <select
                          v-model="pListing['property_type']"
                          name="property_type"
                        >
                          <option value="0">Property Type</option>
                          <option
                            v-for="(property, index) in $page.strapi
                              .propertyTypes"
                            :key="index"
                            :value="property.id"
                          >
                            {{ property.name }}
                          </option>
                        </select>
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="" v-slot="{ errors }">
                        <input
                          type="text"
                          name="development_name"
                          placeholder="Development Name (Optional)"
                          v-model="pListing.development_name"
                          maxlength="20"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="property" v-slot="{ errors }">
                        <input
                          type="text"
                          name="property_location"
                          placeholder="Property Location"
                          v-model="pListing.property_location"
                          maxlength="20"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="bedCount" v-slot="{ errors }">
                        <input
                          type="text"
                          name="number_of_beds"
                          placeholder="Number of Beds (Optional)"
                          v-model="pListing.number_of_beds"
                          @input="acceptNumber"
                          maxlength="2"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="bathRoomCount"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          name="number_of_bathrooms"
                          placeholder="Number of Bathroom (Optional)"
                          v-model="pListing.number_of_bathrooms"
                          @input="acceptNumber"
                          maxlength="2"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="" v-slot="{ errors }">
                        <input
                          type="text"
                          name="area"
                          placeholder="Area Sq Ft (Optional)"
                          v-model="pListing.area"
                          v-on:keypress="isDouble($event)"
                          maxlength="8"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <h2 class="mt-40">upload files</h2>
                  <hr />
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="Passportext:jpg,png,jpeg,pdf,doc,docx"
                        v-slot="{ errors, validate }"
                      >
                        <label class="mb-12">Passport Copy (Optional)</label>
                        <input
                          type="file"
                          name="passport"
                          class="lp-file"
                          @change="filesChange($event.target, validate)"
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="Titleext:jpg,png,jpeg,pdf,doc,docx"
                        v-slot="{ errors, validate }"
                      >
                        <label class="mb-12">Title Deed (Optional)</label>
                        <input
                          type="file"
                          name="title_deed"
                          class="lp-file"
                          @change="filesChange($event.target, validate)"
                          accept="image/*,.pdf,.doc,.docx"
                        />

                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="Floorext:jpg,png,jpeg,pdf,doc,docx"
                        v-slot="{ errors, validate }"
                      >
                        <label class="mb-12">Floor Plan (Optional)</label>
                        <input
                          type="file"
                          name="floor_plan"
                          class="lp-file"
                          @change="filesChange($event.target, validate)"
                          accept="image/*,.pdf,.doc,.docx"
                        />

                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <h2 class="mt-40">personal details</h2>
                  <hr />
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="fullName" v-slot="{ errors }">
                        <input
                          type="text"
                          name="fullname"
                          placeholder="Full Name"
                          v-model="pListing.fullname"
                          v-on:keypress="isLetter($event)"
                          maxlength="20"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="emailId|email"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          name="emailid"
                          placeholder="Email ID"
                          v-model="pListing.emailid"
                          maxlength="30"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider
                        rules="mobileNo|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          name="mobile"
                          placeholder="Mobile Number"
                          v-model="pListing.mobile"
                          @input="acceptNumber"
                          maxlength="10"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <validation-provider rules="numeric" v-slot="{ errors }">
                        <input
                          type="text"
                          name="office_number"
                          placeholder="Office Number (Optional)"
                          v-model="pListing.office_number"
                          @input="acceptNumber"
                          maxlength="10"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 px-5 field-outer">
                      <div class="g-recaptcha"
                        data-sitekey="6Le8s7caAAAAAGyCdG2T61FMj9h6abRnsog5ZWGQ"></div>
                    </div>
                  </div>
                  <input type="submit" value="Submit" class="mt-50" />
                  <!-- <notifications
                    group="foo"
                    classes="vue-notification"
                    :style="listshow"
                  /> -->
                   <notifications group="foo" class="vue-notification" :style="[isError ?{'background': '#960909','border-left': '5px solid #960909'}:{'background':'green','border-left': '5px solid green'}]"/>
                  <!-- <notifications group="foo" :style="[isError ?{'color': '#960909'}:{'color':'green'}]"/> -->
                </form>
              </ValidationObserver>
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
    propertyTypes {
      name
      id
      slug
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
import Articles from "~/components/Articles";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, numeric, required, ext } from "vee-validate/dist/rules";
import Loading from "vue-loading-overlay";

const axios = require("axios");

extend("Passportext", {
  ...ext,
  message: "Please Add Valid Passport Document",
});
extend("Titleext", {
  ...ext,
  message: "Please Add Valid Title Deed Document",
});
extend("Floorext", {
  ...ext,
  message: "Please Add Valid Floore Plan Document",
});
extend("required", {
  ...required,
  message: "This field is required",
});
extend("email", {
  ...email,
  message: "Enter a valid Email Id",
});
extend("numeric", {
  ...numeric,
  message: "Enter a valid Phone Number",
});

extend("bathRoomCount", {
  ...numeric,
  message: "Enter a valid Bathroom Number",
});
extend("property", {
  ...required,
  message: "Property Location is required",
});
extend("bedCount", {
  ...numeric,
  message: "Enter a valid BedRoom Number",
});
extend("fullName", {
  ...required,
  message: "Full Name is required",
});
extend("emailId", {
  ...required,
  message: "Email Id is required",
});
extend("mobileNo", {
  ...required,
  message: "Mobile Number is required",
});

extend("file", {
  message: "Not a image file",
  validate: (value) => {
    // console.log("value=", value);
    return false; //Test the regex. Test function returns a true or false value.
  },
});

export default {
  components: {
    Articles,
    ValidationProvider,
    ValidationObserver,
    Loading,
  },
  data() {
    return {
      listshow: {
        "margin-left": "339px!important",
      },
      formData: null,
      pListing: { property_type: 0 },
      isLoading: false,
      isSuccess: false,
      responseData: undefined,
      errorResponse: undefined,
      valueKey: "",
      stringKey: "",
      isError:false
    };
  },
  methods: {
    async filesChange(target, validate) {
      let fieldName = target.name,
        file = target.files;
      var valid = await validate(file[0]);

      if (valid.valid) {
        this.formData.append(fieldName, file[0], file[0].name);
      }
    },
    async saveproperty() {
      const formElement = document.querySelector("form");
      this.isLoading = true;

      const request = new XMLHttpRequest();

      var formData = new FormData();

      const formElements = formElement.elements;

      const data = {};

      for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        if (!["submit", "file"].includes(currentElement.type)) {
          if (currentElement.value)
            data[currentElement.name] = currentElement.value;
        } else if (currentElement.type === "file") {
          if (currentElement.files.length === 1) {
            const file = currentElement.files[0];
            formData.append(`files.${currentElement.name}`, file, file.name);
          } else {
            for (let i = 0; i < currentElement.files.length; i++) {
              const file = currentElement.files[i];
              formData.append(`files.${currentElement.name}`, file, file.name);
            }
          }
        }
      }
      recaptcha = grecaptcha.getResponse();
      formData.recaptcha = recaptcha;
      // //  data.append(recaptcha)
      //     console.log("from list",formData);

      // start get response and show notification
      formData.append("data", JSON.stringify(data));
      console.log("form data from here", data);
      var result = await axios
        .post(getStrapiMedia("/property-listings"), formData)
        .then((response) => {
          this.responseData = response.status;
          if (this.responseData == 200) {
            this.isError=false;
            this.showToast();
          }
          //alert("Successfully submitted");
        })
        .catch((err) => {
          this.errorResponse = err.response.data.message;
          this.isError=true;
          this.showErrorToast();
        });
      //  end res

      // try {
      //   formData.append("data", JSON.stringify(data));
      //   var result = await axios.post(
      //     getStrapiMedia("/property-listings"),
      //     formData
      //   );
      //   formElement.reset();
      //   formData = new FormData();
      //   alert("Successfully submitted");
      //   // this.showToast();
      // } catch (e) {
      //   console.log(e);
      //   alert("Error while submitting request");
      // }
      //
      //   request.open('POST', getStrapiMedia('/property-listings'));
      //  request.send(formData);

      this.isLoading = false;
    },
    onCancel() {},

    showToast() {
      this.$notify({
        type: "success",
        group: "foo",
        title: "Property Details",
        duration: 3000,
        width: "200px",
        position: "center",
        text: "Successfully submitted Property Details Form!",
      });
    },
    showErrorToast() {
      this.$notify({
        type: "error",
        group: "foo",
        title: "Failed",
        duration: 30000,
        width: "200px",
        position: "center",
        text: this.errorResponse,
      });
    },
    acceptNumber() {
      var x = this.valueKey
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/); // match value key is number or not
      this.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    isDouble(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[0-9.]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
  mounted() {
    this.formData = new FormData();
    console.log(this.$page.strapi.propertyTypes);

    let hypothesisScript = document.createElement("script");
    hypothesisScript.setAttribute(
      "src",
      "https://www.google.com/recaptcha/api.js"
    );
    document.body.appendChild(hypothesisScript);
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
  computed: {
    firstNameValid() {
      return /^[A-Za-z]+$/.test(this.pListing.fullname);
    },
  },
};
</script>

<style scoped>
.vue-notification-group {
  margin-top: 20px;
  position: relative;
}
.vue-notification {
  /* padding: 10px; */
  margin: 0 5px 5px;

  font-size: 12px;
  margin-right: 25%;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  width: 300px!important;
  top: 10px!important;
  right: 0px!important;
  margin-bottom: 21px!important;
  margin-left: 344px!important;
}
.error-message {
  color: #bd0000;
}

</style>
