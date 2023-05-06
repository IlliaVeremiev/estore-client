import "./assets/main.scss";
import './assets/theme.scss';

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import i18n from '@/i18n'
import debounce from '@/plugins/debounce';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(debounce);

app.mount("#app");
