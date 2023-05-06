<template>
    <app-header />
    <router-view @reload="reload" v-if="showView" />
    <cart-modal />
    <login-modal />
</template>

<script>
import AppHeader from "@/components/header/AppHeader.vue";
import CartModal from "@/components/modals/CartModal.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
export default {
    components: {
        AppHeader,
        CartModal,
        LoginModal
    },
    data() {
        return {
            showView: true
        }
    },
    async mounted(){
        await this.$router.isReady;
        if (this.$route.query.action === 'login'){
            new bootstrap.Modal(document.getElementById('loginModal'), {}).show();
        }
    },
    methods: {
        reload() {
            this.showView = false;
            setTimeout(() => this.showView = true, 1);
        }
    }
}
</script>

<style></style>