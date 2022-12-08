<template>
    <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
         <form action="" @submit.prevent="handleSubmit(onSubmitData)">
            <div class="row">
                <div class="col-md-12 mb-10">
                    <label>Full Name</label>
                    <validation-provider rules="fullName" v-slot="{ errors }">
                        <div class="field-outer">
                            <input
                                type="text"
                                v-model="contact.full_name"
                                name="full_name"
                                maxlength="50"
                                placeholder="Enter your name"
                                v-on:keypress="isLetter($event)"
                            />
                            <span class="error-span error-message">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-10 mobNo">
                    <label>Phone Number</label>
                        <div class="field-outer">
                            <input
                                type="text"
                                v-model="contact.coCode"
                                name="coCode"
                                placeholder="971"
                                class="cCode"
                            />
                    <validation-provider rules="Phone|CountryCode|numeric" v-slot="{ errors }">
                            <input
                                type="text"
                                v-model="contact.mobile"
                                name="mobile"
                                placeholder="Mobile Number"
                                @input="acceptNumber"
                                maxlength="10"
                                class="phno"
                            />
                            <span class="error-span error-message">{{ errors[0] }}</span>
                    </validation-provider>
                        </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12 mb-10">
                    <label>Email</label>
                    <validation-provider rules="emailId|email" v-slot="{ errors }">
                        <div class="field-outer">
                            <input
                                type="text"
                                v-model="contact.email"
                                name="email"
                                placeholder="Enter your Email"
                                maxlength="50"
                            />
                            <span class="error-span error-message">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-10">
                    <label>Salary Range</label>
                    <validation-provider rules="salary_scale" v-slot="{ errors }">
                        <div class="field-outer">
                            <select class="form-control" name="salary_scale" v-model="contact.salary_scale">
                                <option value="above_15k_aed">Above 15K AED</option>
                                <option vlaue="below_15k_aed">Below 15K AED</option>
                            </select>
                            <span class="error-span error-message">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-10">
                    <label>Budget</label>
                    <validation-provider rules="budget" v-slot="{ errors }">
                        <div class="field-outer">
                            <select class="form-control" name="budget" v-model="contact.budget">
                                <option value="Below 1 M AED">Below 1 M AED</option>
                                <option value="1-2 M AED">1-2 M AED</option>
                                <option value="Above 2 M AED">Above 2 M AED</option>
                            </select>
                            <span class="error-span error-message">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-10">
                    <label>Project Type</label>
                    <validation-provider rules="home_type" v-slot="{ errors }">
                        <div class="field-outer">
                            <select class="form-control" name="home_type" v-model="contact.home_type">
                                <option value="villa">Villa</option>
                                <option value="apartment">Apartment</option>
                                <option value="townhouse">Townhouse</option>
                            </select>
                            <span class="error-span error-message">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <input type="submit" value="Submit"/>
                </div>
            </div>
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
    import { getStrapiMedia } from "~/utils/medias";
    // import Notifications from 'vue-notification/dist/ssr.js'

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
    
    extend("Phone", {
        ...required,
        message: "Country Code/ Phone Number is required",
    });
    extend("CountryCode", {
        ...required,
        message: "Country Code is required",
    });
    extend("budget", {
        ...required,
        message: "Budget is required",
    });
    extend("salary_scale", {
        ...required,
        message: "Salary Range is required",
    });
    extend("home_type", {
        ...required,
        message: "Project Type is required",
    });

    export default {
        name: "ContactForm",
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
                contact: {full_name: "", email: "", coCode: "971", mobile: "", home_type:"", budget:"", salary_scale:"", city:"", page_title: ""},
                valueKey: "",
                isError: false,
                //...captchaDataVar

            };
        },

        mounted() {
            let localThis = this;
        },
        methods: {
           async onSubmitData() {
                this.contact = {
                    full_name: this.contact.full_name,
                    email: this.contact.email,
                    mobile: this.contact.coCode + this.contact.mobile,
                    home_type: this.contact.home_type,
                    budget: this.contact.budget,
                    salary_scale: this.contact.salary_scale,
                    city: this.contact.city,
                    page_title: this.formTitle,
                    //recaptcha: this.captchaToken,
                };
                //console.log(this.contact," home conatact console");
                // this.$emit("onEnquiryFormSubmit", this.contact);
                // setTimeout(() => {
                //     if (this.messageData === "Successs save") {
                //         this.isError = false;
                //         //this.showToast();
                //         window.location.href = "/thank-you";
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
                    //this.showToast();
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
                    title: "Unable to send the email, please try again",
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
                if (/^[A-Za-z\s]+$/.test(char)) return true;
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
        font-size: 12px;
    }

</style>
