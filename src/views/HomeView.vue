<template>
    <div class="page">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4 col-lg-3 col-xl-2">
                    <div class="navbar-expand-md sticky-md-top py-2">
                        <div class="collapse navbar-collapse" id="bd-docs-nav">
                            <ul>
                                <template v-for="category in rootCategories" :key="category.id">
                                    <li>
                                        <router-link :to="{ name: 'category', params: { uid: category.uid } }"
                                            class="menu-link">
                                            <span>
                                                <img :src="category.icon?.path" alt="">
                                            </span>
                                            {{ category.name }}
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-8 col-lg-9 col-xl-10 mt-4 border-left-md">
                    <button class="btn btn-secondary d-md-none collapsed" data-bs-target="#bd-docs-nav"
                        type="button" data-bs-toggle="collapse" aria-controls="bd-docs-nav" aria-expanded="false">
                        {{ $t('home.categories.spoiler') }}
                    </button>
                    <div v-if="lastViewedProducts && lastViewedProducts.length > 0">
                        <h3 class="mt-3 mb-4">{{ $t('home.lastViewed.label') }}</h3>
                        <ul class="row">
                            <template v-for="product in lastViewedProducts" :key="product.id">
                                <product-list-item class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" :product="product" />
                            </template>
                        </ul>
                    </div>
                    <div v-if="moreToChoseBySeenCategories && Object.keys(moreToChoseBySeenCategories).length > 0">
                        <h3 class="mt-5 mb-4">{{ $t('home.moreProducts.label') }}</h3>
                        <ul class="row">
                            <template v-for="(categoryProducts, categoryId) in moreToChoseBySeenCategories"
                                :key="categoryId">
                                <template v-for="product of categoryProducts" :key="product.id">
                                    <product-list-item class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                                        :product="product" />
                                </template>
                            </template>
                        </ul>
                    </div>
                    <div v-if="newProducts && newProducts.length > 0">
                        <h3 class="mt-5 mb-4">{{ $t('home.new.label') }}</h3>
                        <ul class="row">
                            <template v-for="product of newProducts" :key="product.id">
                                <product-list-item class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" :product="product" />
                            </template>
                        </ul>
                    </div>
                    <div v-if="ratedProducts && ratedProducts.length > 0">
                        <h3 class="mt-5 mb-4">{{ $t('home.popular.label') }}</h3>
                        <ul class="row">
                            <template v-for="product of ratedProducts" :key="product.id">
                                <product-list-item class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" :product="product" />
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import ProductListItem from '@/components/products/ProductListItem.vue';
import api from '@/api/api'

export default {
    components: { ProductListItem },
    data() {
        return {
            lastViewedProducts: [],
            moreToChoseBySeenCategories: {},
            newProducts: [],
            ratedProducts: [],
        }
    },
    async created() {
        await this.$store.initializationPromise;
        this.loadLastViewedProducts();
        this.loadNewProducts();
        this.loadRatedProducts();
    },
    methods: {
        async loadLastViewedProducts() {
            const promises = this.lastViewedProductIds.map(id => this.$store.dispatch('getProduct', id))
            this.lastViewedProducts = (await Promise.all(promises)).filter(p => p !== undefined)
            const categories = [...new Set(this.lastViewedProducts.map(p => p.category.id))]
            for (const category of categories) {
                const response = await api.getProducts({ category, size: 6 })
                this.moreToChoseBySeenCategories[category] = response.data.content
            }
        },
        async loadNewProducts() {
            const response = await api.getProducts({ size: 6, sort: 'new' })
            this.newProducts = response.data.content
        },
        async loadRatedProducts() {
            const response = await api.getProducts({ size: 6, sort: 'rating' })
            this.ratedProducts = response.data.content
        }
    },
    computed: {
        ...mapGetters(['categories']),
        ...mapState(['lastViewedProductIds']),
        rootCategories() {
            return this.categories.filter(category => category.parentId == null)
        },
    },
    watch: {
        lastViewedProductIds() {
            this.loadLastViewedProducts();
        }
    }
}
</script>
<style lang="scss">
// a {
//     &.menu-link{
//         color: #3e77aa;
//         cursor: pointer;
//         text-decoration: none;
//     }
// }
.menu-link {
    &li {
        color: white;
    }
}

.menu-link {
    position: relative;
    z-index: 10;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 31px;
    transition: all .2s ease;

    &a {
        color: #3e77aa;
        cursor: pointer;
        text-decoration: none;
    }

    img {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-top: -4px;
        margin-right: 8px;
        text-align: center;
        width: 24px;
        height: 24px;
    }
}
</style>

