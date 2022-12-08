<template>
    <div class="col-md-12 nb-big-card">
        <div class="row">
            <div class="col-md-6">
                <g-link
                        :to="{ path: '/article/' + article.slug }"
                        class="uk-link-reset"
                        :key="article.id"
                >
                    <div class="nbcard-img">
                        <g-image :src="getStrapiMedia(article.image.url)"/>
                        <h6 v-if="article.category">{{ article.category.name }}</h6>
                    </div>
                </g-link>
            </div>
            <div class="col-md-6">
                <g-link
                        :to="{ path: '/article/' + article.slug }"
                        class="uk-link-reset"
                        :key="article.id">
                    <div class="card-body">
                        <h3 class="mb-20">{{ article.title }} {{ index }}</h3>
                        <p v-html="article.description"></p>
                    </div>
                </g-link>
            </div>
        </div>
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
            trimString(str) {
                return (str && str.length > 1000) ? str.slice(0, 1000) : str;
            }
        },
    };
</script>
