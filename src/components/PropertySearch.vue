<template>

  <div class="">
    <loading :active.sync="isLoading"
             :can-cancel="false"
             loader="dots"
             color="rgb(42, 46, 67)"
             :is-full-page="true"></loading>

    <ul>
      <li :class="activeTab==cat.id? 'active':''" @click="searchToggle(cat.id)"
          v-for="(cat,ind) in propertyCategory">
        {{ cat.name }}
      </li>
    </ul>
    <ValidationObserver v-slot="{ handleSubmit }">

      <form class="search-form buy-searchForm" action="" @submit.prevent="handleSubmit(onSubmit)">
        <div class="d-flex flex-row align-items-center">
          <div class="d-flex flex-column">
            <label>Location
              <g-image src="~/assets/images/dropdown.svg"/>
            </label>
            <select v-model="searchForm.location" >
              <option value="0" >-Select-</option>
              <option value="dubai">Dubai</option>
              <!-- <option value="India">India</option>
              <option value="USA">USA</option> -->
            </select>
          </div>
          <div class="d-flex flex-column">
            <label>Completion
              <g-image src="~/assets/images/dropdown.svg"/>
            </label>
            <select v-model="searchForm.completion">
              <option value="0">-Select-</option>

              <option v-for="(cmp,ind) in projectCompletion" :value="cmp.id">{{ cmp.name }}</option>
            </select>
          </div>
          <div class="d-flex flex-column">
            <label>Property
              <g-image src="~/assets/images/dropdown.svg"/>
            </label>
            <select v-model="searchForm.property">
              <option value="0">-Select-</option>
              <option v-for="(cmp,ind) in propertyType" :value="cmp.id">{{ cmp.name }}</option>

            </select>
          </div>
          <!-- <div class="d-flex flex-column">
            <label>Minimum</label>
            <input type="text" name="minimum"  placeholder="AED320,000" maxlength="10" v-model="searchForm.min_price"/>
          </div>
          <div class="d-flex flex-column">
            <label>Maximum</label>
            <input type="text" name="maximum" placeholder="AED820,000" maxlength="10" v-model="searchForm.max_price"/>
          </div> -->
          <div class="d-flex flex-column searchBtn">
            <input type="submit" value="Search"/>
          </div>
        </div>
      </form>
    </ValidationObserver>

  </div>
</template>

<script>
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {numeric, required} from 'vee-validate/dist/rules';
import axios from 'axios'
import {getStrapiMedia} from "~/utils/medias";
import Loading from 'vue-loading-overlay';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('numeric', {
  ...numeric,
  message: 'Enter a valid phone number'

});


export default {
  name: "PropertySearch",
  props:['page'],
  mounted() {
    this.pagination.page=this.page
    this.activeTab = this.$route.query.category ? this.$route.query.category : 1;
    this.searchForm = this.getParams();
    this.getProperty();
    this.getCompletion();
    this.getPropertyCategory();
     if (Object.keys(this.$route.query).length) {
      this.onSubmit();
    }

  },
  components: {ValidationObserver, ValidationProvider, Loading},
  data() {
    return {
      searchForm: {location: 0, completion: 0, property: 0},
      activeTab: 1,
      projectCompletion: [],
      propertyType: [],
      propertyCategory: [],

      isLoading: false,
      currentPage: 1,
      pagination: {
        "page": "1",
        "per_page": "5",
        "next_page": "2",
      },

    }
  },
  watch:{
    page(newVal,oldVal){
       this.currentPage=newVal;
       this.onSubmit();
    }
  },

  methods: {
    getParams() {
      var fullUrl = this.$route.fullPath;
      var paramsArray = fullUrl.split('?');
      if (typeof paramsArray[1] === 'string') {
        const urlParams = new URLSearchParams(paramsArray[1]);
        return Object.fromEntries(urlParams);
      } else return {location: 0};
    },
    getStrapiMedia,
    searchToggle(val) {

      this.activeTab = val;
    },
    async onSubmit() {
      try {
        this.searchForm.category = this.activeTab;
        if (this.$router.history.current.path === "/search" || this.$router.history.current.path === "/search/") {
          this.isLoading = true;
          var formData = JSON.parse(JSON.stringify(this.searchForm));
          if (formData.location == 0)
            delete formData.location;
          if (formData.completion == 0)
            delete formData.completion;
          if (formData.property == 0)
            delete formData.property;
          if (formData.category == 0)
            delete formData.category;

          // page=4&per_page=5
          if (this.pagination)
            formData.page = this.currentPage;

          console.log(formData)
          const results = await axios.get(
              getStrapiMedia('/properties/search'),
              {params: formData}
          );
          var data = (typeof results.data == 'object' ) ? results.data : [];
          this.pagination = typeof data.pagination == 'object' ? data.pagination : {};

          this.$emit('onSearchResult', (typeof results.data == 'object' && typeof results.data.data == 'object') ? data : []);
          this.isLoading = false;
        } else {
          this.$router.push({
            path: '/search',
            query: this.searchForm
          })
        }

      } catch (error) {
        this.isLoading = false;

        console.log(error);
        return [];
      }

    },
    async getCompletion() {
      try {
        const results = await axios.get(
            getStrapiMedia('/project-statuses')
        );

        // console.log(results.data);
        this.projectCompletion = results.data;
        if (typeof this.projectCompletion === 'object') {
          this.searchForm.completion = this.$route.query.completion ? this.$route.query.completion : 0
        }
      } catch (error) {

        console.log(error);
        return [];
      }

    },

    async getProperty() {
      try {
        const results = await axios.get(
            getStrapiMedia('/property-types')
        );

        // console.log(results.data);
        this.propertyType = results.data;
        if (typeof this.propertyType === 'object')
          this.searchForm.property = this.$route.query.property ? this.$route.query.property : 0

      } catch (error) {

        console.log(error);
        return [];
      }

    },

    async getPropertyCategory() {
      try {
        const results = await axios.get(
            getStrapiMedia('/property-statuses')
        );
        // console.log(results.data);
        this.propertyCategory = results.data;
        if (typeof this.propertyType === 'object')
          this.searchForm.category = this.$route.query.category ? this.$route.query.category : 0

      } catch (error) {

        console.log(error);
        return [];
      }

    },

  }
}
</script>

<style>

</style>
