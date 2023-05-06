<template>
    <div class="d-flex justify-content-center align-items-center h-100">{{ message }}</div>
</template>

<script>
import Api from '@/api/api';

export default {
    data() {
        return {
            message: 'Loading...'
        }
    },
    async created() {
        const response = await Api.oauthCallback(this.registrationId, this.location)

        if (response.data.status === 'success') {
            window.location = '/';
        } else if (response.data.status === 'failure') {
            window.location = '/';
            console.error('Failed to authenticate')
        } else {
            throw new Error('Unhandled response status')
        }
    },
    computed: {
        location() {
            return window.location.search
        },
        registrationId() {
            return this.$route.params.registrationId
        }
    }
}
</script>

<style></style>