import axios from 'axios'
import qs from "qs"
import store from '@/store/store'

const apiLocation = import.meta.env.VITE_API_LOCATION;

const headers = {
    'Accept-Language': store.state.language
}

store.subscribe((mutation, state) => {
    if (mutation.type === 'setLanguage') {
        headers['Accept-Language'] = state.language;
    }
})

export default {
    getProduct: id => axios.get(`${apiLocation}/public/api/v1/products/${id}`, { withCredentials: true, headers }),
    getProducts: (params) => axios.get(`${apiLocation}/public/api/v1/products`, { paramsSerializer: p => qs.stringify(p, { arrayFormat: "brackets" }), params, withCredentials: true, headers }),

    getCategories: () => {
        console.log(headers);
        return axios.get(`${apiLocation}/api/v1/categories`, { withCredentials: true, headers })
    },

    getBrands: () => axios.get(`${apiLocation}/api/v1/brands`, { withCredentials: true, headers }),

    getUser: () => axios.get(`${apiLocation}/api/v1/customers/me`, { withCredentials: true, headers }),
    createUser: (data) => axios.post(`${apiLocation}/api/v1/customers`, data, { withCredentials: true, headers }),

    authenticate: (data) => axios.post(`${apiLocation}/api/v1/authentication`, data, { withCredentials: true, headers }),
    logout: () => axios.post(`${apiLocation}/api/v1/authentication/logout`, {}, { withCredentials: true, headers }),
    oauthLogin: (client) => axios.get(`${apiLocation}/oauth2/authorization/${client}`, { withCredentials: true, crossDomain: true, headers }),
    oauthCallback: (registrationId, location) => axios.get(`${apiLocation}/oauth2/callback/${registrationId}${location}`, { withCredentials: true, headers }),

    getOrders: (params) => axios.get(`${apiLocation}/api/v1/orders`, { params, withCredentials: true, headers }),
    createOrder: (data) => axios.post(`${apiLocation}/api/v1/orders`, data, { withCredentials: true, headers }),

    loadLocations: (search) => axios.get(`${apiLocation}/api/v1/cities`, { params: { search }, withCredentials: true, headers }),
    loadNPWarehouses: (cityId) => axios.get(`${apiLocation}/api/v1/cities/${cityId}/warehouses`, { withCredentials: true, headers })
};
