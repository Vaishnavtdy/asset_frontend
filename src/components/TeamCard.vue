<template> 
  <div class="col-md-6 mb-30">
    <div class="row each-profile">
      <div class="col-md-6">
        <g-image :src="getStrapiMedia(team.memberimage.url)"/>
      </div>
      <div class="col-md-6">
        <div class="content-box">
          <h5>{{ team.membername }}</h5>
          <h6>{{ team.memberposition }}</h6>
          <p>{{ team.memberdescription }}</p>
          <div class="social-icons">
            <g-link :to="{ path: team.linkedin_profile }"><g-image src="~/assets/images/linkedin.png"/></g-link>
            <g-link :to="{ path: team.twitter_profile }"><g-image src="~/assets/images/twitter.png"/></g-link>
            <g-link :to="{ path: team.facebook_profile }"><g-image src="~/assets/images/facebook.png"/></g-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { getStrapiMedia } from "~/utils/medias";


export default {
  props: {
    team: Object,
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
