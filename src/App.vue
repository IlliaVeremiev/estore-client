<template>
    <div :class="{ 'disabled': initialized }" class="se-pre-con"></div>

    <template v-if="initialized">
        <RouterView />
    </template>
</template>

<script>
import { mapState } from 'vuex';
import CommonScreen from "./screens/CommonScreen.vue";

export default {
    components: {
        CommonScreen
    },
    async created() {
        await this.$store.dispatch('setup');
    },
    computed: {
        ...mapState(['initialized'])
    }
}
</script>

<style scoped lang="scss">
.no-js #loader {
    display: none;
}

.js #loader {
    display: block;
    position: absolute;
    left: 100px;
    top: 0;
}

.se-pre-con {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url(/loader-cat.gif) center no-repeat #fff;

    &.disabled {
        transform: translateY(-100%);
    }
}
</style>
