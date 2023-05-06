<template>
    <div class="page" v-if="product">
        <div class="container">
            <category-path-component class="my-2" :categoryId="category?.id" :includeLast="true"
                @update:modelValue="id => $router.push({ name: 'category', params: { uid: categories.find(cat => cat.id === id)?.uid } })" />
            <h3 class="product-title mb-4 mt-3">
                {{ productTitle }}
            </h3>
        </div>
        <div class="tabs">
            <div class="container">
                <ul class="tabs-list d-flex flex-nowrap" style="overflow-x: auto;">
                    <li class="text-nowrap mx-3">
                        <router-link class="py-2" :to="{ name: 'product' }">{{ $t('product.tabs.general') }}</router-link>
                    </li>
                    <li class="text-nowrap mx-3">
                        <router-link class="py-2" :to="{ name: 'product-characteristics' }">{{ $t('product.tabs.specification') }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <router-view :product="product" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/api/api';
import CategoryPathComponent from '@/components/products/CategoryPathComponent.vue';

export default {
    components: {
        CategoryPathComponent
    },
    data() {
        return {
            product: null,
            TempCategoryId: 0
        }
    },
    async created() {
        const response = await Api.getProduct(this.productId);
        this.product = response.data;
        this.TempCategoryId = this.product.category;
        this.$store.dispatch('productViewed', this.product)
    },
    computed: {
        ...mapGetters(['categories', 'brands']),
        productId() {
            return this.$route.params.id;
        },
        productTitle() {
            console.log({ ...this.product })
            const brand = this.brands.find(b => b.id == this.product.brand);
            return (this.category?.name ?? '') + ' ' + (brand?.name ?? '') + ' ' + (this.product?.name ?? '');
        },
        category() {
            return this.product?.category;
        }
    }
}
</script>

<style lang="scss">
.product-title {
    font-size: 24px;
    line-height: 24px;
    word-break: break-word;
}

.carousel-item {
    img {
        object-fit: contain;
        height: 400px;
    }
}

.status-label {
    color: #00a046;

    background-color: #f4faf6;
    border-radius: 7px;
    padding: 8px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
}

.product-price {
    font-size: 24px;
}

.btn:focus {
    box-shadow: none !important;
}

.tabs {
    background-color: #f5f5f5;
    margin-bottom: 32px;

    position: sticky;
    top: 0;
    z-index: 400;

    .tabs-list {
        .router-link-exact-active {
            color: #00a046;
        }

        li {
            border-bottom: transparent 3px solid;
            line-height: 2.5rem;

            &:hover {
                border-bottom: #00a046 3px solid;
                color: #00a046;
            }
        }
    }
}
</style>