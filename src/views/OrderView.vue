<template>
    <div class="container">
        <div class="hr">
            <span class="silent site-logo-mono">{{ $t('app.logo.text') }}</span>
        </div>

        <div class="header-1">{{ $t('createOrder.header') }}</div>

        <div class="row align-items-start">
            <main class="col-12 col-lg-8">
                <ol>
                    <li class="hr">
                        <span class="header-2">{{ $t('createOrder.customerData.header') }}</span>
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <label for="lastNameInput" class="form-label">{{ $t('createOrder.customerData.lastName') }}</label>
                                <input type="text" class="form-control" id="lastNameInput" v-model="personData.lastName">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="firstNameInput" class="form-label">{{ $t('createOrder.customerData.firstName') }}</label>
                                <input type="text" class="form-control" id="firstNameInput" v-model="personData.firstName">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="patronymicInput" class="form-label">{{ $t('createOrder.customerData.patronymic') }}</label>
                                <input type="text" class="form-control" id="patronymicInput"
                                    v-model="personData.patronymic">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="phoneNumberInput" class="form-label">{{ $t('createOrder.customerData.phoneNumber') }}</label>
                                <input type="text" class="form-control" id="phoneNumberInput"
                                    v-model="personData.phoneNumber">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="emailInput" class="form-label">{{ $t('createOrder.customerData.email') }}</label>
                                <input type="text" class="form-control" id="emailInput" v-model="personData.email">
                            </div>
                        </div>
                    </li>
                    <li class="hr">
                        <span class="header-2">{{ $t('createOrder.products.header') }}</span>
                        <ul>
                            <template v-for="product in products" :key="product.id">
                                <li class="order-item row py-2 hr">
                                    <div class="col-6 d-flex">
                                        <div class="product-image-area">
                                            <img v-if="product.images && product.images.length > 0"
                                                :src="product.images[0].path" class="product-image">
                                        </div>
                                        <span class="link-button">{{ product.name }}</span>
                                    </div>
                                    <div class="col-2 d-flex flex-column align-items-center">
                                        <span>{{ $t('createOrder.products.price') }}</span>
                                        <span>{{ product.price.split(".")[0] }} ₴</span>
                                    </div>
                                    <div class="col-2 d-flex flex-column align-items-center">
                                        <span>{{ $t('createOrder.products.amount') }}</span>
                                        <span>{{ cartItems[product.id] }}</span>
                                    </div>
                                    <div class="col-2 d-flex flex-column align-items-center">
                                        <span>{{ $t('createOrder.products.subtotal') }}</span>
                                        <span>{{ product.price * cartItems[product.id] }} ₴</span>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <div class="d-flex justify-content-end">
                            <span>
                                {{ $t('createOrder.products.total') }}: {{ products.reduce((p, c) => c.price * cartItems[c.id] + p, 0) }} ₴
                            </span>
                        </div>
                    </li>
                    <li class="hr">
                        <span class="header-2">{{ $t('createOrder.delivery.header') }}</span>
                        <div class="my-2">
                            <button class="card w-100" data-bs-toggle="modal" data-bs-target="#selectCityModal">
                                <span class="d-flex w-100">
                                    <span class="d-flex align-items-center px-3"><i class="bi bi-geo-alt"></i></span>
                                    <span class="d-flex flex-column flex-grow-1 align-items-start">
                                        <span class="form-label">{{ $t('createOrder.delivery.city') }}</span>
                                        <template v-if="selectedCity">
                                            <span>{{ selectedCity.cityName }}</span>
                                            <span>{{ selectedCity.areaName }}</span>
                                        </template>
                                        <template v-else>
                                            {{ $t('createOrder.delivery.cityNotSelected') }}
                                        </template>
                                    </span>
                                    <span class="d-flex align-items-center px-3"><i class="bi bi-caret-right"></i></span>
                                </span>
                            </button>
                        </div>
                        <div class="card my-2">
                            <div class="form-check p-3 ps-5">
                                <input class="form-check-input" type="radio" name="deliveryMethod"
                                    id="deliveryMethodNovaPoshta" v-model="deliveryMethod" value="NOVA_POSHTA_WAREHOUSE">
                                <label class="form-check-label" for="deliveryMethodNovaPoshta">
                                    {{ $t('createOrder.delivery.methods.NOVA_POSHTA_WAREHOUSE') }}
                                </label>
                                <nova-poshta-select-warehouse-component v-if="deliveryMethod === 'NOVA_POSHTA_WAREHOUSE'"
                                    :cityId="selectedCity?.id" v-model="deliveryInformation" />
                            </div>
                        </div>
                    </li>
                    <li class="hr">
                        <span class="header-2">{{ $t('createOrder.payment.header') }}</span>

                        <div class="variant-group" :class="{ 'card': paymentMethod === 'POST_PAY' }">
                            <div class="form-check p-3 ps-5">
                                <input class="form-check-input" type="radio" name="paymentMethod" id="paymentMethodPostPay"
                                    value="POST_PAY" v-model="paymentMethod">
                                <label class="form-check-label" for="paymentMethodPostPay">
                                    {{ $t('createOrder.payment.methods.POST_PAY') }}
                                </label>
                            </div>
                        </div>
                        <div class="variant-group" :class="{ 'card': paymentMethod === 'SEND_ON_CARD' }">
                            <div class="form-check p-3 ps-5">
                                <input class="form-check-input" type="radio" name="paymentMethod"
                                    id="paymentMethodSendOnCard" value="SEND_ON_CARD" v-model="paymentMethod">
                                <label class="form-check-label" for="paymentMethodSendOnCard">
                                    {{ $t('createOrder.payment.methods.SEND_ON_CARD') }}
                                </label>
                            </div>
                            <label class="ps-5 mb-2 form-label" :class="{ 'd-none': paymentMethod !== 'SEND_ON_CARD' }">
                                {{ $t('createOrder.payment.info.SEND_ON_CARD') }}
                            </label>
                        </div>
                    </li>
                    <li class="hr">
                        <span class="header-2">{{ $t('createOrder.recipient.header') }}</span>
                        <div class="form-check list-item">
                            <input type="checkbox" class="form-check-input" v-model="useMyDataForDelivery"
                                id="useMyDataForDeliveryInput">
                            <label class="form-check-label " for="useMyDataForDeliveryInput">
                                {{ $t('createOrder.recipient.useCustomerData') }}
                            </label>
                        </div>

                        <div v-if="!useMyDataForDelivery" class="row">
                            <div class="col-12 col-md-6">
                                <label for="deliveryLastNameInput" class="form-label">{{ $t('createOrder.recipient.lastName') }}Фамилия</label>
                                <input type="text" class="form-control" id="deliveryLastNameInput"
                                    v-model="deliveryPerson.lastName">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="deliveryFirstNameInput" class="form-label">{{ $t('createOrder.recipient.firstName') }}Имя</label>
                                <input type="text" class="form-control" id="deliveryFirstNameInput"
                                    v-model="deliveryPerson.firstName">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="deliveryPatronymicInput" class="form-label">{{ $t('createOrder.recipient.patronymic') }}Отчество</label>
                                <input type="text" class="form-control" id="deliveryPatronymicInput"
                                    v-model="deliveryPerson.patronymic">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="deliveryPhoneNumberInput" class="form-label">{{ $t('createOrder.recipient.phoneNumber') }}Мобильный телефон</label>
                                <input type="text" class="form-control" id="deliveryPhoneNumberInput"
                                    v-model="deliveryPerson.phoneNumber">
                            </div>
                        </div>
                    </li>
                </ol>
            </main>
            <aside class="sticky-top col-12 col-lg-4">
                <div class="card-gray my-1">
                    <div style="font-size: 28px">
                        {{ $t('createOrder.total') }}
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="result-label">
                            {{ products.length }} {{ $t('createOrder.productsForAmount') }}
                        </span>
                        <span class="result-label">
                            {{ products.reduce((p, c) => c.price * cartItems[c.id] + p, 0) }} ₴
                        </span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="result-label">
                            {{ $t('createOrder.deliveryCost') }}
                        </span>
                        <span class="result-label text-end">
                            {{ $t('createOrder.deliveryCostValue') }}
                        </span>
                    </div>
                    <div class="hr"></div>
                    <div class="d-flex justify-content-between">
                        <span class="result-label">
                            {{ $t('createOrder.totalToPay') }}
                        </span>
                        <span>
                            {{ products.reduce((p, c) => c.price * cartItems[c.id] + p, 0) }} ₴
                        </span>
                    </div>
                    <div class="hr"></div>

                    <div class="my-2 d-flex">
                        <button class="btn btn-lg btn-buy w-100" @click="createOrder">{{ $t('createOrder.confirm') }}</button>
                    </div>
                    <p class="result-label-sm mb-2">
                        {{ $t('createOrder.lawReminder1') }}
                    </p>
                    <p class="result-label-sm mb-2">
                        {{ $t('createOrder.termsAgreementList') }}:
                    </p>
                    <ul>
                        <li class="result-label-sm">
                            <a href="#">{{ $t('createOrder.term1') }}</a>
                        </li>
                        <li class="result-label-sm">
                            <a href="#">{{ $t('createOrder.term2') }}</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>


        <div class="modal fade" id="successModal" data-bs-backdrop="static" tabindex="-1"
            aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title m-auto" id="successModalLabel">{{ $t('createOrder.modal.gratitude.header') }}</h5>
                    </div>
                    <div class="modal-body text-center">
                        {{ $t('createOrder.modal.gratitude.body') }}
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-buy btn-sm" data-bs-dismiss="modal"
                            @click="$router.push({ name: 'products' })">{{ $t('createOrder.modal.gratitude.contunueButton') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="selectCityModal" ref="selectCityModal" data-bs-backdrop="static" tabindex="-1"
            aria-labelledby="selectCityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title m-auto" id="selectCityModalLabel">{{ $t('createOrder.modal.citySelect.header') }}</h5>
                    </div>
                    <div class="modal-body">
                        <i class="bi bi-box2"></i> &nbsp;
                        <span>{{ $t('createOrder.modal.citySelect.deliverAllUkraine') }}</span>
                        <div>
                            <label for="modalCityNameInput" class="form-label">{{ $t('createOrder.modal.citySelect.chooseCity') }}</label>
                            <input type="text" class="form-control" id="modalCityNameInput" @input="loadLocations"
                                v-model="modals.citySelect.cityNameInput">
                        </div>

                        <ul v-if="modals.citySelect.cities.length > 0" class="data-list" style="height: 25vh">
                            <template v-for="option in modals.citySelect.cities" :key="option.id">
                                <li @click="selectCity(option)">
                                    {{ option.name }}
                                </li>
                            </template>
                        </ul>
                        <ul v-else>
                            <template v-for="option in modals.citySelect.defaultCities" :key="option.id">
                                <li @click="selectCity(option)">
                                    {{ option.name }}
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="button primary" data-bs-dismiss="modal"
                            :disabled="!modals.citySelect.selectedCity" @click="applyCitySelect">{{ $t('createOrder.modal.citySelect.applyButton') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api/api'
import { mapGetters } from 'vuex'
import DataList from "../components/DataList.vue";
import { debounce } from '@/plugins/debounce';
import Multiselect from '@vueform/multiselect'
import NovaPoshtaSelectWarehouseComponent from '@/modules/delivery/NovaPoshtaSelectWarehouseComponent.vue'


export default {
    components: {
        DataList,
        Multiselect,
        NovaPoshtaSelectWarehouseComponent
    },
    data() {
        return {
            personData: {
                firstName: null,
                lastName: null,
                patronymic: null,
                phoneNumber: null,
                email: null
            },
            deliveryPerson: {
                firstName: null,
                lastName: null,
                patronymic: null,
                phoneNumber: null
            },
            products: [],
            selectedCity: null,
            paymentMethod: 'POST_PAY',
            deliveryMethod: 'NOVA_POSHTA_WAREHOUSE',
            deliveryInformation: {},
            useMyDataForDelivery: true,
            modals: {
                citySelect: {
                    selectedCity: null,
                    cities: [],
                    defaultCities: [],
                    cityNameInput: null
                }
            },
        }
    },
    computed: {
        ...mapGetters(['cartItems']),
    },
    async created() {
        this.loadLocations = debounce(this.loadLocations, 500);
        await this.$store.state.initializationPromise;

        if (Object.keys(this.cartItems).length === 0) {
            this.$router.push({ name: 'home' });
        }

        this.updateProducts(this.cartItems);

        this.modals.citySelect.defaultCities = (await Api.loadLocations('')).data.content;

        if (this.$store.state.user) {
            this.personData.firstName = this.$store.state.user.firstName;
            this.personData.lastName = this.$store.state.user.lastName;
            this.personData.patronymic = this.$store.state.user.patronymic;
            this.personData.email = this.$store.state.user.email;
            this.personData.phoneNumber = this.$store.state.user.phoneNumber;
        }

    },
    methods: {
        async createOrder() {
            const response = await Api.createOrder({
                firstName: this.personData.firstName,
                lastName: this.personData.lastName,
                patronymic: this.personData.patronymic,
                phoneNumber: this.personData.phoneNumber,
                email: this.personData.email,
                orderItems: this.cartItems,
                deliveryCity: this.selectedCity.id,
                paymentMethod: this.paymentMethod,
                deliveryMethod: this.deliveryMethod,
                deliveryInformation: this.deliveryInformation,
                ...(this.useMyDataForDelivery && {
                    deliveryFirstName: this.personData.firstName,
                    deliveryLastName: this.personData.lastName,
                    deliveryPatronymic: this.personData.patronymic,
                    deliveryPhoneNumber: this.personData.phoneNumber
                }),
                ...(!this.useMyDataForDelivery && {
                    deliveryFirstName: this.deliveryPerson.firstName,
                    deliveryLastName: this.deliveryPerson.lastName,
                    deliveryPatronymic: this.deliveryPerson.patronymic,
                    deliveryPhoneNumber: this.deliveryPerson.phoneNumber
                }),
            });

            var successModal = new bootstrap.Modal(document.getElementById('successModal'), {})
            successModal.show();
            this.$store.dispatch('clearCart');
        },
        async updateProducts(items) {
            let products = [];
            for (let id of Object.keys(items)) {
                const product = await this.$store.dispatch('getProduct', id)
                if (!product) {
                    console.log('removed ' + id)
                    this.$store.dispatch('removeFromCart', id);
                    continue;
                }
                products.push(product);
            }
            this.products = products;
        },
        async loadLocations(event) {
            this.modals.citySelect.selectedCity = null;
            const value = event.target.value;
            const response = await Api.loadLocations(value);
            this.modals.citySelect.cities = response.data.content;
        },
        async selectCity(option) {
            this.modals.citySelect.selectedCity = option;
            this.modals.citySelect.cities = [];
            this.modals.citySelect.cityNameInput = option.name;
        },
        async applyCitySelect() {
            this.selectedCity = this.modals.citySelect.selectedCity;
        }
    },
    watch: {
        async cartItems(items) {
            this.updateProducts(items);
        }
    }
}
</script>

<style lang="scss">
.order-item {
    .product-image-area {
        min-width: 56px;
    }

    .product-image {
        max-height: 56px;
        max-width: 56px;
        object-fit: contain
    }
}

.hr {

    border-bottom: 1px solid #e9e9e9;
}

.header-1 {
    font-family: Rozetka, BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    font-size: 2em;
}

.header-2 {
    font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    font-size: 1em;
}

ol {
    list-style: none;
    counter-reset: item;
}

ol>li {
    counter-increment: item;
    margin-bottom: 5px;
    margin-left: -30px;
    padding-left: 30px;
    padding-bottom: 15px;

}

ol>li:before {
    margin-right: 10px;
    margin-left: -30px;
    content: counter(item);
    background: #e9e9e9;
    border-radius: 100%;
    color: black;
    width: 1.3rem;
    height: 1.3rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.form-label {
    color: #797878;
    font-size: 12px;
    display: block;
    margin-bottom: 4px;
}

.card-gray {
    margin-bottom: 8px;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
}


.result-label {
    font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    font-size: 14px;
    color: #797878;
}

.result-label-sm {
    font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    font-size: 12px;
    color: #797878;
}

.data-list {
    overflow: auto;

    li {
        cursor: pointer;

        &:hover {
            background-color: #f4faf6;
        }
    }
}
</style>