<template>
    <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form action="" @submit.prevent="handleSubmit(onSubmitData)">
            <validation-provider rules="fullName" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            type="text"
                            v-model="contact.full_name"
                            name="full_name"
                            placeholder="Your Full Name"
                            maxlength="20"
                            v-on:keypress="isLetter($event)"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="EmailId|email" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            v-model="contact.email"
                            name="email"
                            type="email"
                            placeholder="Your Email Address"
                            maxlength="30"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="PhoneNo|numeric" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            v-model="contact.mobile"
                            name="mobile"
                            type="text"
                            placeholder="Your Phone Number"
                            maxlength="10"
                            @input="acceptNumber"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="Message" v-slot="{ errors }">
                <div class="field-outer">
                    <input
                            v-model="contact.message"
                            name="message"
                            type="text"
                            placeholder="Your Message"
                            maxlength="50"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </div>
            </validation-provider>
            <div class="field-outer">
                <div :id="'g-captcha-contact-form' + formKey"></div>
            </div>
            <input type="submit" value="Submit"/>
            <!-- <ClientOnly>
          <notifications group="foo" classes="vue-notification" />
          </ClientOnly> -->
            <notifications group="foo" class="vue-notification"
                           :style="[isError ?{'background': '#960909','border-left': '5px solid #960909'}:{'background':'green','border-left': '5px solid green'}]"/>
            <!-- <notifications group="foo" :style="[isError ?{'color': '#960909'}:{'color':'green'}]"/> -->
        </form>
    </ValidationObserver>
</template>

<script>
    import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
    import {email, numeric, required} from "vee-validate/dist/rules";
    import {captchaDataVar, captchaReady, captchaResponse, captchaRender} from "../utils/custom";
    import { getStrapiMedia } from "~/utils/medias";
    const axios = require("axios");

    extend("fullName", {
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
    extend("PhoneNo", {
        ...required,
        message: "Phone Number is required",
    });
    extend("Message", {
        ...required,
        message: "Message is required",
    });
    extend("numeric", {
        ...numeric,
        message: "Enter a valid Phone Number",
    });

    export default {
        name: "ContactFormPopUp",
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        props: {
            messageData: String,
            //formKey: String,
            item: {title: "test success"},
        },
        data() {
            return {
                formKey: 898888888,
                dateKey: new Date().getMinutes(),
                captchaToken: "",
                contact: {full_name: "", email: "", mobile: "", message: ""},
                valueKey: "",
                isError: false,
                ...captchaDataVar
                // captchaToken: "",
                // contact: {full_name: "", email: "", mobile: "", message: ""},
                // valueKey: "",
                // isError: false,
                // ...captchaDataVar
            };
        },
        mounted() {

            // let localThis = this
            // this.checkingInterval = setInterval(function () {
            //     console.log('checking grecaptcha loaded or not');
            //     if (grecaptcha) {
            //         localThis.captchaReady = true
            //     }
            // }, 500);

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
                    message: this.contact.message,
                    recaptcha: this.captchaToken,
                };
                console.log(this.contact);
                // this.$emit("onContactFormSubmit", this.contact);
                // setTimeout(() => {
                //     console.log("res from popup", this.messageData);
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
            }
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
