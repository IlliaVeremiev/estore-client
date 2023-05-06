<template>
    <li class="product-list-item">
        <router-link :to="{ name: 'product', params: { id: product.id } }"
            class="a-block flex-column justify-content-between d-flex h-100"
            style="margin-right: calc(var(--bs-gutter-x) * -0.5);margin-left: calc(var(--bs-gutter-x) * -0.5);padding-right: calc(var(--bs-gutter-x) * 0.5);padding-left: calc(var(--bs-gutter-x) * 0.5)">
            <div class="product-image">
                <img v-if="product.images && product.images.length > 0" style="cursor:pointer" :src="product.images[0].path"
                    alt="Product image" :style="product.available ? '' : 'filter: grayscale(80%)'">
            </div>
            <div class="product-info d-flex flex-column">
                <div style="cursor:pointer" class="title-box link-button">{{ product.name }}</div>

                <div class="d-flex justify-content-between align-items-center mt-auto">

                    <div class="price-box font-weight-bold">{{ product.price?.split('.')[0] ?? '' }} ₴</div>

                    <button v-if="product.available" class="add-to-cart-button"
                        @click.prevent="$store.dispatch('addToCart', product)" data-bs-toggle="modal"
                        data-bs-target="#cartModal">
                        <i class="bi bi-cart"></i>
                    </button>
                </div>
                <div>
                    <span v-if="product.available">{{ $t('product.inStock') }}</span>
                    <span v-else>{{ $t('product.notInStock') }}</span>
                </div>
            </div>
        </router-link>
    </li>
</template>

<script>
export default {
    props: ['product']
}
</script>

<style lang="scss">
.product-image {
    height: 150px;

    img {
        height: 100%;
        width: 100%;
        object-fit: scale-down;
    }
}

.product-list-item {
    margin: -0.5px;
    border: 1px solid #e9e9e9;
    padding-bottom: 0.5px;
    padding-top: 0.5px;

    .product-image {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }

    .product-info {
        margin-top: 24px;
    }

    .a-block {
        text-decoration: none;
        color: inherit;

        &:hover {
            text-decoration: none;
            color: inherit;
        }
    }

    .add-to-cart-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border: none;
        background-color: #fff;
        border-radius: 4px;

        color: #00a046;
        font-size: 1.5rem;
        text-shadow: 0px 0px 1px #00a046;

        &:hover {
            background-color: #f4faf6;
        }

    }

    .price-box {
        font-size: 20px;
    }
}


.price-box {
    font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif
}
</style>