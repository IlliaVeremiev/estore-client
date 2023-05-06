import { createStore } from 'vuex'
import Api from '../api/api';
import i18n from '@/i18n'

const languagePath = 'language';
const lastViewedProductIdsPath = 'lastViewedProductIds';
const browserDefaultLanguage = navigator.language || navigator.userLanguage;
let initializationPromiseResolver = null;
const initializationPromise = new Promise(r => initializationPromiseResolver = r)

const startupLanguage = localStorage.getItem(languagePath) || import.meta.env.VITE_DEFAULT_LANGUAGE;

const store = createStore({
    state: {
        categories: [],
        brands: [],
        cart: {
            items: {},
            products: []
        },
        cache: {
            products: []
        },
        initialized: false,
        initializationPromise: initializationPromise,
        language: startupLanguage,
        user: null,
        lastViewedProductIds: []
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        directories(state) {
            return state.directories;
        },
        brands(state) {
            return state.brands;
        },
        cartItems: (state) => state.cart.items,
        cartProducts: (state) => state.cart.products,
    },
    mutations: {
        categories(state, value) {
            state.categories = value;
        },
        brands(state, value) {
            state.brands = value;
        },
        cartItems(state, value) {
            state.cart.items = value;
        },
        addCacheProduct(state, value) {
            state.cache.products = [...state.cache.products, value];
            if (state.cache.products.length > 100) {
                state.cache.products = state.cache.products.slice(1);
            }
        },
        initialized(state, value) {
            state.initialized = value;
        },
        setLanguage: (state, language) => state.language = language,
        user: (state, user) => state.user = user,
        setCartProducts: (state, products) => state.cart.products = products,
        setLastViewedProductIds(state, ids) {
            state.lastViewedProductIds = ids;
        }
    },
    actions: {
        async setup(context) {
            const { dispatch } = context;
            const selectedLanguage = localStorage.getItem(languagePath) || (navigator.language || navigator.userLanguage).split('-')[0]; //TODO walk through navigator.languages to find first one that fits provided
            context.commit('setLanguage', selectedLanguage);

            await Promise.all([
                this.dispatch('loadCategories'),
                this.dispatch('loadBrands'),
                this.dispatch('loadAuthorizedUser')
            ])

            const cartItems = JSON.parse(localStorage.getItem('cart_items') ?? '{}');
            context.commit('cartItems', cartItems);
            dispatch('setupCart');

            context.commit('initialized', true);
            initializationPromiseResolver();
        },
        async loadAuthorizedUser({ commit }) {
            try {
                const response = await Api.getUser();
                commit('user', response.data);
            } catch (error) { }
        },
        loadCategories({ commit }) {
            const promise = Api.getCategories();
            promise.then(response => {
                commit('categories', response.data.content)
            });
            return promise;
        },
        loadBrands({ commit }) {
            const promise = Api.getBrands();
            promise.then(response => {
                commit('brands', response.data.content)
            });
            return promise;
        },
        async addToCart(context, product) {
            const cartItems = { ...context.getters.cartItems };
            const cartProducts = [...context.state.cart.products];
            if (cartItems[product.id] == null) {
                cartItems[product.id] = 0;
                cartProducts.push(product);
            }
            cartItems[product.id]++;
            context.commit('cartItems', cartItems);
            context.commit('setCartProducts', cartProducts);
            localStorage.setItem('cart_items', JSON.stringify(cartItems));
        },
        async removeOneFromCart(context, productId) {
            const cartItems = { ...context.getters.cartItems };
            const cartProducts = [...context.state.cart.products];
            if (cartItems[productId] == null) {
                return;
            }
            if (cartItems[productId] > 1){
                cartItems[productId]--;
            }
            context.commit('cartItems', cartItems);
            context.commit('setCartProducts', cartProducts);
            localStorage.setItem('cart_items', JSON.stringify(cartItems));
        },
        clearCart({commit}){
            console.log('CLEar cart')
            commit('cartItems', []);
            commit('setCartProducts', []);
            localStorage.setItem('cart_items', JSON.stringify([]));
        },
        removeFromCart(context, id) {
            const items = context.getters.cartItems;
            delete items[id];
            const cartProducts = context.state.cart.products.filter(prod => prod.id !== id);
            context.commit('cartItems', items);
            context.commit('setCartProducts', cartProducts);
            localStorage.setItem('cart_items', JSON.stringify(items));
        },
        async getProduct(context, id) {
            id = Number(id);
            const element = context.state.cache.products.find(p => p.id === id);
            if (element != null) {
                return element;
            }
            try {
                const response = await Api.getProduct(id);
                context.commit('addCacheProduct', response.data);
                return response.data;
            } catch (e) {
                if (e.status === 404) {
                    return null;
                }
            }
        },
        async setupCart({ commit, dispatch, state }) {
            const products = [];
            console.log({ ...state.cart.items })
            for (const id of Object.keys(state.cart.items)) {
                const product = await dispatch('getProduct', id)
                if (!product) {
                    console.log('removed' + id)
                    dispatch('removeFromCart', id);
                    continue;
                }
                products.push(product);
            }
            commit('setCartProducts', products)
        },
        productViewed({ state, commit }, product) {
            if (!state.lastViewedProductIds.includes(product.id)) {
                const ids = state.lastViewedProductIds;
                ids.unshift(product.id);
                if (ids.length > 6) {
                    ids.splice(6);
                }
                commit('setLastViewedProductIds', ids)
            }
        }

    }
})

store.commit('setLastViewedProductIds', JSON.parse(localStorage.getItem(lastViewedProductIdsPath) ?? '[]'))

store.subscribe((mutation, state) => {
    if (mutation.type === 'setLanguage') {
        localStorage.setItem(languagePath, state.language);
        i18n.global.locale.value = state.language;
    }
    else if (mutation.type === 'setLastViewedProductIds') {
        localStorage.setItem(lastViewedProductIdsPath, JSON.stringify(state.lastViewedProductIds));
    }
})

export default store;