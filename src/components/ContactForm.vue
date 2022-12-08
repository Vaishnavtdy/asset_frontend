<template>
    <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form action="" @submit.prevent="handleSubmit(onSubmitData)">
            <validation-provider rules="fullName" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            type="text"
                            v-model="contact.full_name"
                            name="full_name"
                            maxlength="20"
                            placeholder="Your Full Name"
                            v-on:keypress="isLetter($event)"
                    />
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="emailId|email" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            v-model="contact.email"
                            name="email"
                            type="email"
                            maxlength="30"
                            placeholder="Your Email Address"
                    />
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="Phone|numeric" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            v-model="contact.mobile"
                            name="mobile"
                            type="text"
                            @input="acceptNumber"
                            maxlength="10"
                            placeholder="Your Phone Number"
                    />
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>
            <!-- <div class="field-outer">
                      <div  id="g-captcha-contact-form"></div>
                  </div> -->
            <div class="field-outer">
                <div :id="'g-captcha-contact-form' + formKey "></div>
            </div>

            <input type="submit" value="Submit"/>
            <notifications group="foo" class="vue-notification"
                           :style="[isError ?{'background': '#960909','border-left': '5px solid #960909'}:{'background':'green','border-left': '5px solid green'}]"/>
        </form>
        <div id="app"></div>
    </ValidationObserver>

</template>

<script>
    import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
    import {email, numeric, required} from "vee-validate/dist/rules";
    import {captchaDataVar, captchaRender, captchaResponse, captchaReady} from "../utils/custom";
    // import Notifications from 'vue-notification/dist/ssr.js'
    import { getStrapiMedia } from "~/utils/medias";
    const axios = require("axios");


    extend("fullName", {
        ...required,
        message: "Full Name is required",
    });
    extend("emailId", {
        ...required,
        message: "Email Id is required",
    });
    extend("email", {
        ...email,
        message: "Enter a valid email",
    });
    extend("numeric", {
        ...numeric,
        message: "Enter a valid Phone Number",
    });
    extend("Phone", {
        ...required,
        message: "Phone Number is required",
    });

    export default {
        name: "ContactForm",
        props: {
            item: {title: "test success"},
            messageData: String,
        },
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                formKey: 898888888,
                dateKey: new Date().getMinutes(),
                captchaToken: "",
                contact: {full_name: "", email: "", mobile: ""},
                valueKey: "",
                isError: false,
                ...captchaDataVar

            };
        },

        mounted() {

            let localThis = this;
            this.checkingInterval = setInterval(function () {
                if (window.grecaptcha) {
                    localThis.captchaReady = true
                }
            }, 500);

        },
        watch: {
            captchaReady
        },
        methods: {
            captchaResponse,
            captchaRender,
            async onSubmitData() {
                this.contact = {
                    full_name: this.contact.full_name,
                    email: this.contact.email,
                    mobile: this.contact.mobile,
                    recaptcha: this.captchaToken,
                    // recaptcha:grecaptcha.getResponse()
                };
                console.log(this.contact);
                // this.$emit("onContactFormSubmit", this.contact);
                // setTimeout(() => {
                //     if (this.messageData === "Successs save") {
                //         this.isError = false;
                //         this.showToast();
                //     } else {
                //         this.isError = true;
                //         this.showErrorToast(this.messageData);
                //     }
                // }, 1000);
                // this.contact = {};
                // this.$refs.observer.reset();
                var result = await axios
                .post(getStrapiMedia("/contactuses"), this.contact)
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
                    title: "Contact Form",
                    duration: 3000,
                    width: "200px",
                    position: "center",
                    text: "Successfully submitted Contact Form!",
                });
            },
            showErrorToast(value) {
                this.$notify({
                    type: "error",
                    group: "foo",
                    title: "Failed",
                    duration: 3000,
                    width: "200px",
                    position: "center",
                    text: value,
                });
            },


            acceptNumber() {
                var x = this.valueKey
                    .replace(/\D/g, "")
                    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
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
        width: 300px !important;
        top: 10px !important;
        right: 0px !important;
        margin-bottom: 21px !important;
    }

    .error-message {
        color: #bd0000;
    }

</style>
