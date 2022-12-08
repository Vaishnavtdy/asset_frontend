import { getStrapiMedia } from "~/utils/medias";

export async function saveContact(event) {
  console.log("data from contact", event);
  const axios = require("axios");
  var data = await axios
    .post(getStrapiMedia("/contactuses"), event, {
      headers: { Accept: "application/json" },
    })
    .then(function (response) {
      return { status: true, data: response, message: "Successs save" };
    })
    .catch(function (error) {
      return {
        status: false,
        data: error.response.data,
        message: error.response.data.message,
      };
    });
  return data;
}

export function saveNewsletter(data) {
  const axios = require("axios");
  axios
    .post(getStrapiMedia("/newsletters"), data, {
      headers: { Accept: "application/json" },
    })
    .then(function (response) {
      console.log(response);
      alert("Your subscription was successful!");
    })
    .catch(function (error) {
      alert("Error while submit form");
      console.log(error);
    });
}

export function captchaReady(data) {
  console.log("watching....");
  if (data) {
    clearInterval(this.checkingInterval);
    this.captchaRender();
  }
}

export function captchaRender() {
  console.log(
    "rendering captchaRender",
    "g-captcha-contact-form" + this.formKey
  );
  grecaptcha.render("g-captcha-contact-form" + this.formKey, {
    sitekey: "6Le8s7caAAAAAGyCdG2T61FMj9h6abRnsog5ZWGQ",
    callback: this.captchaResponse,
  });
}

export function captchaResponse(response) {
  this.captchaToken = response;
}

export var captchaDataVar = {
  captchaReady: false,
  checkingInterval: null,
};

export async function saveEnquiry(event) {
  console.log("data from contact", event);
  const axios = require("axios");
  var data = await axios
    .post(getStrapiMedia("/enquiries"), event, {
      headers: { Accept: "application/json" },
    })
    .then(function (response) {
      return { status: true, data: response, message: "Successs save" };
    })
    .catch(function (error) {
      return {
        status: false,
        data: error.response.data,
        message: error.response.data.message,
      };
    });
  return data;
}
