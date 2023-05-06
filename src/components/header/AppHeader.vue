<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container flex-nowrap mx-0" style="max-width: initial">
            <button class="navbar-toggler me-3" type="button" @click="toggleCollapse" aria-controls="navbarText"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link class="navbar-brand" :to="{ name: 'home' }" @click="collapse">
                <img src="/favicon.ico">
                <span class="site-logo h3 align-middle d-none d-sm-inline">{{ $t('app.logo.text') }}</span>
            </router-link>

            <router-link :to="{ name: 'products' }" class="text-nowrap btn btn-secondary mx-2 d-none d-sm-inline">
                <i class="bi bi-ui-checks-grid"></i>
                <span class="ms-1">{{ $t('header.links.catalog') }}</span>
            </router-link>

            <div class="flex-grow-1">
                <product-search-field-component @performed="collapse" />
            </div>
            <div class="d-none d-md-inline">

                <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle mx-2" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="flag-icon" :class="`flag-icon-${getLanguage(language).countryCode}`"></span>
                        {{ getLanguage(language).name }}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <template v-for="lang in languages" :key="lang.code">
                            <li>
                                <a class="dropdown-item" href="#" @click.prevent="$store.commit('setLanguage', lang.code)">
                                    <span class="flag-icon" :class="`flag-icon-${lang.countryCode}`"></span>
                                    {{ lang.name }}
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <div class="d-none d-md-inline">

                <template v-if="user === null">
                    <button type="button" class="header-button" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <i class="bi bi-person"></i>
                    </button>
                </template>
                <template v-else>
                    <li class="nav-item dropdown">
                        <button class="header-button dropdown-toggle" href="#" id="userContextMenu" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="d-flex flex-column">
                                <i class="bi bi-person-fill"></i>
                                <span class="h6" style="margin-top: -13px;">{{ user.firstName }}</span>
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userContextMenu">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'orders' }">{{ $t('header.links.orders')
                                }}</router-link>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" @click.prevent="logout">{{ $t('header.links.logout')
                                }}</a>
                            </li>
                        </ul>
                    </li>
                </template>
            </div>
            <button type="button" v-if="cartProducts.length > 0" class="header-button cart-button" data-bs-toggle="modal"
                data-bs-target="#cartModal" @click="collapse">
                <i class="bi bi-cart"></i>
                <span class="cart-items-count-label">{{ Object.values(cartItems).reduce((sum, a) => sum + a, 0) }}</span>
            </button>

        </div>

        <div class="collapse w-100 side-menu" ref="navbarExpander">
            <ul class="d-md-none ms-4">
                <li class="d-flex align-items-center py-2 my-2">
                    <router-link :to="{ name: 'products' }" @click="collapse">
                        <i class="bi bi-ui-checks-grid button-icon"></i>
                        <span class="ms-1 text-white">{{ $t('header.links.catalog') }}</span>
                    </router-link>
                </li>

                <li class="d-flex align-items-center py-2 my-2">
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <span class="flag-icon button-icon"
                                :class="`flag-icon-${getLanguage(language).countryCode}`"></span>
                            <span class="text-white">
                                {{ getLanguage(language).name }}
                            </span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <template v-for="lang in languages" :key="lang.code">
                                <li>
                                    <a class="dropdown-item" href="#"
                                        @click.prevent="$store.commit('setLanguage', lang.code)">
                                        <span class="flag-icon" :class="`flag-icon-${lang.countryCode}`"></span>
                                        {{ lang.name }}
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </li>

                <li class="d-flex align-items-center py-2 my-2">
                    <template v-if="user === null">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" @click.prevent>
                            <i class="bi bi-person button-icon"></i>
                            <span class="text-white">{{ $t('header.links.authentication') }}</span>
                        </a>
                    </template>
                    <template v-else>
                        <div class="nav-item dropdown">
                            <a class="dropdown-toggle" href="#" id="userContextMenu" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="bi bi-person-fill button-icon"></i>
                                <span class="text-white">{{ user.firstName }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="userContextMenu">
                                <li>
                                    <router-link class="dropdown-item" :to="{ name: 'orders' }">
                                        {{ $t('header.links.orders') }}
                                    </router-link>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#" @click.prevent="logout">
                                        {{ $t('header.links.logout') }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </nav>
    <div class="backdrop" :class="{ 'd-none': !expanded }" ref="navbarBackdrop" @click="toggleCollapse"></div>
</template>

<script>

import ProductSearchFieldComponent from '@/components/header/ProductSearchFieldComponent.vue'
import { mapGetters, mapState } from 'vuex'
import Api from '@/api/api'
import { languages, getLanguage } from '@/i18n/languages'

let navbarExpander;

export default {
    components: {
        ProductSearchFieldComponent
    },
    data() {
        return {
            expanded: false
        }
    },
    mounted() {
        navbarExpander = new bootstrap.Collapse(this.$refs.navbarExpander, { toggle: false });
    },
    methods: {
        async logout() {
            await Api.logout();
            window.location.reload()
        },
        getLanguage,
        toggleCollapse() {
            if (!this.$refs.navbarExpander.classList.contains('collapsing')) {
                if (this.$refs.navbarExpander.classList.contains('show')) {
                    navbarExpander.hide();
                    this.expanded = false;
                } else {
                    navbarExpander.show();
                    this.expanded = true;
                }
            }
        },
        async collapse() {
            while (this.$refs.navbarExpander.classList.contains('collapsing')) {
                await new Promise(r => setTimeout(r, 16));
            }
            if (this.$refs.navbarExpander.classList.contains('show')) {
                navbarExpander.hide();
                this.expanded = false;
            }
        }
    },
    computed: {
        ...mapGetters(['cartProducts', 'cartItems']),
        ...mapState(['language', 'user']),
        languages: () => languages,
    }
}
</script>

<style lang="scss">
nav {
    z-index: 1000;
}

.side-menu {
    .button-icon {
        display: inline-flex;
        flex-direction: row;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;
        margin-right: 16px;
        border-radius: 50%;
        background-color: #f5f5f5f7;
        transition: all .2s ease-in-out;
    }
}

.backdrop {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #7f7f7f7f;
}

.flag-icon.flag-icon-ru {
    background-image: url('/ru-icon.png');
}
</style>