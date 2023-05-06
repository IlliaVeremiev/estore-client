import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'oauth2-resolve',
            path: '/:action/oauth2/code/:registrationId',
            component: () => import('@/authorization/OauthRedirect.vue')
        },
        {
            path: '/',
            component: () => import('@/screens/CommonScreen.vue'),
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: () => import('@/views/HomeView.vue'),
                },
                {
                    name: 'orders',
                    path: '/orders',
                    component: () => import('@/views/OrdersView.vue')
                },
                {
                    name: 'category',
                    path: '/categories/:uid?',
                    component: () => import('@/views/CategoryView.vue'),
                },
                {
                    path: '/products/:id',
                    component: () => import('@/views/ProductView.vue'),
                    children: [
                        {
                            name: 'product',
                            path: '',
                            component: () => import('@/components/product/ProductInformation.vue'),
                        },
                        {
                            name: 'product-characteristics',
                            path: 'characteristics',
                            component: () => import('@/components/product/ProductCharacteristics.vue'),
                        }
                    ]
                },
                {
                    name: 'products',
                    path: '/products',
                    component: () => import('@/views/ProductsView.vue'),
                },
            ]
        },
        {
            name: 'order',
            path: '/order',
            component: () => import('@/views/OrderView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:pathMatch(.*)',
            redirect: 'products',
        }
    ],
});

function resolveIfRequiresAuth(to, from, next) {
    if (to.meta.requiresAuth) {
        if (store.state.user !== null) {
            next();
        }
        else {
            window.location = '/?action=login'
        }
    } else {
        next();
    }
}

router.beforeEach((to, from, next) => {
    if (store.state.initialized) {
        resolveIfRequiresAuth(to, from, next);
    } else {
        store.state.initializationPromise.then(() => {
            resolveIfRequiresAuth(to, from, next);
        });
    }
})

export default router;
