<template>
    <div class="modal fade" id="cartModal" ref="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">{{ $t('modal.cart.title') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul>
                        <template v-for="product in cartProducts" :key="product.id">
                            <li class="cart-item">
                                <div class="product-info d-flex">
                                    <div class="col-3">
                                        <a href="#" class="cart-item-image">
                                            <img v-if="product.images && product.images.length > 0" :src="product.images[0].path" alt="Product image" style="height:200px">
                                        </a>
                                    </div>
                                    <div class="col-8 d-flex flex-column justify-content-between">
                                        <div class="product-title">
                                            {{ productTitle(product) }}
                                        </div>
                                        <div class="row">
                                            <div class="col-6"></div>
                                        </div>
                                    </div>
                                    <div class="col-1">
                                        <button class="btn" @click="removeFromCart(product.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-item-info d-flex justify-content-end">
                                    <div class="d-flex">
                                        <button class="btn" @click="removeOneFromCart(product.id)">
                                            <i class="bi bi-dash-lg"></i>
                                        </button>
                                        <input type="number" class="form-control w-25" :value="cartItems[product.id]">
                                        <button class="btn" @click="addToCart(product)">
                                            <i class="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    <div class="product-price">
                                        {{ cartItems[product.id] * product.price }}
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <div class="align-self-center">
                            <button type="button" class="button secondary" data-bs-dismiss="modal">
                                {{ $t('modal.cart.buttons.continueShopping') }}
                            </button>
                        </div>
                        <div class="create-order-button-area d-lg-block d-flex flex-column align-items-center ms-3">
                            {{ totalPrice }}
                            <button type="button" class="button primary large" @click="createOrder"
                                data-bs-dismiss="modal">
                                {{ $t('modal.cart.buttons.createOrder') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

let modal;

export default {
    computed: {
        ...mapGetters(['cartItems', 'cartProducts', 'brands', 'categories']),
        totalPrice() {
            return this.cartProducts.reduce((p, c) => p + c.price * this.cartItems[c.id], 0) + ' ₴'
        }
    },
    mounted(){
        modal = new bootstrap.Modal(this.$refs.cartModal, {});
    },
    methods: {
        productTitle(product) {
            const brand = this.brands.find(b => b.id == product.brand)
            const category = this.categories.find(c => c.id == product.category)
            return (category?.name ?? '') + ' ' + (brand?.name ?? '') + ' ' + (product?.name ?? '')
        },
        createOrder() {
            this.$router.push({ name: 'order' })
        },
        addToCart(product){
            this.$store.dispatch('addToCart', product)
        },
        removeOneFromCart(productId){
            this.$store.dispatch('removeOneFromCart', productId)
        },
        removeFromCart(productId){
            this.$store.dispatch('removeFromCart', productId);
            if (Object.keys(this.cartItems).length === 0){
                modal.hide();
            }
        },
    }
}
</script>

<style lang="scss">
.btn-buy {
    background-color: #00a046;
    color: #fff;
    font-size: 18px;
    line-height: 48px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    font-family: BlinkMacSystemFont, -apple-system, Arial, Segoe UI, Roboto, Helvetica, sans-serif;
    margin: 0;
    outline: none;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: center;
    transition-duration: .2s;
    transition-property: color, background-color, border-color;
    transition-timing-function: ease-in-out;
}

.create-order-button-area {
    padding: 16px;
    background-color: #00a0461a;
    border: 1px solid #00a046;
    border-radius: 4px;
    font-size: 24px;
}

a.cart-item-image {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    max-width: 96px;
    height: 96px;
    margin-right: 16px;

    img {
        max-width: 100%;
        max-height: 100%;
    object-fit: contain;
    }
}

.product-price {
    font-size: 24px;
}
</style>