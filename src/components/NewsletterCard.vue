<template>
    <ValidationObserver v-slot="{ handleSubmit }">
        <form action="" @submit.prevent="handleSubmit(onSubmitForm)">
            <validation-provider rules="required|email" v-slot="{ errors }">
              <input v-model="newsletter.email" name="email" type="email"  placeholder="Your E-mail Address"/>
              <span style="color: #bd0000">{{ errors[0] }}</span>
            </validation-provider>
            <input type="submit" value="SEND"/>
             
        </form>
    </ValidationObserver>
</template>

<script>
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {email, numeric, required} from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'Email Id is required'
});
extend('email', {
  ...email,
  message: 'Enter a valid email'
});

export default {
  name: "NewsletterCard",
  components: {
      ValidationProvider, 
      ValidationObserver,
    },
  data() {
    return {
      newsletter: {email: ''},
    }
  },
  methods: {
    onSubmitForm() {
      this.$emit('onNewsletterSubmit',this.newsletter)
    }
  }
};
</script>
