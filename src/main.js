// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import CustomLayout from "~/layouts/Custom.vue";
import "~/assets/css/bootstrap.min.css";
import "~/assets/css/style.css";
import "vue-loading-overlay/dist/vue-loading.css";
// import Notifications from 'vue-notification'
import Notifications from "vue-notification/dist/ssr.js";

export default function (Vue, { head }) {
  // Set default layout as a global component
  Vue.use(Notifications);
  Vue.component("Layout", DefaultLayout);
  Vue.component("CustomLayout", CustomLayout);
  head.script.push({
    src: "https://code.jquery.com/jquery-1.11.3.min.js",
  });
}
