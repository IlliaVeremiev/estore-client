<template>
    <div class="row align-items-start">
        <div class="col-12 col-md-6">
            <div id="carouselExampleControls" class="carousel carousel-dark slide product-images-carousel"
                data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <template v-for="(image, index) in product.images" :key="index">
                        <button type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
                            class="active" aria-current="true" :aria-label="`Slide ${index}`"></button>
                    </template>
                </div>
                <div class="carousel-inner">
                    <template v-for="(image, index) in product.images" :key="index">
                        <div class="carousel-item" :class="{ active: index === 0 }">
                            <img :src="image.path" class="d-block w-100" alt="...">
                        </div>
                    </template>

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="product-specification">
                {{ product.specification }}
            </div>

        </div>
        <div class="col-12 col-md-6">
            <div class="card p-3 my-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <p class="product-price"> {{ priceText }}</p>
                        <div class="status-label" :style="{ color: product.available ? '#00a046' : 'red' }">
                            <span v-if="product.available">
                                <i class="bi bi-check-circle"></i> {{ $t('product.inStock') }}
                            </span>
                            <span v-else>
                                <i class="bi bi-x-circle"></i> {{ $t('product.notInStock') }}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="btn btn-success w-100" @click="addToCart" data-bs-toggle="modal"
                        data-bs-target="#cartModal">
                        <i class="bi bi-cart"></i> {{ $t('product.buy') }}
                    </button>
                </div>
            </div>

            <div class="card my-2" v-if="product.productVariant">
                <div class="p-3">
                    <template v-for="(param, key) in product.productVariant.localizedParametersName" :key="key">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                {{ Object.values(param)[0] }}
                            </div>
                            <div class="col-12 col-md-8 text-end">
                                {{ product.productVariant.productVariantItems }}
                                <template
                                    v-for="variant in [...new Set(product.productVariant.productVariantItems.map(pvi => pvi.parametersValues[key]))]"
                                    :key="variant">
                                    <span class="m-2">
                                        <button>{{ variant }}</button>
                                    </span>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="card my-2">
                <div class="p-3 row">
                    <div class="col-1">
                        <i class="bi bi-box-seam"></i>
                    </div>
                    <div class="col-11">
                        <b>{{ $t('product.info.delivery.header') }}.</b> {{ $t('product.info.delivery.text') }}
                    </div>
                </div>
            </div>

            <div class="card my-2">
                <div class="p-3 row">
                    <div class="col-1">
                        <i class="bi bi-wallet2"></i>
                    </div>
                    <div class="col-11">
                        <b>{{ $t('product.info.payment.header') }}.</b> {{ $t('product.info.payment.text') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <h3 class="my-3">{{ $t('product.description.header') }}</h3>
            <div class="product-description" style="margin: 50px 0">
                <p v-html="markedDescription"></p>
            </div>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';

export default {
    props: ['product'],
    methods: {
        addToCart() {
            this.$store.dispatch('addToCart', this.product);
        },
    },
    computed: {
        priceText() {
            return this.product.price + ' ₴';
        },
        markedDescription() {
            return marked(this.product?.description ?? '');
        }
    }
}
</script>

<style>
.product-description img {
    max-width: 100%;
}
</style>