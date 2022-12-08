<template>
    <div class="row">
         <PropertiesCard v-if="properties.length"
                        v-for="(property, index) in properties"
                        :property="property"
                        :key="property.id"
        />

    </div>
</template>

<script>
    import PropertiesCard from "~/components/PropertiesCard";

    export default {
        props: {
            properties: Array,
        },
        components: {
            PropertiesCard,
        },
    };
</script>
