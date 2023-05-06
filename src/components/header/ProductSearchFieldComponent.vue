<template>
    <form class="d-flex w-100 input-group flex-nowrap" @submit.prevent="search">
        <input v-model="query" class="form-control search-query-input" type="search" :placeholder="$t('search.placeholder')"
            aria-label="Я ищу...">
        <button class="btn btn-success" type="submit">{{ $t('search.button.find') }}</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            query: ''
        }
    },
    created() {
        if (this.$route.query.query) {
            this.query = this.$route.query.query;
        }
    },
    methods: {
        search() {
            if (this.$route.name === 'products') {
                this.$router.push({ query: { ...this.$route.query, query: this.query } })
            } else {
                this.$router.push({ name: 'products', query: { query: this.query } })
            }
            this.$emit('performed', this.query)
        }
    },
    watch: {
        '$route.query.query'(value) {
            this.query = value;
        }
    }
}
</script>

<style>
@media (min-width: 768px) {
    .search-query-input {
        padding-left: 40px;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg fill='%234E4C4C' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath clip-rule='evenodd' d='M10 2a8 8 0 104.906 14.32l5.387 5.387a1 1 0 001.414-1.414l-5.387-5.387A8 8 0 0010 2zm-6 8a6 6 0 1112 0 6 6 0 01-12 0z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 12px;
    }
}
</style>