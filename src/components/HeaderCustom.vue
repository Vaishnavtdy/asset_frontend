<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-toggleable-sm navbar-dark navbar-expand-md "
         aria-label="Eighth navbar example">
      <div class="container">
        <g-link class="navbar-brand p-0" to="/">
          <!-- <g-image src="~/assets/images/logo.png"/> -->
          <!-- <img  :src="require(`../assets/images/assetlogonew.png`)"> -->
          <img  :src="require(`../assets/images/assetlogo1.png`)">
        </g-link>
        <!-- <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" @click="toggleNav()"
                data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <!-- <div class="navbar-collapse collapse" :class="showMobileNav? 'show':''" id="navbarsExample07" style="">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <g-link class="nav-link" to="/buy">Buy</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/rent">Rent</g-link>
            </li> 
            <li class="nav-item">
              <g-link class="nav-link" to="/list-your-property">List Your Property</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/careers">Careers</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/about-us">About Us</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/services">Services</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/article">Blog</g-link>
            </li>
            <li class="nav-item">
              <g-link class="nav-link" to="/contact-us">Contact Us</g-link>
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
  </header>
</template>

<static-query>
query {
strapi {
categories {
id
name
slug
}
global {
siteName
}
}
}
</static-query>
<script>
export default {
  name: "Header",
  data() {
    return {
      showMobileNav: false
    }
  },
  methods: {
    toggleNav() {
      this.showMobileNav = !this.showMobileNav;
    }
  }
}
</script>
