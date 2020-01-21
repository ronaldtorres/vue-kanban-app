import '../scss/app.scss';
import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import App from './app/App.vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import vuex from 'vuex';
import store from './app/store/store';

Vue.use(ElementUI);
Vue.use(vuex);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    store: new vuex.Store(store),
    render: h => h(App)
});

/*
    // I leave this comment here by learning reasons, this way produce an error
    // not works if the $mount method or render prop are used.
    new Vue({
        el: '#app',
        components: {App},
        template: '<App/>'
    })

    =========================

    This way works:

    new Vue({
        components: {App},
        template: '<App/>',
        mounted() {
            console.log('App initialized');
        }
    }).$mount('#app');
 */