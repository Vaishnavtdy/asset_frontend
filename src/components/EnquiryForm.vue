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
            
            <validation-provider rules="home_type" v-slot="{ errors }">
                <div class="field-outer">
                    <select class="form-control" name="home_type" v-model="contact.home_type">
                        <option value="">--Property Type--</option>
                        <option value="apartment">Apartment</option>
                        <option vlaue="villa">Villa</option>
                        <option vlaue="townhouse">Townhouse</option>
                    </select>
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>
            <validation-provider rules="budget" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                        type="text"
                        v-model="contact.budget"
                        name="budget"
                        placeholder="Budget"
                    />
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>
            <validation-provider rules="salary_scale" v-slot="{ errors }">
                <div class="field-outer">
                    <select class="form-control" name="salary_scale" v-model="contact.salary_scale">
                        <option value="">--Salary Scale--</option>
                        <option value="below_15k">Below 15k</option>
                        <option vlaue="below_15k">Above 15k</option>
                    </select>
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>
            <validation-provider rules="city" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                        type="text"
                        v-model="contact.city"
                        name="city"
                        maxlength="20"
                        placeholder="City"
                    />
                    <span class="error-span error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <!-- <div class="field-outer">
                <div :id="'g-captcha-contact-form' + formKey "></div>
            </div> -->

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
    extend("budget", {
        ...required,
        message: "Budget is required",
    });
    extend("home_type", {
        ...required,
        message: "home_type is required",
    });
    extend("salary_scale", {
        ...required,
        message: "salary_scale is required",
    });
    extend("city", {
        ...required,
        message: "City is required",
    });

    export default {
        name: "EnquiryForm",
        props: {
            item: {title: "test success"},
            messageData: String,
            formTitle: String,
        },
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                formKey: 898888888,
                dateKey: new Date().getMinutes(),
                //captchaToken: "",
                contact: {full_name: "", email: "", mobile: "", home_type:"", budget:"", salary_scale:"", city:"", page_title:""},
                valueKey: "",
                isError: false,
                //...captchaDataVar

            };
        },

        mounted() {

            let localThis = this;
            // this.checkingInterval = setInterval(function () {
            //     if (window.grecaptcha) {
            //         localThis.captchaReady = true
            //     }
            // }, 500);

        },
        // watch: {
        //     captchaReady
        // },
        methods: {
            // captchaResponse,
            // captchaRender,
            async onSubmitData() {
                this.contact = {
                    full_name: this.contact.full_name,
                    email: this.contact.email,
                    mobile: this.contact.mobile,
                    home_type: this.contact.home_type,
                    budget: this.contact.budget,
                    salary_scale: this.contact.salary_scale,
                    city: this.contact.city,
                    page_title: this.formTitle,
                    //recaptcha: this.captchaToken,
                };
                // console.log(this.contact);
                // this.$emit("onEnquiryFormSubmit", this.contact);
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
                .post(getStrapiMedia("/enquiries"), this.contact)
                .then((response) => {
                this.responseData = response.status;
                if (this.responseData == 200) {
                    this.isError=false;
                    this.showToast();
                    window.location.href = "/thank-you";
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
    .form-control {
        background-color: #b2934b;
        border: none;
        border-bottom: 1px solid #ced4da;
        color: #dfdfdf;
        outline: none;
        font-size: 10px;
        font-family: "Heebo", sans-serif;
        text-align: center;
    }

</style>
