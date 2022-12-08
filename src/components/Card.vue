<template>
    <div class="col-md-4">
        <g-link
                :to="{ path: '/article/' + article.slug }"
                class="uk-link-reset"
                :key="article.id"
        >
            <div class="card nb-small-card mb-35">
                <div class="nbcard-img">
                    <g-image :src="getStrapiMedia(article.image.url)" height="100"/>
                    <h6 v-if="article.category"> {{ article.category.name }} </h6>
                </div>

                <div class="card-body text-center">
                    <h3 class="mb-20">{{ article.title }}</h3>
                    <p v-html="article.description"></p>
                </div>
            </div>
        </g-link>
    </div>
</template>

<script>
    import {getStrapiMedia} from "~/utils/medias";

    export default {
        props: {
            article: Object,
        },
        methods: {
            getStrapiMedia,
            // eslint-disable-next-line no-unused-vars
            trimString(str) {
                return (str && str.length > 200) ? str.slice(0, 200) : str;
            }
        },
    };
</script>
