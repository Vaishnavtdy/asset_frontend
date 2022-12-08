<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
  a {
    text-decoration: none !important;
  }
  img:hover {
    opacity: 1 !important;
    transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1) !important;
  }
  .avatar {
    position: static;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
</style>
