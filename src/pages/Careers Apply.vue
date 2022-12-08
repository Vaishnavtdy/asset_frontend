<template>
  <Layout>
    <section class="careers-apply-section pt-50 mb-70">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-left">
            <h1 class="mb-30">Apply for Content Writer Post</h1>
          </div>
          <div class="col-md-12">
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
              <form
                action=""
                enctype="multipart/form-data"
                @submit.prevent="handleSubmit(savecareer)"
              >
                <h2 class="mb-25">Enter your personal details</h2>
                <div class="row">
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="FullName" v-slot="{ errors }">
                      <label>Full Name</label><br />
                      <input
                        type="text"
                        name="fullname"
                        v-model="careers.fullname"
                        v-on:keypress="isLetter($event)"
                        maxlength="30"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-md-3 field-outer">
                    <validation-provider
                      rules="EmailId|email"
                      v-slot="{ errors }"
                    >
                      <label>Email</label><br />
                      <input
                        type="email"
                        name="email"
                        v-model="careers.email"
                        maxlength="30"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-md-3 field-outer">
                    <validation-provider
                      rules="mobileNo|numeric"
                      v-slot="{ errors }"
                    >
                      <label>Mobile</label><br />
                      <input
                        type="text"
                        name="mobile"
                        v-model="careers.mobile"
                        maxlength="10"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="Country" v-slot="{ errors }">
                      <label>Country</label><br />
                      <input
                        type="text"
                        name="country"
                        v-model="careers.country"
                        maxlength="30"
                        v-on:keypress="isLetter($event)"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="Address" v-slot="{ errors }">
                      <label>Address</label><br />
                      <textarea
                        name="address"
                        v-model="careers.address"
                        maxlength="100"
                      ></textarea>
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <h2 class="mt-10 mb-25">Educational Qualification</h2>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="School" v-slot="{ errors }">
                      <label>School</label><br />
                      <input
                        type="text"
                        name="school"
                        v-model="careers.school"
                        maxlength="30"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="Degree" v-slot="{ errors }">
                      <label>Degree</label><br />
                      <input
                        type="text"
                        name="degree"
                        v-model="careers.degree"
                        maxlength="30"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-md-3">
                    <validation-provider rules="" v-slot="{ errors }">
                      <label>Post Graduation (if any)</label><br />
                      <input
                        type="text"
                        name="post_graduation"
                        v-model="careers.post_graduation"
                        maxlength="30"
                      />
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 field-outer">
                    <validation-provider rules="" v-slot="{ errors }">
                      <label>Additional Certification (if any)</label><br />
                      <textarea
                        name="additional_certification"
                        v-model="careers.additional_certification"
                        maxlength="100"
                      ></textarea>
                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="col-md-3 field-outer">
                  <!-- <div
                    class="g-recaptcha"
                    data-sitekey="6Ldj5HcaAAAAADMo_YWxKeFQts6dePiHk0mEZ5cZ"
                  ></div> -->
                  <div class="g-recaptcha"
                    data-sitekey="6Le8s7caAAAAAGyCdG2T61FMj9h6abRnsog5ZWGQ"></div> 
                </div>
                <!-- <div class="row mt-20">
                                    <div class="col-md-12 upload">
                                        <label>Upload your Resume</label><br>
                                         <input
                                         type="file"
                                          name="resume"
                                           class="lp-file"
                                           @change="filesChange($event.target)"
                                            accept="image/*"
                                           />
                                       <input type="file" name="resume" class="career-file" ref="resume" id="resume"
                                               v-on:change="handleFileUpload()"/>   
                                    </div>
                                </div> -->
                <div class="row mt-20">
                  <div class="col-md-12 upload">
                    <validation-provider
                      rules="ext:jpg,png,jpeg,pdf,doc,docx|Resume"
                      v-slot="{ errors, validate }"
                    >
                      <label class="mb-12">Upload your Resume</label>
                      <input
                        type="file"
                        name="resume"
                        class="lp-file"
                        @change="filesChange($event.target, validate)"
                        accept="image/*,.pdf,.doc,.docx"
                      />

                      <span class="error-message">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <div class="row mt-50">
                  <div class="col-md-12 text-center">
                    <input type="submit" value="Send Application" />
                    <!-- <notifications
                      group="foo"
                      classes="vue-notification"
                      :style="listshow"
                    /> -->
                    <!-- <notifications group="foo" :style="[isError ?{'color': '#960909'}:{'color':'green'}]"/> -->
                  <notifications group="foo" class="vue-notification" :style="[isError ?{'background': '#960909','border-left': '5px solid #960909'}:{'background':'green','border-left': '5px solid green'}]"/>
                  </div>
                </div>
              </form>
            </ValidationObserver>
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
        articles(where: { status: "published" }) {
          slug
          title
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
        career{
          seo {
            metaTitle
            metaDescription
            shareImage{ 
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

extend("ext", {
  ...ext,
  message: "Please upload valid Resume Document",
});
extend("FullName", {
  ...required,
  message: "Full Name is required",
});
extend("EmailId", {
  ...required,
  message: "Email Id is required",
});
extend("email", {
  ...email,
  message: "Enter a valid Email Id",
});
extend("mobileNo", {
  ...required,
  message: "Mobile Number is required",
});
extend("Country", {
  ...required,
  message: "Country Name is required",
});
extend("Address", {
  ...required,
  message: "Address is required",
});
extend("School", {
  ...required,
  message: "School is required",
});
extend("Degree", {
  ...required,
  message: "Degree is required",
});
extend("Resume", {
  ...required,
  message: "Resume is required",
});

extend("numeric", {
  ...numeric,
  message: "Enter a valid Phone Number",
});
extend("file", {
  message: "Not a image file",
  validate: (value) => {
    console.log("value=", value);
    return false; //Test the regex. Test function returns a true or false value.
  },
});

export default {
  components: {
    Articles,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      listshow: {
        "margin-left": "500px!important",
      },
      // formData: null,
      careers: {
        fullname: "",
        email: "",
        mobile: "",
        country: "",
        address: "",
        school: "",
        degree: "",
      },
      resumesError: "",
      isLoading: false,
      isSuccess: false,
      responseData: undefined,
      errorResponse: undefined,
      isError:false
    };
  },
  mounted() {
    let hypothesisScript = document.createElement("script");
    hypothesisScript.setAttribute(
      "src",
      "https://www.google.com/recaptcha/api.js"
    );
    document.body.appendChild(hypothesisScript);
  },
  methods: {
    // CHANGE FOR FORMDATA
    async filesChange(target, validate) {
      let fieldName = target.name,
        file = target.files;
      console.log("name-->", fieldName + "data", file[0]);
      var valid = await validate(file[0]);

      if (valid.valid) {
        //  this.formData.append(fieldName, file[0], file[0].name);
      }
    },
    async savecareer() {
      // const axios = require('axios')

      // for form data
      this.isLoading = true;
      const formElement = document.querySelector("form");
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
      formData.append("data", JSON.stringify(data));
      var result = await axios
        .post(getStrapiMedia("/careers-listings"), formData)
        .then((response) => {
          this.responseData = response.status;
          if (this.responseData == 200) {
            this.isError=false;
             this.showToast();
          }
        })
        .catch((err) => {
          this.errorResponse = err.response.data.message;
          this.isError=true
          this.showErrorToast();
        });
    },
    showToast() {
      this.$notify({
        type: "success",
        group: "foo",
        title: "Career Form",
        duration: 3000,
        width: "200px",
        position: "center",
        text: "Successfully submitted Career Form!",
      });
    },
    showErrorToast() {
      this.$notify({
        type: "error",
        group: "foo",
        title: "Failed",
        duration: 3000,
        width: "200px",
        position: "center",
        text: this.errorResponse,
      });
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
  },
  metaInfo() {
    const { seo } = this.$page.strapi.career;
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
  margin-left: 496px!important;
}
.error-message {
  color: #bd0000;
}
</style>
